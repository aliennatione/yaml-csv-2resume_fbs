# GEMINI.md - Contesto per l'Agente AI e Log Tecnico

Questo file serve come contesto persistente per l'agente AI (Gemini) e come diario di bordo per le modifiche architetturali e di processo.

## 1. Project Overview

-   **Nome**: YAML/CSV to Resume Builder with Firebase
-   **Descrizione**: Applicazione web Next.js che genera un curriculum personalizzato partendo da file di dati in formato YAML o CSV. Il progetto integra Firebase per il deploy e (opzionalmente) funzionalità AI per l'arricchimento dei contenuti.
-   **Architettura e Stack Tecnologico**:
    -   **Frontend**: Next.js (React), TypeScript, Tailwind CSS
    -   **Backend**: In transizione da un modello server-side a un export statico per compatibilità con GitHub Pages.
    -   **AI**: Genkit (le cui funzionalità dinamiche potrebbero richiedere un deploy separato o una rifattorizzazione).
    -   **Hosting**: GitHub Pages.
    -   **Package Manager**: npm

## 2. Development Standards / Coding Conventions

*In questa sezione verranno definite le convenzioni man mano che verranno implementate (es. Prettier, ESLint).*

## 3. Build & Deployment Process

-   **Build**: Il progetto viene buildato come sito statico tramite lo script `npm run build`.
-   **Deploy**: Il deploy è automatizzato tramite un workflow di GitHub Actions che pubblica il contenuto della cartella `out/` sulla branch `gh-pages`.

## 4. Excluded Files / Ignored Patterns

-   `.next/`
-   `out/`
-   `node_modules/`
-   `.env*`
-   `*.log`
-   `PIANO_DI_MIGLIORAMENTO.md`
-   `.github/` (il workflow di deploy stesso non necessita di essere parte del contesto di analisi del codice sorgente).

## 5. Agent Interaction Protocol

-   **Contesto**: Questo file (`GEMINI.md`) è il tuo principale riferimento per comprendere lo stato del progetto, le decisioni architetturali e i processi approvati.
-   **Conferme**: Chiedi conferma solo se l'intento non è chiaro o se le modifiche richieste sono particolarmente invasive.
-   **Commit**: Ogni modifica deve essere eseguita in un commit atomico e chiaro.
-   **Aggiornamenti**: Dopo ogni intervento, aggiorna il `## Diario tecnico` con la data e il riferimento al commit.
-   **Efficienza**: Concatena i comandi (es. `git add . && git commit -m "messaggio" && git push`) per ridurre il numero di richieste di autorizzazione.

---

## 6. Diario tecnico

*Questa sezione verrà popolata cronologicamente con le modifiche apportate al progetto.*

- **29/07/2024 (ba7a2f3)**:
  - **ci**: Aggiunto workflow di GitHub Actions per il deploy su GitHub Pages al push di un tag.
  - **docs**: Aggiornato il protocollo di interazione dell'agente.

- **29/07/2024 (cf3df14)**:
  - **feat**: Aggiunta la possibilità di importare dati da file YAML e CSV.
  - **feat**: Creato il nuovo componente `FileImporter` per la gestione dell'upload dei file.
  - **refactor**: Semplificata l'interfaccia utente rimuovendo la sidebar e il pannello di controllo.
  - **refactor**: Aggiornata la pagina principale per integrare il nuovo componente `FileImporter`.
  - **chore**: Aggiunte le dipendenze `js-yaml`, `papaparse`, `@types/js-yaml` e `@types/papaparse`.

- **29/07/2024 (d6fb541)**:
  - **feat**: Abilitata la modifica inline per le sezioni "Skills" e "Projects".
  - **refactor**: Aggiornato il componente `ResumePreview` per rendere i campi delle sezioni "Skills" e "Projects" editabili.

- **29/07/2024 (0670c2b)**:
  - **feat**: Abilitata la modifica inline per la sezione "Education".
  - **refactor**: Aggiornato il componente `ResumePreview` per rendere i campi della sezione "Education" editabili.
  - **refactor**: Migliorata la funzione `handleSave` per gestire in modo più generico la modifica dei dati.

- **29/07/2024 (777a895)**:
  - **feat**: Abilitata la modifica inline per la sezione "Experience".
  - **refactor**: Aggiornato il componente `ResumePreview` per rendere i campi della sezione "Experience" editabili.
  - **refactor**: Migliorata la funzione `handleSave` per gestire la modifica di dati nidificati (oggetti e array).

- **29/07/2024 (6585556)**:
  - **feat**: Abilitata la modifica inline per le informazioni di contatto.
  - **refactor**: Aggiornato il componente `ResumePreview` per rendere i campi di contatto editabili.

- **29/07/2024 (94a4e0d)**:
  - **feat**: Aggiunta la possibilità di modificare inline alcuni campi del curriculum.
  - **feat**: Creato il nuovo componente `EditableField` per la gestione della modifica dei campi.
  - **refactor**: Aggiornato il componente `ResumePreview` per integrare il nuovo componente `EditableField`.
  - **chore**: Eseguito il commit e il push delle modifiche.
