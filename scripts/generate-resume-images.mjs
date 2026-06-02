import { createServer } from "node:http";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const pdfPath = path.join(publicDir, "Alston_Mendonca_Resume.pdf");
const outputDir = path.join(publicDir, "resume");
const manifestDir = path.join(rootDir, "src", "generated");
const manifestPath = path.join(manifestDir, "resumeManifest.json");
const pdfJsPath = path.join(rootDir, "node_modules", "pdfjs-dist", "build", "pdf.mjs");
const pdfWorkerPath = path.join(rootDir, "node_modules", "pdfjs-dist", "build", "pdf.worker.mjs");
const renderScale = 2;

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function renderPageHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        background: #ffffff;
      }

      body {
        display: inline-block;
      }

      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <canvas id="resume-canvas"></canvas>
    <script type="module">
      import * as pdfjsLib from "/pdfjs.mjs";

      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

      const params = new URLSearchParams(window.location.search);
      const pageNumber = Number(params.get("page") || "1");
      const scale = Number(params.get("scale") || "2");
      const pdf = await pdfjsLib.getDocument("/resume.pdf").promise;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = document.getElementById("resume-canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      document.body.dataset.ready = "true";
      document.body.dataset.pages = String(pdf.numPages);
      document.body.dataset.width = String(viewport.width);
      document.body.dataset.height = String(viewport.height);
    </script>
  </body>
</html>`;
}

async function isCurrent() {
  if (!(await exists(manifestPath))) return false;

  const pdfStats = await stat(pdfPath);
  const manifestStats = await stat(manifestPath);
  if (manifestStats.mtimeMs < pdfStats.mtimeMs) return false;

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (!Array.isArray(manifest.pages) || manifest.pages.length === 0) return false;
  if (!manifest.pages.every((page) => typeof page.src === "string" && page.src.startsWith("/resume/"))) {
    return false;
  }

  for (const page of manifest.pages) {
    const imagePath = path.join(publicDir, page.src.replace(/^\//, "").replace(/\//g, path.sep));
    if (!(await exists(imagePath))) return false;

    const imageStats = await stat(imagePath);
    if (imageStats.mtimeMs < pdfStats.mtimeMs) return false;
  }

  return true;
}

async function createRenderServer(pdfBuffer, pdfJsSource, pdfWorkerSource) {
  const html = renderPageHtml();
  const server = createServer((req, res) => {
    const requestUrl = new URL(req.url ?? "/", "http://127.0.0.1");

    if (requestUrl.pathname === "/resume.pdf") {
      res.writeHead(200, { "Content-Type": "application/pdf" });
      res.end(pdfBuffer);
      return;
    }

    if (requestUrl.pathname === "/pdfjs.mjs") {
      res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
      res.end(pdfJsSource);
      return;
    }

    if (requestUrl.pathname === "/pdf.worker.mjs") {
      res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
      res.end(pdfWorkerSource);
      return;
    }

    if (requestUrl.pathname === "/" || requestUrl.pathname === "/render") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine local render server address.");
  }

  return {
    server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

async function main() {
  if (!(await exists(pdfPath))) {
    throw new Error(`Missing resume PDF: ${pdfPath}`);
  }

  if (await isCurrent()) {
    console.log("Resume images are already up to date.");
    return;
  }

  await mkdir(outputDir, { recursive: true });
  await mkdir(manifestDir, { recursive: true });

  const [pdfBuffer, pdfJsSource, pdfWorkerSource] = await Promise.all([
    readFile(pdfPath),
    readFile(pdfJsPath),
    readFile(pdfWorkerPath),
  ]);

  const { server, origin } = await createRenderServer(pdfBuffer, pdfJsSource, pdfWorkerSource);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1400, height: 1900, deviceScaleFactor: 1 });
    await page.goto(`${origin}/render?page=1&scale=${renderScale}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    await page.waitForFunction(() => document.body.dataset.ready === "true", {
      timeout: 60000,
    });

    const totalPages = await page.evaluate(() => Number(document.body.dataset.pages || "1"));
    const pages = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      await page.goto(`${origin}/render?page=${pageNumber}&scale=${renderScale}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      await page.waitForFunction(() => document.body.dataset.ready === "true", {
        timeout: 60000,
      });

      const imageData = await page.evaluate(() => {
        const canvas = document.getElementById("resume-canvas");
        if (!(canvas instanceof HTMLCanvasElement)) {
          throw new Error("Resume canvas was not rendered.");
        }

        return {
          dataUrl: canvas.toDataURL("image/png"),
          width: canvas.width,
          height: canvas.height,
        };
      });

      const imageFileName = `page-${pageNumber}.png`;
      const imageOutputPath = path.join(outputDir, imageFileName);
      const base64Payload = imageData.dataUrl.replace(/^data:image\/png;base64,/, "");

      await writeFile(imageOutputPath, Buffer.from(base64Payload, "base64"));

      pages.push({
        src: `/resume/${imageFileName}`,
        alt: `Alston Mendonca resume page ${pageNumber}`,
        width: imageData.width,
        height: imageData.height,
      });
    }

    const existingFiles = await readdir(outputDir);
    const expectedFiles = new Set(pages.map((item) => path.basename(item.src)));
    await Promise.all(
      existingFiles
        .filter((fileName) => fileName.endsWith(".png") && !expectedFiles.has(fileName))
        .map((fileName) => rm(path.join(outputDir, fileName), { force: true }))
    );

    await writeFile(
      manifestPath,
      `${JSON.stringify(
        {
          pdf: "/Alston_Mendonca_Resume.pdf",
          generatedAt: new Date().toISOString(),
          pages,
        },
        null,
        2
      )}\n`
    );

    console.log(`Generated ${pages.length} resume image(s).`);
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
