"use client";

import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { importFromYAML, importFromCSV } from '@/lib/data-importer';
import { ResumeData } from '@/lib/resume-data';
import { Button } from './ui/button';
import { Input } from './ui/input';

type FileImporterProps = {
  onDataImport: (data: ResumeData) => void;
};

export const FileImporter: React.FC<FileImporterProps> = ({ onDataImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
        toast({
            title: "No file selected",
            description: "Please select a file to import.",
            variant: "destructive"
        })
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      try {
        let importedData: Partial<ResumeData>;
        if (file.name.endsWith('.yml') || file.name.endsWith('.yaml')) {
          importedData = importFromYAML(content);
        } else if (file.name.endsWith('.csv')) {
          importedData = await importFromCSV(content);
        } else {
            toast({
                title: "Unsupported file type",
                description: "Please select a YAML or CSV file.",
                variant: "destructive"
            })
          return;
        }
        toast({
            title: "Import successful",
            description: "The resume data has been imported.",
        })
        onDataImport(importedData as ResumeData);
      } catch (error) {
        if(error instanceof Error) {
            toast({
                title: "Import failed",
                description: error.message,
                variant: "destructive"
            })
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg">
      <Input type="file" onChange={handleFileChange} accept=".yml,.yaml,.csv" />
      <Button onClick={handleImport}>Import</Button>
    </div>
  );
};