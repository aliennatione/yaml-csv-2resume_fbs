"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeBlock } from "./code-block";

type InstructionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const yamlStructure = `
personalInfo:
  name: "Tuo Nome"
  title: "Tuo Titolo"
  # ... altri campi personali
experience:
  - id: "exp1"
    title: "Titolo Lavoro"
    company: "Nome Azienda"
    description:
      - "Descrizione punto 1"
      - "Descrizione punto 2"
  # ... altre esperienze
# ... altre sezioni come education, skills, projects
`.trim();

const cssExample = `
/* Seleziona l'elemento principale per garantire che gli stili si applichino solo al curriculum */
#resume-container {
  font-family: 'Garamond', serif; /* Cambia il font di base */
}

/* Cambia il colore dei titoli delle sezioni */
#resume-container h2.text-primary {
  color: #c0392b; /* Un rosso scuro */
  border-bottom: 2px solid #c0392b;
}

/* Modifica l'aspetto dei badge delle competenze */
#resume-container .badge-class-name { /* Sostituisci con la classe effettiva se necessario */
  background-color: #f0e68c; /* Giallo paglierino */
  color: #333;
  border-radius: 4px;
}
`.trim();

export function InstructionsDialog({
  open,
  onOpenChange,
}: InstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Istruzioni per la Personalizzazione</DialogTitle>
          <DialogDescription>
            Guida alla creazione dei tuoi file di dati (YAML) e stili (CSS)
            per il curriculum.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] p-4 pr-6">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-2">
                1. Creare il file di dati (YAML)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Il contenuto del tuo curriculum è definito da un file in formato
                YAML (`.yml` o `.yaml`). Questo formato è leggibile e facile da
                modificare. Puoi importare i tuoi dati usando il pulsante
                "Importa YAML".
              </p>
              <h4 className="font-medium mb-2">Struttura del file YAML</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Il file deve seguire una struttura specifica. Ecco un esempio
                di base. Per una visione completa, scarica il file YAML di
                esempio.
              </p>
              <CodeBlock language="yaml" code={yamlStructure} />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">
                2. Creare il file di stile (CSS)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                L'aspetto del tuo curriculum può essere personalizzato con un
                file CSS (`.css`). Puoi importare il tuo foglio di stile
                utilizzando il pulsante "Importa CSS". Gli stili caricati
                sovrascriveranno quelli predefiniti.
              </p>
              <h4 className="font-medium mb-2">Come funzionano gli stili</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Tutto il contenuto del curriculum è racchiuso in un elemento
                con l'ID <code>#resume-container</code>. Per evitare conflitti e
                applicare gli stili correttamente, **dovresti sempre
                prefiggere le tue regole CSS con questo ID**.
              </p>
              <CodeBlock language="css" code={cssExample} />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">
                3. Gestione degli Stili per l'Esportazione
              </h3>
              <h4 className="font-medium mb-2">Esportazione HTML</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Quando esporti il curriculum come file HTML, il contenuto del
                tuo file CSS personalizzato viene **incorporato direttamente**
                nel file HTML all'interno di un tag <code>&lt;style&gt;</code>.
                Questo garantisce che il file HTML sia auto-contenuto e mantenga
                il tuo stile ovunque venga aperto, senza bisogno di file
                esterni.
              </p>

              <h4 className="font-medium mb-2">Esportazione PDF</h4>
              <p className="text-sm text-muted-foreground mb-4">
                L'esportazione in PDF funziona in modo diverso. L'applicazione
                "fotografa" l'anteprima del curriculum esattamente come la vedi
                sullo schermo e la converte in un file PDF. Ciò significa che
                **tutti gli stili CSS personalizzati che hai applicato e che
                sono visibili nell'anteprima saranno presenti anche nel PDF
                finale**. Non c'è bisogno di configurazioni aggiuntive; se ha un
                bell'aspetto sullo schermo, avrà un bell'aspetto anche nel PDF.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
