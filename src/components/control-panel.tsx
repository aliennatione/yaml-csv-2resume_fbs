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
import { Upload, FileText, FileCode, Download, Settings } from "lucide-react";
import { SettingsDialog } from "./settings-dialog";

type ControlPanelProps = {
  onYamlUpload: (file: File) => void;
  onCssUpload: (file: File) => void;
  onPdfExport: () => void;
  onHtmlExport: () => void;
};

export function ControlPanel({
  onYamlUpload,
  onCssUpload,
  onPdfExport,
  onHtmlExport,
}: ControlPanelProps) {
  const yamlInputRef = React.useRef<HTMLInputElement>(null);
  const cssInputRef = React.useRef<HTMLInputElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

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

  return (
    <>
      <div className="flex flex-col h-full">
        <SidebarHeader>
          <h2 className="text-lg font-semibold font-headline">Controls</h2>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Data Import</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => yamlInputRef.current?.click()}
                  tooltip="Import from YAML"
                >
                  <Upload />
                  <span>Import YAML</span>
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
                  tooltip="Import custom styles"
                >
                  <FileCode />
                  <span>Import CSS</span>
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
            <SidebarGroupLabel>Export</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onPdfExport} tooltip="Download as PDF">
                  <FileText />
                  <span>Export PDF</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onHtmlExport} tooltip="Download as HTML">
                  <Download />
                  <span>Export HTML</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>
        <SidebarFooter>
          <Button variant="ghost" onClick={() => setIsSettingsOpen(true)}>
            <Settings />
            <span>Settings</span>
          </Button>
        </SidebarFooter>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
