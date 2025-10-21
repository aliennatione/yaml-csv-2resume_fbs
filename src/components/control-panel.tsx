
"use client";

import * as React from "react";
import {
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  FileCode,
  Download,
  Settings,
  HelpCircle,
  FileDown,
} from "lucide-react";
import { SettingsDialog } from "./settings-dialog";
import { InstructionsDialog } from "./instructions-dialog";
import { Separator } from "@/components/ui/separator";

type ControlPanelProps = {
  onYamlUpload: (file: File) => void;
  onCssUpload: (file: File) => void;
  onPdfExport: () => void;
  onHtmlExport: () => void;
  onPresetChange: (preset: string) => void;
  onStyleChange: (style: string) => void;
};

export function ControlPanel({
  onYamlUpload,
  onCssUpload,
  onPdfExport,
  onHtmlExport,
  onPresetChange,
  onStyleChange,
}: ControlPanelProps) {
  const yamlInputRef = React.useRef<HTMLInputElement>(null);
  const cssInputRef = React.useRef<HTMLInputElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    handler: (file: File) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handler(file);
    }
    event.target.value = ""; // Reset input
  };
  
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      <div className="flex flex-col h-full">
        <SidebarHeader>
          <h2 className="text-lg font-semibold font-headline">Controlli</h2>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Preset YAML</SidebarGroupLabel>
            <Select onValueChange={onPresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona un preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="detailed">Dettagliato</SelectItem>
                <SelectItem value="new-format">Nuovo Formato</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Stili CSS</SidebarGroupLabel>
            <Select onValueChange={onStyleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona uno stile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="dark">Scuro</SelectItem>
                <SelectItem value="classic">Classico</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Import Dati</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => yamlInputRef.current?.click()}
                  tooltip="Importa da YAML"
                >
                  <Upload />
                  <span>Importa YAML</span>
                </SidebarMenuButton>
                <input
                  type="file"
                  ref={yamlInputRef}
                  accept=".yml,.yaml"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, onYamlUpload)}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => cssInputRef.current?.click()}
                  tooltip="Importa stili custom"
                >
                  <FileCode />
                  <span>Importa CSS</span>
                </SidebarMenuButton>
                <input
                  type="file"
                  ref={cssInputRef}
                  accept=".css"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, onCssUpload)}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Esporta</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onPdfExport} tooltip="Scarica come PDF">
                  <FileText />
                  <span>Esporta PDF</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onHtmlExport} tooltip="Scarica come HTML">
                  <Download />
                  <span>Esporta HTML</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Esempi e Istruzioni</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    tooltip="Scarica YAML di esempio"
                  >
                    <a href={`${basePath}/example-resume.yaml`} download="example-resume.yaml">
                      <FileDown />
                      <span>Esempio YAML</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    tooltip="Scarica CSS di esempio"
                  >
                     <a href={`${basePath}/example-style.css`} download="example-style.css">
                      <FileDown />
                      <span>Esempio CSS</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Separator className="my-2" />
               <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsInstructionsOpen(true)}
                    tooltip="Apri istruzioni"
                  >
                    <HelpCircle />
                    <span>Istruzioni</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>

        <SidebarFooter>
          <Button variant="ghost" onClick={() => setIsSettingsOpen(true)}>
            <Settings />
            <span>Impostazioni</span>
          </Button>
        </SidebarFooter>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <InstructionsDialog
        open={isInstructionsOpen}
        onOpenChange={setIsInstructionsOpen}
      />
    </>
  );
}
