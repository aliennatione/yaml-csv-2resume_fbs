
# Piano di Miglioramento DevOps per GitHub Pages

Questo documento descrive un piano per migrare la strategia di deploy del progetto verso GitHub Pages.

## 1. Diagnosi

### Stato Attuale

- **Progetto**: Applicazione Next.js.
- **Problema**: L'attuale configurazione non è ottimizzata per il deploy su GitHub Pages, che richiede una build di file statici.

## 2. Azioni Consigliate

Per deployare un'applicazione Next.js su GitHub Pages, è necessario configurarla per l'esportazione statica. Questo significa che le funzionalità server-side dinamiche (come le API route di Next.js) non saranno supportate. Il progetto dovrà essere adattato per funzionare come un sito puramente statico.

### Piano di Intervento

1.  **Configurazione per l'Export Statico**:
    -   Modificare `next.config.ts` per aggiungere l'opzione `output: 'export'`.
    -   Modificare lo script `build` in `package.json` per eseguire `next build`.

2.  **Adeguamento del Codice**:
    -   Rimuovere o rifattorizzare qualsiasi funzionalità basata su API routes o altre feature server-side di Next.js che non siano compatibili con l'export statico. Questo include l'analisi del codice in `src/ai` e `src/app/api`.

3.  **Configurazione di GitHub Actions per il Deploy**:
    -   Creare un workflow di GitHub Actions (`.github/workflows/deploy.yml`) che:
        1.  Esegue il checkout del codice.
        2.  Configura Node.js.
        3.  Installa le dipendenze (`npm install`).
        4.  Esegue la build statica (`npm run build`).
        5.  Carica gli artefatti della build sulla branch `gh-pages` per il deploy.

4.  **Aggiornamento della Documentazione**:
    -   Aggiornare il `README.md` con le nuove istruzioni di deploy per GitHub Pages.
    -   Aggiornare `GEMINI.md` per riflettere la nuova architettura di deploy.

## 3. Priorità e Ordine di Esecuzione

1.  **Priorità Alta**: Modifica della configurazione di Next.js e `package.json` per l'export statico.
2.  **Priorità Alta**: Creazione del workflow di GitHub Actions per automatizzare il deploy.
3.  **Priorità Media**: Analisi e adeguamento del codice per la compatibilità statica.
4.  **Continuo**: Aggiornamento della documentazione.

## 4. Impatti Attesi e Benefici

-   **Deploy Semplificato e Gratuito**: GitHub Pages offre una soluzione di hosting gratuita e integrata con il repository.
-   **Limitazioni Funzionali**: Sarà necessario rinunciare a funzionalità server-side dinamiche. Le parti del backend dovranno essere migrate a soluzioni alternative (es. Serverless Functions) se necessarie.

---

**Attendo la tua approvazione per procedere con questo nuovo piano.**
