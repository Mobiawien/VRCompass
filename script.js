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
    const tabellaClassificaVsr = document.getElementById('tabella-classifica-vsr');
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
    const btnApriModalElencoRegate = document.getElementById('btn-apri-modal-elenco-regate');
    const modalElencoRegate = document.getElementById('modal-elenco-regate');
    const btnChiudiModalElencoRegate = document.getElementById('btn-chiudi-modal-elenco-regate');
    const infoAggiornamentoElencoRegate = document.getElementById('info-aggiornamento-elenco-regate');
    const tbodyElencoRegateSuggerite = document.getElementById('tbody-elenco-regate-suggerite');

    // Titoli dinamici
    const titoloFormGara = document.getElementById('titolo-form-gara');

    // Dashboard - Gestione Dati
    const btnEsportaDati = document.getElementById('btn-esporta-dati');
    const fileImportaDatiInput = document.getElementById('file-importa-dati');
    const fileImportaRegateSuggeriteInput = document.getElementById('file-importa-regate-suggerite');
    const modaleAvvisoCaricamentoRegate = document.getElementById('modale-avviso-caricamento-regate');
    const btnChiudiModaleAvvisoRegate = document.getElementById('btn-chiudi-modale-avviso-regate');
    const btnConfermaCaricamentoRegate = document.getElementById('btn-conferma-caricamento-regate');
    const btnAnnullaCaricamentoRegate = document.getElementById('btn-annulla-caricamento-regate');
    const dataAggiornamentoFileRegateSpan = document.getElementById('data-aggiornamento-file-regate');
    let fileSelezionatoPerRegateSuggerite = null;

    // Analisi
    const analisiView = document.getElementById('analisi-view');
    const hcOccupati = document.getElementById('hc-occupati');
    const hcPuntiCategoria = document.getElementById('hc-punti-categoria');
    const hcPuntiAttuali = document.getElementById('hc-punti-attuali');
    const hcGareSlot = document.getElementById('hc-gare-slot');
    const hcProgressBar = document.getElementById('hc-progress-bar');
    const hcStackedPointsBarContainer = document.getElementById('hc-stacked-points-bar-container');
    const hcPointsBar100 = document.getElementById('hc-points-bar-100');
    const hcPointsBar50 = document.getElementById('hc-points-bar-50');
    const hcPointsBarEmpty = document.getElementById('hc-points-bar-empty');

    const liv1Occupati = document.getElementById('liv1-occupati');
    const liv1PuntiCategoria = document.getElementById('liv1-punti-categoria');
    const liv1MinPunti = document.getElementById('liv1-min-punti');
    const liv1GareSlot = document.getElementById('liv1-gare-slot');
    const liv1ProgressBar = document.getElementById('liv1-progress-bar');
    const liv1StackedPointsBarContainer = document.getElementById('liv1-stacked-points-bar-container');
    const liv1PointsBar100 = document.getElementById('liv1-points-bar-100');
    const liv1PointsBar50 = document.getElementById('liv1-points-bar-50');
    const liv1PointsBarEmpty = document.getElementById('liv1-points-bar-empty');

    const liv2Occupati = document.getElementById('liv2-occupati');
    const liv2PuntiCategoria = document.getElementById('liv2-punti-categoria');
    const liv2MinPunti = document.getElementById('liv2-min-punti');
    const liv2GareSlot = document.getElementById('liv2-gare-slot');
    const liv2ProgressBar = document.getElementById('liv2-progress-bar');
    const liv2StackedPointsBarContainer = document.getElementById('liv2-stacked-points-bar-container');
    const liv2PointsBar100 = document.getElementById('liv2-points-bar-100');
    const liv2PointsBar50 = document.getElementById('liv2-points-bar-50');
    const liv2PointsBarEmpty = document.getElementById('liv2-points-bar-empty');

    const liv3Occupati = document.getElementById('liv3-occupati');
    const liv3PuntiCategoria = document.getElementById('liv3-punti-categoria');
    const liv3MinPunti = document.getElementById('liv3-min-punti');
    const liv3GareSlot = document.getElementById('liv3-gare-slot');
    const liv3ProgressBar = document.getElementById('liv3-progress-bar');
    const liv3StackedPointsBarContainer = document.getElementById('liv3-stacked-points-bar-container');
    const liv3PointsBar100 = document.getElementById('liv3-points-bar-100');
    const liv3PointsBar50 = document.getElementById('liv3-points-bar-50');
    const liv3PointsBarEmpty = document.getElementById('liv3-points-bar-empty');

    const listaSuggerimentiSlot = document.getElementById('lista-suggerimenti-slot');
    const listaGareDimezzamento = document.getElementById('lista-gare-dimezzamento');
    const listaGareScadenza = document.getElementById('lista-gare-scadenza');

    // Strategia
    const strategiaView = document.getElementById('strategia-view');
    const listaSuggerimentiStrategiciSlot = document.getElementById('lista-suggerimenti-strategici-slot');

    // Grafico Radar Dashboard
    const canvasGraficoRadar = document.getElementById('graficoRadarSaluteSlot');
    let graficoRadarIstanza = null;

    // Grafico Torta Strategia
    const canvasGraficoTorta = document.getElementById('graficoTortaComposizioneVSR');
    let graficoTortaIstanza = null;

    // --- Dati Premi ---
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
    let livelloGara = null;
    let classificaFinale = 0;
    let classificaFinaleModificataManualmente = false;
    let vistaStoricoAttuale = 'valide';
    let idGaraInModifica = null;

    const livelliVsrStoricoMap = {
        "0": { testo: "Seleziona Livello VSR", valoreNumerico: null, tipo: "N/D", chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_DEFAULT" },
        "HC": { testo: "Fuori Categoria", valoreNumerico: 15000, tipo: "HC", chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_HC" },
        "LIV1": { testo: "Livello 1", valoreNumerico: 10000, tipo: "LIV1", chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L1" },
        "LIV2": { testo: "Livello 2", valoreNumerico: 5000, tipo: "LIV2", chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L2" },
        "LIV3": { testo: "Livello 3", valoreNumerico: 3000, tipo: "LIV3", chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L3" }
    };

    const LIMITI_GARE_PER_CATEGORIA = { "HC": 1, "LIV1": 3, "LIV2": 6, "LIV3": 10 };
    let potenzialePuntiPerGraficoTorta = {};
    let totalePotenzialePuntiPerGraficoTorta = 1;
    const URL_ELENCO_REGATE = 'https://raw.githubusercontent.com/Mobiawien/VRCompass/main/elenco_regate.json';

    let currentLanguage = 'it';
    let translations = {};
    const DEFAULT_LANGUAGE = 'it';
    const languageSelector = document.getElementById('language-selector');
    const mappaTestoLabelGraficoATipoGara = {};

    Object.values(livelliVsrStoricoMap).forEach(level => {
        if (level.chiaveTraduzione && level.tipo !== "N/D") {
            // Questa mappa verrà popolata correttamente dopo il caricamento delle traduzioni
            // Per ora, la lasciamo così, e la useremo quando getTranslation è disponibile
        }
    });

    const SOGLIA_DEBOLEZZA = { "15000": 0.50, "10000": 0.40, "5000": 0.30, "3000": 0.25 };
    let inputClassificaTab3Ref = null;
    let cellaCreditiTab3Ref = null;
    let cellaNettoTab3Ref = null;
    let cellaPuntiTab3Ref = null;

    // --- Funzioni Helper Globali per Calcoli VSR ---
    function calcolaPuntiPerClassifica(livelloValoreNumerico, classifica) {
        if (!livelloValoreNumerico || classifica <= 0) return 0;
        return Math.round(livelloValoreNumerico / Math.pow(classifica, 0.125));
    }

    function calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiVsrTarget) {
        if (!livelloValoreNumerico || puntiVsrTarget <= 0) return null;
        if (puntiVsrTarget >= livelloValoreNumerico) return 1;
        const rapporto = livelloValoreNumerico / puntiVsrTarget;
        const classificaCalcolata = Math.pow(rapporto, 8);
        return Math.max(1, Math.floor(classificaCalcolata));
    }

    // --- Funzioni Helper ---
    function formatNumber(num, decimalPlaces = 0) {
        if (num === null || num === undefined || isNaN(num)) return getTranslation('TEXT_NA_DETAILED');
        const numLocale = currentLanguage === 'it' ? 'it-IT' : 'en-US'; // Scegli il locale in base alla lingua
        if (decimalPlaces === 0) {
            return Math.round(num).toLocaleString(numLocale);
        } else {
            return num.toLocaleString(numLocale, {
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
        let mesi = (oggi.getFullYear() - dataGara.getFullYear()) * 12;
        mesi -= dataGara.getMonth();
        mesi += oggi.getMonth();
        if (oggi.getDate() < dataGara.getDate()) mesi--;
        return mesi < 0 ? 0 : mesi;
    }

    function calcolaGiorniTraDate(data1, data2) {
        const unGiorno = 24 * 60 * 60 * 1000;
        const primaData = new Date(data1);
        const secondaData = new Date(data2);
        primaData.setHours(0,0,0,0);
        secondaData.setHours(0,0,0,0);
        return Math.round((secondaData - primaData) / unGiorno);
    }

    // --- Funzioni di Navigazione e Inizializzazione ---
    function handleNavClick(event) {
        if (!event.currentTarget || !event.currentTarget.id) return;
        const targetButtonId = event.currentTarget.id;
        const targetViewId = targetButtonId.replace('btn-show-', '') + '-view';

        viewSections.forEach(section => section.style.display = 'none');
        mainNavButtons.forEach(button => button.classList.remove('active'));

        const targetSection = document.getElementById(targetViewId);
        if (targetSection) {
            targetSection.style.display = 'block';
            event.currentTarget.classList.add('active');

            // Chiamate per aggiornare il contenuto dinamico della sezione attivata
            try {
                switch (targetViewId) {
                    case 'dashboard-view':
                        aggiornaInfoClassificaView(); // Aggiorna il punteggio VSR visualizzato
                        aggiornaGraficoRadarSaluteSlot();
                        break;
                    case 'gestione-crediti-view':
                        aggiornaTabella2(); // Assicura che la logica di selezione della categoria sia riflessa
                        aggiornaTabella3(); // Ricostruisce la tabella con le opzioni select tradotte
                        break;
                    case 'classifica-vsr-view':
                        // La logica di quale filtro è attivo e come visualizzare il form/tabella
                        // è gestita da `impostaFiltro` e dallo stato di `vistaStoricoAttuale`.
                        // Qui ci assicuriamo solo che la tabella e le info siano aggiornate.
                        aggiornaInfoClassificaView();
                        aggiornaTestiPulsantiFormGara(); // Per il testo del pulsante Modifica/Aggiungi
                        aggiornaTabellaGare(); // Questo aggiornerà la tabella in base a vistaStoricoAttuale
                        break;
                    case 'analisi-view':
                        aggiornaSezioneAnalisi(); // Chiama aggiornaPanoramicaSlotVSR()
                        break;
                    case 'strategia-view':
                        aggiornaSezioneStrategia(); // Chiama aggiornaMonitoraggioScadenze e aggiornaValutazioneStrategicaSlot
                        aggiornaGraficoTortaStatoStrategia();
                        break;
                }
            } catch (error) {
                console.error(`Errore durante l'aggiornamento della sezione ${targetViewId}:`, error);
                // Potresti voler mostrare un messaggio all'utente qui
            }
        }
    }

    async function init() {
        await initI18n(); // Questo chiamerà setLanguage, che a sua volta chiamerà handleNavClick per la dashboard
        // La chiamata a handleNavClick per la dashboard è ora gestita da setLanguage -> initI18n
        // const initialButton = document.getElementById('btn-show-dashboard');
        // if (initialButton) {
        //     // Simula un click per attivare la sezione e il suo contenuto
        //     handleNavClick({ currentTarget: initialButton });
        // }

        caricaDatiDashboard(); // Carica nome barca, ecc.
        // Le seguenti sono già coperte da handleNavClick o sono specifiche di altre sezioni
        // aggiornaPunteggioVsrTotale(); // Chiamato da aggiornaTabellaGare o altre azioni
        // aggiornaInfoClassificaView(); // Chiamato da handleNavClick per dashboard e VSR
        // aggiornaTabella2(); // Chiamato da handleNavClick per gestione-crediti
        // aggiornaTabella3(); // Chiamato da handleNavClick per gestione-crediti
        setupCalcolatriceListeners();
        if (btnMostraTutteGare && btnMostraGareValide && btnStoricoHC && btnStoricoLiv1 && btnStoricoLiv2 && btnStoricoLiv3) {
            // Assicurati che il filtro di default sia applicato correttamente se necessario
            setupFiltriStoricoListeners();
        }
        setupClassificaListeners();
        setupDashboardListeners();
        if (btnEsportaDati) btnEsportaDati.addEventListener('click', esportaDati);
        if (fileImportaDatiInput) fileImportaDatiInput.addEventListener('change', importaDati);
        if (fileImportaRegateSuggeriteInput) fileImportaRegateSuggeriteInput.addEventListener('change', preparaImportazioneRegateSuggerite);
        setupModaleAvvisoRegateListeners();
        if (btnApriModalElencoRegate) btnApriModalElencoRegate.addEventListener('click', apriEPopolaModalElencoRegate);
        // aggiornaSezioneAnalisi(); // Chiamato da handleNavClick
        // aggiornaSezioneStrategia(); // Chiamato da handleNavClick
        // aggiornaGraficoRadarSaluteSlot(); // Chiamato da handleNavClick
        if (btnChiudiModalElencoRegate) btnChiudiModalElencoRegate.addEventListener('click', chiudiModalElencoRegate);
        if (modalElencoRegate) modalElencoRegate.addEventListener('click', (event) => { if (event.target === modalElencoRegate) chiudiModalElencoRegate(); });
    }

    // --- Funzioni di Internazionalizzazione (i18n) ---
    function getTranslation(key, variables = {}) {
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            let translatedString = translations[currentLanguage][key];
            for (const varName in variables) {
                const regex = new RegExp(`{{${varName}}}`, 'g');
                translatedString = translatedString.replace(regex, variables[varName]);
            }
            return translatedString;
        }
        console.warn(`Traduzione mancante per la chiave '${key}' in ${currentLanguage}. Restituisco la chiave.`);
        return key;
    }

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`${lang}.json`);
            if (!response.ok) throw new Error(`Errore nel caricamento del file di traduzione per ${lang}: ${response.statusText}`);
            translations[lang] = await response.json();
            console.log(`Traduzioni per ${lang} caricate.`);
            // Popola mappaTestoLabelGraficoATipoGara dopo aver caricato le traduzioni
            Object.values(livelliVsrStoricoMap).forEach(level => {
                if (level.chiaveTraduzione && level.tipo !== "N/D") {
                    mappaTestoLabelGraficoATipoGara[getTranslation(level.chiaveTraduzione)] = level.tipo;
                }
            });
            applyTranslations();
        } catch (error) {
            console.error(`Impossibile caricare le traduzioni per ${lang}:`, error);
            if (lang !== DEFAULT_LANGUAGE) {
                console.warn(`Torno alla lingua di default (${DEFAULT_LANGUAGE})`);
                await setLanguage(DEFAULT_LANGUAGE);
            }
        }
    }

    function applyTranslations() {
        if (!translations[currentLanguage]) return;
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            const translation = getTranslation(key);
            if (element.tagName === 'TITLE') document.title = translation;
            else if (element.tagName === 'INPUT' && element.placeholder) element.placeholder = translation;
            else element.innerHTML = translation;
        });
        // Aggiorna solo testi semplici che non richiedono ricostruzione del DOM complesso
        aggiornaTestiPulsantiFormGara();
        // Le chiamate per aggiornare tabelle, grafici, ecc., sono ora in handleNavClick
        // e verranno eseguite DOPO che setLanguage ha riattivato la sezione corretta.
    }

    async function setLanguage(lang) {
        // Memorizza l'ID del pulsante di navigazione attualmente attivo
        // PRIMA di cambiare lingua e applicare le traduzioni.
        let currentActiveButtonId = null;
        const activeButtonBeforeChange = document.querySelector('nav > .nav-button.active');
        if (activeButtonBeforeChange) {
            currentActiveButtonId = activeButtonBeforeChange.id;
        }

        currentLanguage = lang;
        localStorage.setItem('vrCompassLanguage', lang);
        if (languageSelector) languageSelector.value = lang;
        document.documentElement.lang = lang;
        await loadTranslations(lang); // Questo ora chiamerà applyTranslations internamente

        // DOPO che le traduzioni sono state applicate, ripristina la vista
        // basandoti sul pulsante che ERA attivo, con un piccolo ritardo.
        setTimeout(() => {
            const buttonToReactivate = currentActiveButtonId ? document.getElementById(currentActiveButtonId) : document.getElementById('btn-show-dashboard');
            if (buttonToReactivate) handleNavClick({ currentTarget: buttonToReactivate });
        }, 0); // Un ritardo di 0ms è spesso sufficiente per spostare l'esecuzione alla fine della coda degli eventi.
    }
    async function initI18n() {
        const savedLang = localStorage.getItem('vrCompassLanguage') || DEFAULT_LANGUAGE;
        await setLanguage(savedLang);
        if (languageSelector) languageSelector.addEventListener('change', (event) => setLanguage(event.target.value));
    }

    function aggiornaTestiPulsantiFormGara() {
        const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
        if (submitButton) submitButton.textContent = idGaraInModifica ? getTranslation('BTN_SAVE_CHANGES') : getTranslation('BTN_ADD_RACE');
        if (titoloFormGara) titoloFormGara.textContent = idGaraInModifica ? getTranslation('FORM_TITLE_EDIT_RACE') : getTranslation('FORM_TITLE_ADD_RACE');
    }

    // --- Funzioni Dashboard ---
    function setupDashboardListeners() {
        if (nomeBarcaInput) nomeBarcaInput.addEventListener('input', () => { salvaDatiDashboard(); aggiornaInfoClassificaView(); });
    }

    function caricaDatiDashboard() {
        if (nomeBarcaInput) nomeBarcaInput.value = localStorage.getItem('nomeBarca') || '';
        aggiornaInfoClassificaView();
    }

    function salvaDatiDashboard() {
        if (nomeBarcaInput) localStorage.setItem('nomeBarca', nomeBarcaInput.value);
    }

    function aggiornaInfoClassificaView() {
        const nomeBarca = localStorage.getItem('nomeBarca') || getTranslation('TEXT_NA');
        const classificaVsrRaw = localStorage.getItem('classificaVsrAttuale') || '0';
        const classificaVsrNum = parseFloat(classificaVsrRaw) || 0;
        if (nomeBarcaDisplay) nomeBarcaDisplay.textContent = nomeBarca;
        if (classificaVsrAttualeDisplay) classificaVsrAttualeDisplay.textContent = formatNumber(classificaVsrNum, 0);
        if (classificaVsrAttualeInput) classificaVsrAttualeInput.textContent = formatNumber(classificaVsrNum, 0);
    }

    // --- Funzioni Calcolatrice Gara ---
    function setupCalcolatriceListeners() {
        tabella1.querySelectorAll('th.categoria-cell').forEach(th => th.addEventListener('click', () => selezionaCategoria(th.dataset.categoria)));
        tabella1.querySelectorAll('td.attrezzatura-cell').forEach(td => td.addEventListener('click', () => toggleAttrezzatura(td)));
        if (inputBonusTotale) inputBonusTotale.addEventListener('input', handleBonusInputChange);
        if (fileImportaRegateSuggeriteInput) fileImportaRegateSuggeriteInput.addEventListener('change', preparaImportazioneRegateSuggerite);
        setupModaleAvvisoRegateListeners();
        if (btnApriModalElencoRegate) btnApriModalElencoRegate.addEventListener('click', apriEPopolaModalElencoRegate);
        if (btnChiudiModalElencoRegate) btnChiudiModalElencoRegate.addEventListener('click', chiudiModalElencoRegate);
        if (modalElencoRegate) modalElencoRegate.addEventListener('click', (event) => { if (event.target === modalElencoRegate) chiudiModalElencoRegate(); });
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
            alert(getTranslation('ALERT_SELECT_CATEGORY_FIRST'));
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
            if(outputCatEcon) outputCatEcon.textContent = getTranslation('TEXT_NA');
            if(inputBonusTotale) inputBonusTotale.value = 0;
            if(outputSpesa) outputSpesa.textContent = getTranslation('TEXT_NA');
            if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = getTranslation('TEXT_NA');
            if(outputPosRecupero) outputPosRecupero.textContent = getTranslation('TEXT_NA');
            bonusExtra = 0;
            return;
        }
        const bonusTotaleCorrente = bonusBase + bonusExtra;
        const spesaEffettiva = Math.max(0, spesaAttrezzature - bonusTotaleCorrente);
        const posRecuperoNumerica = calcolaPosizioneRecupero(spesaEffettiva);
        if(outputCatEcon) outputCatEcon.textContent = categoriaSelezionata;
        if(inputBonusTotale) inputBonusTotale.title = `Bonus base: ${bonusBase}`;
        if(outputSpesa) outputSpesa.textContent = formatNumber(spesaAttrezzature, 0);
        if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = formatNumber(spesaEffettiva, 0);
        if(outputPosRecupero) {
            if (spesaEffettiva <= 0 && posRecuperoNumerica !== null) {
                outputPosRecupero.textContent = formatNumber(posRecuperoNumerica, 0);
                 outputPosRecupero.classList.remove('important-result');
                 outputPosRecupero.classList.add('profit-result');
            } else {
                outputPosRecupero.textContent = posRecuperoNumerica !== null && posRecuperoNumerica > 0 ? formatNumber(posRecuperoNumerica, 0) : (posRecuperoNumerica === 0 ? "0" : getTranslation('TEXT_NA'));
                outputPosRecupero.classList.remove('profit-result');
                if (posRecuperoNumerica !== null && posRecuperoNumerica > 0) outputPosRecupero.classList.add('important-result');
                else outputPosRecupero.classList.remove('important-result');
            }
        }
        if (!classificaFinaleModificataManualmente) classificaFinale = (posRecuperoNumerica !== null && posRecuperoNumerica > 0) ? posRecuperoNumerica : 0;
    }

    function ricalcolaRisultatiTabella3() {
        if (!categoriaSelezionata || !cellaCreditiTab3Ref || !cellaNettoTab3Ref || !cellaPuntiTab3Ref) {
            if (cellaCreditiTab3Ref) cellaCreditiTab3Ref.textContent = getTranslation('TEXT_NA_DETAILED');
            if (cellaNettoTab3Ref) cellaNettoTab3Ref.textContent = getTranslation('TEXT_NA_DETAILED');
            if (cellaPuntiTab3Ref) cellaPuntiTab3Ref.textContent = getTranslation('TEXT_NA_DETAILED');
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
            { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_DEFAULT", valore: "" },
            { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_HC", valore: "HC" },
            { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L1", valore: "LIV1" },
            { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L2", valore: "LIV2" },
            { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L3", valore: "LIV3" }
        ];
        opzioniLivelloGara.forEach(opzione => {
            const option = document.createElement('option');
            option.value = opzione.valore;
            option.textContent = getTranslation(opzione.chiaveTesto);
            if (opzione.valore === "") {
                option.disabled = true;
                option.selected = livelloGara === null;
            } else if (livelliVsrStoricoMap[opzione.valore]) {
                option.selected = livelloGara === livelliVsrStoricoMap[opzione.valore].valoreNumerico;
            }
            selectLivello.appendChild(option);
        });
        selectLivello.addEventListener('change', (e) => {
            const selectedKey = e.target.value;
            livelloGara = (selectedKey && livelliVsrStoricoMap[selectedKey]) ? livelliVsrStoricoMap[selectedKey].valoreNumerico : null;
            ricalcolaRisultatiTabella3();
        });
        cellaLivello.appendChild(selectLivello);
        const cellaClassifica = row.insertCell(1);
        inputClassificaTab3Ref = document.createElement('input');
        inputClassificaTab3Ref.type = 'number';
        inputClassificaTab3Ref.value = classificaFinale > 0 ? classificaFinale : '';
        inputClassificaTab3Ref.min = "1";
        inputClassificaTab3Ref.placeholder = getTranslation('PLACEHOLDER_POSITION');
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
        if (!premiCat || typeof premiCat["1"] === 'undefined') return null;
        const premMax = premiCat["1"];
        let posRec = 1000000;
        while (posRec > 0) {
            const creditiVintiStimati = premMax / Math.pow(posRec, 0.4);
            const nettoCreditiStimato = creditiVintiStimati - spesaEffettiva;
            if (Math.round(nettoCreditiStimato) >= 0) return posRec;
            posRec--;
        }
        return 0;
    }

    // --- Funzioni Gestione Classifica VSR ---
    function setupClassificaListeners() {
        formAggiungiGara.addEventListener('submit', handleSubmitGara);
        if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.readOnly = true;
        livelloGaraVsrStoricoSelect.addEventListener('change', calcolaEPopolaPuntiVSRStorico);
        classificaFinaleStoricoInput.addEventListener('input', calcolaEPopolaPuntiVSRStorico);
        classificaVsrtbody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) eliminaGara(idGara);
            } else if (event.target.classList.contains('edit-btn')) {
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) popolaFormPerModifica(idGara);
            }
        });
        const formInputs = [dataGaraInput, livelloGaraVsrStoricoSelect, nomeRegataInput, classificaFinaleStoricoInput];
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (vistaStoricoAttuale === 'valide' && btnMostraTutteGare) {
                    if (formAggiungiGara) formAggiungiGara.style.display = 'block';
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
        const tuttiIBottoniFiltro = [btnMostraGareValide, btnMostraTutteGare, btnStoricoHC, btnStoricoLiv1, btnStoricoLiv2, btnStoricoLiv3];
        function impostaFiltro(nuovaVista, bottoneAttivo) {
            vistaStoricoAttuale = nuovaVista;
            tuttiIBottoniFiltro.forEach(btn => btn.classList.remove('active'));
            if (bottoneAttivo) bottoneAttivo.classList.add('active');
            rimuoviEvidenziazioneTutteLeRighe();
            if (formAggiungiGara) formAggiungiGara.reset();
            if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.value = '';
            idGaraInModifica = null;
            aggiornaTestiPulsantiFormGara();
            if (nuovaVista === 'valide') {
                if (formAggiungiGara) formAggiungiGara.style.display = 'none';
                if (titoloFormGara) titoloFormGara.style.display = 'none';
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = 'none';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
            } else {
                if (formAggiungiGara) formAggiungiGara.style.display = 'block'; // Assicurati che sia 'block' o il display corretto
                if (titoloFormGara) {
                    titoloFormGara.style.display = 'block'; // Assicurati che sia 'block' o il display corretto
                    // Il titolo verrà aggiornato da aggiornaTestiPulsantiFormGara
                }
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = '';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
            }
            aggiornaTabellaGare();
        }
        if (btnMostraGareValide) btnMostraGareValide.addEventListener('click', () => impostaFiltro('valide', btnMostraGareValide));
        if (btnMostraTutteGare) btnMostraTutteGare.addEventListener('click', () => impostaFiltro('tutte', btnMostraTutteGare));
        if (btnStoricoHC) btnStoricoHC.addEventListener('click', () => impostaFiltro('storico_hc', btnStoricoHC));
        if (btnStoricoLiv1) btnStoricoLiv1.addEventListener('click', () => impostaFiltro('storico_liv1', btnStoricoLiv1));
        if (btnStoricoLiv2) btnStoricoLiv2.addEventListener('click', () => impostaFiltro('storico_liv2', btnStoricoLiv2));
        if (btnStoricoLiv3) btnStoricoLiv3.addEventListener('click', () => impostaFiltro('storico_liv3', btnStoricoLiv3));
    }

    function calcolaEPopolaPuntiVSRStorico() {
        const livelloSelezionatoValue = livelloGaraVsrStoricoSelect.value;
        const classifica = parseInt(classificaFinaleStoricoInput.value);
        if (livelloSelezionatoValue && livelloSelezionatoValue !== "0" && !isNaN(classifica) && classifica > 0) {
            const categoriaInfo = livelliVsrStoricoMap[livelloSelezionatoValue];
            if (categoriaInfo && categoriaInfo.valoreNumerico !== null) {
                const puntiVSRCalc = categoriaInfo.valoreNumerico / Math.pow(classifica, 0.125);
                puntiVsrCalcolatiInput.value = Math.round(puntiVSRCalc);
            } else puntiVsrCalcolatiInput.value = '';
        } else puntiVsrCalcolatiInput.value = '';
    }

    function popolaFormPerModifica(idGara) {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const garaDaModificare = gareSalvate.find(g => g.id === idGara);
        if (garaDaModificare) {
            if (vistaStoricoAttuale === 'valide') {
                vistaStoricoAttuale = 'tutte';
                const tuttiIBottoniFiltro = [btnMostraGareValide, btnMostraTutteGare, btnStoricoHC, btnStoricoLiv1, btnStoricoLiv2, btnStoricoLiv3];
                tuttiIBottoniFiltro.forEach(btn => btn.classList.remove('active'));
                if (btnMostraTutteGare) btnMostraTutteGare.classList.add('active');
            }
            if (vistaStoricoAttuale !== 'valide') {
                if (formAggiungiGara) formAggiungiGara.style.display = 'block';
                if (titoloFormGara) titoloFormGara.style.display = 'block';
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = '';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                aggiornaTabellaGare();
            }
            idGaraInModifica = idGara;
            rimuoviEvidenziazioneTutteLeRighe();
            const rigaDaEvidenziare = classificaVsrtbody.querySelector(`button.edit-btn[data-id="${idGara}"]`)?.closest('tr');
            if (rigaDaEvidenziare) rigaDaEvidenziare.classList.add('riga-in-modifica');
            dataGaraInput.value = garaDaModificare.data;
            livelloGaraVsrStoricoSelect.value = garaDaModificare.livello;
            nomeRegataInput.value = garaDaModificare.nome;
            classificaFinaleStoricoInput.value = garaDaModificare.classificaFinale;
            calcolaEPopolaPuntiVSRStorico();
            aggiornaTestiPulsantiFormGara();
            setTimeout(() => { if(formAggiungiGara) formAggiungiGara.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
        } else {
            console.error("Gara non trovata per la modifica:", idGara);
            alert(getTranslation('ALERT_RACE_NOT_FOUND_FOR_EDIT'));
        }
    }

    function handleSubmitGara(event) {
        event.preventDefault();
        const dataGara = dataGaraInput.value;
        const livelloGaraStoricoVal = livelloGaraVsrStoricoSelect.value;
        const nomeRegata = nomeRegataInput.value.trim();
        const classificaFinaleStorico = parseInt(classificaFinaleStoricoInput.value);
        const puntiVSR = parseFloat(puntiVsrCalcolatiInput.value);
        if (!dataGara || livelloGaraStoricoVal === "0" || !nomeRegata || isNaN(classificaFinaleStorico) || classificaFinaleStorico <= 0 || isNaN(puntiVSR)) {
            alert(getTranslation('ALERT_FILL_ALL_FIELDS_CORRECTLY'));
            return;
        }
        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (idGaraInModifica !== null) {
            const index = gareSalvate.findIndex(g => g.id === idGaraInModifica);
            if (index !== -1) {
                gareSalvate[index] = { ...gareSalvate[index], data: dataGara, livello: livelloGaraStoricoVal, nome: nomeRegata, classificaFinale: classificaFinaleStorico, puntiVSR: puntiVSR };
            }
            idGaraInModifica = null;
        } else {
            const nuovaGara = { id: Date.now(), data: dataGara, livello: livelloGaraStoricoVal, nome: nomeRegata, classificaFinale: classificaFinaleStorico, puntiVSR: puntiVSR };
            gareSalvate.push(nuovaGara);
        }
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        rimuoviEvidenziazioneTutteLeRighe();
        aggiornaSezioneAnalisi();
        aggiornaSezioneStrategia();
        aggiornaGraficoTortaStatoStrategia();
        aggiornaGraficoRadarSaluteSlot();
        aggiornaPunteggioVsrTotale();
        formAggiungiGara.reset();
        puntiVsrCalcolatiInput.value = '';
        aggiornaTestiPulsantiFormGara(); // Assicura che il titolo e il pulsante tornino corretti
    }

    function selezionaGareContributivePerClassifica(gareSalvateRaw) {
        const gareRecenti = []; const gareMenoRecenti = [];
        gareSalvateRaw.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let fattoreDecadimento = 0;
            if (mesiTrascorsi < 12) fattoreDecadimento = 1.0;
            else if (mesiTrascorsi < 24) fattoreDecadimento = 0.5;
            const infoLivello = livelliVsrStoricoMap[gara.livello];
            if (fattoreDecadimento > 0 && gara.puntiVSR > 0 && infoLivello) {
                const garaConPuntiEffettivi = { ...gara, puntiEffettivi: Math.round(gara.puntiVSR * fattoreDecadimento), fattoreDecadimento: fattoreDecadimento, mesiTrascorsi: mesiTrascorsi, tipoGara: infoLivello.tipo };
                if (mesiTrascorsi < 12) gareRecenti.push(garaConPuntiEffettivi);
                else gareMenoRecenti.push(garaConPuntiEffettivi);
            }
        });
        const gareRecentiRaggruppate = {}; const gareMenoRecentiRaggruppate = {};
        Object.values(livelliVsrStoricoMap).filter(l => l.tipo !== "N/D").forEach(l => {
            gareRecentiRaggruppate[l.tipo] = [];
            gareMenoRecentiRaggruppate[l.tipo] = [];
        });
        gareRecenti.forEach(gara => { if (gareRecentiRaggruppate.hasOwnProperty(gara.tipoGara)) gareRecentiRaggruppate[gara.tipoGara].push(gara); });
        gareMenoRecenti.forEach(gara => { if (gareMenoRecentiRaggruppate.hasOwnProperty(gara.tipoGara)) gareMenoRecentiRaggruppate[gara.tipoGara].push(gara); });
        const gareContributiveFinali = {};
        Object.values(livelliVsrStoricoMap).filter(l => l.tipo !== "N/D").forEach(l => gareContributiveFinali[l.tipo] = []);
        for (const tipo in LIMITI_GARE_PER_CATEGORIA) {
            if (LIMITI_GARE_PER_CATEGORIA.hasOwnProperty(tipo)) {
                const limite = LIMITI_GARE_PER_CATEGORIA[tipo];
                const miglioriRecenti = (gareRecentiRaggruppate[tipo] || []).sort((a, b) => b.puntiEffettivi !== a.puntiEffettivi ? b.puntiEffettivi - a.puntiEffettivi : new Date(b.data) - new Date(a.data)).slice(0, limite);
                const miglioriMenoRecenti = (gareMenoRecentiRaggruppate[tipo] || []).sort((a, b) => b.puntiEffettivi !== a.puntiEffettivi ? b.puntiEffettivi - a.puntiEffettivi : new Date(b.data) - new Date(a.data)).slice(0, limite);
                gareContributiveFinali[tipo] = miglioriRecenti.concat(miglioriMenoRecenti);
            }
        }
        for (const tipo in gareContributiveFinali) { if (gareContributiveFinali.hasOwnProperty(tipo)) gareContributiveFinali[tipo].sort((a, b) => b.puntiEffettivi - a.puntiEffettivi); }
        return gareContributiveFinali;
    }

    function getContributingGareIds() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) return new Set();
        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        const contributingIds = new Set();
        for (const tipoGara in LIMITI_GARE_PER_CATEGORIA) {
             if (gareContributive.hasOwnProperty(tipoGara)) gareContributive[tipoGara].forEach(gara => contributingIds.add(gara.id));
        }
        return contributingIds;
    }

    function aggiornaTabellaGare() {
        let gareDaMostrare = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        classificaVsrtbody.innerHTML = '';
        let livelloPrecedentePerSeparatore = null;
        const headerAzioni = document.getElementById('header-colonna-azioni');
        if (tabellaClassificaVsr) {
            if (vistaStoricoAttuale === 'valide') {
                tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
                if (headerAzioni) headerAzioni.style.display = 'none';
            } else {
                tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                if (headerAzioni) headerAzioni.style.display = '';
            }
        }
        let contributingGareIds = new Set();
        if (vistaStoricoAttuale === 'valide') {
            const gareContributivePerClassifica = selezionaGareContributivePerClassifica(gareDaMostrare);
            let gareFiltrateEOrdinate = [];
            const ordineVisualizzazioneTipi = ["HC", "LIV1", "LIV2", "LIV3"];
            ordineVisualizzazioneTipi.forEach(tipoGara => {
                if (gareContributivePerClassifica.hasOwnProperty(tipoGara)) gareFiltrateEOrdinate = gareFiltrateEOrdinate.concat(gareContributivePerClassifica[tipoGara]);
            });
            gareDaMostrare = gareFiltrateEOrdinate;
            contributingGareIds = getContributingGareIds();
        } else if (vistaStoricoAttuale === 'tutte') {
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        } else if (vistaStoricoAttuale.startsWith('storico_')) {
            const tipoFiltro = vistaStoricoAttuale.split('_')[1].toUpperCase();
            gareDaMostrare = gareDaMostrare.filter(gara => {
                const infoLivello = livelliVsrStoricoMap[gara.livello];
                return infoLivello && infoLivello.tipo === tipoFiltro;
            });
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        } else {
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        }
        gareDaMostrare.forEach(gara => {
            const row = classificaVsrtbody.insertRow();
            const infoLivelloGara = livelliVsrStoricoMap[gara.livello];
            const tipoGaraCorrente = infoLivelloGara ? infoLivelloGara.tipo : 'N/D';
            if (vistaStoricoAttuale === 'valide' && tipoGaraCorrente !== livelloPrecedentePerSeparatore) {
                if (livelloPrecedentePerSeparatore !== null) row.classList.add('nuovo-gruppo-livello');
                livelloPrecedentePerSeparatore = tipoGaraCorrente;
            }
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let statoPunti = ""; let classeStato = ""; let inPreavvisoTesto = "";
            if (mesiTrascorsi < 12) {
                statoPunti = "100%"; classeStato = "stato-100";
                if (mesiTrascorsi >= 9) { row.classList.add('in-preavviso'); inPreavvisoTesto = ` ${getTranslation('VSR_TABLE_STATUS_WARNING_SUFFIX')}`; }
            } else if (mesiTrascorsi < 24) {
                statoPunti = "50%"; classeStato = "stato-50";
                if (mesiTrascorsi >= 21) { row.classList.add('in-preavviso'); inPreavvisoTesto = ` ${getTranslation('VSR_TABLE_STATUS_WARNING_SUFFIX')}`; }
            } else { statoPunti = "Scaduta"; classeStato = "stato-scaduta"; }
            if (vistaStoricoAttuale !== 'valide' && classeStato !== "stato-scaduta" && contributingGareIds && !contributingGareIds.has(gara.id)) {
                classeStato = "stato-scaduta"; row.classList.remove('in-preavviso'); inPreavvisoTesto = "";
            }
            row.classList.add(classeStato);
            const [year, month, day] = gara.data.split('-');
            row.insertCell(0).textContent = `${day}/${month}/${year}`;
            row.insertCell(1).textContent = gara.nome;
            row.insertCell(2).textContent = infoLivelloGara ? getTranslation(infoLivelloGara.chiaveTraduzione) : gara.livello;
            row.insertCell(3).textContent = gara.classificaFinale;
            let puntiDaMostrare; let colorePunti = '';
            if (vistaStoricoAttuale === 'valide') {
                puntiDaMostrare = gara.puntiEffettivi;
                if (gara.fattoreDecadimento === 0.5 || puntiDaMostrare < 0) colorePunti = 'red';
                else if (puntiDaMostrare >= 0) colorePunti = 'green';
            } else {
                puntiDaMostrare = gara.puntiVSR;
                if (classeStato !== "stato-scaduta" && puntiDaMostrare >= 0) colorePunti = 'green';
                else if (puntiDaMostrare < 0 && classeStato !== "stato-scaduta") colorePunti = 'red';
            }
            const puntiFormatted = puntiDaMostrare >= 0 ? `+${formatNumber(Math.round(puntiDaMostrare), 0)}` : formatNumber(Math.round(puntiDaMostrare), 0);
            const cellPunti = row.insertCell(4);
            cellPunti.textContent = puntiFormatted;
            if (colorePunti) cellPunti.style.color = colorePunti;
            const cellaStatoPunti = row.insertCell(5);
            let testoStato = (vistaStoricoAttuale === 'valide' ? statoPunti : '') + inPreavvisoTesto.trim();
            if (vistaStoricoAttuale !== 'valide' && classeStato === 'stato-scaduta' && !contributingGareIds.has(gara.id)) {
                 testoStato = getTranslation('VSR_TABLE_STATUS_NOT_CONTRIBUTING');
            }
            cellaStatoPunti.textContent = testoStato;
            if (vistaStoricoAttuale !== 'valide') {
                const cellaAzioni = row.insertCell(6);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = getTranslation('BTN_DELETE');
                deleteButton.classList.add('delete-btn');
                deleteButton.dataset.id = gara.id;
                cellaAzioni.appendChild(deleteButton);
                const editButton = document.createElement('button');
                editButton.textContent = getTranslation('BTN_EDIT');
                editButton.classList.add('edit-btn');
                editButton.dataset.id = gara.id;
                cellaAzioni.appendChild(editButton);
            }
        });
    }

    function eliminaGara(idGara) {
        if (!confirm(getTranslation('CONFIRM_DELETE_RACE'))) return;
        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        gareSalvate = gareSalvate.filter(g => g.id !== idGara);
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        aggiornaPunteggioVsrTotale();
        aggiornaGraficoTortaStatoStrategia();
        aggiornaGraficoRadarSaluteSlot();
        aggiornaSezioneAnalisi();
        aggiornaSezioneStrategia(); // Aggiunto per aggiornare anche i suggerimenti strategici
    }

    function aggiornaPunteggioVsrTotale() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) {
            if (classificaVsrAttualeInput) classificaVsrAttualeInput.textContent = formatNumber(0, 0);
            localStorage.setItem('classificaVsrAttuale', '0');
            aggiornaInfoClassificaView();
            aggiornaGraficoTortaStatoStrategia();
            aggiornaGraficoRadarSaluteSlot();
            return;
        }
        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        let punteggioFinaleTotale = 0;
        for (const tipoGara in gareContributive) {
            if (gareContributive.hasOwnProperty(tipoGara)) {
                gareContributive[tipoGara].forEach(gara => punteggioFinaleTotale += gara.puntiEffettivi);
            }
        }
        const totaleArrotondato = Math.round(punteggioFinaleTotale);
        if (classificaVsrAttualeInput) classificaVsrAttualeInput.textContent = formatNumber(totaleArrotondato, 0);
        localStorage.setItem('classificaVsrAttuale', totaleArrotondato.toString());
        aggiornaInfoClassificaView();
    }

    // --- Funzioni Esportazione/Importazione Dati ---
    function esportaDati() {
        const datiDaEsportare = { nomeBarca: localStorage.getItem('nomeBarca') || '', classificaVsrAttuale: localStorage.getItem('classificaVsrAttuale') || '0', gareSalvate: JSON.parse(localStorage.getItem('gareSalvate')) || [] };
        const datiJson = JSON.stringify(datiDaEsportare, null, 2);
        const blob = new Blob([datiJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'VRCompass_backup.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        alert(getTranslation('ALERT_DOWNLOAD_READY'));
    }

    function importaDati(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiImportati = JSON.parse(e.target.result);
                if (typeof datiImportati.nomeBarca !== 'undefined' && typeof datiImportati.classificaVsrAttuale !== 'undefined' && Array.isArray(datiImportati.gareSalvate)) {
                    localStorage.setItem('nomeBarca', datiImportati.nomeBarca);
                    localStorage.setItem('classificaVsrAttuale', datiImportati.classificaVsrAttuale);
                    localStorage.setItem('gareSalvate', JSON.stringify(datiImportati.gareSalvate));
                    caricaDatiDashboard(); aggiornaInfoClassificaView(); aggiornaTabellaGare(); aggiornaPunteggioVsrTotale();
                    aggiornaSezioneStrategia(); aggiornaSezioneAnalisi(); aggiornaGraficoTortaStatoStrategia(); aggiornaGraficoRadarSaluteSlot();
                    if (categoriaSelezionata) selezionaCategoria(categoriaSelezionata);
                    alert(getTranslation('ALERT_DATA_IMPORTED_SUCCESSFULLY'));
                } else alert(getTranslation('ALERT_INVALID_BACKUP_FILE'));
            } catch (error) {
                console.error("Errore durante l'importazione dei dati:", error);
                alert(getTranslation('ALERT_ERROR_READING_FILE'));
            } finally { fileImportaDatiInput.value = ''; }
        };
        reader.readAsText(file);
    }

    // --- Funzioni per Importazione Regate Suggerite ---
    function setupModaleAvvisoRegateListeners() {
        if (btnChiudiModaleAvvisoRegate) btnChiudiModaleAvvisoRegate.addEventListener('click', () => { modaleAvvisoCaricamentoRegate.style.display = 'none'; fileImportaRegateSuggeriteInput.value = ''; fileSelezionatoPerRegateSuggerite = null; });
        if (btnAnnullaCaricamentoRegate) btnAnnullaCaricamentoRegate.addEventListener('click', () => { modaleAvvisoCaricamentoRegate.style.display = 'none'; fileImportaRegateSuggeriteInput.value = ''; fileSelezionatoPerRegateSuggerite = null; });
        if (btnConfermaCaricamentoRegate) btnConfermaCaricamentoRegate.addEventListener('click', importaRegateSuggeriteConfermate);
    }

    function preparaImportazioneRegateSuggerite(event) {
        fileSelezionatoPerRegateSuggerite = event.target.files[0];
        if (!fileSelezionatoPerRegateSuggerite) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiLetti = JSON.parse(e.target.result);
                const dataAggiornamento = datiLetti.dataUltimoAggiornamento || "N/D";
                if (dataAggiornamentoFileRegateSpan) dataAggiornamentoFileRegateSpan.textContent = dataAggiornamento;
                if (modaleAvvisoCaricamentoRegate) modaleAvvisoCaricamentoRegate.style.display = 'flex';
            } catch (error) {
                console.error("Errore durante la lettura del file delle regate suggerite:", error);
                alert(getTranslation('ALERT_ERROR_READING_SUGGESTED_RACES_FILE'));
                fileImportaRegateSuggeriteInput.value = ''; fileSelezionatoPerRegateSuggerite = null;
            }
        };
        reader.readAsText(fileSelezionatoPerRegateSuggerite);
    }

    function importaRegateSuggeriteConfermate() {
        if (!fileSelezionatoPerRegateSuggerite) { alert(getTranslation('ALERT_NO_FILE_SELECTED_FOR_IMPORT')); return; }
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiImportati = JSON.parse(e.target.result);
                if (Array.isArray(datiImportati.gareSalvate)) {
                    localStorage.setItem('gareSalvate', JSON.stringify(datiImportati.gareSalvate));
                    aggiornaTabellaGare(); aggiornaPunteggioVsrTotale(); aggiornaSezioneAnalisi(); aggiornaSezioneStrategia();
                    aggiornaGraficoTortaStatoStrategia(); aggiornaGraficoRadarSaluteSlot();
                    alert(getTranslation('ALERT_SUGGESTED_RACES_IMPORTED_SUCCESSFULLY'));
                } else alert(getTranslation('ALERT_INVALID_SUGGESTED_RACES_JSON_ARRAY'));
            } catch (error) {
                console.error("Errore durante l'importazione confermata delle regate suggerite:", error);
                alert(getTranslation('ALERT_ERROR_IMPORTING_SUGGESTED_RACES_FILE'));
            } finally {
                if (modaleAvvisoCaricamentoRegate) modaleAvvisoCaricamentoRegate.style.display = 'none';
                fileImportaRegateSuggeriteInput.value = ''; fileSelezionatoPerRegateSuggerite = null;
            }
        };
        reader.readAsText(fileSelezionatoPerRegateSuggerite);
    }

    // --- Funzioni per la Modale Elenco Regate ---
    function apriEPopolaModalElencoRegate() {
        if (!modalElencoRegate || !infoAggiornamentoElencoRegate || !tbodyElencoRegateSuggerite) {
            alert(getTranslation('ALERT_ERROR_LOADING_RACE_LIST_NOW')); return;
        }
        modalElencoRegate.style.display = 'block';
        caricaDatiElencoRegate();
    }
    
    function chiudiModalElencoRegate() { if (modalElencoRegate) modalElencoRegate.style.display = 'none'; }

    async function caricaDatiElencoRegate() {
        infoAggiornamentoElencoRegate.textContent = getTranslation('TEXT_LOADING_RACE_LIST');
        tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center;">${getTranslation('TEXT_WAIT')}</td></tr>`;
        try {
            const response = await fetch(URL_ELENCO_REGATE);
            if (!response.ok) throw new Error(`Errore HTTP ${response.status} nel caricare l'elenco delle regate.`);
            const datiElenco = await response.json();
            if (datiElenco && datiElenco.dataAggiornamentoDatabase && Array.isArray(datiElenco.elencoRegateProposte)) {
                infoAggiornamentoElencoRegate.innerHTML = `Elenco regate aggiornato il: <strong>${new Date(datiElenco.dataAggiornamentoDatabase).toLocaleDateString('it-IT')}</strong>. Aggiornamenti a cura di: <strong>ITA 86 FIV / Cristian</strong>.`;
                popolaTabellaElencoRegateSuggerite(datiElenco.elencoRegateProposte);
            } else throw new Error("Formato dati dell'elenco regate non valido.");
        } catch (error) {
            console.error("Errore durante il caricamento dell'elenco regate:", error);
            infoAggiornamentoElencoRegate.textContent = getTranslation('TEXT_ERROR_LOADING_RACE_LIST');
            tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red;">${error.message}</td></tr>`;
        }
    }

    function popolaTabellaElencoRegateSuggerite(regateProposte) {
        tbodyElencoRegateSuggerite.innerHTML = '';
        if (regateProposte.length === 0) {
            tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center;">${getTranslation('TEXT_NO_SUGGESTED_RACES')}</td></tr>`;
            return;
        }
        const gareSalvateAttuali = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const idGareSalvate = new Set(gareSalvateAttuali.filter(g => g.idDatabaseMaster != null).map(g => g.idDatabaseMaster));
        tbodyElencoRegateSuggerite.dataset.regateProposte = JSON.stringify(regateProposte);
        regateProposte.forEach(regata => {
            const row = tbodyElencoRegateSuggerite.insertRow();
            row.insertCell().textContent = new Date(regata.data).toLocaleDateString('it-IT');
            row.insertCell().textContent = regata.nome;
            row.insertCell().textContent = getTranslation(livelliVsrStoricoMap[regata.livello]?.chiaveTraduzione || regata.livello);
            row.insertCell().textContent = formatNumber(regata.puntiVSRBase, 0);
            const cellaClassifica = row.insertCell();
            const inputClassifica = document.createElement('input');
            inputClassifica.type = 'number'; inputClassifica.min = "1"; inputClassifica.placeholder = getTranslation('PLACEHOLDER_POSITION');
            inputClassifica.style.width = '60px'; inputClassifica.style.textAlign = 'center';
            cellaClassifica.appendChild(inputClassifica);
            const cellaAzione = row.insertCell();
            const btnAggiungi = document.createElement('button');
            btnAggiungi.textContent = getTranslation('BTN_ADD_RACE');
            btnAggiungi.classList.add('edit-btn');
            if (idGareSalvate.has(regata.idDatabase)) {
                btnAggiungi.textContent = getTranslation('TEXT_ALREADY_ADDED');
                btnAggiungi.disabled = true; inputClassifica.disabled = true;
            } else {
                btnAggiungi.onclick = () => aggiungiRegataDaElencoAlloStorico(regata, inputClassifica.value);
            }
            cellaAzione.appendChild(btnAggiungi);
        });
    }

    function aggiungiRegataDaElencoAlloStorico(regataMaster, classificaFinaleUtenteString) {
        const classificaFinale = parseInt(classificaFinaleUtenteString);
        if (isNaN(classificaFinale) || classificaFinale <= 0) { alert(getTranslation('ALERT_INVALID_FINAL_RANKING')); return; }
        const infoLivello = Object.values(livelliVsrStoricoMap).find(l => l.tipo === regataMaster.livello);
        if (!infoLivello || infoLivello.valoreNumerico === null) { alert(getTranslation('ALERT_INVALID_RACE_LEVEL')); return; }
        const puntiVSRCalcolati = Math.round(infoLivello.valoreNumerico / Math.pow(classificaFinale, 0.125));
        const nuovaGara = { id: Date.now(), data: regataMaster.data, livello: regataMaster.livello, nome: regataMaster.nome, classificaFinale: classificaFinale, puntiVSR: puntiVSRCalcolati, idDatabaseMaster: regataMaster.idDatabase };
        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        gareSalvate.push(nuovaGara);
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare(); aggiornaPunteggioVsrTotale(); aggiornaSezioneAnalisi(); aggiornaSezioneStrategia();
        aggiornaGraficoTortaStatoStrategia(); aggiornaGraficoRadarSaluteSlot();
        try {
            const regateOriginali = JSON.parse(tbodyElencoRegateSuggerite.dataset.regateProposte || "[]");
            popolaTabellaElencoRegateSuggerite(regateOriginali);
        } catch (e) { console.error("Errore nel ripopolare la tabella delle regate suggerite:", e); }
        alert(getTranslation('MSG_RACE_ADDED_TO_HISTORY', { raceName: nuovaGara.nome, points: nuovaGara.puntiVSR }));
    }

    // --- Funzioni Sezione Analisi ---
    function aggiornaSezioneAnalisi() { aggiornaPanoramicaSlotVSR(); }
    function getGareContributiveConDettagli() { return selezionaGareContributivePerClassifica(JSON.parse(localStorage.getItem('gareSalvate')) || []); }

    function aggiornaPanoramicaSlotVSR() {
        const gareContributive = getGareContributiveConDettagli();
        const suggerimenti = [];
        const gareConScadenze = getGareConScadenzeImminenti();
        const idsGareConScadenze = new Set(gareConScadenze.map(g => g.id));

        function popolaCategoriaSlot(tipoGara, gareCat, maxSlotPerFascia, elOccupati, elMinPunti, elGareSlot, elProgressBar, nomeCatBreve, elPuntiCategoria, elStackedPointsBarContainer, elPointsBar100, elPointsBar50, elPointsBarEmpty) {
            const totaleSlotCategoria = maxSlotPerFascia * 2;
            elOccupati.textContent = gareCat.length;
            if (elGareSlot) elGareSlot.innerHTML = '';
            else { console.warn(`Elemento DOM elGareSlot non trovato per '${nomeCatBreve}'.`); return; }
            
            let idContainerBase = tipoGara.toLowerCase();
            const slotCategoriaContainer = document.getElementById(`slot-${idContainerBase}-container`);
            if (slotCategoriaContainer) {
                slotCategoriaContainer.classList.remove('slot-debole', 'slot-con-opportunita', 'slot-con-preavviso');
            }

            let chiaveMappaPerValoreNumerico = Object.keys(livelliVsrStoricoMap).find(key => livelliVsrStoricoMap[key].tipo === tipoGara);
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            let totalePuntiCategoria = 0;
            gareCat.forEach(g => totalePuntiCategoria += g.puntiEffettivi);
            if (elPuntiCategoria) elPuntiCategoria.textContent = formatNumber(totalePuntiCategoria, 0);

            if (elStackedPointsBarContainer && elPointsBar100 && elPointsBar50 && elPointsBarEmpty && livelloValoreNumerico) {
                let punti100 = 0, punti50 = 0;
                gareCat.forEach(g => {
                    if (g.fattoreDecadimento === 1.0) punti100 += g.puntiEffettivi;
                    else if (g.fattoreDecadimento === 0.5) punti50 += g.puntiEffettivi;
                });
                const potenzialeMaxPuntiCategoria = livelloValoreNumerico * maxSlotPerFascia * 1.5; 
                let perc100 = 0, perc50 = 0, percEmpty = 100;
                if (potenzialeMaxPuntiCategoria > 0) {
                    perc100 = (punti100 / potenzialeMaxPuntiCategoria) * 100;
                    perc50 = (punti50 / potenzialeMaxPuntiCategoria) * 100;
                    percEmpty = Math.max(0, 100 - perc100 - perc50);
                }
                elPointsBar100.style.width = `${perc100}%`;
                elPointsBar50.style.width = `${perc50}%`;
                elPointsBarEmpty.style.width = `${percEmpty}%`;
                elStackedPointsBarContainer.setAttribute('title', `Punti 100%: ${formatNumber(punti100,0)}\nPunti 50%: ${formatNumber(punti50,0)}\nPotenziale Max: ${formatNumber(potenzialeMaxPuntiCategoria,0)}`);
            }

            if (elProgressBar) {
                elProgressBar.style.width = `${(gareCat.length / totaleSlotCategoria) * 100}%`;
                elProgressBar.classList.remove('progress-bar-good', 'progress-bar-medium', 'progress-bar-low', 'progress-bar-empty');
                let tooltipText = `Slot ${nomeCatBreve}: ${gareCat.length}/${totaleSlotCategoria} gare. `;
                if (gareCat.length > 0 && livelloValoreNumerico && livelloValoreNumerico > 0) {
                    let sommaQualitaPercentuale = 0;
                    gareCat.forEach(g => sommaQualitaPercentuale += (g.puntiEffettivi / (livelloValoreNumerico * g.fattoreDecadimento)) * 100);
                    const qualitaMediaPercentuale = sommaQualitaPercentuale / gareCat.length;
                    if (qualitaMediaPercentuale >= 75) elProgressBar.classList.add('progress-bar-good');
                    else if (qualitaMediaPercentuale >= 40) elProgressBar.classList.add('progress-bar-medium');
                    else elProgressBar.classList.add('progress-bar-low');
                } else elProgressBar.classList.add('progress-bar-empty');
                elProgressBar.setAttribute('title', tooltipText.trim());
            }

            if (gareCat.length > 0) {
                if (elMinPunti) elMinPunti.textContent = formatNumber(gareCat[gareCat.length - 1].puntiEffettivi, 0);
                else if (tipoGara === "HC" && hcPuntiAttuali) hcPuntiAttuali.textContent = gareCat.length > 0 ? formatNumber(gareCat[0].puntiEffettivi, 0) : getTranslation('TEXT_NA_DETAILED');
                gareCat.forEach(g => {
                    if (elGareSlot) {
                        const p = document.createElement('p'); p.classList.add('gara-dettaglio');
                        const statoPercentuale = g.fattoreDecadimento === 1.0 ? '100%' : '50%';
                        p.textContent = `${g.nome}: ${formatNumber(g.puntiEffettivi, 0)} pts (${statoPercentuale}, Data: ${new Date(g.data).toLocaleDateString(currentLanguage === 'it' ? 'it-IT' : 'en-GB')})`;
                        elGareSlot.appendChild(p);
                    }
                });
            } else {
                if (elMinPunti) elMinPunti.textContent = getTranslation('TEXT_NA_DETAILED');
                else if (tipoGara === "HC" && hcPuntiAttuali) hcPuntiAttuali.textContent = getTranslation('TEXT_NA_DETAILED');
                if (elGareSlot) elGareSlot.innerHTML = `<p class="no-data">${getTranslation('TEXT_NO_VALID_RACES_IN_SLOT')}</p>`;
            }
        }
        popolaCategoriaSlot("HC", gareContributive["HC"] || [], LIMITI_GARE_PER_CATEGORIA["HC"], hcOccupati, null, hcGareSlot, hcProgressBar, getTranslation(livelliVsrStoricoMap["HC"].chiaveTraduzione), hcPuntiCategoria, hcStackedPointsBarContainer, hcPointsBar100, hcPointsBar50, hcPointsBarEmpty);
        popolaCategoriaSlot("LIV1", gareContributive["LIV1"] || [], LIMITI_GARE_PER_CATEGORIA["LIV1"], liv1Occupati, liv1MinPunti, liv1GareSlot, liv1ProgressBar, getTranslation(livelliVsrStoricoMap["LIV1"].chiaveTraduzione), liv1PuntiCategoria, liv1StackedPointsBarContainer, liv1PointsBar100, liv1PointsBar50, liv1PointsBarEmpty);
        popolaCategoriaSlot("LIV2", gareContributive["LIV2"] || [], LIMITI_GARE_PER_CATEGORIA["LIV2"], liv2Occupati, liv2MinPunti, liv2GareSlot, liv2ProgressBar, getTranslation(livelliVsrStoricoMap["LIV2"].chiaveTraduzione), liv2PuntiCategoria, liv2StackedPointsBarContainer, liv2PointsBar100, liv2PointsBar50, liv2PointsBarEmpty);
        popolaCategoriaSlot("LIV3", gareContributive["LIV3"] || [], LIMITI_GARE_PER_CATEGORIA["LIV3"], liv3Occupati, liv3MinPunti, liv3GareSlot, liv3ProgressBar, getTranslation(livelliVsrStoricoMap["LIV3"].chiaveTraduzione), liv3PuntiCategoria, liv3StackedPointsBarContainer, liv3PointsBar100, liv3PointsBar50, liv3PointsBarEmpty);
    }

    function aggiornaMonitoraggioScadenze() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const gareInDimezzamento = []; const gareInScadenza = [];
        const contributingIds = getContributingGareIds(); // Ottieni gli ID delle gare che contribuiscono
        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data);
            let isUrgente = false; let tipoEventoPerLista = null;
            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) {
                const dataDimezzamento = new Date(dataGaraDate); dataDimezzamento.setMonth(dataGaraDate.getMonth() + 12);
                const impatto = Math.round(gara.puntiVSR * 0.5); isUrgente = (mesiTrascorsi === 11); tipoEventoPerLista = "Dimezzamento";
                const isContributing = contributingIds.has(gara.id);
                gareInDimezzamento.push({ ...gara, dataEvento: dataDimezzamento.toLocaleDateString(currentLanguage === 'it' ? 'it-IT' : 'en-GB'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista, isContributing });
            }
            if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) {
                const dataScadenza = new Date(dataGaraDate); dataScadenza.setMonth(dataGaraDate.getMonth() + 24);
                const impatto = Math.round(gara.puntiVSR * 0.5); isUrgente = (mesiTrascorsi === 23); tipoEventoPerLista = "Scadenza";
                const isContributing = contributingIds.has(gara.id);
                gareInScadenza.push({ ...gara, dataEvento: dataScadenza.toLocaleDateString(currentLanguage === 'it' ? 'it-IT' : 'en-GB'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista, isContributing });
            }
        });
        function popolaListaScadenze(listaElement, gare, tipoEvento) {
            listaElement.innerHTML = '';
            if (gare.length > 0) {
                gare.sort((a,b) => new Date(a.dataEvento.split('/').reverse().join('-')) - new Date(b.dataEvento.split('/').reverse().join('-')));
                gare.forEach(g => {
                    const li = document.createElement('li');
                    const livelloTesto = getTranslation(livelliVsrStoricoMap[g.livello]?.chiaveTraduzione || g.livello);
                    let params = {
                        raceName: g.nome, // Questo è il nome della gara, non il tipo di evento
                        raceLevel: livelloTesto,
                        eventType: g.tipoEvento.toLowerCase(), // Questo rimane 'dimezzamento' o 'scadenza' per la logica interna
                        eventDate: g.dataEvento,
                        impactPoints: formatNumber(g.impattoPunti, 0)
                    };
                    if (g.isUrgente) {
                        li.classList.add('scadenza-urgente');
                        const [day, month, year] = g.dataEvento.split('/');
                        const dataEventoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                        params.remainingDays = calcolaGiorniTraDate(new Date(), dataEventoDate);
                        params.daysText = Math.abs(params.remainingDays) === 1 ? getTranslation('STRATEGY_SUGGESTION_DAY_SINGLE') : getTranslation('STRATEGY_SUGGESTION_DAYS_PLURAL');
                        // params.pluralSuffix = "";  // Rimosso, non più necessario per questa logica

                        let verboMancareIt = "";
                        if (currentLanguage === 'it') {
                            verboMancareIt = (Math.abs(params.remainingDays) === 1) ? "Manca" : "Mancano";
                        }
                        const translatedEventType = g.tipoEvento === "Dimezzamento" ? getTranslation('EVENT_TYPE_HALVING') : getTranslation('EVENT_TYPE_EXPIRY');
                        li.innerHTML = getTranslation('STRATEGY_DEADLINE_ITEM_URGENT', { ...params, eventType: translatedEventType.toLowerCase(), verboMancareIt: verboMancareIt });
                    } else {
                        li.classList.add('scadenza-in-preavviso-non-urgente');
                        const translatedEventType = g.tipoEvento === "Dimezzamento" ? getTranslation('EVENT_TYPE_HALVING') : getTranslation('EVENT_TYPE_EXPIRY');
                        li.innerHTML = getTranslation('STRATEGY_DEADLINE_ITEM_NORMAL', { ...params, eventType: translatedEventType.toLowerCase() });
                    }
                    if (!g.isContributing) {
                        li.innerHTML += ` <span class="non-contributing-suffix">${getTranslation('STRATEGY_DEADLINE_ITEM_NOT_CONTRIBUTING_SUFFIX')}</span>`;
                    }
                    listaElement.appendChild(li);
                });
            } else listaElement.innerHTML = `<li class="no-data">${getTranslation('TEXT_NO_IMMINENT_EVENT_RACES', {eventType: tipoEvento.toLowerCase()})}</li>`;
        }
        popolaListaScadenze(listaGareDimezzamento, gareInDimezzamento, "Dimezzamento");
        popolaListaScadenze(listaGareScadenza, gareInScadenza, "Scadenza");
    }

    // --- Funzioni Sezione Strategia ---
    function aggiornaSezioneStrategia() {
        aggiornaMonitoraggioScadenze();
        aggiornaValutazioneStrategicaSlot();
    }

    function getGareConScadenzeImminenti() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const scadenze = [];
        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data);
            let tipoEvento = null; let dataEventoObj = null; let isUrgente = false; let impattoPuntiStimato = 0;
            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) {
                tipoEvento = "Dimezzamento"; dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 12);
                isUrgente = (mesiTrascorsi === 11); impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5);
            } else if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) {
                tipoEvento = "Scadenza"; dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 24);
                isUrgente = (mesiTrascorsi === 23); impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5);
            }
            if (tipoEvento && dataEventoObj) scadenze.push({ ...gara, tipoEvento, dataEvento: dataEventoObj.toLocaleDateString(currentLanguage === 'it' ? 'it-IT' : 'en-GB'), isUrgente, impattoPunti: impattoPuntiStimato });
        });
        return scadenze;
    }

    function aggiornaValutazioneStrategicaSlot() {
        if (!listaSuggerimentiStrategiciSlot) return;
        try {
            const gareContributive = getGareContributiveConDettagli();
            const suggerimentiStrategici = [];
            const gareConScadenze = getGareConScadenzeImminenti();
            const idsGareConScadenze = new Set(gareConScadenze.map(g => g.id));
            const ordineTipiPerStrategia = ["HC", "LIV1", "LIV2", "LIV3"];

            ordineTipiPerStrategia.forEach(tipoGara => {
                const gareCat = gareContributive[tipoGara] || [];
                let chiaveMappaPerValoreNumerico = Object.keys(livelliVsrStoricoMap).find(key => livelliVsrStoricoMap[key].tipo === tipoGara);
                const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
                const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;
                const nomeCategoriaTradotto = infoLivelloDaMappa ? getTranslation(infoLivelloDaMappa.chiaveTraduzione) : tipoGara;

                if (!livelloValoreNumerico) return;

                let icona = getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_ICON`);
                icona = icona ? `<span class="warning-triangle">${icona}</span>` : `<span class="warning-triangle">⚠️</span>`;
                let suggerimentoTestoCompleto = "";
                const limitePerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
                const gare100Attuali = gareCat.filter(g => g.fattoreDecadimento === 1.0);
                const numGare100Attuali = gare100Attuali.length;
                const gare100InDimezzamentoImminente = gare100Attuali.filter(g => g.mesiTrascorsi >= 9 && g.mesiTrascorsi < 12).length;
                const slotAttualmenteVuoti100 = limitePerFascia - numGare100Attuali;
                const numGareNecessariePerFascia100 = slotAttualmenteVuoti100 + gare100InDimezzamentoImminente;

                let params = { categoryName: nomeCategoriaTradotto, totalSlots: limitePerFascia * 2 };

                if (numGareNecessariePerFascia100 > 0) {
                    let puntiEsempio = calcolaPuntiPerClassifica(livelloValoreNumerico, 50);
                    params.numRacesToAdd = numGareNecessariePerFascia100;
                    params.raceWord = numGareNecessariePerFascia100 > 1 ? getTranslation('STRATEGY_SUGGESTION_RACES_PLURAL') : getTranslation('STRATEGY_SUGGESTION_RACE_SINGLE');
                    params.examplePointsText = puntiEsempio ? getTranslation('STRATEGY_SUGGESTION_EXAMPLE_POINTS_TEXT', { targetRank: 50, points: formatNumber(puntiEsempio,0) }) : "";
                    params.noteHalvingText = "";
                    if (gare100InDimezzamentoImminente > 0) {
                        const keyHalving = gare100InDimezzamentoImminente > 1 ? 'STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_PLURAL' : 'STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_SINGLE';
                        params.noteHalvingText = getTranslation(keyHalving, { numRaces: gare100InDimezzamentoImminente });
                    }
                    suggerimentoTestoCompleto = `${icona} ${getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_EMPTY_SLOT`, params)}`;
                } else if (gare100Attuali.length > 0) {
                    const gare100Ordinate = [...gare100Attuali].sort((a, b) => a.puntiEffettivi - b.puntiEffettivi);
                    const garaMenoPerformante100 = gare100Ordinate[0];
                    const puntiMenoPerformanti100 = garaMenoPerformante100.puntiEffettivi;
                    params.points = formatNumber(puntiMenoPerformanti100, 0);
                    const sogliaDebolezzaPunti = livelloValoreNumerico * SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()];
                    const isMenoPerformante100Debole = puntiMenoPerformanti100 < sogliaDebolezzaPunti;

                    if (isMenoPerformante100Debole) {
                        params.targetRank = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, sogliaDebolezzaPunti + 1);
                        suggerimentoTestoCompleto = `${icona} ${getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_WEAK_SLOT_BASE`, params)}`;
                        suggerimentoTestoCompleto += ` ${getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_IMPROVEMENT_ACTION`, params)}`;
                    } else {
                        suggerimentoTestoCompleto = `${icona} ${getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_OK_SLOT_BASE`, params)}`;
                        const garaMenoPerformanteComplessiva = gareCat.length > 0 ? gareCat[gareCat.length - 1] : null;
                        if (tipoGara !== "HC" && garaMenoPerformanteComplessiva && !idsGareConScadenze.has(garaMenoPerformanteComplessiva.id)) {
                            suggerimentoTestoCompleto += ` ${getTranslation('STRATEGY_SUGGESTION_MONITOR_DEADLINES_TEXT')}`;
                        }
                    }
                }

                if (gareCat.length > 0) {
                    const garaMenoPerformante = gareCat[gareCat.length - 1];
                    if (garaMenoPerformante && idsGareConScadenze.has(garaMenoPerformante.id)) {
                        const garaInScadenza = gareConScadenze.find(g => g.id === garaMenoPerformante.id);
                        if (garaInScadenza) {
                            const { tipoEvento, dataEvento, impattoPunti, isUrgente } = garaInScadenza;
                            const [day, month, year] = dataEvento.split('/');
                            const dataEventoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                            let warningParams = {
                                eventType: tipoEvento.toLowerCase(), eventDate: dataEvento, impactPoints: formatNumber(impattoPunti, 0),
                                remainingDays: calcolaGiorniTraDate(new Date(), dataEventoDate), // Calcola una volta
                                daysText: "", // Verrà impostato dopo
                                pluralDays: "" // Per l'inglese, 'pluralDays' è per 'mancano/manca'
                            };
                            // warningParams.pluralDays rimosso perché la logica del verbo è gestita diversamente
                            warningParams.daysText = Math.abs(warningParams.remainingDays) === 1 ? getTranslation('STRATEGY_SUGGESTION_DAY_SINGLE') : getTranslation('STRATEGY_SUGGESTION_DAYS_PLURAL');
                            
                            let verboMancareItWarning = "";
                            if (currentLanguage === 'it') {
                                verboMancareItWarning = (Math.abs(warningParams.remainingDays) === 1) ? "Manca" : "Mancano";
                            }

                            let warningKey = "";
                            const translatedEventTypeForWarning = tipoEvento === "Dimezzamento" ? getTranslation('EVENT_TYPE_HALVING') : getTranslation('EVENT_TYPE_EXPIRY');
                            if (isUrgente) warningKey = tipoEvento === "Dimezzamento" ? `STRATEGY_SUGGESTION_${tipoGara}_URGENT_HALVING_WARNING` : `STRATEGY_SUGGESTION_${tipoGara}_URGENT_EXPIRY_WARNING`;
                            else warningKey = `STRATEGY_SUGGESTION_${tipoGara}_PRE_WARNING`;
                            
                            if (warningKey) suggerimentoTestoCompleto += ` ${getTranslation(warningKey, {...warningParams, eventType: translatedEventTypeForWarning.toLowerCase(), verboMancareIt: verboMancareItWarning })}`;
                        }
                    }
                }
                if (suggerimentoTestoCompleto) suggerimentiStrategici.push(suggerimentoTestoCompleto);
            });

            if (gareConScadenze.length > 0) {
                let testoScadenzeImportanti = getTranslation('STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_BASE');
                const gareHCoL1InScadenza = gareConScadenze.filter(g => {
                    const tipoGara = livelliVsrStoricoMap[g.livello]?.tipo;
                    return tipoGara === "HC" || tipoGara === "LIV1";
                });
                if (gareHCoL1InScadenza.length > 0) {
                    gareHCoL1InScadenza.sort((a, b) => new Date(a.dataEvento.split('/').reverse().join('-')) - new Date(b.dataEvento.split('/').reverse().join('-')));
                    const scadenzaPiuImminente = gareHCoL1InScadenza[0];
                    const [day, month, year] = scadenzaPiuImminente.dataEvento.split('/');
                    const dataEventoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                    const daysText = Math.abs(giorniRimanenti) === 1 ? getTranslation('STRATEGY_SUGGESTION_DAY_SINGLE') : getTranslation('STRATEGY_SUGGESTION_DAYS_PLURAL');
                    const remainingTimeText = getTranslation('STRATEGY_SUGGESTION_REMAINING_TIME_TEXT_FORMAT', { remainingDays: giorniRimanenti, daysText: daysText, eventDate: scadenzaPiuImminente.dataEvento });
                    const translatedDeadlineEventType = scadenzaPiuImminente.tipoEvento === "Dimezzamento" ? getTranslation('EVENT_TYPE_HALVING') : getTranslation('EVENT_TYPE_EXPIRY');
                    testoScadenzeImportanti = getTranslation('STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_PRIORITY', { eventType: translatedDeadlineEventType.toLowerCase(), remainingTimeText: remainingTimeText });
                }
                suggerimentiStrategici.unshift(`<span class="warning-triangle calendar-icon">🗓️</span> ${testoScadenzeImportanti}`);
            }

            listaSuggerimentiStrategiciSlot.innerHTML = '';
            if (suggerimentiStrategici.length > 0) {
                suggerimentiStrategici.forEach(sugg => { const li = document.createElement('li'); li.innerHTML = sugg; listaSuggerimentiStrategiciSlot.appendChild(li); });
            } else listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data">${getTranslation('TEXT_NO_PRIORITY_STRATEGIC_ACTION')}</li>`;
        } catch (error) {
            console.error("Errore in aggiornaValutazioneStrategicaSlot:", error);
            if (listaSuggerimentiStrategiciSlot) listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data text-danger">${getTranslation('TEXT_ERROR_GENERATING_SUGGESTIONS')}</li>`;
        }
    }

    // --- Funzioni Grafico Torta Strategia ---
    function aggiornaGraficoTortaStatoStrategia() {
        if (!canvasGraficoTorta) return;
        try {
            const saluteCategoriePerTooltip = {};
            const gareContributive = getGareContributiveConDettagli();
            const puntiAttualiPerCategoriaGrafico = {};
            const categorieOrdineTooltip = ["HC", "LIV1", "LIV2", "LIV3"];
            categorieOrdineTooltip.forEach(tipoGara => {
                const gareCat = gareContributive[tipoGara] || [];
                puntiAttualiPerCategoriaGrafico[tipoGara] = gareCat.reduce((sum, g) => sum + g.puntiEffettivi, 0);
            });

            potenzialePuntiPerGraficoTorta = {
                "HC": (livelliVsrStoricoMap["HC"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["HC"] * 1.5,
                "LIV1": (livelliVsrStoricoMap["LIV1"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV1"] * 1.5,
                "LIV2": (livelliVsrStoricoMap["LIV2"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV2"] * 1.5,
                "LIV3": (livelliVsrStoricoMap["LIV3"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV3"] * 1.5
            };
            totalePotenzialePuntiPerGraficoTorta = Object.values(potenzialePuntiPerGraficoTorta).reduce((sum, val) => sum + val, 0) || 1;

            const labels = []; const dataValues = []; const backgroundColors = [];
            const colori = {
                "HC":   { good: 'rgba(220, 53, 69, 0.8)', needsImprovement: 'rgba(220, 53, 69, 0.3)' },
                "LIV1": { good: 'rgba(25, 135, 84, 0.8)', needsImprovement: 'rgba(25, 135, 84, 0.3)' },
                "LIV2": { good: 'rgba(255, 193, 7, 0.8)', needsImprovement: 'rgba(255, 193, 7, 0.3)' },
                "LIV3": { good: 'rgba(13, 110, 253, 0.8)', needsImprovement: 'rgba(13, 110, 253, 0.3)' }
            };

            categorieOrdineTooltip.forEach(tipoGara => {
                const gareCat = gareContributive[tipoGara] || [];
                const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
                const totaleSlotCategoria = maxSlotPerFascia * 2;
                const infoLivelloDaMappa = Object.values(livelliVsrStoricoMap).find(l => l.tipo === tipoGara);
                const livelloValoreNumerico = infoLivelloDaMappa?.valoreNumerico;
                const nomeCatBreve = infoLivelloDaMappa ? getTranslation(infoLivelloDaMappa.chiaveTraduzione) : tipoGara;

                if (totaleSlotCategoria === 0 || !livelloValoreNumerico) return;
                const percentualeRiempimento = (gareCat.length / totaleSlotCategoria);
                let qualitaMediaPunti = 0;
                if (gareCat.length > 0 && livelloValoreNumerico > 0) {
                    let sommaQualitaPercentuale = gareCat.reduce((sum, g) => {
                        const potenzialeMaxSlotSpecifico = livelloValoreNumerico * g.fattoreDecadimento;
                        return sum + (potenzialeMaxSlotSpecifico > 0 ? (g.puntiEffettivi / potenzialeMaxSlotSpecifico) : 0);
                    }, 0);
                    qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length;
                }
                let pesoRiempimento = 0.5, pesoQualita = 0.5;
                if (maxSlotPerFascia === 1) { pesoRiempimento = 0.4; pesoQualita = 0.6; }
                else if (maxSlotPerFascia === 3) { pesoRiempimento = 0.45; pesoQualita = 0.55; }
                else if (maxSlotPerFascia === 10) { pesoRiempimento = 0.6; pesoQualita = 0.4; }
                const punteggioSalutePercent = Math.min(1, Math.max(0, (percentualeRiempimento * pesoRiempimento) + (qualitaMediaPunti * pesoQualita))) * 100;
                saluteCategoriePerTooltip[tipoGara] = punteggioSalutePercent;
                const pesoPuntiCategoria = potenzialePuntiPerGraficoTorta[tipoGara] / totalePotenzialePuntiPerGraficoTorta;
                const dimensioneBuona = pesoPuntiCategoria * (punteggioSalutePercent / 100);
                const dimensioneMigliorabile = pesoPuntiCategoria * (1 - (punteggioSalutePercent / 100));
                if (dimensioneBuona > 0.001) { labels.push(`${nomeCatBreve} (${getTranslation('STRATEGY_PIE_CHART_LABEL_OPTIMIZED')})`); dataValues.push(dimensioneBuona); backgroundColors.push(colori[tipoGara].good); }
                if (dimensioneMigliorabile > 0.001) { labels.push(`${nomeCatBreve} (${getTranslation('STRATEGY_PIE_CHART_LABEL_IMPROVABLE')})`); dataValues.push(dimensioneMigliorabile); backgroundColors.push(colori[tipoGara].needsImprovement); }
            });

            if (dataValues.length === 0) { labels.push(getTranslation('TEXT_NO_DATA_AVAILABLE')); dataValues.push(1); backgroundColors.push('#e9ecef'); }
            const data = { labels: labels, datasets: [{ data: dataValues, backgroundColor: backgroundColors, borderWidth: 0 }] };

            if (graficoTortaIstanza) { graficoTortaIstanza.data = data; graficoTortaIstanza.update(); }
            else {
                graficoTortaIstanza = new Chart(canvasGraficoTorta, {
                    type: 'pie', data: data,
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'right', labels: { boxWidth: 20, padding: 15 } },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        const labelOriginal = tooltipItem.label || '';
                                        if (labelOriginal === getTranslation('TEXT_NO_DATA_AVAILABLE')) return labelOriginal;
                                        const match = labelOriginal.match(/^(.+?)\s*\((.+?)\)$/);
                                        const nomeCatBase = match ? match[1].trim() : labelOriginal;
                                        const statoFetta = match ? match[2].trim().toLowerCase() : '';
                                        const tipoGaraPerTooltip = mappaTestoLabelGraficoATipoGara[nomeCatBase];
                                        if (!tipoGaraPerTooltip) return labelOriginal;
                                        const tooltipLines = [`${nomeCatBase} (${statoFetta.charAt(0).toUpperCase() + statoFetta.slice(1)})`];
                                        const salutePercentualeCategoria = saluteCategoriePerTooltip[tipoGaraPerTooltip] || 0;
                                        tooltipLines.push(`${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_SLOT_HEALTH')} ${salutePercentualeCategoria.toFixed(1)}%`);
                                        tooltipLines.push(`${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_POTENTIAL_IMPROVEMENT')} ${(100 - salutePercentualeCategoria).toFixed(1)}%`);
                                        const potenzialeMaxCategoria = potenzialePuntiPerGraficoTorta[tipoGaraPerTooltip] || 0;
                                        const puntiAttualiDellaCategoria = puntiAttualiPerCategoriaGrafico[tipoGaraPerTooltip] || 0;
                                        let percentualePuntiVSRPerCategoria = potenzialeMaxCategoria > 0 ? (puntiAttualiDellaCategoria / potenzialeMaxCategoria) * 100 : 0;
                                        tooltipLines.push(`${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_VSR_POINTS')} ${formatNumber(puntiAttualiDellaCategoria,0)} / ${formatNumber(potenzialeMaxCategoria,0)}`);
                                        tooltipLines.push(`(${percentualePuntiVSRPerCategoria.toFixed(1)}% ${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_PERCENT_CATEGORY_POTENTIAL')})`);
                                        if (tipoGaraPerTooltip !== "Generale") {
                                            let punti100 = 0, punti50 = 0;
                                            (gareContributive[tipoGaraPerTooltip] || []).forEach(g => {
                                                if (g.fattoreDecadimento === 1.0) punti100 += g.puntiEffettivi;
                                                else if (g.fattoreDecadimento === 0.5) punti50 += g.puntiEffettivi;
                                            });
                                            if (punti100 > 0 || punti50 > 0 || potenzialeMaxCategoria > 0) {
                                                tooltipLines.push(`  ${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_FROM_100_PERCENT_BAND')} ${formatNumber(punti100,0)}`);
                                                tooltipLines.push(`  ${getTranslation('STRATEGY_PIE_CHART_TOOLTIP_FROM_50_PERCENT_BAND')} ${formatNumber(punti50,0)}`);
                                            }
                                        }
                                        let suggerimentoBreveTooltip = "";
                                        const limitePerFasciaTooltip = LIMITI_GARE_PER_CATEGORIA[tipoGaraPerTooltip];
                                        const gare100AttualiTooltip = (gareContributive[tipoGaraPerTooltip] || []).filter(g => g.fattoreDecadimento === 1.0);
                                        const numGare100AttualiTooltip = gare100AttualiTooltip.length;
                                        const gare100InDimezzamentoTooltip = gare100AttualiTooltip.filter(g => g.mesiTrascorsi >= 9 && g.mesiTrascorsi < 12).length;
                                        const slotVuoti100Tooltip = limitePerFasciaTooltip - numGare100AttualiTooltip;
                                        const numGareNecessarie100Tooltip = slotVuoti100Tooltip + gare100InDimezzamentoTooltip;
                                        if (numGareNecessarie100Tooltip > 0) suggerimentoBreveTooltip = getTranslation('STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_COMPLETE_STABILIZE');
                                        else if (gare100AttualiTooltip.length > 0) {
                                            const gare100OrdinateTooltip = [...gare100AttualiTooltip].sort((a, b) => a.puntiEffettivi - b.puntiEffettivi);
                                            const garaMenoPerformante100Tooltip = gare100OrdinateTooltip[0];
                                            const valoreNumericoTooltip = livelliVsrStoricoMap[garaMenoPerformante100Tooltip.livello]?.valoreNumerico || 0;
                                            const sogliaDebolezzaPuntiTooltip = valoreNumericoTooltip * SOGLIA_DEBOLEZZA[valoreNumericoTooltip.toString()];
                                            if (garaMenoPerformante100Tooltip.puntiEffettivi < sogliaDebolezzaPuntiTooltip) suggerimentoBreveTooltip = getTranslation('STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_IMPROVE_WEAK');
                                            else suggerimentoBreveTooltip = getTranslation('STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK');
                                        } else suggerimentoBreveTooltip = getTranslation('STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK_NA');
                                        if (suggerimentoBreveTooltip) tooltipLines.push(suggerimentoBreveTooltip);
                                        return tooltipLines;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Errore in aggiornaGraficoTortaStatoStrategia:", error);
            if (graficoTortaIstanza) { graficoTortaIstanza.destroy(); graficoTortaIstanza = null; }
            const ctx = canvasGraficoTorta.getContext('2d');
            ctx.clearRect(0, 0, canvasGraficoTorta.width, canvasGraficoTorta.height);
            ctx.textAlign = 'center';
            ctx.fillText(getTranslation('TEXT_ERROR_LOADING_CHART'), canvasGraficoTorta.width / 2, canvasGraficoTorta.height / 2);
        }
    }

    // --- Funzioni Grafico Radar Dashboard ---
    function calcolaPunteggioSaluteCategoria(gareCat, maxSlotPerFascia, valoreMaxPuntiGara) {
        const totaleSlotCategoria = maxSlotPerFascia * 2;
        if (totaleSlotCategoria === 0) return 0;
        const percentualeRiempimento = (gareCat.length / totaleSlotCategoria);
        let qualitaMediaPunti = 0;
        if (gareCat.length > 0 && valoreMaxPuntiGara > 0) {
            let sommaQualitaPercentuale = gareCat.reduce((sum, g) => {
                const potenzialeMaxSlotSpecifico = valoreMaxPuntiGara * g.fattoreDecadimento;
                return sum + (potenzialeMaxSlotSpecifico > 0 ? (g.puntiEffettivi / potenzialeMaxSlotSpecifico) : 0);
            }, 0);
            qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length;
        }
        let pesoRiempimento = 0.5, pesoQualita = 0.5;
        if (maxSlotPerFascia === 1) { pesoRiempimento = 0.4; pesoQualita = 0.6; }
        else if (maxSlotPerFascia === 3) { pesoRiempimento = 0.45; pesoQualita = 0.55; }
        else if (maxSlotPerFascia === 10) { pesoRiempimento = 0.6; pesoQualita = 0.4; }
        return Math.min(1, Math.max(0, (percentualeRiempimento * pesoRiempimento) + (qualitaMediaPunti * pesoQualita))) * 100;
    }

    function aggiornaGraficoRadarSaluteSlot() {
        if (!canvasGraficoRadar) return;
        const gareContributive = getGareContributiveConDettagli();
        const datiPercentualePotenziale = [];
        const categorieRadar = ["HC", "LIV1", "LIV2", "LIV3"];
        const etichetteRadar = [];

        categorieRadar.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
            const infoLivelloDaMappa = Object.values(livelliVsrStoricoMap).find(l => l.tipo === tipoGara);
            const livelloValoreNumerico = infoLivelloDaMappa?.valoreNumerico;
            etichetteRadar.push(infoLivelloDaMappa ? getTranslation(infoLivelloDaMappa.chiaveTraduzione) : tipoGara);

            const totaleSlotCategoria = maxSlotPerFascia * 2;
            if (totaleSlotCategoria === 0 || !livelloValoreNumerico) {
                datiPercentualePotenziale.push(0); return;
            }
            let puntiAttuali = gareCat.reduce((sum, g) => sum + g.puntiEffettivi, 0);
            // Il potenziale massimo qui è il massimo teorico per la categoria, considerando il 100% per la prima fascia e 50% per la seconda
            const potenzialeMaxCategoria = livelloValoreNumerico * maxSlotPerFascia * 1.5;
            let percentualeRaggiunta = (potenzialeMaxCategoria > 0) ? (puntiAttuali / potenzialeMaxCategoria) * 100 : 0;
            datiPercentualePotenziale.push(Math.min(100, Math.max(0, percentualeRaggiunta)));
        });

        const data = {
            labels: etichetteRadar,
            datasets: [{
                label: getTranslation('DASHBOARD_RADAR_CHART_TITLE'), // Usa una chiave per il titolo del dataset se necessario
                data: datiPercentualePotenziale,
                fill: true, backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)', pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff', pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        };
        if (graficoRadarIstanza) { graficoRadarIstanza.data = data; graficoRadarIstanza.update(); }
        else {
            graficoRadarIstanza = new Chart(canvasGraficoRadar, {
                type: 'radar', data: data,
                options: {
                    scales: { r: { angleLines: { display: true }, suggestedMin: 0, suggestedMax: 100, pointLabels: { font: { size: 13 } }, ticks: { callback: value => value + "%" } } },
                    elements: { line: { borderWidth: 2 } },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }

    // --- Event Listener Generali ---
    mainNavButtons.forEach(button => button.addEventListener('click', handleNavClick));

    // --- Inizializzazione ---
    init();
});
