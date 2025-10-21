"use client";

import * as React from "react";
import { ResumePreview } from "@/components/resume-preview";
import type { ResumeData } from "@/lib/resume-data";
import { defaultResumeData } from "@/lib/resume-data";
import { FileImporter } from "@/components/file-importer";
import { ThemeSelector } from "@/components/theme-selector";
import { THEMES, type Theme } from "@/lib/themes";

export default function ResumeArchitectPage() {
  const [resumeData, setResumeData] = React.useState<ResumeData>(defaultResumeData);
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>(THEMES[0]);

  const handleDataImport = (data: ResumeData) => {
    setResumeData(data);
  };

  React.useEffect(() => {
    const head = document.head;
    let link = document.querySelector("#theme-stylesheet") as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.id = "theme-stylesheet";
      link.rel = "stylesheet";
      head.appendChild(link);
    }

    link.href = selectedTheme.path;

  }, [selectedTheme]);

  return (
    <div>
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold font-headline">Resume Architect</h1>
          </div>
          <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
        </header>
        <main className="p-4 sm:p-8">
            <FileImporter onDataImport={handleDataImport} />
            <div className="mt-8"/>
          <ResumePreview
            data={resumeData}
            setData={setResumeData}
          />
        </main>
    </div>
  );
}
