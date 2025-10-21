"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ControlPanel } from "@/components/control-panel";
import { ResumePreview } from "@/components/resume-preview";
import type { ResumeData } from "@/lib/resume-data";
import { defaultResumeData } from "@/lib/resume-data";
import { useToast } from "@/hooks/use-toast";
import yaml from "js-yaml";

// Funzione per mappare il nuovo formato YAML alla struttura ResumeData
const mapNewYamlToResumeData = (data: any): ResumeData => {
  return {
    personalInfo: {
      name: `${data.informazioni_personali.nome} ${data.informazioni_personali.cognome}`,
      title: data.profilo_professionale[0], // Usa il primo elemento come titolo
      email: data.informazioni_personali.email,
      phone: data.informazioni_personali.telefono,
      location: data.informazioni_personali.indirizzo,
      linkedin: "", // Campo non presente nel nuovo formato
      github: "", // Campo non presente nel nuovo formato
      website: "", // Campo non presente nel nuovo formato
      profilePictureUrl: "", // Campo non presente nel nuovo formato
      profilePictureHint: "professional portrait",
    },
    summary: data.profilo_professionale.join(" "),
    experience: data.esperienza_professionale.map((exp: any, index: number) => ({
      id: `exp${index + 1}`,
      title: exp.titolo,
      company: exp.datore_lavoro,
      location: "", // Campo non presente nel nuovo formato
      startDate: exp.periodo.split(" - ")[0],
      endDate: exp.periodo.split(" - ")[1],
      description: exp.descrizione,
    })),
    education: data.istruzione_e_formazione.map((edu: any, index: number) => ({
      id: `edu${index + 1}`,
      institution: edu.istituzione,
      degree: edu.titolo,
      field: edu.descrizione, // Usa la descrizione come campo di studio
      startDate: edu.anno ? edu.anno.toString() : "",
      endDate: "",
    })),
    skills: [
      ...data.competenze.soft_skills.map((skill: any, index: number) => ({ id: `skill-soft-${index + 1}`, name: skill.nome, level: skill.livello })),
      ...data.competenze.competenze_digitali.map((skill: any, index: number) => ({ id: `skill-digital-${index + 1}`, name: skill.nome, level: skill.livello })),
    ],
    projects: [], // Sezione non presente nel nuovo formato
  };
};

export default function ResumeArchitectPage() {
  const [resumeData, setResumeData] = React.useState<ResumeData>(defaultResumeData);
  const [customCss, setCustomCss] = React.useState<string>("");
  const { toast } = useToast();

  const handleYamlUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = yaml.load(e.target?.result as string) as any;
        let mappedData: ResumeData;

        // Rilevamento del formato e mappatura
        if (data.informazioni_personali) {
          mappedData = mapNewYamlToResumeData(data);
        } else {
          mappedData = data as ResumeData;
        }

        // Validazione di base
        if (mappedData && mappedData.personalInfo && mappedData.experience) {
          setResumeData(mappedData);
          toast({
            title: "Success",
            description: "Resume data loaded successfully.",
          });
        } else {
          throw new Error("Invalid YAML structure.");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to parse YAML file. Please check its format.",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleCssUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const css = e.target?.result as string;
      setCustomCss(css);
      const styleTag = document.getElementById("custom-styles");
      if (styleTag) {
        styleTag.innerHTML = css;
      }
      toast({
        title: "Success",
        description: "Custom styles applied.",
      });
    };
    reader.readAsText(file);
  };

  const handlePdfExport = async () => {
    const input = document.getElementById("resume-container");
    if (!input) return;

    const { default: jsPDF } = await import("jspdf");
    const { default: html2canvas } = await import("html2canvas");

    const a4Width = 595.28;
    const a4Height = 841.89;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= a4Height;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= a4Height;
      }

      pdf.save("resume.pdf");
    });
  };

  const handleHtmlExport = () => {
    const resumeEl = document.getElementById("resume-container");
    if (!resumeEl) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeData.personalInfo.name} - Resume</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; }
            ${customCss}
          </style>
        </head>
        <body class="bg-gray-100 p-8">
          ${resumeEl.outerHTML}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <ControlPanel
          onYamlUpload={handleYamlUpload}
          onCssUpload={handleCssUpload}
          onPdfExport={handlePdfExport}
          onHtmlExport={handleHtmlExport}
        />
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold font-headline">Resume Architect</h1>
          </div>
        </header>
        <main className="p-4 sm:p-8">
          <ResumePreview
            data={resumeData}
            setData={setResumeData}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
