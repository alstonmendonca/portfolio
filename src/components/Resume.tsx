"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import resumeManifest from "@/generated/resumeManifest.json";

interface ResumePage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Resume() {
  const pages = useMemo(() => resumeManifest.pages as ResumePage[], []);
  const [currentPage, setCurrentPage] = useState(0);
  const activePage = pages[currentPage] ?? pages[0];

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(pages.length - 1, 0)));
  }, [pages.length]);

  return (
    <section id="resume" className="section wrap-narrow">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">006 / résumé</span>
          <span className="sec-head__meta">PDF · {pages.length} pages</span>
        </div>
        <h2 className="sec-title">Résumé</h2>
      </div>

      <div className="resume-frame">
        <div className="resume-bar">
          {pages.length > 1 ? (
            <div className="resume-pager">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                disabled={currentPage === 0}
                aria-label="Previous résumé page"
                className="resume-pager__btn"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="resume-pager__count">
                Page {currentPage + 1} / {pages.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, pages.length - 1))}
                disabled={currentPage === pages.length - 1}
                aria-label="Next résumé page"
                className="resume-pager__btn"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            <span />
          )}

          <a href={resumeManifest.pdf} download className="btn btn--primary" style={{ minHeight: 44, padding: "0.6rem 1.1rem" }}>
            <Download size={15} /> Download PDF
          </a>
        </div>

        <div className="resume-view">
          {activePage && (
            <div className="resume-view__img">
              <Image
                key={activePage.src}
                src={activePage.src}
                alt={activePage.alt}
                width={activePage.width}
                height={activePage.height}
                sizes="(max-width: 640px) 92vw, 42rem"
                className="w-full h-auto"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
