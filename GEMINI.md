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

---

## 6. Diario tecnico

*Questa sezione verrà popolata cronologicamente con le modifiche apportate al progetto.*
