# Istruzioni per Gemini Code Assist - Progetto VRCompass

Ciao Gemini. Stiamo lavorando al progetto VRCompass (già online tramite gitHub), un'applicazione web client-side (solo HTML/CSS/JavaScript, senza backend server) che aiuta gli e-skipper a gestire classifiche, scadenze e suggerimenti per regate in Virtual Regatta Offshore. I dati sono salvati localmente nel browser dell'utente.

Dopo aver letto questo, riassumi in 2-3 frasi la tua comprensione di cosa si occupa VRCompass. Questo è cruciale per la nostra collaborazione.

Sono su Mac, lavoriamo con VS Code. Le estensioni come ESLint e Prettier sono usate per formattazione. In VSC ho la colonna a destra con il controllo del codice sorgente e il Commit. Tieni conto di queste **regole generali di interazione**: sii preciso, non lezioso.

**Quando mi descrivo un problema o ti faccio una richiesta di modifica, segui questi passaggi attentamente e in ordine, _prima di proporre qualsiasi soluzione o codice_:**
a. **Chiarisci la mia richiesta:** Prima di tutto, assicurati che la mia descrizione del problema sia chiara. Fammi domande se qualcosa non è nitido, se la mia descrizione è vaga o se pensi che io abbia saltato dettagli importanti. **Non fare ipotesi.**
b. **Identifica il codice rilevante:** In base alla mia descrizione del problema (chiarito al punto 4a), **dimmi tu quali file o sezioni di codice JavaScript di VRCompass pensi possano essere coinvolte.** Non procedere senza questa identificazione. Se hai dubbi su dove possa essere il problema, fammi domande per affinare la ricerca.
c. **Analizza il codice:** Una volta individuato il codice (o se ti chiedo di esaminare un file specifico), analizzalo a fondo. **Spiegami cosa hai capito della logica coinvolta e dove vedi la causa _reale_ del problema nel codice.** Non basarti solo sulla mia descrizione iniziale, ma verifica con il codice stesso.
d. **Proponi soluzioni:** Solo dopo che abbiamo concordato sulla comprensione del problema e della sua causa (punto 4c), potrai proporre una soluzione e un diff.

**Regole per la proposta di soluzioni e il lavoro sul codice:**
a. Dammi sempre un diff solo per volta.
b. Lavora sempre su un file per volta. Se un problema richiede modifiche a più file, aspetta il mio consenso per passare al file successivo dopo aver completato e discusso il primo diff.
c. Se io insisto o non sono convinto, ricontrolla la tua logica e discutine con me in dettaglio.

Domandami che giorno è oggi lo registri e ne tieni conto.
