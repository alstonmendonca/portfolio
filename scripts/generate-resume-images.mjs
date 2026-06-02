import { createRequire } from "node:module";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const pdfPoppler = require("pdf-poppler");

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const pdfPath = path.join(publicDir, "Alston_Mendonca_Resume.pdf");
const outputDir = path.join(publicDir, "resume");
const manifestDir = path.join(rootDir, "src", "generated");
const manifestPath = path.join(manifestDir, "resumeManifest.json");
const supportedPlatforms = new Set(["win32", "darwin"]);
const renderScale = 1800;

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readManifest() {
  if (!(await exists(manifestPath))) return null;
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

async function isCurrent() {
  const manifest = await readManifest();
  if (!manifest || !Array.isArray(manifest.pages) || manifest.pages.length === 0) {
    return false;
  }

  const pdfStats = await stat(pdfPath);
  const manifestStats = await stat(manifestPath);
  if (manifestStats.mtimeMs < pdfStats.mtimeMs) return false;

  for (const page of manifest.pages) {
    if (typeof page.src !== "string" || !page.src.startsWith("/resume/")) {
      return false;
    }

    const imagePath = path.join(publicDir, page.src.replace(/^\//, "").replace(/\//g, path.sep));
    if (!(await exists(imagePath))) return false;

    const imageStats = await stat(imagePath);
    if (imageStats.mtimeMs < pdfStats.mtimeMs) return false;
  }

  return true;
}

async function ensureSupportedPlatform() {
  if (supportedPlatforms.has(process.platform)) {
    return;
  }

  if (await isCurrent()) {
    console.log(`Skipping resume image generation on unsupported platform: ${process.platform}`);
    return "skipped";
  }

  throw new Error(
    `Resume image generation requires Windows or macOS for exact Poppler rendering. Current platform: ${process.platform}`
  );
}

async function readPngDimensions(filePath) {
  const buffer = await readFile(filePath);
  if (buffer.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`Invalid PNG file: ${filePath}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function main() {
  if (!(await exists(pdfPath))) {
    throw new Error(`Missing resume PDF: ${pdfPath}`);
  }

  const platformStatus = await ensureSupportedPlatform();
  if (platformStatus === "skipped") {
    return;
  }

  if (await isCurrent()) {
    console.log("Resume images are already up to date.");
    return;
  }

  await mkdir(outputDir, { recursive: true });
  await mkdir(manifestDir, { recursive: true });

  const pdfInfo = await pdfPoppler.info(pdfPath);
  const totalPages = Number(pdfInfo.pages ?? 0);
  if (!Number.isInteger(totalPages) || totalPages <= 0) {
    throw new Error("Could not determine PDF page count.");
  }

  await pdfPoppler.convert(pdfPath, {
    format: "png",
    scale: renderScale,
    out_dir: outputDir,
    out_prefix: "page",
    page: null,
  });

  const pages = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    const imageFileName = `page-${pageNumber}.png`;
    const imagePath = path.join(outputDir, imageFileName);

    if (!(await exists(imagePath))) {
      throw new Error(`Expected generated image not found: ${imageFileName}`);
    }

    const dimensions = await readPngDimensions(imagePath);
    pages.push({
      src: `/resume/${imageFileName}`,
      alt: `Alston Mendonca resume page ${pageNumber}`,
      width: dimensions.width,
      height: dimensions.height,
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
        generator: "pdf-poppler",
        scale: renderScale,
        pages,
      },
      null,
      2
    )}\n`
  );

  console.log(`Generated ${pages.length} resume image(s) with Poppler.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
