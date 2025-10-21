"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const API_KEY_STORAGE_KEY = "resume-architect-api-key";

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [apiKey, setApiKey] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    if (open) {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
  }, [open]);

  const handleSave = () => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    toast({
      title: "Impostazioni salvate",
      description: "La tua chiave API è stata aggiornata.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Impostazioni</DialogTitle>
          <DialogDescription>
            Gestisci le impostazioni dell'applicazione qui. Le modifiche vengono salvate localmente nel tuo browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right col-span-1">
              Chiave API
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3"
              placeholder="Incolla la tua chiave API di Google AI"
            />
          </div>
          <p className="text-xs text-muted-foreground col-span-4 px-1">
            Sovrascrivi la chiave API predefinita per le funzionalità GenAI. Questo è opzionale.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Salva modifiche</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
