document.addEventListener('DOMContentLoaded', () => {
    // --- Elementi DOM ---
    // Navigazione
    const mainNavButtons = document.querySelectorAll('nav > .nav-button'); // Seleziona solo i .nav-button diretti figli di nav
    const viewSections = document.querySelectorAll('.view-section');

    // Dashboard
    const dashboardView = document.getElementById('dashboard-view');
    const nomeBarcaInput = document.getElementById('nome-barca');
    const classificaVsrAttualeInput = document.getElementById('classifica-vsr-attuale');

    // Gestione Crediti (ex Calcolatrice Gara)
    const gestioneCreditiView = document.getElementById('gestione-crediti-view'); // Rinominato da calcolatriceView
    const tabella1 = document.getElementById('tabella1');
    const tabella3Body = document.getElementById('tabella3').querySelector('tbody');
    // Elementi statici Tabella 2
    const outputCatEcon = document.getElementById('output-cat-econ');
    const inputBonusTotale = document.getElementById('input-bonus-totale');
    const outputSpesa = document.getElementById('output-spesa');
    const outputSpesaEffettiva = document.getElementById('output-spesa-effettiva');
    const outputPosRecupero = document.getElementById('output-pos-recupero');

    // Gestione Classifica VSR
    const classificaVsrView = document.getElementById('classifica-vsr-view');
    const formAggiungiGara = document.getElementById('form-aggiungi-gara');
    const dataGaraInput = document.getElementById('data-gara');
    const livelloGaraVsrStoricoSelect = document.getElementById('livello-gara-vsr-storico');
    const nomeRegataInput = document.getElementById('nome-regata');
    const classificaFinaleStoricoInput = document.getElementById('classifica-finale-storico');
    const puntiVsrCalcolatiInput = document.getElementById('punti-vsr-calcolati');
    const classificaVsrtbody = document.getElementById('classifica-vsr-tbody');
    const tabellaClassificaVsr = document.getElementById('tabella-classifica-vsr'); // Mantieni questo se usato altrove
    const nomeBarcaDisplay = document.getElementById('nome-barca-display');
    const classificaVsrAttualeDisplay = document.getElementById('classifica-vsr-attuale-display');

    // Pulsanti Filtro Storico Gare
    const btnMostraTutteGare = document.getElementById('btn-mostra-tutte-gare');
    const btnMostraGareValide = document.getElementById('btn-mostra-gare-valide');
    const btnStoricoHC = document.getElementById('btn-storico-hc');
    const btnStoricoLiv1 = document.getElementById('btn-storico-liv1');
    const btnStoricoLiv2 = document.getElementById('btn-storico-liv2');
    const btnStoricoLiv3 = document.getElementById('btn-storico-liv3');

    // Nuovi elementi per Caricamento Elenco Regate
    const btnCaricaElencoRegate = document.getElementById('btn-carica-elenco-regate');
    const sezioneElencoRegateSuggerite = document.getElementById('sezione-elenco-regate-suggerite');
    const infoAggiornamentoElencoRegate = document.getElementById('info-aggiornamento-elenco-regate');
    const tbodyElencoRegateSuggerite = document.getElementById('tbody-elenco-regate-suggerite');

    // Titoli dinamici
    const titoloFormGara = document.getElementById('titolo-form-gara');

    // Dashboard - Gestione Dati
    const btnEsportaDati = document.getElementById('btn-esporta-dati');
    const fileImportaDatiInput = document.getElementById('file-importa-dati');
    // Nuovo per Importazione Regate Suggerite
    const fileImportaRegateSuggeriteInput = document.getElementById('file-importa-regate-suggerite');
    const modaleAvvisoCaricamentoRegate = document.getElementById('modale-avviso-caricamento-regate');
    const btnChiudiModaleAvvisoRegate = document.getElementById('btn-chiudi-modale-avviso-regate');
    const btnConfermaCaricamentoRegate = document.getElementById('btn-conferma-caricamento-regate');
    const btnAnnullaCaricamentoRegate = document.getElementById('btn-annulla-caricamento-regate');
    const dataAggiornamentoFileRegateSpan = document.getElementById('data-aggiornamento-file-regate');
    let fileSelezionatoPerRegateSuggerite = null; // Per tenere traccia del file selezionato

    // Analisi
    const analisiView = document.getElementById('analisi-view');
    // Elementi DOM per Panoramica Slot VSR
    const hcOccupati = document.getElementById('hc-occupati');
    const hcPuntiCategoria = document.getElementById('hc-punti-categoria'); // Nuovo
    const hcPuntiAttuali = document.getElementById('hc-punti-attuali');
    const hcGareSlot = document.getElementById('hc-gare-slot');
    const hcProgressBar = document.getElementById('hc-progress-bar');
    // Nuovi elementi per la barra dei punti HC
    const hcStackedPointsBarContainer = document.getElementById('hc-stacked-points-bar-container');
    const hcPointsBar100 = document.getElementById('hc-points-bar-100');
    const hcPointsBar50 = document.getElementById('hc-points-bar-50');
    const hcPointsBarEmpty = document.getElementById('hc-points-bar-empty');

    const liv1Occupati = document.getElementById('liv1-occupati');
    const liv1PuntiCategoria = document.getElementById('liv1-punti-categoria'); // Nuovo
    const liv1MinPunti = document.getElementById('liv1-min-punti');
    const liv1GareSlot = document.getElementById('liv1-gare-slot');
    const liv1ProgressBar = document.getElementById('liv1-progress-bar');
    // Nuovi elementi per la barra dei punti Liv1
    const liv1StackedPointsBarContainer = document.getElementById('liv1-stacked-points-bar-container');
    const liv1PointsBar100 = document.getElementById('liv1-points-bar-100');
    const liv1PointsBar50 = document.getElementById('liv1-points-bar-50');
    const liv1PointsBarEmpty = document.getElementById('liv1-points-bar-empty');

    const liv2Occupati = document.getElementById('liv2-occupati');
    const liv2PuntiCategoria = document.getElementById('liv2-punti-categoria'); // Nuovo
    const liv2MinPunti = document.getElementById('liv2-min-punti');
    const liv2GareSlot = document.getElementById('liv2-gare-slot');
    const liv2ProgressBar = document.getElementById('liv2-progress-bar');
    // Nuovi elementi per la barra dei punti Liv2
    const liv2StackedPointsBarContainer = document.getElementById('liv2-stacked-points-bar-container');
    const liv2PointsBar100 = document.getElementById('liv2-points-bar-100');
    const liv2PointsBar50 = document.getElementById('liv2-points-bar-50');
    const liv2PointsBarEmpty = document.getElementById('liv2-points-bar-empty');

    const liv3Occupati = document.getElementById('liv3-occupati');
    const liv3PuntiCategoria = document.getElementById('liv3-punti-categoria'); // Nuovo
    const liv3MinPunti = document.getElementById('liv3-min-punti');
    const liv3GareSlot = document.getElementById('liv3-gare-slot');
    const liv3ProgressBar = document.getElementById('liv3-progress-bar');
    // Nuovi elementi per la barra dei punti Liv3
    const liv3StackedPointsBarContainer = document.getElementById('liv3-stacked-points-bar-container');
    const liv3PointsBar100 = document.getElementById('liv3-points-bar-100');
    const liv3PointsBar50 = document.getElementById('liv3-points-bar-50');
    const liv3PointsBarEmpty = document.getElementById('liv3-points-bar-empty');

    const listaSuggerimentiSlot = document.getElementById('lista-suggerimenti-slot');
    // Elementi DOM per Monitoraggio Scadenze (ora gestiti dalla sezione Strategia ma gli ID sono gli stessi)
    const listaGareDimezzamento = document.getElementById('lista-gare-dimezzamento');
    const listaGareScadenza = document.getElementById('lista-gare-scadenza');

    // Strategia
    const strategiaView = document.getElementById('strategia-view');
    const listaSuggerimentiStrategiciSlot = document.getElementById('lista-suggerimenti-strategici-slot');

    // Grafico Radar Dashboard
    const canvasGraficoRadar = document.getElementById('graficoRadarSaluteSlot');
    let graficoRadarIstanza = null; // Per tenere traccia dell'istanza del grafico

    // Grafico Torta Strategia (Spostato)
    const canvasGraficoTorta = document.getElementById('graficoTortaComposizioneVSR'); // L'ID del canvas rimane lo stesso
    let graficoTortaIstanza = null; // Per tenere traccia dell'istanza del grafico a torta

    // --- Dati Premi (sostituisce la tabella HTML nascosta) ---
    const tabellaPremiData = {
        "cat1": { "1": 8600, "2": 6518, "3": 5542, "4": 4711, "5": 4146, "6": 3731, "7": 3411, "8": 3159, "9": 2952, "10": 2778, "11": 2629, "12": 2500, "13": 2387, "14": 2287, "15": 2197, "16": 2116, "17": 2042, "18": 1975, "19": 1913, "20": 1856, "21": 1803, "22": 1754, "23": 1707, "24": 1664, "25": 1623 },
        "cat2": { "1": 7150, "2": 5419, "3": 4607, "4": 3916, "5": 3446, "6": 3099, "7": 2834, "8": 2624, "9": 2452, "10": 2308, "11": 2184, "12": 2077, "13": 1983, "14": 1900, "15": 1825, "16": 1758, "17": 1696, "18": 1641, "19": 1590, "20": 1542, "21": 1498, "22": 1457, "23": 1418, "24": 1382, "25": 1348 },
        "cat3": { "1": 5700, "2": 4320, "3": 3673, "4": 3122, "5": 2747, "6": 2472, "7": 2260, "8": 2092, "9": 1955, "10": 1840, "11": 1741, "12": 1656, "13": 1581, "14": 1515, "15": 1455, "16": 1401, "17": 1352, "18": 1308, "19": 1267, "20": 1229, "21": 1194, "22": 1161, "23": 1130, "24": 1101, "25": 1074 },
        "cat4": { "1": 4300, "2": 3259, "3": 2771, "4": 2355, "5": 2073, "6": 1865, "7": 1705, "8": 1579, "9": 1474, "10": 1387, "11": 1312, "12": 1249, "13": 1192, "14": 1143, "15": 1098, "16": 1057, "17": 1019, "18": 985, "19": 954, "20": 926, "21": 900, "22": 875, "23": 851, "24": 829, "25": 809 },
        "cat5": { "1": 2850, "2": 2160, "3": 1837, "4": 1561, "5": 1373, "6": 1235, "7": 1130, "8": 1046, "9": 977, "10": 919, "11": 869, "12": 827, "13": 789, "14": 757, "15": 727, "16": 699, "17": 675, "18": 652, "19": 632, "20": 613, "21": 596, "22": 580, "23": 564, "24": 549, "25": 536 },
        "cat6": { "1": 1425, "2": 1080, "3": 918, "4": 781, "5": 686, "6": 618, "7": 565, "8": 523, "9": 488, "10": 460, "11": 435, "12": 414, "13": 395, "14": 379, "15": 364, "16": 350, "17": 338, "18": 326, "19": 316, "20": 307, "21": 298, "22": 290, "23": 282, "24": 275, "25": 268 }
    };

    // --- Stato Applicazione ---
    let categoriaSelezionata = null;
    let attrezzatureSelezionate = {};
    let bonusBase = 0;
    let spesaAttrezzature = 0;
    let bonusExtra = 0;
    let livelloGara = null; // Manterrà il valore numerico del livello gara (es. 15000, 10000) or null
    let classificaFinale = 0; // Stato per la classifica finale inserita o calcolata
    let classificaFinaleModificataManualmente = false;
    let vistaStoricoAttuale = 'valide';
    let idGaraInModifica = null; // Per tracciare la gara in modifica

    // Mappa per i livelli VSR della sezione Storico
    const livelliVsrStoricoMap = {
        "0": { testo: "Seleziona Livello VSR", valoreNumerico: null, tipo: "N/D" },
        "HC": { testo: "Fuori Categoria", valoreNumerico: 15000, tipo: "HC" },
        "LIV1": { testo: "Livello 1", valoreNumerico: 10000, tipo: "LIV1" },
        "LIV2": { testo: "Livello 2", valoreNumerico: 5000, tipo: "LIV2" },
        "LIV3": { testo: "Livello 3", valoreNumerico: 3000, tipo: "LIV3" }
    };

    // Costante per i limiti delle gare per categoria VSR *per fascia temporale*
    // Il numero totale di slot per categoria è il valore qui * 2
    const LIMITI_GARE_PER_CATEGORIA = {
        "HC": 1,     // 1 gara per fascia temporale (totale 2)
        "LIV1": 3,    // 3 gare per fascia temporale (totale 6)
        "LIV2": 6,    // 6 gare per fascia temporale (totale 12)
        "LIV3": 10   // 10 gare per fascia temporale (totale 20)
    };

    // Variabili per il Grafico a Torta accessibili dalla callback del tooltip
    let potenzialePuntiPerGraficoTorta = {};
    let totalePotenzialePuntiPerGraficoTorta = 1; // Default a 1 per evitare div by zero

    // URL del file JSON con l'elenco delle regate
    const URL_ELENCO_REGATE = 'https://raw.githubusercontent.com/Mobiawien/VRCompass/main/elenco_regate.json';

    // Mappa per tradurre il testo della label del grafico al tipoGara (usato nel tooltip)
    const mappaTestoLabelGraficoATipoGara = {};
    for (const key in livelliVsrStoricoMap) {
        if (key !== "0" && livelliVsrStoricoMap[key].testo && livelliVsrStoricoMap[key].tipo && livelliVsrStoricoMap[key].valoreNumerico !== null) {
            // Usiamo il testo che viene effettivamente usato nelle label del grafico a torta
            mappaTestoLabelGraficoATipoGara[livelliVsrStoricoMap[key].testo] = livelliVsrStoricoMap[key].tipo;
        }
    }


    // Soglie per considerare uno slot "debole" (percentuale del punteggio massimo della categoria)
    // Spostata qui per essere accessibile da più funzioni
    const SOGLIA_DEBOLEZZA = {
        "15000": 0.50, // HC debole se < 50% del max (es. < 7500 pts)
        "10000": 0.40, // Liv1 debole se < 40% del max (es. < 4000 pts)
        "5000": 0.30,  // Liv2 debole se < 30% del max (es. < 1500 pts)
        "3000": 0.25   // Liv3 debole se < 25% del max (es. < 750 pts)
    };

    // Riferimenti agli elementi della Tabella 3 per aggiornamenti dinamici
    let inputClassificaTab3Ref = null;
    let cellaCreditiTab3Ref = null;
    let cellaNettoTab3Ref = null;
    let cellaPuntiTab3Ref = null;

    // --- Funzioni Helper Globali per Calcoli VSR ---
    // Spostate qui per essere accessibile da più funzioni
    function calcolaPuntiPerClassifica(livelloValoreNumerico, classifica) {
        if (!livelloValoreNumerico || classifica <= 0) {
            return 0;
        }
        return Math.round(livelloValoreNumerico / Math.pow(classifica, 0.125));
    }

    function calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiVsrTarget) {
        if (!livelloValoreNumerico || puntiVsrTarget <= 0) {
            return null;
        }
        if (puntiVsrTarget >= livelloValoreNumerico) {
            return 1;
        }
        const rapporto = livelloValoreNumerico / puntiVsrTarget;
        const classificaCalcolata = Math.pow(rapporto, 8);
        return Math.max(1, Math.floor(classificaCalcolata));
    }




    // --- Funzioni Helper ---
    function formatNumber(num, decimalPlaces = 0) {
        if (num === null || num === undefined || isNaN(num)) {
            return 'N/A';
        }
        if (decimalPlaces === 0) {
            // Formattazione manuale per numeri interi per usare il punto come separatore delle migliaia
            const numStr = Math.round(num).toString();
            const parts = [];
            let i = numStr.length;
            while (i > 0) {
                parts.unshift(numStr.substring(Math.max(0, i - 3), i));
                i -= 3;
            }
            return parts.join('.');
        } else {
            // Per i numeri con decimali, continuiamo a usare toLocaleString.
            // Puoi scegliere 'it-IT' o 'de-DE' o un altro locale che preferisci per i decimali.
            // Nota: questo potrebbe ancora dare un separatore migliaia diverso dal punto per i decimali.
            return num.toLocaleString('it-IT', { // o 'de-DE'
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
        }
    }

    function calcolaMesiTrascorsi(dataGaraString) {
        const dataGara = new Date(dataGaraString);
        const oggi = new Date();
        dataGara.setHours(0, 0, 0, 0);
        oggi.setHours(0, 0, 0, 0);
        let mesi;
        mesi = (oggi.getFullYear() - dataGara.getFullYear()) * 12;
        mesi -= dataGara.getMonth();
        mesi += oggi.getMonth();
        if (oggi.getDate() < dataGara.getDate()) {
            mesi--;
        }
        return mesi < 0 ? 0 : mesi;
    }

    function calcolaGiorniTraDate(data1, data2) {
        const unGiorno = 24 * 60 * 60 * 1000; // Millisecondi in un giorno
        const primaData = new Date(data1);
        const secondaData = new Date(data2);
        primaData.setHours(0,0,0,0); // Normalizza per evitare problemi con orari
        secondaData.setHours(0,0,0,0); // Normalizza
        return Math.round((secondaData - primaData) / unGiorno); // Modificato per dare giorni rimanenti (può essere negativo)
    }
    // --- Funzioni di Navigazione e Inizializzazione ---
    function handleNavClick(event) {
        if (!event.currentTarget || !event.currentTarget.id) {
             console.error("handleNavClick: currentTarget o il suo ID non sono validi!", event.currentTarget);
             return;
        }
        const targetId = event.currentTarget.id.replace('btn-show-', '') + '-view';
        viewSections.forEach(section => section.style.display = 'none');

        // Rimuovi 'active' solo dai pulsanti di navigazione principale
        mainNavButtons.forEach(button => {
                button.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            // Se la sezione attivata è la classifica VSR, reimposta la vista a 'valide'
            if (targetId === 'classifica-vsr-view') {
                vistaStoricoAttuale = 'valide';
                if (btnMostraGareValide) btnMostraGareValide.classList.add('active');
                if (btnMostraTutteGare) btnMostraTutteGare.classList.remove('active');
                // Disattiva anche i nuovi pulsanti di filtro per livello
                if (btnStoricoHC) btnStoricoHC.classList.remove('active');
                if (btnStoricoLiv1) btnStoricoLiv1.classList.remove('active');
                if (btnStoricoLiv2) btnStoricoLiv2.classList.remove('active');
                if (btnStoricoLiv3) btnStoricoLiv3.classList.remove('active');
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
                // Nascondi il form di aggiunta gara quando si è in vista 'valide'
                if (formAggiungiGara) {
                    formAggiungiGara.style.display = 'none';
                }
                // Aggiorna i titoli per la vista 'valide'
                if (titoloFormGara) titoloFormGara.style.display = 'none'; // Nascondi titolo form
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) {
                    headerAzioni.style.display = 'none';
                }
                aggiornaTabellaGare(); // Assicura che la tabella si aggiorni con la vista 'valide'
            } else if (targetId === 'analisi-view') {
                aggiornaSezioneAnalisi(); // Aggiorna i dati della sezione analisi quando viene visualizzata
            } else if (targetId === 'strategia-view') {
                aggiornaSezioneStrategia(); // Aggiorna i dati della sezione strategia quando viene visualizzata
                // Aggiorna il grafico a torta quando si passa alla sezione Strategia
                aggiornaGraficoTortaStatoStrategia();
            } else if (targetId === 'gestione-crediti-view') {
                // Se ci fossero azioni specifiche da fare quando si entra in gestione-crediti-view
            }
        }
        event.currentTarget.classList.add('active');
    }

    function init() {
        const initialButton = document.getElementById('btn-show-dashboard');
        if (initialButton) {
            handleNavClick({ target: initialButton, currentTarget: initialButton });
        }
        caricaDatiDashboard();
        aggiornaPunteggioVsrTotale();
        aggiornaInfoClassificaView();
        aggiornaTabella2();
        aggiornaTabella3();
        setupCalcolatriceListeners();
        if (btnMostraTutteGare && btnMostraGareValide && btnStoricoHC && btnStoricoLiv1 && btnStoricoLiv2 && btnStoricoLiv3) {
            setupFiltriStoricoListeners();
        }
        setupClassificaListeners();
        setupDashboardListeners();
        if (btnEsportaDati) btnEsportaDati.addEventListener('click', esportaDati);
        if (fileImportaDatiInput) fileImportaDatiInput.addEventListener('change', importaDati);
        // Nuovo Listener per importazione regate suggerite
        if (fileImportaRegateSuggeriteInput) fileImportaRegateSuggeriteInput.addEventListener('change', preparaImportazioneRegateSuggerite);
        setupModaleAvvisoRegateListeners();
        // Nuovo listener per il pulsante "Carica da Elenco Regate"
        if (btnCaricaElencoRegate) {
            btnCaricaElencoRegate.addEventListener('click', gestisciCaricamentoElencoRegate);
        }

        aggiornaSezioneAnalisi(); // Chiamata iniziale per popolare i dati di analisi
        aggiornaSezioneStrategia(); // Chiamata iniziale per popolare i dati di strategia
        aggiornaGraficoRadarSaluteSlot(); // Chiamata iniziale per il grafico radar
    }

    // --- Funzioni Dashboard ---
    function setupDashboardListeners() {
        if (nomeBarcaInput) nomeBarcaInput.addEventListener('input', () => { salvaDatiDashboard(); aggiornaInfoClassificaView(); });
    }

    function caricaDatiDashboard() {
        if (nomeBarcaInput) nomeBarcaInput.value = localStorage.getItem('nomeBarca') || '';
        // La riga per nettoCreditiAttualeInput è stata rimossa
    }

    function salvaDatiDashboard() {
        if (nomeBarcaInput) localStorage.setItem('nomeBarca', nomeBarcaInput.value);
        // Il salvataggio di nettoCreditiAttuale è gestito dagli event listener su nettoCreditiAttualeInput
    }

    function aggiornaInfoClassificaView() {
        const nomeBarca = localStorage.getItem('nomeBarca') || 'N/D';
        const classificaVsrRaw = localStorage.getItem('classificaVsrAttuale') || '0';
        const classificaVsrNum = parseFloat(classificaVsrRaw) || 0;

        if (nomeBarcaDisplay && classificaVsrAttualeDisplay) {
            nomeBarcaDisplay.textContent = nomeBarca;
            classificaVsrAttualeDisplay.textContent = formatNumber(classificaVsrNum, 0);
        }
        // Aggiorna anche lo span nella dashboard per il VSR
        if (classificaVsrAttualeInput) classificaVsrAttualeInput.textContent = formatNumber(classificaVsrNum, 0);
    }

    // --- Funzioni Calcolatrice Gara ---
    function setupCalcolatriceListeners() {
        tabella1.querySelectorAll('th.categoria-cell').forEach(th => {
            th.addEventListener('click', () => selezionaCategoria(th.dataset.categoria));
        });
        tabella1.querySelectorAll('td.attrezzatura-cell').forEach(td => {
            td.addEventListener('click', () => toggleAttrezzatura(td));
        });
        if (inputBonusTotale) {
            inputBonusTotale.addEventListener('input', handleBonusInputChange);
        }
    }

    function selezionaCategoria(cat) {
        categoriaSelezionata = cat;
        attrezzatureSelezionate = {};
        spesaAttrezzature = 0;
        classificaFinaleModificataManualmente = false;
        classificaFinale = 0;
        livelloGara = null;
        tabella1.querySelectorAll('td.attrezzatura-cell.selected').forEach(td => td.classList.remove('selected'));
        tabella1.querySelectorAll('td.selected-name').forEach(td => td.classList.remove('selected-name'));
        bonusExtra = 0;
        tabella1.querySelectorAll('th.categoria-cell').forEach(th => th.classList.remove('selected-category'));
        const headerCliccato = tabella1.querySelector(`th.categoria-cell[data-categoria="${cat}"]`);
        if (headerCliccato) headerCliccato.classList.add('selected-category');
        const bonusCell = tabella1.querySelector(`.bonus-row td[data-categoria="${cat}"]`);
        bonusBase = bonusCell ? parseInt(bonusCell.textContent) : 0;
        if (inputBonusTotale) {
            inputBonusTotale.value = bonusBase;
            inputBonusTotale.title = `Bonus base: ${bonusBase}`;
        }
        ricalcolaSpesaAttrezzature();
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function toggleAttrezzatura(cell) {
        if (!categoriaSelezionata) {
            alert("Seleziona prima una categoria economica!");
            return;
        }
        const nomeAttrezzatura = cell.parentNode.cells[0].textContent;
        const costo = parseInt(cell.textContent);
        const catCorrente = cell.dataset.categoria;

        classificaFinaleModificataManualmente = false;
        if (catCorrente !== categoriaSelezionata) return;
        attrezzatureSelezionate[categoriaSelezionata] = attrezzatureSelezionate[categoriaSelezionata] || {};
        attrezzatureSelezionate[categoriaSelezionata].items = attrezzatureSelezionate[categoriaSelezionata].items || {};
        if (attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura]) {
            delete attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura];
            cell.classList.remove('selected');
            cell.parentNode.cells[0].classList.remove('selected-name');
        } else {
            attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura] = costo;
            cell.classList.add('selected');
            cell.parentNode.cells[0].classList.add('selected-name');
        }
        ricalcolaSpesaAttrezzature();
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function ricalcolaSpesaAttrezzature() {
        spesaAttrezzature = 0;
        if (categoriaSelezionata && attrezzatureSelezionate[categoriaSelezionata]?.items) {
            for (const nome in attrezzatureSelezionate[categoriaSelezionata].items) {
                spesaAttrezzature += attrezzatureSelezionate[categoriaSelezionata].items[nome];
            }
        }
        if (categoriaSelezionata) {
             attrezzatureSelezionate[categoriaSelezionata] = attrezzatureSelezionate[categoriaSelezionata] || {};
             attrezzatureSelezionate[categoriaSelezionata].costoTotale = spesaAttrezzature;
        }
    }

    function handleBonusInputChange(e) {
        const nuovoBonusTotale = parseInt(e.target.value) || 0;
        bonusExtra = Math.max(0, nuovoBonusTotale - bonusBase);
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function aggiornaTabella2() {
        if (!categoriaSelezionata) {
            if(outputCatEcon) outputCatEcon.textContent = 'N/D';
            if(inputBonusTotale) inputBonusTotale.value = 0;
            if(outputSpesa) outputSpesa.textContent = 'N/D';
            if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = 'N/D';
            if(outputPosRecupero) outputPosRecupero.textContent = 'N/D';
            bonusExtra = 0;
            return;
        }
        const bonusTotaleCorrente = bonusBase + bonusExtra;
        const spesaEffettiva = Math.max(0, spesaAttrezzature - bonusTotaleCorrente);
        const posRecuperoNumerica = calcolaPosizioneRecupero(spesaEffettiva);

        if(outputCatEcon) outputCatEcon.textContent = categoriaSelezionata;
        if(inputBonusTotale) {
             inputBonusTotale.title = `Bonus base: ${bonusBase}`;
        }
        if(outputSpesa) outputSpesa.textContent = formatNumber(spesaAttrezzature, 0);
        if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = formatNumber(spesaEffettiva, 0);

        if(outputPosRecupero) {
            if (spesaEffettiva <= 0 && posRecuperoNumerica !== null) {
                outputPosRecupero.textContent = formatNumber(posRecuperoNumerica, 0);
                 outputPosRecupero.classList.remove('important-result');
                 outputPosRecupero.classList.add('profit-result');
            } else {
                outputPosRecupero.textContent = posRecuperoNumerica !== null && posRecuperoNumerica > 0 ? formatNumber(posRecuperoNumerica, 0) : (posRecuperoNumerica === 0 ? "0" : "N/D");
                outputPosRecupero.classList.remove('profit-result');
                if (posRecuperoNumerica !== null && posRecuperoNumerica > 0) {
                    outputPosRecupero.classList.add('important-result');
                } else {
                    outputPosRecupero.classList.remove('important-result');
                }
            }
        }
        if (!classificaFinaleModificataManualmente) {
            classificaFinale = (posRecuperoNumerica !== null && posRecuperoNumerica > 0) ? posRecuperoNumerica : 0;
        }
    }

    function ricalcolaRisultatiTabella3() {
        if (!categoriaSelezionata || !cellaCreditiTab3Ref || !cellaNettoTab3Ref || !cellaPuntiTab3Ref) {
            if (cellaCreditiTab3Ref) cellaCreditiTab3Ref.textContent = 'N/A';
            if (cellaNettoTab3Ref) cellaNettoTab3Ref.textContent = 'N/A';
            if (cellaPuntiTab3Ref) cellaPuntiTab3Ref.textContent = 'N/A';
            return;
        }

        const spesaEffettiva = Math.max(0, spesaAttrezzature - (bonusBase + bonusExtra));

        let creditiVintiCalc = null;
        const premiCatData = tabellaPremiData[categoriaSelezionata];
        if (premiCatData && typeof premiCatData["1"] !== 'undefined' && classificaFinale > 0) {
            const premMax = premiCatData["1"];
            creditiVintiCalc = premMax / Math.pow(classificaFinale, 0.4);
        }

        const nettoCreditiCalc = creditiVintiCalc !== null ? creditiVintiCalc - spesaEffettiva : null;

        let puntiVSRCalc = null;
        if (livelloGara !== null && livelloGara > 0 && classificaFinale > 0) {
            puntiVSRCalc = livelloGara / Math.pow(classificaFinale, 0.125);
        }

        cellaCreditiTab3Ref.textContent = formatNumber(creditiVintiCalc, 0);
        cellaNettoTab3Ref.textContent = formatNumber(nettoCreditiCalc, 0);
        cellaPuntiTab3Ref.textContent = formatNumber(puntiVSRCalc, 0);
    }

    function aggiornaTabella3() {
        tabella3Body.innerHTML = '';
        inputClassificaTab3Ref = null; cellaCreditiTab3Ref = null; cellaNettoTab3Ref = null; cellaPuntiTab3Ref = null;

        if (!categoriaSelezionata) return;

        const row = tabella3Body.insertRow();
        const cellaLivello = row.insertCell(0);
        const selectLivello = document.createElement('select');
        const opzioniLivelloGara = [
            { testo: "Seleziona", valore: "" }, // Modificato
            // Usiamo i valori stringa come nell'HTML per coerenza
            // { testo: "Vendée Globe FC", valore: "VGLOBE" }, // VGLOBE rimosso
            { testo: "Fuori Categoria", valore: "HC" },
            { testo: "Livello 1", valore: "LIV1" },
            { testo: "Livello 2", valore: "LIV2" },
            { testo: "Livello 3", valore: "LIV3" }
        ];

        opzioniLivelloGara.forEach(opzione => {
            const option = document.createElement('option');
            option.value = opzione.valore;
            option.textContent = opzione.testo;
            if (opzione.valore === "") {
                option.disabled = true;
                option.selected = livelloGara === null;
            } else if (livelliVsrStoricoMap[opzione.valore]) { // Verifica se il valore esiste nella mappa
                option.selected = livelloGara === livelliVsrStoricoMap[opzione.valore].valoreNumerico;
            } else {
                // Fallback se il valore non è nella mappa (non dovrebbe succedere con la nuova struttura)
                option.selected = false;
            }
            selectLivello.appendChild(option);
        });

        selectLivello.addEventListener('change', (e) => {
            const selectedKey = e.target.value;
            // Ottieni il valore numerico dalla mappa
            livelloGara = (selectedKey && livelliVsrStoricoMap[selectedKey]) ? livelliVsrStoricoMap[selectedKey].valoreNumerico : null;
            ricalcolaRisultatiTabella3();
        });
        cellaLivello.appendChild(selectLivello);

        const cellaClassifica = row.insertCell(1);
        inputClassificaTab3Ref = document.createElement('input');
        inputClassificaTab3Ref.type = 'number';
        inputClassificaTab3Ref.value = classificaFinale > 0 ? classificaFinale : '';
        inputClassificaTab3Ref.min = 1;
        inputClassificaTab3Ref.placeholder = "Pos.";
        inputClassificaTab3Ref.addEventListener('input', (e) => {
            classificaFinaleModificataManualmente = true;
            classificaFinale = parseInt(e.target.value) || 0;
            ricalcolaRisultatiTabella3();
        });
        cellaClassifica.appendChild(inputClassificaTab3Ref);

        cellaCreditiTab3Ref = row.insertCell(2);
        cellaCreditiTab3Ref.classList.add('calculated-result-cell');

        cellaNettoTab3Ref = row.insertCell(3);
        cellaNettoTab3Ref.classList.add('calculated-result-cell');

        cellaPuntiTab3Ref = row.insertCell(4);
        cellaPuntiTab3Ref.classList.add('calculated-result-cell');

        ricalcolaRisultatiTabella3();
    }

    function calcolaPosizioneRecupero(spesaEffettiva) {
        if (!categoriaSelezionata) return null;
        const premiCat = tabellaPremiData[categoriaSelezionata];
        if (!premiCat || typeof premiCat["1"] === 'undefined') {
            console.error(`Dati premi per il 1° posto non trovati per la categoria: ${categoriaSelezionata}`);
            return null;
        }
        const premMax = premiCat["1"];
        let posRec = 1000000;
        while (posRec > 0) {
            const creditiVintiStimati = premMax / Math.pow(posRec, 0.4);
            const nettoCreditiStimato = creditiVintiStimati - spesaEffettiva;
            if (Math.round(nettoCreditiStimato) >= 0) {
                return posRec;
            }
            posRec--;
        }
        return 0;
    }

    // --- Funzioni Gestione Classifica VSR ---
    function setupClassificaListeners() {
        formAggiungiGara.addEventListener('submit', handleSubmitGara); // Modificato per gestire aggiunta/modifica
        if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.readOnly = true;
        livelloGaraVsrStoricoSelect.addEventListener('change', calcolaEPopolaPuntiVSRStorico);
        classificaFinaleStoricoInput.addEventListener('input', calcolaEPopolaPuntiVSRStorico);
        classificaVsrtbody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) { // Corretta classe per il pulsante elimina
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) {
                    eliminaGara(idGara);
                }
            } else if (event.target.classList.contains('edit-btn')) { // Corretta classe per il pulsante modifica
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) {
                    popolaFormPerModifica(idGara);
                }
            }
        });
        const formInputs = [dataGaraInput, livelloGaraVsrStoricoSelect, nomeRegataInput, classificaFinaleStoricoInput];
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (vistaStoricoAttuale === 'valide' && btnMostraTutteGare) {
                    if (formAggiungiGara) { // Assicurati che il form sia visibile prima di cliccare
                        formAggiungiGara.style.display = 'block'; // o il suo display di default
                    }
                    btnMostraTutteGare.click();
                }
            });
        });
    }

    function rimuoviEvidenziazioneTutteLeRighe() {
        const righeEvidenziate = classificaVsrtbody.querySelectorAll('tr.riga-in-modifica');
        righeEvidenziate.forEach(riga => riga.classList.remove('riga-in-modifica'));
    }

    function setupFiltriStoricoListeners() {
        const tuttiIBottoniFiltro = [
            btnMostraGareValide, btnMostraTutteGare,
            btnStoricoHC, btnStoricoLiv1, btnStoricoLiv2, btnStoricoLiv3
        ];

        function impostaFiltro(nuovaVista, bottoneAttivo) {
            vistaStoricoAttuale = nuovaVista;

            tuttiIBottoniFiltro.forEach(btn => btn.classList.remove('active'));
            if (bottoneAttivo) bottoneAttivo.classList.add('active');

            rimuoviEvidenziazioneTutteLeRighe();
            if (formAggiungiGara) formAggiungiGara.reset();
            if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.value = '';
            idGaraInModifica = null;
            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) submitButton.textContent = 'Aggiungi Gara';


            if (nuovaVista === 'valide') {
                if (formAggiungiGara) formAggiungiGara.style.display = 'none';
                if (titoloFormGara) titoloFormGara.style.display = 'none';
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = 'none';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
            } else { // Per 'tutte' e per i filtri per livello
                if (formAggiungiGara) formAggiungiGara.style.display = 'block';
                if (titoloFormGara) {
                    titoloFormGara.style.display = 'block';
                    titoloFormGara.textContent = 'Aggiungi Risultato Regata'; // Titolo di default per aggiunta
                }
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = '';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
            }
            aggiornaTabellaGare();
        }

        if (btnMostraGareValide) {
            btnMostraGareValide.addEventListener('click', () => impostaFiltro('valide', btnMostraGareValide));
        }
        if (btnMostraTutteGare) {
            btnMostraTutteGare.addEventListener('click', () => impostaFiltro('tutte', btnMostraTutteGare));
        }
        if (btnStoricoHC) {
            btnStoricoHC.addEventListener('click', () => impostaFiltro('storico_hc', btnStoricoHC));
        }
        if (btnStoricoLiv1) {
            btnStoricoLiv1.addEventListener('click', () => impostaFiltro('storico_liv1', btnStoricoLiv1));
        }
        if (btnStoricoLiv2) {
            btnStoricoLiv2.addEventListener('click', () => impostaFiltro('storico_liv2', btnStoricoLiv2));
        }
        if (btnStoricoLiv3) {
            btnStoricoLiv3.addEventListener('click', () => impostaFiltro('storico_liv3', btnStoricoLiv3));
        }
    }

    function calcolaEPopolaPuntiVSRStorico() {
        const livelloSelezionatoValue = livelloGaraVsrStoricoSelect.value;
        const classifica = parseInt(classificaFinaleStoricoInput.value);
        if (livelloSelezionatoValue && livelloSelezionatoValue !== "0" && !isNaN(classifica) && classifica > 0) {
            const categoriaInfo = livelliVsrStoricoMap[livelloSelezionatoValue];
            if (categoriaInfo && categoriaInfo.valoreNumerico !== null) {
                const puntiVSRCalc = categoriaInfo.valoreNumerico / Math.pow(classifica, 0.125);
                puntiVsrCalcolatiInput.value = Math.round(puntiVSRCalc);
            } else {
                puntiVsrCalcolatiInput.value = '';
            }
        } else {
            puntiVsrCalcolatiInput.value = '';
        }
    }

    function popolaFormPerModifica(idGara) {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const garaDaModificare = gareSalvate.find(g => g.id === idGara);

        if (garaDaModificare) {
            // Se la vista non è 'valide', la impostiamo su 'tutte' per mostrare il form e la colonna azioni.
            // Se è già 'tutte' o un filtro per livello, non cambiamo la vistaStoricoAttuale qui,
            // ma ci assicuriamo che il form e le azioni siano visibili.
            if (vistaStoricoAttuale === 'valide') {
                // Passa a 'tutte' se eravamo in 'valide'
                vistaStoricoAttuale = 'tutte'; // o il filtro specifico della gara, ma 'tutte' è più semplice
                const tuttiIBottoniFiltro = [btnMostraGareValide, btnMostraTutteGare, btnStoricoHC, btnStoricoLiv1, btnStoricoLiv2, btnStoricoLiv3];
                tuttiIBottoniFiltro.forEach(btn => btn.classList.remove('active'));
                if (btnMostraTutteGare) btnMostraTutteGare.classList.add('active'); // Attiva 'Storico Regate'
            }
            // Assicura che form e azioni siano visibili se non siamo in 'valide'
            if (vistaStoricoAttuale !== 'valide') {
                // Non è necessario rimuovere 'active' dagli altri bottoni qui,
                // perché se siamo già in una vista 'tutte' o 'storico_X', il bottone corretto è già attivo.

                if (formAggiungiGara) formAggiungiGara.style.display = 'block';
                if (titoloFormGara) {
                    titoloFormGara.style.display = 'block';
                    // Il titolo verrà impostato a "Modifica Regata Esistente" più avanti
                }
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = '';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                aggiornaTabellaGare(); // Ricarica la tabella per assicurare che la riga sia visibile e le classi corrette
            }

            idGaraInModifica = idGara; // Imposta l'ID della gara in modifica

            rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione da altre righe
            // Trova e evidenzia la riga corrente
            const rigaDaEvidenziare = classificaVsrtbody.querySelector(`button.modifica-gara-btn[data-id="${idGara}"]`)?.closest('tr');
            if (rigaDaEvidenziare) {
                rigaDaEvidenziare.classList.add('riga-in-modifica');
            }

            dataGaraInput.value = garaDaModificare.data;
            livelloGaraVsrStoricoSelect.value = garaDaModificare.livello;
            nomeRegataInput.value = garaDaModificare.nome;
            classificaFinaleStoricoInput.value = garaDaModificare.classificaFinale;
            calcolaEPopolaPuntiVSRStorico();

            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Salva Modifiche';
                if (titoloFormGara) titoloFormGara.textContent = 'Modifica Regata Esistente'; // Testo modificato
            }

            // Scrolla la vista al form usando un timeout per dare tempo al DOM di stabilizzarsi
            setTimeout(() => {
                if(formAggiungiGara) formAggiungiGara.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150); // Ritardo leggermente aumentato, da testare

        } else {
            console.error("Gara non trovata per la modifica:", idGara);
            alert("Errore: gara non trovata per la modifica.");
        }
    }

    function handleSubmitGara(event) { // Rinominata da aggiungiGara
        event.preventDefault();
        const dataGara = dataGaraInput.value;
        const livelloGaraStoricoVal = livelloGaraVsrStoricoSelect.value;
        const nomeRegata = nomeRegataInput.value.trim();
        const classificaFinaleStorico = parseInt(classificaFinaleStoricoInput.value);
        const puntiVSR = parseFloat(puntiVsrCalcolatiInput.value);

        if (!dataGara || livelloGaraStoricoVal === "0" || !nomeRegata || isNaN(classificaFinaleStorico) || classificaFinaleStorico <= 0 || isNaN(puntiVSR)) {
            alert('Per favore, compila correttamente tutti i campi:\n- Data\n- Livello VSR\n- Nome Regata\n- Classifica Finale (>0)\nI Punti VSR verranno calcolati automaticamente.');
            return;
        }

        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];

        if (idGaraInModifica !== null) {
            // Modalità Modifica
            const index = gareSalvate.findIndex(g => g.id === idGaraInModifica);
            if (index !== -1) {
                gareSalvate[index] = {
                    ...gareSalvate[index], // Mantiene l'ID originale
                    data: dataGara,
                    livello: livelloGaraStoricoVal,
                    nome: nomeRegata,
                    classificaFinale: classificaFinaleStorico,
                    puntiVSR: puntiVSR
                };
            }
            idGaraInModifica = null; // Resetta l'ID dopo la modifica
            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Aggiungi Gara';
                if (titoloFormGara) titoloFormGara.textContent = 'Aggiungi Risultato Regata';
            }
        } else {
            // Modalità Aggiunta
            const nuovaGara = {
                id: Date.now(),
                data: dataGara,
                livello: livelloGaraStoricoVal,
                nome: nomeRegata,
                classificaFinale: classificaFinaleStorico,
                puntiVSR: puntiVSR
            };
            gareSalvate.push(nuovaGara);
        }

        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione dopo salvataggio/aggiunta
        aggiornaSezioneAnalisi(); // Aggiorna analisi dopo modifica/aggiunta
        aggiornaSezioneStrategia(); // Aggiorna la sezione Strategia (incluso Monitoraggio Scadenze)
        aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
        aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
        aggiornaPunteggioVsrTotale();
        formAggiungiGara.reset();
        puntiVsrCalcolatiInput.value = '';
        // Assicura che il titolo torni corretto se la vista è 'Mostra Tutte' e non si sta modificando
        if (vistaStoricoAttuale === 'tutte' && idGaraInModifica === null && titoloFormGara) {
            titoloFormGara.textContent = 'Aggiungi Risultato Regata';
        }
    }

    // Funzione helper centralizzata per selezionare le gare contributive
    function selezionaGareContributivePerClassifica(gareSalvateRaw) {
        const gareRecenti = []; // < 12 mesi
        const gareMenoRecenti = []; // 12 a < 24 mesi

        gareSalvateRaw.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let fattoreDecadimento = 0;
            if (mesiTrascorsi < 12) fattoreDecadimento = 1.0;
            else if (mesiTrascorsi < 24) fattoreDecadimento = 0.5;

            const infoLivello = livelliVsrStoricoMap[gara.livello];

            if (fattoreDecadimento > 0 && gara.puntiVSR > 0 && infoLivello) {
                const garaConPuntiEffettivi = {
                    ...gara,
                    puntiEffettivi: Math.round(gara.puntiVSR * fattoreDecadimento),
                    fattoreDecadimento: fattoreDecadimento,
                    mesiTrascorsi: mesiTrascorsi,
                    tipoGara: infoLivello.tipo
                };

                if (mesiTrascorsi < 12) {
                    gareRecenti.push(garaConPuntiEffettivi);
                } else { // 12 a < 24 mesi
                    gareMenoRecenti.push(garaConPuntiEffettivi);
                }
            }
        });

        // Inizializza gareRaggruppatePerTipo dinamicamente dai tipi validi in livelliVsrStoricoMap
        const gareRecentiRaggruppate = {};
        const gareMenoRecentiRaggruppate = {};
        Object.values(livelliVsrStoricoMap).filter(l => l.tipo !== "N/D").forEach(l => gareRecentiRaggruppate[l.tipo] = []);
        Object.values(livelliVsrStoricoMap).filter(l => l.tipo !== "N/D").forEach(l => gareMenoRecentiRaggruppate[l.tipo] = []);

        // Raggruppa gare recenti per tipoGara
        gareRecenti.forEach(gara => {
            if (gareRecentiRaggruppate.hasOwnProperty(gara.tipoGara)) {
                gareRecentiRaggruppate[gara.tipoGara].push(gara);
            } else {
                console.warn("Tipo gara non riconosciuto durante il raggruppamento (recenti):", gara.tipoGara, gara);
            }
        });

        // Raggruppa gare meno recenti per tipoGara
        gareMenoRecenti.forEach(gara => {
            if (gareMenoRecentiRaggruppate.hasOwnProperty(gara.tipoGara)) {
                gareMenoRecentiRaggruppate[gara.tipoGara].push(gara);
            } else {
                console.warn("Tipo gara non riconosciuto durante il raggruppamento (meno recenti):", gara.tipoGara, gara);
            }
        });

        const gareContributiveFinali = {};
        Object.values(livelliVsrStoricoMap).filter(l => l.tipo !== "N/D").forEach(l => gareContributiveFinali[l.tipo] = []);

        // Ordina e applica i limiti per ogni fascia temporale e tipo
        for (const tipo in LIMITI_GARE_PER_CATEGORIA) {
            if (LIMITI_GARE_PER_CATEGORIA.hasOwnProperty(tipo)) {
                const limite = LIMITI_GARE_PER_CATEGORIA[tipo]; // Limite *per fascia*

                // Seleziona le migliori gare recenti per questo tipo
                const miglioriRecenti = (gareRecentiRaggruppate[tipo] || []).sort((a, b) => b.puntiEffettivi - a.puntiEffettivi).slice(0, limite);

                // Seleziona le migliori gare meno recenti per questo tipo
                const miglioriMenoRecenti = (gareMenoRecentiRaggruppate[tipo] || []).sort((a, b) => b.puntiEffettivi - a.puntiEffettivi).slice(0, limite);

                gareContributiveFinali[tipo] = miglioriRecenti.concat(miglioriMenoRecenti); // Combina le gare selezionate
            }
        }

        // Ordina le gare finali per ogni tipo per punti effettivi (per visualizzazione e calcoli successivi)
        for (const tipo in gareContributiveFinali) {
             if (gareContributiveFinali.hasOwnProperty(tipo)) {
                 gareContributiveFinali[tipo].sort((a, b) => b.puntiEffettivi - a.puntiEffettivi);
             }
        }
        return gareContributiveFinali;
    }

    function getContributingGareIds() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) {
            return new Set();
        }

        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        const contributingIds = new Set();
        // Itera sui tipi di gara definiti in LIMITI_GARE_PER_CATEGORIA per garantire l'ordine
        for (const tipoGara in LIMITI_GARE_PER_CATEGORIA) {
             if (gareContributive.hasOwnProperty(tipoGara)) { // Assicurati che il tipo esista nel risultato
                gareContributive[tipoGara].forEach(gara => contributingIds.add(gara.id));
            }
        }
        return contributingIds;
    }

    function aggiornaTabellaGare() {
        let gareDaMostrare = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        classificaVsrtbody.innerHTML = '';
        let livelloPrecedentePerSeparatore = null;

        const headerAzioni = document.getElementById('header-colonna-azioni');

        if (tabellaClassificaVsr) {
            // La classe 'vista-tutte-attiva' e la visibilità di headerAzioni
            // sono ora gestite da setupFiltriStoricoListeners e popolaFormPerModifica
            if (vistaStoricoAttuale === 'valide') {
                tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
                if (headerAzioni) headerAzioni.style.display = 'none';
            } else { // 'tutte' o 'storico_hc', 'storico_liv1', etc.
                tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                if (headerAzioni) headerAzioni.style.display = ''; // Mostra
            }
        }

        let contributingGareIds = new Set();

        if (vistaStoricoAttuale === 'valide') {
            const gareContributivePerClassifica = selezionaGareContributivePerClassifica(gareDaMostrare);
            let gareFiltrateEOrdinate = [];
            // Ordine di visualizzazione desiderato per le categorie
            const ordineVisualizzazioneTipi = ["HC", "LIV1", "LIV2", "LIV3"];

            ordineVisualizzazioneTipi.forEach(tipoGara => {
                if (gareContributivePerClassifica.hasOwnProperty(tipoGara)) {
                    // Le gare sono già ordinate per puntiEffettivi e limitate dalla funzione helper
                    gareFiltrateEOrdinate = gareFiltrateEOrdinate.concat(gareContributivePerClassifica[tipoGara]);
                }
            });
            gareDaMostrare = gareFiltrateEOrdinate;
            contributingGareIds = getContributingGareIds(); // Necessario per la colorazione
        } else if (vistaStoricoAttuale === 'tutte') {
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        } else if (vistaStoricoAttuale.startsWith('storico_')) {
            const tipoFiltro = vistaStoricoAttuale.split('_')[1].toUpperCase(); // es. HC, LIV1
            gareDaMostrare = gareDaMostrare.filter(gara => {
                const infoLivello = livelliVsrStoricoMap[gara.livello];
                return infoLivello && infoLivello.tipo === tipoFiltro;
            });
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds(); // Necessario per la colorazione
        } else {
            // Fallback o caso non gestito, mostra tutto ordinato per data
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        }

        gareDaMostrare.forEach(gara => {
            const row = classificaVsrtbody.insertRow();

            // gara.livello è la chiave per livelliVsrStoricoMap (es. "HC", "LIV1")
            const infoLivelloGara = livelliVsrStoricoMap[gara.livello];
            const tipoGaraCorrente = infoLivelloGara ? infoLivelloGara.tipo : 'N/D';

            if (vistaStoricoAttuale === 'valide' && tipoGaraCorrente !== livelloPrecedentePerSeparatore) {
                if (livelloPrecedentePerSeparatore !== null) {
                    row.classList.add('nuovo-gruppo-livello');
                }
                livelloPrecedentePerSeparatore = tipoGaraCorrente;
            }

            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let statoPunti = "";
            let classeStato = "";
            let inPreavvisoTesto = "";

            if (mesiTrascorsi < 12) {
                statoPunti = "100%";
                classeStato = "stato-100";
                if (mesiTrascorsi >= 9) {
                    row.classList.add('in-preavviso');
                    inPreavvisoTesto = " (Preavviso)";
                }
            } else if (mesiTrascorsi < 24) {
                statoPunti = "50%";
                classeStato = "stato-50";
                if (mesiTrascorsi >= 21) {
                    row.classList.add('in-preavviso');
                    inPreavvisoTesto = " (Preavviso)";
                }
            } else {
                statoPunti = "Scaduta";
                classeStato = "stato-scaduta";
            }

            // Applica lo stato "scaduta" visivo se non contribuisce e siamo in una vista di tipo "storico"
            if (vistaStoricoAttuale !== 'valide' && classeStato !== "stato-scaduta" && contributingGareIds && !contributingGareIds.has(gara.id)) {
                classeStato = "stato-scaduta"; // Se non contribuisce ed è in vista 'tutte', la consideriamo "scaduta" ai fini visivi
                row.classList.remove('in-preavviso');
                inPreavvisoTesto = "";
            }
            row.classList.add(classeStato);

            const [year, month, day] = gara.data.split('-');
            const dataFormattata = `${day}/${month}/${year}`;
            row.insertCell(0).textContent = dataFormattata;

            row.insertCell(1).textContent = gara.nome;

            let testoLivello = infoLivelloGara ? infoLivelloGara.testo : gara.livello; // Usa il testo dalla mappa
            row.insertCell(2).textContent = testoLivello;
            row.insertCell(3).textContent = gara.classificaFinale;

            let puntiDaMostrare;
            let colorePunti = '';

            if (vistaStoricoAttuale === 'valide') {
                puntiDaMostrare = gara.puntiEffettivi;
                if (gara.fattoreDecadimento === 0.5 || puntiDaMostrare < 0) {
                     colorePunti = 'red';
                } else if (puntiDaMostrare >= 0) {
                     colorePunti = 'green';
                }
            } else { // vistaStoricoAttuale è una delle viste "storico"
                puntiDaMostrare = gara.puntiVSR; // Mostra i punti base in vista 'tutte'
                if (classeStato !== "stato-scaduta" && puntiDaMostrare >= 0) {
                    colorePunti = 'green';
                } else if (puntiDaMostrare < 0 && classeStato !== "stato-scaduta") { // Evita rosso se già "scaduta" visivamente
                    colorePunti = 'red';
                }
                // Se è 'stato-scaduta', non applichiamo colore verde/rosso ai punti base
            }

            const puntiFormatted = puntiDaMostrare >= 0 ? `+${formatNumber(Math.round(puntiDaMostrare), 0)}` : formatNumber(Math.round(puntiDaMostrare), 0);
            const cellPunti = row.insertCell(4);
            cellPunti.textContent = puntiFormatted;
            if (colorePunti) cellPunti.style.color = colorePunti;

            const cellaStatoPunti = row.insertCell(5);
            let testoStato = (vistaStoricoAttuale === 'valide' ? statoPunti : '') + inPreavvisoTesto.trim();
            if (vistaStoricoAttuale !== 'valide' && classeStato === 'stato-scaduta' && !contributingGareIds.has(gara.id)) {
                 testoStato = "Non Contribuisce"; // Aggiungi questa nota solo se non contribuisce e siamo in vista 'tutte'
            }
            cellaStatoPunti.textContent = testoStato;

            if (vistaStoricoAttuale !== 'valide') { // Mostra azioni per 'tutte' e per i filtri 'storico_X'
                const cellaAzioni = row.insertCell(6); // Crea la cella solo se necessario
                // la visibilità della colonna intera è gestita da 'headerAzioni.style.display'
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Elimina';
                deleteButton.classList.add('delete-btn'); // Usa la classe corretta per lo stile
                deleteButton.dataset.id = gara.id;
                cellaAzioni.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.textContent = 'Modifica';
                editButton.classList.add('edit-btn'); // Usa la classe corretta per lo stile
                // Aggiungi un piccolo margine se necessario tramite CSS o un'altra classe helper se preferisci
                // editButton.style.marginLeft = '5px'; // Esempio di margine inline
                editButton.dataset.id = gara.id;
                cellaAzioni.appendChild(editButton);
            } else {
                // Non creare la cellaAzioni se la vista è 'valide'
            }
        });
    }

    function eliminaGara(idGara) {
        if (!confirm("Sei sicuro di voler eliminare questa gara?")) return;
        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        gareSalvate = gareSalvate.filter(g => g.id !== idGara);
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        aggiornaPunteggioVsrTotale();
        aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
        aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
        aggiornaSezioneAnalisi(); // Aggiorna analisi dopo eliminazione
    }

    function aggiornaPunteggioVsrTotale() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) {
            if (classificaVsrAttualeInput) { // Ora è uno span
                classificaVsrAttualeInput.textContent = formatNumber(0, 0);
            }
            localStorage.setItem('classificaVsrAttuale', '0');
            aggiornaInfoClassificaView();
            aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta anche se non ci sono gare
            aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar anche se non ci sono gare
            return;
        }

        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        let punteggioFinaleTotale = 0;

        for (const tipoGara in gareContributive) {
            if (gareContributive.hasOwnProperty(tipoGara)) {
                // La funzione selezionaGareContributivePerClassifica ha già filtrato per validità, calcolato puntiEffettivi,
                // ordinato e preso il numero corretto di gare.
                // Quindi possiamo semplicemente sommare i puntiEffettivi delle gare restituite.
                gareContributive[tipoGara].forEach(gara => {
                    punteggioFinaleTotale += gara.puntiEffettivi;
                });
            }
        }
        const totaleArrotondato = Math.round(punteggioFinaleTotale);
        if (classificaVsrAttualeInput) { // Ora è uno span
            classificaVsrAttualeInput.textContent = formatNumber(totaleArrotondato, 0);
        }
        localStorage.setItem('classificaVsrAttuale', totaleArrotondato.toString());
        aggiornaInfoClassificaView();
    }

    // --- Funzioni Esportazione/Importazione Dati ---
    function esportaDati() {
        const datiDaEsportare = {
            nomeBarca: localStorage.getItem('nomeBarca') || '',
            classificaVsrAttuale: localStorage.getItem('classificaVsrAttuale') || '0', // Default a '0'
            gareSalvate: JSON.parse(localStorage.getItem('gareSalvate')) || []
        };

        const datiJson = JSON.stringify(datiDaEsportare, null, 2); // null, 2 per una formattazione leggibile
        const blob = new Blob([datiJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VRCompass_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Il file VRCompass_backup.json è pronto per essere scaricato. Segui le istruzioni del browser per salvarlo.'); // Messaggio modificato per chiarezza
    }

    function importaDati(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiImportati = JSON.parse(e.target.result);

                // Validazione semplice della struttura dei dati importati
                if (typeof datiImportati.nomeBarca !== 'undefined' &&
                    typeof datiImportati.classificaVsrAttuale !== 'undefined' &&
                    Array.isArray(datiImportati.gareSalvate)) {

                    localStorage.setItem('nomeBarca', datiImportati.nomeBarca);
                    localStorage.setItem('classificaVsrAttuale', datiImportati.classificaVsrAttuale);
                    localStorage.setItem('gareSalvate', JSON.stringify(datiImportati.gareSalvate));

                    // Ricarica i dati nella UI e aggiorna le viste
                    caricaDatiDashboard();
                    aggiornaInfoClassificaView();
                    aggiornaTabellaGare();
                    aggiornaPunteggioVsrTotale();
                    aggiornaSezioneStrategia(); // Aggiorna anche la strategia dopo importazione
                    aggiornaSezioneAnalisi(); // Aggiorna analisi dopo importazione
                    aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
                    aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
                    // Potrebbe essere necessario aggiornare anche la calcolatrice se i dati importati la influenzano
                    // o semplicemente resettarla
                    if (categoriaSelezionata) selezionaCategoria(categoriaSelezionata); // Resetta la calcolatrice

                    alert('Dati importati con successo!');
                } else {
                    alert('Errore: Il file selezionato non sembra essere un backup valido di VR Compass.'); // Messaggio aggiornato
                }
            } catch (error) {
                console.error("Errore durante l'importazione dei dati:", error);
                alert('Errore durante la lettura del file. Assicurati che sia un file JSON valido.');
            } finally {
                fileImportaDatiInput.value = ''; // Resetta l'input file per permettere di riselezionare lo stesso file
            }
        };
        reader.readAsText(file);
    }

    // --- Funzioni per Importazione Regate Suggerite ---
    function setupModaleAvvisoRegateListeners() {
        if (btnChiudiModaleAvvisoRegate) {
            btnChiudiModaleAvvisoRegate.addEventListener('click', () => {
                modaleAvvisoCaricamentoRegate.style.display = 'none';
                fileImportaRegateSuggeriteInput.value = ''; // Resetta l'input file
                fileSelezionatoPerRegateSuggerite = null;
            });
        }
        if (btnAnnullaCaricamentoRegate) {
            btnAnnullaCaricamentoRegate.addEventListener('click', () => {
                modaleAvvisoCaricamentoRegate.style.display = 'none';
                fileImportaRegateSuggeriteInput.value = ''; // Resetta l'input file
                fileSelezionatoPerRegateSuggerite = null;
            });
        }
        if (btnConfermaCaricamentoRegate) {
            btnConfermaCaricamentoRegate.addEventListener('click', importaRegateSuggeriteConfermate);
        }
    }

    function preparaImportazioneRegateSuggerite(event) {
        fileSelezionatoPerRegateSuggerite = event.target.files[0];
        if (!fileSelezionatoPerRegateSuggerite) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiLetti = JSON.parse(e.target.result);
                // Estrai la data di aggiornamento, se presente
                const dataAggiornamento = datiLetti.dataUltimoAggiornamento || "N/D";
                if (dataAggiornamentoFileRegateSpan) {
                    dataAggiornamentoFileRegateSpan.textContent = dataAggiornamento;
                }

                // Mostra il modale di avviso
                if (modaleAvvisoCaricamentoRegate) {
                    modaleAvvisoCaricamentoRegate.style.display = 'flex';
                }

            } catch (error) {
                console.error("Errore durante la lettura del file delle regate suggerite:", error);
                alert('Errore durante la lettura del file. Assicurati che sia un file JSON valido e contenga i dati attesi.');
                fileImportaRegateSuggeriteInput.value = ''; // Resetta l'input file
                fileSelezionatoPerRegateSuggerite = null;
            }
        };
        reader.readAsText(fileSelezionatoPerRegateSuggerite);
    }

    function importaRegateSuggeriteConfermate() {
        if (!fileSelezionatoPerRegateSuggerite) {
            alert("Nessun file selezionato per l'importazione.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiImportati = JSON.parse(e.target.result);
                // Sovrascrivi solo lo storico regate
                if (Array.isArray(datiImportati.gareSalvate)) {
                    localStorage.setItem('gareSalvate', JSON.stringify(datiImportati.gareSalvate));

                    // Aggiorna tutte le viste rilevanti
                    aggiornaTabellaGare();
                    aggiornaPunteggioVsrTotale(); // Questo aggiorna anche classificaVsrAttualeInput e infoClassificaView
                    aggiornaSezioneAnalisi();
                    aggiornaSezioneStrategia();
                    aggiornaGraficoTortaStatoStrategia();
                    aggiornaGraficoRadarSaluteSlot();

                    alert('Storico regate suggerite importato con successo! Ricorda di personalizzarlo.');
                } else {
                    alert('Errore: Il file JSON non contiene un array "gareSalvate" valido.');
                }
            } catch (error) {
                console.error("Errore durante l'importazione confermata delle regate suggerite:", error);
                alert('Errore durante l\'importazione del file. Assicurati che sia un file JSON valido.');
            } finally {
                if (modaleAvvisoCaricamentoRegate) modaleAvvisoCaricamentoRegate.style.display = 'none';
                fileImportaRegateSuggeriteInput.value = ''; // Resetta l'input file
                fileSelezionatoPerRegateSuggerite = null;
            }
        };
        reader.readAsText(fileSelezionatoPerRegateSuggerite);
    }

    // --- Funzioni per Caricamento Elenco Regate da URL ---
    async function gestisciCaricamentoElencoRegate() {
        if (!sezioneElencoRegateSuggerite || !infoAggiornamentoElencoRegate || !tbodyElencoRegateSuggerite) {
            console.error("Elementi DOM per l'elenco regate suggerite non trovati.");
            alert("Errore: Impossibile caricare l'elenco delle regate in questo momento.");
            return;
        }

        // Comportamento Toggle: se la sezione è già visibile, la nasconde. Altrimenti la carica.
        if (sezioneElencoRegateSuggerite.style.display === 'block') {
            sezioneElencoRegateSuggerite.style.display = 'none';
            btnCaricaElencoRegate.textContent = 'Carica da Elenco Regate'; // Ripristina testo pulsante
            return;
        }

        infoAggiornamentoElencoRegate.textContent = "Caricamento elenco regate...";
        tbodyElencoRegateSuggerite.innerHTML = '<tr><td colspan="6" style="text-align:center;">Attendere...</td></tr>';
        sezioneElencoRegateSuggerite.style.display = 'block'; // Mostra la sezione
        btnCaricaElencoRegate.textContent = 'Nascondi Elenco Regate'; // Cambia testo pulsante

        try {
            const response = await fetch(URL_ELENCO_REGATE);
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} nel caricare l'elenco delle regate.`);
            }
            const datiElenco = await response.json();

            if (datiElenco && datiElenco.dataAggiornamentoDatabase && Array.isArray(datiElenco.elencoRegateProposte)) {
                infoAggiornamentoElencoRegate.innerHTML = `Elenco regate aggiornato il: <strong>${new Date(datiElenco.dataAggiornamentoDatabase).toLocaleDateString('it-IT')}</strong>. Aggiornamenti a cura di: <strong>ITA 86 FIV / Cristian</strong>.`;
                popolaTabellaElencoRegateSuggerite(datiElenco.elencoRegateProposte);
            } else {
                throw new Error("Formato dati dell'elenco regate non valido.");
            }

        } catch (error) {
            console.error("Errore durante il caricamento dell'elenco regate:", error);
            infoAggiornamentoElencoRegate.textContent = "Errore nel caricamento dell'elenco regate.";
            tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red;">${error.message}</td></tr>`;
            alert(`Impossibile caricare l'elenco delle regate: ${error.message}`);
            // Non nascondere la sezione in caso di errore, così l'utente vede il messaggio.
            // btnCaricaElencoRegate.textContent = 'Carica da Elenco Regate'; // Potrebbe essere utile resettare il testo
        }
    }

    function popolaTabellaElencoRegateSuggerite(regateProposte) {
        tbodyElencoRegateSuggerite.innerHTML = ''; // Pulisci la tabella

        if (regateProposte.length === 0) {
            tbodyElencoRegateSuggerite.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nessuna regata suggerita trovata.</td></tr>';
            return;
        }

        const gareSalvateAttuali = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        // Assicurati che idDatabaseMaster esista e non sia null/undefined prima di aggiungerlo al Set
        const idGareSalvate = new Set(
            gareSalvateAttuali.filter(g => g.idDatabaseMaster != null).map(g => g.idDatabaseMaster)
        );

        regateProposte.forEach(regata => {
            const row = tbodyElencoRegateSuggerite.insertRow();
            row.insertCell().textContent = new Date(regata.data).toLocaleDateString('it-IT');
            row.insertCell().textContent = regata.nome;
            row.insertCell().textContent = regata.livello;
            row.insertCell().textContent = formatNumber(regata.puntiVSRBase, 0);

            const cellaClassifica = row.insertCell();
            const inputClassifica = document.createElement('input');
            inputClassifica.type = 'number';
            inputClassifica.min = '1';
            inputClassifica.placeholder = 'Pos.';
            inputClassifica.style.width = '60px';
            inputClassifica.style.textAlign = 'center';
            cellaClassifica.appendChild(inputClassifica);

            const cellaAzione = row.insertCell();
            const btnAggiungi = document.createElement('button');
            btnAggiungi.textContent = 'Aggiungi';
            btnAggiungi.classList.add('edit-btn'); // Stile simile al pulsante modifica
            
            // Controlla se la regata (basata su idDatabase) è già nello storico
            if (idGareSalvate.has(regata.idDatabase)) {
                btnAggiungi.textContent = 'Già Aggiunta';
                btnAggiungi.disabled = true;
                inputClassifica.disabled = true;
            } else {
                btnAggiungi.onclick = () => aggiungiRegataDaElencoAlloStorico(regata, inputClassifica.value);
            }
            cellaAzione.appendChild(btnAggiungi);
        });
    }

    function aggiungiRegataDaElencoAlloStorico(regataMaster, classificaFinaleUtenteString) {
        const classificaFinale = parseInt(classificaFinaleUtenteString);

        if (isNaN(classificaFinale) || classificaFinale <= 0) {
            alert("Per favore, inserisci una classifica finale valida (numero intero maggiore di 0).");
            return;
        }

        const infoLivello = Object.values(livelliVsrStoricoMap).find(l => l.tipo === regataMaster.livello);
        if (!infoLivello || infoLivello.valoreNumerico === null) {
            alert("Errore: Livello della regata non riconosciuto o non valido.");
            console.error("Livello non valido per la regata master:", regataMaster);
            return;
        }

        const puntiVSRCalcolati = Math.round(infoLivello.valoreNumerico / Math.pow(classificaFinale, 0.125));

        const nuovaGara = {
            id: Date.now(), // ID univoco per lo storico locale
            data: regataMaster.data,
            livello: regataMaster.livello, // Manteniamo il tipo stringa (HC, LIV1, etc.)
            nome: regataMaster.nome,
            classificaFinale: classificaFinale,
            puntiVSR: puntiVSRCalcolati,
            idDatabaseMaster: regataMaster.idDatabase // Traccia l'ID dal file master
        };

        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        gareSalvate.push(nuovaGara);
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));

        // Aggiorna la UI
        aggiornaTabellaGare(); // Aggiorna la tabella dello storico VSR
        aggiornaPunteggioVsrTotale();
        aggiornaSezioneAnalisi();
        aggiornaSezioneStrategia();
        aggiornaGraficoTortaStatoStrategia();
        aggiornaGraficoRadarSaluteSlot();

        // Aggiorna la tabella delle regate suggerite per marcare questa come "Già Aggiunta"
        // (Ricaricando la tabella delle suggerite, il controllo dei duplicati farà il suo lavoro)
        popolaTabellaElencoRegateSuggerite(JSON.parse(JSON.stringify(tbodyElencoRegateSuggerite.dataset.regateProposte || "[]"))); // Ricarica con i dati originali
        alert(`Regata "${nuovaGara.nome}" aggiunta al tuo storico con ${nuovaGara.puntiVSR} punti VSR.`);
    }

    // --- Funzioni Sezione Analisi ---
    function aggiornaSezioneAnalisi() {
        aggiornaPanoramicaSlotVSR();
    }

    function getGareContributiveConDettagli() {
        const gareSalvateRaw = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        // Restituisce un oggetto con chiavi HC, LIV1, LIV2, LIV3
        return selezionaGareContributivePerClassifica(gareSalvateRaw);
    }

    function aggiornaPanoramicaSlotVSR() {
        const gareContributive = getGareContributiveConDettagli();
        const suggerimenti = [];
        const gareConScadenze = getGareConScadenzeImminenti(); // Ottieni gare con scadenze per l'analisi
        const idsGareConScadenze = new Set(gareConScadenze.map(g => g.id)); // Set di ID per lookup veloce


        // SOGLIA_DEBOLEZZA è ora definita a livello di script e accessibile qui
        // Le funzioni calcolaPuntiPerClassifica e calcolaClassificaPerPuntiTarget
        // sono ora definite a livello di script e accessibili qui.

        // tipoGara qui sarà il 'tipo' della gara (HC, LIV1, etc.)
        function popolaCategoriaSlot(tipoGara, gareCat, maxSlotPerFascia, elOccupati, elMinPunti, elGareSlot, elProgressBar, nomeCatBreve, elPuntiCategoria, elStackedPointsBarContainer, elPointsBar100, elPointsBar50, elPointsBarEmpty) {
            const totaleSlotCategoria = maxSlotPerFascia * 2; // Totale slot per categoria (entrambe le fasce)
            elOccupati.textContent = gareCat.length; // Numero di slot effettivamente occupati
            // Verifica che elGareSlot esista prima di tentare di modificarne l'innerHTML
            if (elGareSlot) {
                elGareSlot.innerHTML = ''; // Pulisci
            } else {
                // Se l'elemento non viene trovato, logga un avviso. Questo è il punto dell'errore.
                console.warn(`[VRCompass] Elemento DOM elGareSlot (es. hc-gare-slot, liv1-gare-slot, ecc.) non trovato per la categoria '${nomeCatBreve}'. Controlla l'ID corrispondente nel tuo file HTML (VRCompass.html).`);
            }
            let idContainerBase;
            if (tipoGara === 'HC' || tipoGara === 'LIV1') idContainerBase = tipoGara.toLowerCase(); // HC e LIV1 usano i loro ID
            else if (tipoGara === 'LIV2') idContainerBase = 'liv2';
            else if (tipoGara === 'LIV3') idContainerBase = 'liv3';
            else {
                // console.warn("Tipo gara non gestito per idContainerBase:", tipoGara);
                return; // Non popolare slot per tipi non riconosciuti
            }
            const slotCategoriaContainer = document.getElementById(`slot-${idContainerBase}-container`);

            if (slotCategoriaContainer) {
                slotCategoriaContainer.classList.remove('slot-debole'); // Rimuovi eventuale classe precedente
                slotCategoriaContainer.classList.remove('slot-con-opportunita'); // Rimuovi eventuale classe precedente
                slotCategoriaContainer.classList.remove('slot-con-preavviso'); // Rimuovi eventuale classe precedente
            }

            // Trova la chiave corrispondente al tipoGara per accedere a valoreNumerico
            // È importante che livelloValoreNumerico sia definito PRIMA di usarlo per calcolare la qualità della barra.
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            // Calcola e mostra il totale dei punti per la categoria
            let totalePuntiCategoria = 0;
            gareCat.forEach(g => {
                totalePuntiCategoria += g.puntiEffettivi;
            });
            if (elPuntiCategoria) {
                elPuntiCategoria.textContent = formatNumber(totalePuntiCategoria, 0);
            }

            // Calcola e aggiorna la barra dei punti VSR per fascia
            if (elStackedPointsBarContainer && elPointsBar100 && elPointsBar50 && elPointsBarEmpty && livelloValoreNumerico) {
                let punti100 = 0;
                let punti50 = 0;
                gareCat.forEach(g => {
                    if (g.fattoreDecadimento === 1.0) {
                        punti100 += g.puntiEffettivi;
                    } else if (g.fattoreDecadimento === 0.5) {
                        punti50 += g.puntiEffettivi;
                    }
                });

                const potenzialeMaxPuntiCategoria = livelloValoreNumerico * totaleSlotCategoria; // Max punti per la categoria (es. 15000 * 2 per HC)

                let perc100 = 0;
                let perc50 = 0;
                let percEmpty = 100;

                if (potenzialeMaxPuntiCategoria > 0) {
                    perc100 = (punti100 / potenzialeMaxPuntiCategoria) * 100;
                    perc50 = (punti50 / potenzialeMaxPuntiCategoria) * 100;
                    percEmpty = Math.max(0, 100 - perc100 - perc50); // Assicura che non sia negativo
                }

                elPointsBar100.style.width = `${perc100}%`;
                elPointsBar50.style.width = `${perc50}%`;
                elPointsBarEmpty.style.width = `${percEmpty}%`;

                // Tooltip per la barra dei punti
                const tooltipPuntiText = `Punti 100%: ${formatNumber(punti100,0)}\nPunti 50%: ${formatNumber(punti50,0)}\nPotenziale Max: ${formatNumber(potenzialeMaxPuntiCategoria,0)}`;
                elStackedPointsBarContainer.setAttribute('title', tooltipPuntiText);
            }


            // Aggiorna la barra di progresso e il suo colore in base alla qualità
            if (elProgressBar) {
                elProgressBar.style.width = `${(gareCat.length / totaleSlotCategoria) * 100}%`; // Percentuale sul totale di slot (es. 2, 6, 12, 20)
                // Resetta classi di qualità precedenti
                elProgressBar.classList.remove('progress-bar-good', 'progress-bar-medium', 'progress-bar-low', 'progress-bar-empty');
                // Aggiornato il tooltip per mostrare il totale slot corretto
                let tooltipText = `Slot ${nomeCatBreve}: ${gareCat.length}/${totaleSlotCategoria} gare. `;

                if (gareCat.length > 0 && livelloValoreNumerico && livelloValoreNumerico > 0) {
                    let sommaQualitaPercentuale = 0;
                    gareCat.forEach(g => {
                        sommaQualitaPercentuale += (g.puntiEffettivi / livelloValoreNumerico) * 100;
                    });
                    const qualitaMediaPercentuale = sommaQualitaPercentuale / gareCat.length;
                    // tooltipText += `Qualità media: ${qualitaMediaPercentuale.toFixed(1)}%. `; // Rimosso per semplificare

                    if (qualitaMediaPercentuale >= 75) {
                        elProgressBar.classList.add('progress-bar-good');
                        tooltipText += "Stato: Buona.";
                    } else if (qualitaMediaPercentuale >= 40) { // Soglia per media qualità (es. 40% per LIV1, 30% per LIV2 etc. potrebbe essere SOGLIA_DEBOLEZZA)
                        elProgressBar.classList.add('progress-bar-medium');
                        tooltipText += "Stato: Media.";
                    } else {
                        elProgressBar.classList.add('progress-bar-low');
                        tooltipText += "Stato: Bassa.";
                    }
                } else {
                    elProgressBar.classList.add('progress-bar-empty'); // Se non ci sono gare o non è applicabile
                    tooltipText += "Slot vuoto o qualità non applicabile.";
                }
                elProgressBar.setAttribute('title', tooltipText.trim());
            }
            let slotConsideratoDebole = false;

            if (gareCat.length > 0) {
                if (elMinPunti) { // Solo per Liv1, Liv2, Liv3
                    // Il punteggio minimo contributivo è l'ultimo nella lista ordinata per punti effettivi
                    elMinPunti.textContent = formatNumber(gareCat[gareCat.length - 1].puntiEffettivi, 0);
                } else if (tipoGara === "HC" && hcPuntiAttuali) { // Specifico per HC
                    // Per HC, mostriamo il punteggio della gara con più punti (la prima nella lista ordinata)
                    hcPuntiAttuali.textContent = formatNumber(gareCat[0].puntiEffettivi, 0);
                }

                gareCat.forEach(g => {
                    if (elGareSlot) { // Controlla di nuovo prima di usare appendChild
                        const p = document.createElement('p');
                        p.classList.add('gara-dettaglio');
                        // Aggiungi indicazione 100% o 50%
                        const statoPercentuale = g.fattoreDecadimento === 1.0 ? '100%' : '50%';
                        p.textContent = `${g.nome}: ${formatNumber(g.puntiEffettivi, 0)} pts (${statoPercentuale}, Data: ${new Date(g.data).toLocaleDateString('it-IT')})`;
                        elGareSlot.appendChild(p);
                    }
                });

                if (gareCat.length < totaleSlotCategoria) { // Confronta con il totale slot per la categoria
                    const slotLiberi = totaleSlotCategoria - gareCat.length;
                    let suggerimentoSlotLiberi = "";
                    if (slotCategoriaContainer && slotLiberi > 0) { // Evidenzia se ci sono slot liberi
                        slotCategoriaContainer.classList.add('slot-con-opportunita');
                        suggerimentoSlotLiberi = `<span class="warning-triangle">⚠️</span> <strong>Opportunità!</strong> Hai ${slotLiberi} slot liber${slotLiberi > 1 ? 'i' : 'o'} in ${nomeCatBreve}. `;
                    }
                    // La parte "Ad esempio, un 10° posto..." non viene aggiunta per la sezione Analisi.
                    if (suggerimentoSlotLiberi) suggerimenti.push(suggerimentoSlotLiberi.trim());
                } else {
                    // Tutti gli slot per questa categoria sono pieni, valutiamo la situazione
                    // Il punteggio da battere è quello della gara con meno punti effettivi (l'ultima nella lista ordinata)
                    const puntiDaBattere = gareCat[gareCat.length - 1].puntiEffettivi;

                    let suggerimentoTestoCompleto = ""; // Questo conterrà il testo del suggerimento per la lista
                    const classificaTarget = livelloValoreNumerico ? calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiDaBattere + 1) : null;

                    // La soglia di debolezza si applica al punteggio della gara con meno punti
                    const isDeboleSecondoSoglia = livelloValoreNumerico && SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()] && puntiDaBattere < (livelloValoreNumerico * SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()]);

                    if (isDeboleSecondoSoglia) {
                        if (slotCategoriaContainer) slotCategoriaContainer.classList.add('slot-debole');
                        let testoBaseDebole = "";

                        // Trova la gara specifica con il punteggio più basso per controllare le scadenze
                        const garaDebole = gareCat[gareCat.length - 1];

                        if (garaDebole && idsGareConScadenze.has(garaDebole.id)) {
                            const garaInScadenza = gareConScadenze.find(g => g.id === garaDebole.id);
                            if (garaInScadenza && garaInScadenza.isUrgente) { // Caso URGENTE e DEBOLE
                                const evento = garaInScadenza.tipoEvento.toLowerCase();
                                const dataEvento = garaInScadenza.dataEvento;
                                const [day, month, year] = dataEvento.split('/');
                                const dataEventoDate = new Date(`${year}-${month}-${day}`);
                                const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                                const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                                const testoGiorni = `tra ${giorniRimanenti} ${pluraleGiorni} (${dataEvento})`;

                                if (evento === "scadenza") {
                                    testoBaseDebole = `<strong>Azione Urgentissima ${nomeCatBreve}:</strong> Il tuo risultato meno performante (${formatNumber(puntiDaBattere, 0)} punti) scadrà ${testoGiorni}. Questo slot si azzererà a breve. <em>Trova una nuova gara ${nomeCatBreve} per sostituire questo punteggio.</em>`;
                                } else { // Dimezzamento
                                    const puntiPersiStimati = Math.round(garaDebole.puntiVSR * (garaDebole.fattoreDecadimento - 0.5)); // Punti che verranno persi con il dimezzamento
                                    testoBaseDebole = `<strong>Azione Urgentissima ${nomeCatBreve}:</strong> Il tuo risultato meno performante (${formatNumber(puntiDaBattere, 0)} punti) si dimezzerà ${testoGiorni}. Questo slot perderà ${formatNumber(puntiPersiStimati, 0)} punti a breve. <em>Valuta la possibilità di partecipare a una nuova gara ${nomeCatBreve} per migliorare questo slot.</em>`;
                                }
                                if (slotCategoriaContainer) slotCategoriaContainer.classList.add('slot-con-preavviso');
                            } else { // Caso DEBOLE ma NON URGENTE (o senza preavviso specifico)
                                testoBaseDebole = `<strong>${nomeCatBreve} Migliorabile:</strong> Il tuo risultato meno performante ha ${formatNumber(puntiDaBattere, 0)} punti, sotto la soglia ottimale per questa categoria.`;
                            }
                        } else { // Caso DEBOLE ma senza preavviso di scadenza/dimezzamento imminente
                            testoBaseDebole = `<strong>${nomeCatBreve} Migliorabile:</strong> Il tuo risultato meno performante ha ${formatNumber(puntiDaBattere, 0)} punti, sotto la soglia ottimale per questa categoria.`;
                        }

                        if (classificaTarget) testoBaseDebole += ` <strong>Strategia consigliata:</strong> Punta a un piazzamento di ${classificaTarget}° o migliore per sostituire la gara meno performante.`;
                        suggerimentoTestoCompleto = `<span class="warning-triangle">⚠️</span> ${testoBaseDebole}`;

                    } else { // Slot pieno MA NON debole secondo la soglia
                        let testoBaseNonDebole = "";
                        let icona = ""; // Nessuna icona di default se non c'è preavviso

                        // Controlla se la gara meno performante è in preavviso
                        const garaMenoPerformante = gareCat[gareCat.length - 1];
                         if (garaMenoPerformante && idsGareConScadenze.has(garaMenoPerformante.id)) {
                            const garaInScadenza = gareConScadenze.find(g => g.id === garaMenoPerformante.id);
                            if (garaInScadenza) {
                                const evento = garaInScadenza.tipoEvento.toLowerCase();
                                const dataEvento = garaInScadenza.dataEvento;
                                const [day, month, year] = dataEvento.split('/');
                                const dataEventoDate = new Date(`${year}-${month}-${day}`);
                                const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                                const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                                const testoGiorni = `tra ${giorniRimanenti} ${pluraleGiorni} (${dataEvento})`;

                                icona = `<span class="info-icon">ℹ️</span> `;
                                if (evento === "scadenza") {
                                    testoBaseNonDebole = `<strong>${nomeCatBreve} - Preavviso:</strong> La gara meno performante (${formatNumber(puntiDaBattere, 0)} punti) scadrà ${testoGiorni}.`;
                                } else { // Dimezzamento
                                    const puntiPersiStimati = Math.round(garaMenoPerformante.puntiVSR * (garaMenoPerformante.fattoreDecadimento - 0.5));
                                    testoBaseNonDebole = `<strong>${nomeCatBreve} - Preavviso:</strong> La gara meno performante (${formatNumber(puntiDaBattere, 0)} punti) si dimezzerà ${testoGiorni}, perdendo ${formatNumber(puntiPersiStimati, 0)} punti.`;
                                }
                                testoBaseNonDebole += ` <em>Monitora le prossime gare ${nomeCatBreve} per una potenziale sostituzione.</em>`;
                                if (slotCategoriaContainer) slotCategoriaContainer.classList.add('slot-con-preavviso');
                            }
                        } else { // Non debole, non in preavviso -> OK
                            testoBaseNonDebole = `Lo slot ${nomeCatBreve} è in buono stato.`;
                            if (classificaTarget) testoBaseNonDebole += ` Per migliorarlo ulteriormente, punta a un piazzamento di ${classificaTarget}° o migliore.`;
                        }
                        suggerimentoTestoCompleto = `${icona}${testoBaseNonDebole}`;
                    }
                    if (suggerimentoTestoCompleto) suggerimenti.push(suggerimentoTestoCompleto.trim());
                }
            } else {
                if (elMinPunti) {
                    elMinPunti.textContent = 'N/A';
                } else if (tipoGara === "HC" && hcPuntiAttuali) { // Specifico per HC
                    hcPuntiAttuali.textContent = 'N/A'; // Se lo slot HC è vuoto (entrambe le fasce)
                }
                if (elGareSlot) { // Controlla di nuovo prima di impostare innerHTML
                    elGareSlot.innerHTML = '<p class="no-data">Nessuna gara valida in questo slot.</p>';
                }
                let suggerimentoSlotVuoti = "";
                if (slotCategoriaContainer && totaleSlotCategoria > 0) { // Evidenzia se la categoria è completamente vuota ma ha slot
                    slotCategoriaContainer.classList.add('slot-con-opportunita');
                    suggerimentoSlotVuoti = `<span class="warning-triangle">⚠️</span> <strong>Opportunità!</strong> Hai ${totaleSlotCategoria} slot liber${totaleSlotCategoria > 1 ? 'i' : 'o'} in ${nomeCatBreve}. `;
                }
                // Per slot vuoti, potremmo indicare una classifica target per ottenere un punteggio "base"
                if (livelloValoreNumerico) {
                    const classificaPerPunteggioMinimoDecente = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, livelloValoreNumerico * 0.25); // Esempio: target per il 25% dei punti max
                    if (classificaPerPunteggioMinimoDecente && classificaPerPunteggioMinimoDecente <= 25) { // Mostra solo se è una classifica "ragionevole"
                        suggerimentoSlotVuoti += `Un piazzamento intorno al ${classificaPerPunteggioMinimoDecente}° posto sarebbe un buon inizio.`;
                    } else if (classificaPerPunteggioMinimoDecente) { // Se la classifica è alta, diciamo almeno top 25
                        suggerimentoSlotVuoti += `Punta almeno a un piazzamento nei primi 25 per iniziare a contribuire significativamente.`;
                    }
                }
                if (suggerimentoSlotVuoti) suggerimenti.push(suggerimentoSlotVuoti.trim());
            }
        }

        // Popola le categorie
        popolaCategoriaSlot("HC", gareContributive["HC"] || [], LIMITI_GARE_PER_CATEGORIA["HC"], hcOccupati, null, hcGareSlot, hcProgressBar, "Fuori Categoria", hcPuntiCategoria, hcStackedPointsBarContainer, hcPointsBar100, hcPointsBar50, hcPointsBarEmpty);
        popolaCategoriaSlot("LIV1", gareContributive["LIV1"] || [], LIMITI_GARE_PER_CATEGORIA["LIV1"], liv1Occupati, liv1MinPunti, liv1GareSlot, liv1ProgressBar, "Livello 1", liv1PuntiCategoria, liv1StackedPointsBarContainer, liv1PointsBar100, liv1PointsBar50, liv1PointsBarEmpty);
        popolaCategoriaSlot("LIV2", gareContributive["LIV2"] || [], LIMITI_GARE_PER_CATEGORIA["LIV2"], liv2Occupati, liv2MinPunti, liv2GareSlot, liv2ProgressBar, "Livello 2", liv2PuntiCategoria, liv2StackedPointsBarContainer, liv2PointsBar100, liv2PointsBar50, liv2PointsBarEmpty);
        popolaCategoriaSlot("LIV3", gareContributive["LIV3"] || [], LIMITI_GARE_PER_CATEGORIA["LIV3"], liv3Occupati, liv3MinPunti, liv3GareSlot, liv3ProgressBar, "Livello 3", liv3PuntiCategoria, liv3StackedPointsBarContainer, liv3PointsBar100, liv3PointsBar50, liv3PointsBarEmpty);

        // Popola suggerimenti, solo se l'elemento listaSuggerimentiSlot esiste
        if (listaSuggerimentiSlot) {
            listaSuggerimentiSlot.innerHTML = '';
            if (suggerimenti.length > 0) {
                suggerimenti.forEach(sugg => {
                    const li = document.createElement('li');
                    li.innerHTML = sugg; // innerHTML per interpretare <strong>, <span> etc.
                    if (sugg.trim() !== "") listaSuggerimentiSlot.appendChild(li);
                });
            } else {
                listaSuggerimentiSlot.innerHTML = '<li class="no-data">Analisi in corso o nessuna gara presente.</li>';
            }
        } else {
            // Se l'elemento non esiste, logga un avviso (opzionale, ma utile per il debug)
            // Questo console.warn è utile se ti aspetti che l'elemento esista ma non viene trovato.
            // console.warn("[VRCompass] Elemento DOM #lista-suggerimenti-slot non trovato. Impossibile popolare i suggerimenti per l'analisi.");
        }
    }

    function aggiornaMonitoraggioScadenze() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const gareInDimezzamento = [];
        const gareInScadenza = [];
        const oggi = new Date();
        oggi.setHours(0,0,0,0);

        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data); // Rinominato per chiarezza
            let isUrgente = false;
            let tipoEventoPerLista = null; // Per distinguere il tipo di evento nella lista

            // Controllo Dimezzamento (tra 9 e <12 mesi)
            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) {
                const dataDimezzamento = new Date(dataGaraDate);
                dataDimezzamento.setMonth(dataGaraDate.getMonth() + 12);
                const impatto = Math.round(gara.puntiVSR * 0.5); // Punti persi = 50% dei punti originali
                isUrgente = (mesiTrascorsi === 11);
                tipoEventoPerLista = "Dimezzamento";
                gareInDimezzamento.push({ ...gara, dataEvento: dataDimezzamento.toLocaleDateString('it-IT'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista });
            }

            // Controllo Scadenza (tra 21 e <24 mesi)
            if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) {
                const dataScadenza = new Date(dataGaraDate);
                dataScadenza.setMonth(dataGaraDate.getMonth() + 24);
                // L'impatto è sui punti che la gara sta attualmente fornendo (che sono al 50%)
                const impatto = Math.round(gara.puntiVSR * 0.5); // Punti persi = 50% dei punti originali (quelli che rimangono)
                isUrgente = (mesiTrascorsi === 23);
                tipoEventoPerLista = "Scadenza";
                gareInScadenza.push({ ...gara, dataEvento: dataScadenza.toLocaleDateString('it-IT'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista });
            }
        });

        function popolaListaScadenze(listaElement, gare, tipoEvento) {
            listaElement.innerHTML = '';
            if (gare.length > 0) {
                gare.sort((a,b) => new Date(a.dataEvento.split('/').reverse().join('-')) - new Date(b.dataEvento.split('/').reverse().join('-'))); // Ordina per data evento
                gare.forEach(g => {
                    const li = document.createElement('li');
                    const livelloTesto = livelliVsrStoricoMap[g.livello] ? livelliVsrStoricoMap[g.livello].testo : g.livello;
                    let testoMessaggio = `${g.nome} (${livelloTesto}) - ${g.tipoEvento} il ${g.dataEvento}. Impatto: -${formatNumber(g.impattoPunti,0)} pts.`;
                    if (g.isUrgente) {
                        li.classList.add('scadenza-urgente');
                        // Calcola i giorni rimanenti
                        const [day, month, year] = g.dataEvento.split('/');
                        const dataEventoDate = new Date(`${year}-${month}-${day}`);
                        const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                        const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni"; // Usa Math.abs per il plurale
                        testoMessaggio = `❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${g.tipoEvento.toLowerCase()} (${g.dataEvento}) per ${g.nome} (${livelloTesto}). Impatto: -${formatNumber(g.impattoPunti,0)} pts.`;
                    } else {
                        li.classList.add('scadenza-in-preavviso-non-urgente');
                    }
                    li.innerHTML = testoMessaggio;
                    listaElement.appendChild(li);
                });
            } else {
                listaElement.innerHTML = `<li class="no-data">Nessuna gara in ${tipoEvento.toLowerCase()} imminente.</li>`;
            }
        }

        popolaListaScadenze(listaGareDimezzamento, gareInDimezzamento, "Dimezzamento");
        popolaListaScadenze(listaGareScadenza, gareInScadenza, "Scadenza");
    }

    // --- Funzioni Sezione Strategia ---
    function aggiornaSezioneStrategia() {
        aggiornaMonitoraggioScadenze();
        aggiornaValutazioneStrategicaSlot();
    }

    // Funzione helper per ottenere le gare in scadenza o dimezzamento con dettagli utili
    function getGareConScadenzeImminenti() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const oggi = new Date();
        oggi.setHours(0,0,0,0);
        const scadenze = [];

        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data);
            let tipoEvento = null;
            let dataEventoObj = null; // Oggetto Date per dataEvento
            let isUrgente = false;
            let impattoPuntiStimato = 0;

            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) { // Dimezzamento imminente
                tipoEvento = "Dimezzamento";
                dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 12);
                isUrgente = (mesiTrascorsi === 11);
                impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5); // Punti persi = 50% dei punti originali
            } else if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) { // Scadenza imminente
                tipoEvento = "Scadenza";
                dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 24);
                isUrgente = (mesiTrascorsi === 23);
                impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5); // Punti persi = 50% dei punti originali (quelli che rimangono)
            }
            if (tipoEvento && dataEventoObj) {
                scadenze.push({ ...gara, tipoEvento, dataEvento: dataEventoObj.toLocaleDateString('it-IT'), isUrgente, impattoPunti: impattoPuntiStimato });
            }
        });
        return scadenze;
    }


    function aggiornaValutazioneStrategicaSlot() {
        if (!listaSuggerimentiStrategiciSlot) return;

        const gareContributive = getGareContributiveConDettagli();
        const suggerimentiStrategici = [];
        const gareConScadenze = getGareConScadenzeImminenti(); // Ottieni gare con scadenze
        const idsGareConScadenze = new Set(gareConScadenze.map(g => g.id)); // Set di ID per lookup veloce

        // Definizioni strategiche per categoria
        const strategiePerCategoria = {
            "HC": {
                nomeBreve: "Fuori Categoria",
                iconaAzione: "🎯",
                testoSlotVuoto: "<strong>Opportunità Fuori Categoria:</strong> Lo slot contributivo è vuoto. Le gare HC offrono molti punti. Partecipare a una gara di questo tipo è fondamentale per un VSR competitivo. <em>Identifica la prossima gara HC nel calendario e pianifica la tua partecipazione. Nel frattempo, ottimizza al massimo gli slot di Livello 1, 2 e 3.</em>",
                testoSlotPienoDeboleBase: (punti) => `<strong>Azione Critica Fuori Categoria:</strong> Il tuo risultato attuale di ${formatNumber(punti, 0)} punti è sotto la soglia ottimale.`,
                testoSlotPienoOKBase: (punti) => `✅ <strong>Stato Fuori Categoria Ottimale:</strong> Slot coperto con ${formatNumber(punti, 0)} punti.`,
                testoAzioneMiglioramento: () => `Punta a un risultato migliore nella prossima gara HC disponibile.`,
                testoPreavviso: (dataEvento, tipoEvento, impattoPunti) => ` <strong class="text-danger">Importante: questa gara è in ${tipoEvento} il ${dataEvento}!</strong>`,
                testoUrgenzaDimezzamento: (dataEvento, giorniRimanenti, impattoPunti) => {
                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                    return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Perderai ${formatNumber(impattoPunti,0)} punti.</strong>`;
                },
                testoUrgenzaScadenza: (dataEvento, giorniRimanenti, impattoPunti) => {
                     const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                     return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Questo slot si azzererà.</strong>`;
                }
            },
            "LIV1": {
                nomeBreve: "Livello 1",
                iconaAzione: "🎯",
                testoSlotVuoto: (numGareDaAggiungere100, puntiEsempio, nomeCategoria, numGareCheSiDimezzano) => { // Modificato riferimento al piazzamento
                    let baseText = `<strong>Azione ${nomeCategoria}:</strong> Per ottimizzare la tua fascia 100%, dovresti aggiungere ${numGareDaAggiungere100 > 1 ? `${numGareDaAggiungere100} nuove gare` : 'una nuova gara'}. ${puntiEsempio ? `Un 50° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''}`;
                    if (numGareCheSiDimezzano > 0) {
                        baseText += ` <strong class='text-info'>Questo suggerimento considera che ${numGareCheSiDimezzano > 1 ? `${numGareCheSiDimezzano} delle tue gare` : 'una delle tue gare'} al 100% passer${
                                     numGareCheSiDimezzano > 1 ? 'anno' : 'à'} presto al 50% (vedi "Monitoraggio Scadenze").</strong>`;
                    }
                    return `${baseText} <em>Questa categoria offre un buon bilanciamento punti/accessibilità. Punta a risultati solidi.</em>`;
                },
                testoSlotPienoDeboleBase: (punti) => `<strong>Azione Livello 1:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti).`,
                testoSlotPienoOKBase: (punti) => `✅ <strong>Stato Livello 1 Ottimale:</strong> Slot coperto con risultati solidi (minimo ${formatNumber(punti, 0)} punti).`,
                testoAzioneMiglioramento: (classificaTarget) => `Punta a un piazzamento di ${classificaTarget}° o migliore per sostituire la gara meno performante.`,
                testoPreavviso: (dataEvento, tipoEvento, impattoPunti) => ` <strong class="text-danger">Importante: questa gara è in ${tipoEvento} il ${dataEvento}! Perderà ${formatNumber(impattoPunti,0)} punti.</strong>`,
                testoUrgenzaDimezzamento: (dataEvento, giorniRimanenti, impattoPunti) => {
                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                    return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Perderai ${formatNumber(impattoPunti,0)} punti.</strong>`;
                },
                testoUrgenzaScadenza: (dataEvento, giorniRimanenti, impattoPunti) => {
                     const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                     return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Questo slot si azzererà.</strong>`;
                }
            },
            "LIV2": {
                nomeBreve: "Livello 2",
                iconaAzione: "🎯",
                testoSlotVuoto: (numGareDaAggiungere100, puntiEsempio, nomeCategoria, numGareCheSiDimezzano) => { // Modificato riferimento al piazzamento
                    let baseText = `<strong>Azione ${nomeCategoria}:</strong> Per ottimizzare la tua fascia 100%, dovresti aggiungere ${numGareDaAggiungere100 > 1 ? `${numGareDaAggiungere100} nuove gare` : 'una nuova gara'}. ${puntiEsempio ? `Un 50° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''}`;
                    if (numGareCheSiDimezzano > 0) {
                        baseText += ` <strong class='text-info'>Questo suggerimento considera che ${numGareCheSiDimezzano > 1 ? `${numGareCheSiDimezzano} delle tue gare` : 'una delle tue gare'} al 100% passer${
                                     numGareCheSiDimezzano > 1 ? 'anno' : 'à'} presto al 50% (vedi "Monitoraggio Scadenze").</strong>`;
                    }
                    return `${baseText} <em>Utile per completare la classifica e fare "volume". Non trascurarla e punta a risultati solidi.</em>`;
                },
                testoSlotPienoDeboleBase: (punti) => `<strong>Azione Livello 2:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti).`,
                testoSlotPienoOKBase: (punti) => `✅ <strong>Stato Livello 2 Ottimale:</strong> Slot coperto con risultati solidi (minimo ${formatNumber(punti, 0)} punti).`,
                testoAzioneMiglioramento: (classificaTarget) => `Punta a un piazzamento di ${classificaTarget}° o migliore per sostituire la gara meno performante.`,
                testoPreavviso: (dataEvento, tipoEvento, impattoPunti) => ` <strong class="text-danger">Importante: questa gara è in ${tipoEvento} il ${dataEvento}! Perderà ${formatNumber(impattoPunti,0)} punti.</strong>`,
                testoUrgenzaDimezzamento: (dataEvento, giorniRimanenti, impattoPunti) => {
                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                    return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Perderai ${formatNumber(impattoPunti,0)} punti.</strong>`;
                },
                testoUrgenzaScadenza: (dataEvento, giorniRimanenti, impattoPunti) => {
                     const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                     return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Questo slot si azzererà.</strong>`;
                }
            },
            "LIV3": {
                nomeBreve: "Livello 3",
                iconaAzione: "🎯",
                testoSlotVuoto: (numGareDaAggiungere100, puntiEsempio, nomeCategoria, numGareCheSiDimezzano) => { // Modificato riferimento al piazzamento
                    let baseText = `<strong>Azione ${nomeCategoria}:</strong> Per ottimizzare la tua fascia 100%, dovresti aggiungere ${numGareDaAggiungere100 > 1 ? `${numGareDaAggiungere100} nuove gare` : 'una nuova gara'}. ${puntiEsempio ? `Un 50° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''}`;
                    if (numGareCheSiDimezzano > 0) {
                        baseText += ` <strong class='text-info'>Questo suggerimento considera che ${numGareCheSiDimezzano > 1 ? `${numGareCheSiDimezzano} delle tue gare` : 'una delle tue gare'} al 100% passer${
                                     numGareCheSiDimezzano > 1 ? 'anno' : 'à'} presto al 50% (vedi "Monitoraggio Scadenze").</strong>`;
                    }
                    return `${baseText} <em>L'obiettivo primario è avere ${LIMITI_GARE_PER_CATEGORIA["LIV3"]*2} gare che contribuiscono. Anche punteggi modesti sono utili.</em>`;
                },
                testoSlotPienoDeboleBase: (punti) => `<strong>Azione Livello 3:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti).`,
                testoSlotPienoOKBase: (punti) => `✅ <strong>Stato Livello 3 Ottimale:</strong> Slot coperto con risultati solidi (minimo ${formatNumber(punti, 0)} punti).`,
                testoAzioneMiglioramento: (classificaTarget) => `Punta a un piazzamento di ${classificaTarget}° o migliore per sostituire la gara meno performante.`,
                testoPreavviso: (dataEvento, tipoEvento, impattoPunti) => ` <strong class="text-danger">Importante: questa gara è in ${tipoEvento} il ${dataEvento}! Perderà ${formatNumber(impattoPunti,0)} punti.</strong>`,
                testoUrgenzaDimezzamento: (dataEvento, giorniRimanenti, impattoPunti) => {
                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                    return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Perderai ${formatNumber(impattoPunti,0)} punti.</strong>`;
                },
                testoUrgenzaScadenza: (dataEvento, giorniRimanenti, impattoPunti) => {
                     const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                     return ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${tipoEvento.toLowerCase()} di questa gara (${dataEvento})! Questo slot si azzererà.</strong>`;
                }
            }
        };

        const ordineTipiPerStrategia = ["HC", "LIV1", "LIV2", "LIV3"];

        ordineTipiPerStrategia.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const infoStrategia = strategiePerCategoria[tipoGara];

            // Trova la chiave corrispondente al tipoGara per accedere a valoreNumerico
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            if (!infoStrategia || !livelloValoreNumerico) {
                return;
            }

            let icona = infoStrategia.iconaAzione ? `<span class="warning-triangle">${infoStrategia.iconaAzione}</span>` : `<span class="warning-triangle">⚠️</span>`;
            let suggerimentoTestoCompleto = "";
            const limiteGareContributive = LIMITI_GARE_PER_CATEGORIA[tipoGara] * 2; // Totale slot contributivi (es. 2 per HC, 6 per LIV1)

            if (gareCat.length < limiteGareContributive) { // Meno gare contributive del limite
                let puntiEsempio = null;
                if (livelloValoreNumerico) {
                    puntiEsempio = calcolaPuntiPerClassifica(livelloValoreNumerico, 50); // Esempio per 50° posto
                }
                
                // Calcola quante gare aggiungere per la fascia 100%, tenendo conto dei dimezzamenti
                const gare100Attuali = gareCat.filter(g => g.fattoreDecadimento === 1.0);
                const numGare100Attuali = gare100Attuali.length;
                const gare100InDimezzamentoImminente = gare100Attuali.filter(g => g.mesiTrascorsi >= 9 && g.mesiTrascorsi < 12).length;
                
                // Numero di slot attualmente vuoti nella fascia 100%
                const slotAttualmenteVuoti100 = LIMITI_GARE_PER_CATEGORIA[tipoGara] - numGare100Attuali;
                // Numero totale di gare da aggiungere per la fascia 100% (slot vuoti + quelli che si libereranno)
                const numGareDaAggiungere100 = slotAttualmenteVuoti100 + gare100InDimezzamentoImminente;

                if (tipoGara === "HC" && typeof infoStrategia.testoSlotVuoto === 'string') {
                    suggerimentoTestoCompleto = `${icona} ${infoStrategia.testoSlotVuoto}`;
                } else if (typeof infoStrategia.testoSlotVuoto === 'function') {
                    // Passa il numero di gare da aggiungere per la fascia 100% e il numero di quelle che si dimezzano
                    suggerimentoTestoCompleto = `${icona} ${infoStrategia.testoSlotVuoto(numGareDaAggiungere100, puntiEsempio, infoStrategia.nomeBreve, gare100InDimezzamentoImminente)}`;
                }

            } else { // Tutti gli slot contributivi sono pieni (gareCat.length === limiteGareContributive)
                const puntiDaBattere = gareCat[gareCat.length - 1].puntiEffettivi;
                const isDebole = livelloValoreNumerico && SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()] && puntiDaBattere < (livelloValoreNumerico * SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()]);
                const garaMenoPerformante = gareCat[gareCat.length - 1];

                if (isDebole) {
                    const classificaTarget = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiDaBattere + 1);
                    suggerimentoTestoCompleto = `${icona} ${infoStrategia.testoSlotPienoDeboleBase(puntiDaBattere)}`;
                    if (infoStrategia.testoAzioneMiglioramento) {
                        suggerimentoTestoCompleto += ` ${infoStrategia.testoAzioneMiglioramento(classificaTarget)}`;
                    }
                } else { // Non debole
                    suggerimentoTestoCompleto = `${infoStrategia.testoSlotPienoOKBase(puntiDaBattere)}`;
                    const classificaTarget = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiDaBattere + 1);
                     if (classificaTarget && infoStrategia.testoAzioneMiglioramento && tipoGara !== "HC") { // Non aggiungere azione miglioramento per HC se OK
                        suggerimentoTestoCompleto += ` ${infoStrategia.testoAzioneMiglioramento(classificaTarget)}`;
                     } else if (tipoGara === "HC" && infoStrategia.testoSlotPienoOKBase) { // Per HC, se OK, aggiungi solo il testo di monitoraggio
                         suggerimentoTestoCompleto = infoStrategia.testoSlotPienoOKBase(puntiDaBattere); // Assicura che il testo OK sia usato
                     }
                }

                // Aggiungi avviso di scadenza/dimezzamento se presente per la gara meno performante
                if (garaMenoPerformante && idsGareConScadenze.has(garaMenoPerformante.id)) {
                    const garaInScadenza = gareConScadenze.find(g => g.id === garaMenoPerformante.id);
                    if (garaInScadenza) {
                        const tipoEvento = garaInScadenza.tipoEvento;
                        const dataEvento = garaInScadenza.dataEvento;
                        const impattoPunti = garaInScadenza.impattoPunti;
                        const [day, month, year] = dataEvento.split('/');
                        const dataEventoDate = new Date(`${year}-${month}-${day}`);
                        const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);

                        if (garaInScadenza.isUrgente) {
                            if (tipoEvento === "Dimezzamento" && infoStrategia.testoUrgenzaDimezzamento) {
                                suggerimentoTestoCompleto += infoStrategia.testoUrgenzaDimezzamento(dataEvento, giorniRimanenti, impattoPunti);
                            } else if (tipoEvento === "Scadenza" && infoStrategia.testoUrgenzaScadenza) {
                                suggerimentoTestoCompleto += infoStrategia.testoUrgenzaScadenza(dataEvento, giorniRimanenti, impattoPunti);
                            }
                        } else if (infoStrategia.testoPreavviso) { // Preavviso non urgente
                            suggerimentoTestoCompleto += infoStrategia.testoPreavviso(dataEvento, tipoEvento, impattoPunti);
                        }
                    }
                } else if (!isDebole && tipoGara === "HC" && infoStrategia.testoSlotPienoOKBase) {
                    // Caso HC OK senza preavvisi, assicurati che il testo di monitoraggio sia presente
                    // Questo è un po' ridondante se testoSlotPienoOKBase già lo include, ma per sicurezza.
                    if (!suggerimentoTestoCompleto.includes("Monitora")) { // Evita duplicati
                         suggerimentoTestoCompleto = infoStrategia.testoSlotPienoOKBase(puntiDaBattere);
                    }
                }
            }
            if (suggerimentoTestoCompleto) suggerimentiStrategici.push(suggerimentoTestoCompleto);
        });


        // Aggiungi un suggerimento generale se ci sono scadenze importanti
        if (gareConScadenze.length > 0) {
            let testoScadenzeImportanti = "Ricorda di monitorare le tue gare in scadenza/dimezzamento. Sostituirle tempestivamente è cruciale, specialmente se contribuiscono significativamente al tuo VSR.";
            const gareHCoL1InScadenza = gareConScadenze.filter(g => { // Filtra per HC o LIV1
                const tipoGara = livelliVsrStoricoMap[g.livello] ? livelliVsrStoricoMap[g.livello].tipo : null; // Usa il tipo dalla mappa
                return tipoGara === "HC" || tipoGara === "LIV1";
            });

            if (gareHCoL1InScadenza.length > 0) {
                // Trova la scadenza più imminente tra HC/L1
                 gareHCoL1InScadenza.sort((a,b) => new Date(a.dataEvento.split('/').reverse().join('-')) - new Date(b.dataEvento.split('/').reverse().join('-')));
                 const scadenzaPiuImminente = gareHCoL1InScadenza[0]; // La prima dopo l'ordinamento è la più imminente
                 const [day, month, year] = scadenzaPiuImminente.dataEvento.split('/');
                 const dataEventoDate = new Date(`${year}-${month}-${day}`);
                 const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                 const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                 const testoGiorni = `tra ${giorniRimanenti} ${pluraleGiorni} (${scadenzaPiuImminente.dataEvento})`;

                testoScadenzeImportanti = `<strong>Priorità Scadenze:</strong> Hai gare importanti (HC/Liv.1) in ${scadenzaPiuImminente.tipoEvento} ${testoGiorni}. La loro sostituzione dovrebbe essere una priorità alta per non perdere punti preziosi! Controlla il "Monitoraggio Scadenze" per i dettagli.`;
            }
            suggerimentiStrategici.unshift(`<span class="warning-triangle calendar-icon">🗓️</span> ${testoScadenzeImportanti}`);
        }

        listaSuggerimentiStrategiciSlot.innerHTML = '';
        if (suggerimentiStrategici.length > 0) {
            suggerimentiStrategici.forEach(sugg => {
                const li = document.createElement('li');
                li.innerHTML = sugg;
                listaSuggerimentiStrategiciSlot.appendChild(li);
            });
        } else {
             listaSuggerimentiStrategiciSlot.innerHTML = '<li class="no-data">Nessuna azione strategica prioritaria identificata per gli slot. Controlla le scadenze.</li>';
        }
    }

    // --- Event Listener Generali ---
    mainNavButtons.forEach(button => button.addEventListener('click', handleNavClick));

    // --- Inizializzazione ---
    init();

    // --- Funzioni Grafico Torta Strategia ---
    function aggiornaGraficoTortaStatoStrategia() {
        if (!canvasGraficoTorta) return;

        const gareContributive = getGareContributiveConDettagli();

        // Calcola i punti VSR attuali per ogni categoria per il tooltip
        const puntiAttualiPerCategoriaGrafico = {};
        const categorieOrdineTooltip = ["HC", "LIV1", "LIV2", "LIV3"]; // Stesso ordine del grafico
        categorieOrdineTooltip.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            let sommaPunti = 0;
            gareCat.forEach(g => sommaPunti += g.puntiEffettivi);
            puntiAttualiPerCategoriaGrafico[tipoGara] = sommaPunti;
        });
        // Calcola il potenziale massimo di punti per ogni categoria e il totale
        const potenzialePuntiCategoria = {
            "HC": (livelliVsrStoricoMap["HC"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["HC"] * 2, // Limite * 2
            "LIV1": (livelliVsrStoricoMap["LIV1"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV1"] * 2, // Limite * 2
            "LIV2": (livelliVsrStoricoMap["LIV2"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV2"] * 2, // Limite * 2
            "LIV3": (livelliVsrStoricoMap["LIV3"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV3"] * 2 // Limite * 2
        };

        let totalPotentialPoints = 0;
        for (const tipo in potenzialePuntiCategoria) {
            totalPotentialPoints += potenzialePuntiCategoria[tipo];
        }
        // Rendi disponibili queste variabili per la callback del tooltip
        potenzialePuntiPerGraficoTorta = potenzialePuntiCategoria;
        totalePotenzialePuntiPerGraficoTorta = totalPotentialPoints > 0 ? totalPotentialPoints : 1;

        if (totalPotentialPoints === 0) totalPotentialPoints = 1; // Evita divisione per zero se tutti i potenziali sono 0

        const labels = [];
        const dataValues = [];
        const backgroundColors = [];
        const borderColors = []; // Array per i colori dei bordi
        const borderWidths = []; // Array per gli spessori dei bordi

        // Definisci l'ordine e i colori per le categorie
        const categorieOrdine = ["HC", "LIV1", "LIV2", "LIV3"];
        const colori = {
            "HC":   { good: 'rgba(220, 53, 69, 0.8)', needsImprovement: 'rgba(220, 53, 69, 0.3)' },   // Rosso Bootstrap (danger) per HC
            "LIV1": { good: 'rgba(25, 135, 84, 0.8)', needsImprovement: 'rgba(25, 135, 84, 0.3)' },   // Verde Bootstrap (success)
            "LIV2": { good: 'rgba(255, 193, 7, 0.8)', needsImprovement: 'rgba(255, 193, 7, 0.3)' },   // Giallo Bootstrap (warning)
            "LIV3": { good: 'rgba(13, 110, 253, 0.8)', needsImprovement: 'rgba(13, 110, 253, 0.3)' }   // Blu Bootstrap (primary)
        };

        categorieOrdine.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
            const totaleSlotCategoria = maxSlotPerFascia * 2; // Totale slot per categoria

            // Trova il valore numerico del livello dalla mappa
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;
            const nomeCatBreve = infoLivelloDaMappa ? infoLivelloDaMappa.testo : tipoGara;

            if (totaleSlotCategoria === 0 || !livelloValoreNumerico) {
                 // Non includere categorie senza slot o senza valore numerico
                 return;
            }

            // Calcola il punteggio salute basato sul riempimento e sulla qualità media
            const percentualeRiempimento = (gareCat.length / totaleSlotCategoria); // Valore da 0 a 1 sul totale di 40
            let qualitaMediaPunti = 0; // Valore da 0 a 1
            if (gareCat.length > 0 && livelloValoreNumerico > 0) {
                 let sommaQualitaPercentuale = 0;
                 gareCat.forEach(g => sommaQualitaPercentuale += (g.puntiEffettivi / livelloValoreNumerico));
                 qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length; // Media dei rapporti puntiEffettivi/puntiMaxGara
            }

            // Pesi per il punteggio salute (stessi usati nel radar)
            let pesoRiempimento = 0.5;
            let pesoQualita = 0.5;
            if (maxSlotPerFascia === 1) { // HC (totale 2 slot)
                pesoRiempimento = 0.4;
                pesoQualita = 0.6;
            } else if (maxSlotPerFascia === 3) { // LIV1 (totale 6 slot)
                pesoRiempimento = 0.45;
                pesoQualita = 0.55;
            } else if (maxSlotPerFascia === 10) { // LIV3 (totale 20 slot)
                pesoRiempimento = 0.6;
                pesoQualita = 0.4;
            }
            // LIV2 usa i pesi di default 0.5/0.5

            const punteggioSalute = (percentualeRiempimento * pesoRiempimento) + (qualitaMediaPunti * pesoQualita);
            const punteggioSalutePercent = Math.min(1, Math.max(0, punteggioSalute)) * 100; // Risultato da 0 a 100

            // Calcola la dimensione delle fette in base al POTENZIALE DI PUNTEGGIO della categoria e al punteggio di salute
            const pesoPuntiCategoria = potenzialePuntiCategoria[tipoGara] / totalPotentialPoints; // Peso della categoria sul totale dei punti potenziali (0-1)

            const dimensioneBuona = pesoPuntiCategoria * (punteggioSalutePercent / 100);
            const dimensioneMigliorabile = pesoPuntiCategoria * (1 - (punteggioSalutePercent / 100));

            // Aggiungi i dati per la fetta "Buona"
            if (dimensioneBuona > 0.001) { // Aggiungi solo se la dimensione è > 0 per evitare fette invisibili e problemi di rendering
                labels.push(`${nomeCatBreve} (Ottimizzato)`);
                dataValues.push(dimensioneBuona);
                backgroundColors.push(colori[tipoGara].good);
                borderColors.push('#444'); // Bordo scuro per l'inizio di una nuova categoria
                borderWidths.push(0);     // Nessun bordo
            }

            // Aggiungi i dati per la fetta "Migliorabile"
            if (dimensioneMigliorabile > 0.001) { // Aggiungi solo se la dimensione è > 0
                 labels.push(`${nomeCatBreve} (Migliorabile)`);
                 dataValues.push(dimensioneMigliorabile);
                 backgroundColors.push(colori[tipoGara].needsImprovement);
                 borderColors.push('#fff'); // Bordo bianco standard per la parte migliorabile
                 borderWidths.push(0);     // Nessun bordo per la parte migliorabile
            }
        });

        // Se non ci sono dati (es. nessuna gara salvata), mostra un grafico vuoto o un messaggio
        if (dataValues.length === 0) {
             // Potremmo mostrare un grafico vuoto o nascondere il canvas e mostrare un messaggio
             // Per ora, creiamo un grafico con dati 0 che risulterà vuoto
             labels.push("Nessun dato disponibile");
             dataValues.push(1); // Una singola fetta che occupa tutto lo spazio
             backgroundColors.push('#e9ecef'); // Grigio chiaro
             borderColors.push('#ccc'); // Irrilevante con spessore 0
             borderWidths.push(0);      // Nessun bordo
        }


        const data = {
            labels: labels,
            datasets: [{
                label: 'Stato Ottimizzazione Slot',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors, // Usa l'array dei colori dei bordi
                borderWidth: borderWidths  // Usa l'array degli spessori dei bordi
            }]
        };

        if (graficoTortaIstanza) {
            graficoTortaIstanza.data = data;
            graficoTortaIstanza.update();
        } else {
            graficoTortaIstanza = new Chart(canvasGraficoTorta, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Permette al CSS di controllare l'altezza
                    plugins: {
                        legend: {
                            position: 'right', // Legenda a destra
                            labels: { boxWidth: 20, padding: 15 }
                        },
                        title: { display: false }, // Titolo già presente nell'HTML
                        tooltip: { // Configurazione Tooltip
                            callbacks: {
                                label: function(tooltipItem) { // Rinominato context in tooltipItem per chiarezza
                                    const labelOriginal = tooltipItem.label || ''; // e.g., "Livello 1 (Ottimizzato)"
                                    const rawValue = tooltipItem.parsed || 0; // Proporzione della fetta sul totale potenziale VSR

                                    if (labelOriginal === "Nessun dato disponibile") {
                                        return labelOriginal;
                                    }

                                    // Estrai nome base categoria (es. "Livello 1") e stato fetta (es. "Ottimizzato")
                                    const match = labelOriginal.match(/^(.+?)\s*\((.+?)\)$/);
                                    const nomeCatBase = match ? match[1].trim() : labelOriginal;
                                    const statoFetta = match ? match[2].trim().toLowerCase() : '';

                                    const tipoGara = mappaTestoLabelGraficoATipoGara[nomeCatBase];
                                    if (!tipoGara) return labelOriginal; // Fallback

                                    const potenzialeMaxCategoria = potenzialePuntiPerGraficoTorta[tipoGara] || 0;
                                    const puntiAttualiDellaCategoria = puntiAttualiPerCategoriaGrafico[tipoGara] || 0;

                                    let percentualePuntiVSRPerCategoria = 0;
                                    if (potenzialeMaxCategoria > 0) {
                                        percentualePuntiVSRPerCategoria = (puntiAttualiDellaCategoria / potenzialeMaxCategoria) * 100;
                                    }

                                    // Calcola la percentuale di "salute" o "miglioramento" per la fetta specifica
                                    let percentualeFettaSpecifics = 0;
                                    const proporzioneCatSulTotale = (potenzialeMaxCategoria / totalePotenzialePuntiPerGraficoTorta);
                                    if (proporzioneCatSulTotale > 0) {
                                        percentualeFettaSpecifics = (rawValue / proporzioneCatSulTotale) * 100;
                                        percentualeFettaSpecifics = Math.min(100, Math.max(0, percentualeFettaSpecifics)); // Clamp 0-100
                                    }

                                    const tooltipLines = [];
                                    tooltipLines.push(`${nomeCatBase} (${statoFetta.charAt(0).toUpperCase() + statoFetta.slice(1)})`); // Es. Livello 1 (Ottimizzato)

                                    if (statoFetta === 'ottimizzato') {
                                        tooltipLines.push(`  Salute slot: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    } else if (statoFetta === 'migliorabile') {
                                        tooltipLines.push(`  Miglioramento potenziale: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    } else {
                                        // Caso in cui lo statoFetta non è né ottimizzato né migliorabile (improbabile)
                                        tooltipLines.push(`  Valore fetta: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    }
                                    tooltipLines.push(`  Punti VSR: ${formatNumber(puntiAttualiDellaCategoria,0)} / ${formatNumber(potenzialeMaxCategoria,0)}`);
                                    tooltipLines.push(`  (${percentualePuntiVSRPerCategoria.toFixed(2)}% del potenziale cat.)`);

                                    return tooltipLines;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // --- Funzioni Grafico Radar Dashboard ---
    // Questa funzione calcola un punteggio di "salute" per categoria,
    // combinando riempimento slot e qualità media dei punti.
    function calcolaPunteggioSaluteCategoria(gareCat, maxSlotPerFascia, valoreMaxPuntiGara) {
        const totaleSlotCategoria = maxSlotPerFascia * 2; // Totale slot per categoria (es. 2 per HC, 6 per Liv1)
        if (totaleSlotCategoria === 0) return 0; // Categorie senza slot non contribuiscono

        const percentualeRiempimento = (gareCat.length / totaleSlotCategoria); // Valore da 0 a 1 sul totale di 40 slot

        let qualitaMediaPunti = 0; // Valore da 0 a 1
        if (gareCat.length > 0 && valoreMaxPuntiGara > 0) {
            let sommaQualitaPercentuale = 0;
            gareCat.forEach(g => {
                sommaQualitaPercentuale += (g.puntiEffettivi / valoreMaxPuntiGara); // Rapporto puntiEffettivi / PuntiMaxGaraOriginale
            });
            qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length; // Media dei rapporti puntiEffettivi/puntiMaxGara
        }

        // Pesi: diamo più importanza al riempimento per slot con molte gare (LIV3),
        // e più alla qualità per slot con poche gare (HC/LIV1).
        // Questi pesi dovrebbero riflettere l'importanza relativa di riempimento vs qualità per *quel tipo* di slot.
        let pesoRiempimento = 0.5;
        let pesoQualita = 0.5;

        if (maxSlotPerFascia === 1) { // HC (totale 2 slot)
            pesoRiempimento = 0.4;
            pesoQualita = 0.6;
        } else if (maxSlotPerFascia === 3) { // LIV1 (totale 6 slot)
            pesoRiempimento = 0.45;
            pesoQualita = 0.55;
        } else if (maxSlotPerFascia === 10) { // LIV3 (totale 20 slot)
            pesoRiempimento = 0.6;
            pesoQualita = 0.4; // Per LIV3, riempire è più importante che avere punteggi altissimi in ogni gara
        }
        // LIV2 usa i pesi di default 0.5/0.5

        // Se lo slot è vuoto, la qualità è 0, ma il riempimento è anche 0.
        // Se lo slot è pieno ma la qualità è 0 (improbabile con puntiEffettivi > 0), il punteggio sarà basso.
        const punteggioSalute = (percentualeRiempimento * pesoRiempimento) + (qualitaMediaPunti * pesoQualita);
        return Math.min(1, Math.max(0, punteggioSalute)) * 100; // Risultato da 0 a 100
    }

    function aggiornaGraficoRadarSaluteSlot() {
        // console.log("aggiornaGraficoRadarSaluteSlot CHIAMATA"); // Log chiamata funzione
        if (!canvasGraficoRadar) {
            console.error("ERRORE: canvasGraficoRadar non trovato!");
            return; // Se il canvas non esiste, esci
        }

        const gareContributive = getGareContributiveConDettagli(); // Include HC, LIV1, LIV2, LIV3

        // Calcola la percentuale del potenziale VSR raggiunto per ciascuna categoria
        const datiPercentualePotenziale = [];
        const categorieRadar = ["HC", "LIV1", "LIV2", "LIV3"]; // Ordine per gli assi del radar

        categorieRadar.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];

            // Trova il valore numerico del livello dalla mappa
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            const totaleSlotCategoria = maxSlotPerFascia * 2; // Totale slot per categoria
            if (totaleSlotCategoria === 0 || !livelloValoreNumerico) {
                // Categorie senza slot o senza valore numerico non contribuiscono a questo radar
                datiPercentualePotenziale.push(0); // Mostra 0% per queste categorie nel radar
                return; // Passa alla prossima categoria
            }

            let puntiAttuali = 0;
            gareCat.forEach(g => {
                puntiAttuali += g.puntiEffettivi;
            });

            const potenzialeMaxCategoria = totaleSlotCategoria * livelloValoreNumerico; // Potenziale basato sul totale di 40 slot
            let percentualeRaggiunta = (potenzialeMaxCategoria > 0) ? (puntiAttuali / potenzialeMaxCategoria) * 100 : 0;

            datiPercentualePotenziale.push(Math.min(100, Math.max(0, percentualeRaggiunta))); // Clampa tra 0 e 100
        });

        // console.log("Dati per grafico radar (% Potenziale Raggiunto):", datiPercentualePotenziale); // Log dati calcolati

        const data = {
            labels: ['Fuori Cat.', 'Livello 1', 'Livello 2', 'Livello 3'], // Etichette per gli assi del radar
            datasets: [{
                label: '% Potenziale Raggiunto', // Etichetta aggiornata
                data: datiPercentualePotenziale, // Usa i nuovi dati
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blu chiaro
                borderColor: 'rgb(54, 162, 235)',         // Blu
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        };
        if (graficoRadarIstanza) {
            graficoRadarIstanza.data = data;
            graficoRadarIstanza.update();
            // console.log("Grafico radar AGGIORNATO con dati:", datiPercentualePotenziale);
            // console.log("Grafico radar AGGIORNATO con dati:", datiPercentualePotenziale);
        } else {
            graficoRadarIstanza = new Chart(canvasGraficoRadar, {
                type: 'radar',
                data: data,
                options: {
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            pointLabels: { font: { size: 13 } },
                            ticks: {
                                callback: function(value) {
                                    return value + "%"; // Aggiunge il simbolo % agli assi
                                }
                            }
                        }
                    },
                    elements: {
                        line: { borderWidth: 2 }
                    },
                    plugins: { // Aggiunto per nascondere la legenda
                        legend: {
                            display: false // Nasconde la legenda (rettangolino colorato ed etichetta)
                        }
                    }
                }
            });
            // console.log("Grafico radar CREATO", graficoRadarIstanza);
        }
    }

    // Salva i dati delle regate proposte nel dataset del tbody per poterli riutilizzare
    // quando si aggiorna la tabella dopo un'aggiunta.
    // Questa è una modifica alla funzione popolaTabellaElencoRegateSuggerite
    // da inserire prima del return se regateProposte.length === 0
    // e prima del forEach.
    // tbodyElencoRegateSuggerite.dataset.regateProposte = JSON.stringify(regateProposte);
    // Questa riga va inserita in popolaTabellaElencoRegateSuggerite

});
