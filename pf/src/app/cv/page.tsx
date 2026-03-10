"use client";

import React from "react";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Curriculum Vitae</h1>
        <p className="text-sm text-black/60 dark:text-white/60 mb-6">If your browser supports PDFs it will display here. Otherwise you can download the file.</p>

        <div style={{ height: '80vh' }} className="border border-black/10 dark:border-white/10 rounded overflow-hidden">
          <iframe
            src="/CW.pdf"
            title="Curriculum Vitae"
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        </div>

        <div className="mt-4">
          <a href="/CW.pdf" target="_blank" rel="noopener noreferrer" className="text-[rgb(192,53,64)] font-semibold">
            Open CV in new tab / Download
          </a>
        </div>
      </div>
    </div>
  );
}
