"use client";

import * as React from "react";
import { ResumePreview } from "@/components/resume-preview";
import type { ResumeData } from "@/lib/resume-data";
import { defaultResumeData } from "@/lib/resume-data";
import { FileImporter } from "@/components/file-importer";

export default function ResumeArchitectPage() {
  const [resumeData, setResumeData] = React.useState<ResumeData>(defaultResumeData);

  const handleDataImport = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div>
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold font-headline">Resume Architect</h1>
          </div>
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
