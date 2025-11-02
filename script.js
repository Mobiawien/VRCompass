import { initI18n, getTranslation } from "./modules/i18n.js";
import {
  calcolaPosizioneRecupero,
  ricalcolaRisultati,
} from "./modules/calculator.js";
import {
  calcolaMesiTrascorsi,
  calcolaGiorniTraDate,
  formatNumber,
} from "./modules/utils.js";
import {
  getVsrScoreCalcolato,
  selezionaGareContributive,
  calcolaVsrTotaleDaContributive,
  calcolaPuntiPerClassifica,
} from "./modules/vsr-calculator.js";
import { initCreditsCalculator } from "./modules/credits-ui.js";
import { initVsrRankingUI, aggiornaTabellaGare } from "./modules/vsr-ui.js";

// --- Elementi DOM ---
// Navigazione
const mainNavButtons = document.querySelectorAll("nav > .nav-button"); // Seleziona solo i .nav-button diretti figli di nav
const viewSections = document.querySelectorAll(".view-section");

// Dashboard
const nomeBarcaInput = document.getElementById("nome-barca");
const classificaVsrAttualeInput = document.getElementById(
  "classifica-vsr-attuale"
);

// Gestione Crediti (ex Calcolatrice Gara)
const tabella1 = document.getElementById("tabella1");
const tabella3Body = document.getElementById("tabella3").querySelector("tbody");
// Elementi statici Tabella 2
const outputCatEcon = document.getElementById("output-cat-econ");
const inputBonusTotale = document.getElementById("input-bonus-totale");
const outputSpesa = document.getElementById("output-spesa");
const outputSpesaEffettiva = document.getElementById("output-spesa-effettiva");
const outputPosRecupero = document.getElementById("output-pos-recupero");

// Gestione Classifica VSR
const formAggiungiGara = document.getElementById("form-aggiungi-gara");
const dataGaraInput = document.getElementById("data-gara");
const livelloGaraVsrStoricoSelect = document.getElementById(
  "livello-gara-vsr-storico"
);
const nomeRegataInput = document.getElementById("nome-regata");
const classificaFinaleStoricoInput = document.getElementById(
  "classifica-finale-storico"
);
const puntiVsrCalcolatiInput = document.getElementById("punti-vsr-calcolati");
const classificaVsrtbody = document.getElementById("classifica-vsr-tbody");
const tabellaClassificaVsr = document.getElementById("tabella-classifica-vsr");
const nomeBarcaDisplay = document.getElementById("nome-barca-display");
const classificaVsrAttualeDisplay = document.getElementById(
  "classifica-vsr-attuale-display"
);

// Pulsanti Filtro Storico Gare
const btnMostraTutteGare = document.getElementById("btn-mostra-tutte-gare");
const btnMostraGareValide = document.getElementById("btn-mostra-gare-valide");
const btnStoricoHC = document.getElementById("btn-storico-hc");
const btnStoricoLiv1 = document.getElementById("btn-storico-liv1");
const btnStoricoLiv2 = document.getElementById("btn-storico-liv2");
const btnStoricoLiv3 = document.getElementById("btn-storico-liv3");

// Nuovi elementi per Caricamento Elenco Regate
const btnApriModalElencoRegate = document.getElementById(
  "btn-apri-modal-elenco-regate"
);
const modalElencoRegate = document.getElementById("modal-elenco-regate");
const btnChiudiModalElencoRegate = document.getElementById(
  "btn-chiudi-modal-elenco-regate"
);
const infoAggiornamentoElencoRegate = document.getElementById(
  "info-aggiornamento-elenco-regate"
);
const tbodyElencoRegateSuggerite = document.getElementById(
  "tbody-elenco-regate-suggerite"
);

// Titoli dinamici
const titoloFormGara = document.getElementById("titolo-form-gara");

// Dashboard - Gestione Dati
const btnEsportaDati = document.getElementById("btn-esporta-dati");
const fileImportaDatiInput = document.getElementById("file-importa-dati");
const fileImportaRegateSuggeriteInput = document.getElementById(
  "file-importa-regate-suggerite"
);
const modaleAvvisoCaricamentoRegate = document.getElementById(
  "modale-avviso-caricamento-regate"
);
const btnChiudiModaleAvvisoRegate = document.getElementById(
  "btn-chiudi-modale-avviso-regate"
);
const btnConfermaCaricamentoRegate = document.getElementById(
  "btn-conferma-caricamento-regate"
);
const btnAnnullaCaricamentoRegate = document.getElementById(
  "btn-annulla-caricamento-regate"
);
const dataAggiornamentoFileRegateSpan = document.getElementById(
  "data-aggiornamento-file-regate"
);
let fileSelezionatoPerRegateSuggerite = null;

// Analisi
const hcOccupati = document.getElementById("hc-occupati");
const hcPuntiCategoria = document.getElementById("hc-punti-categoria");
const hcPuntiAttuali = document.getElementById("hc-punti-attuali");
const hcGareSlot = document.getElementById("hc-gare-slot");
const hcProgressBar = document.getElementById("hc-progress-bar");
const hcStackedPointsBarContainer = document.getElementById(
  "hc-stacked-points-bar-container"
);
const hcPointsBar100 = document.getElementById("hc-points-bar-100");
const hcPointsBar50 = document.getElementById("hc-points-bar-50");
const hcPointsBarEmpty = document.getElementById("hc-points-bar-empty");

const liv1Occupati = document.getElementById("liv1-occupati");
const liv1PuntiCategoria = document.getElementById("liv1-punti-categoria");
const liv1MinPunti = document.getElementById("liv1-min-punti");
const liv1GareSlot = document.getElementById("liv1-gare-slot");
const liv1ProgressBar = document.getElementById("liv1-progress-bar");
const liv1StackedPointsBarContainer = document.getElementById(
  "liv1-stacked-points-bar-container"
);
const liv1PointsBar100 = document.getElementById("liv1-points-bar-100");
const liv1PointsBar50 = document.getElementById("liv1-points-bar-50");
const liv1PointsBarEmpty = document.getElementById("liv1-points-bar-empty");

const liv2Occupati = document.getElementById("liv2-occupati");
const liv2PuntiCategoria = document.getElementById("liv2-punti-categoria");
const liv2MinPunti = document.getElementById("liv2-min-punti");
const liv2GareSlot = document.getElementById("liv2-gare-slot");
const liv2ProgressBar = document.getElementById("liv2-progress-bar");
const liv2StackedPointsBarContainer = document.getElementById(
  "liv2-stacked-points-bar-container"
);
const liv2PointsBar100 = document.getElementById("liv2-points-bar-100");
const liv2PointsBar50 = document.getElementById("liv2-points-bar-50");
const liv2PointsBarEmpty = document.getElementById("liv2-points-bar-empty");

const liv3Occupati = document.getElementById("liv3-occupati");
const liv3PuntiCategoria = document.getElementById("liv3-punti-categoria");
const liv3MinPunti = document.getElementById("liv3-min-punti");
const liv3GareSlot = document.getElementById("liv3-gare-slot");
const liv3ProgressBar = document.getElementById("liv3-progress-bar");
const liv3StackedPointsBarContainer = document.getElementById(
  "liv3-stacked-points-bar-container"
);
const liv3PointsBar100 = document.getElementById("liv3-points-bar-100");
const liv3PointsBar50 = document.getElementById("liv3-points-bar-50");
const liv3PointsBarEmpty = document.getElementById("liv3-points-bar-empty");

const listaGareDimezzamento = document.getElementById(
  "lista-gare-dimezzamento"
);
const listaGareScadenza = document.getElementById("lista-gare-scadenza");
// Strategia
const listaSuggerimentiStrategiciSlot = document.getElementById(
  "lista-suggerimenti-strategici-slot"
);

// Nuovi elementi per la finestra modale di notifica VSR
const vsrChangeModal = document.getElementById("vsr-change-modal");
const vsrChangeModalTitle = document.getElementById("vsr-change-modal-title");
const vsrChangeModalBody = document.getElementById("vsr-change-modal-body");
const vsrChangeModalInstruction = document.getElementById(
  "vsr-change-modal-instruction"
);
const vsrChangeModalPrimaryButton = document.getElementById(
  "vsr-change-modal-primary-btn"
);
const vsrChangeModalSecondaryButton = document.getElementById(
  "vsr-change-modal-secondary-btn"
);

const btnToggleRecentEvents = document.getElementById(
  "btn-toggle-recent-events"
);
const recentEventsSummary = document.getElementById("recent-events-summary");

// Grafico Radar Dashboard
const canvasGraficoRadar = document.getElementById("graficoRadarSaluteSlot");
let graficoRadarIstanza = null;

// Grafico Torta Strategia
const canvasGraficoTorta = document.getElementById(
  "graficoTortaComposizioneVSR"
);
let graficoTortaIstanza = null;

// --- Stato Applicazione ---
// Le variabili di stato per la calcolatrice sono state spostate in `modules/credits-ui.js`
// Le variabili di stato per la UI VSR sono state spostate in `modules/vsr-ui.js`

const livelliVsrStoricoMap = {
  0: {
    testo: "Seleziona Livello VSR",
    valoreNumerico: null,
    tipo: "N/D",
    chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_DEFAULT",
  },
  HC: {
    testo: "Fuori Categoria",
    valoreNumerico: 15000,
    tipo: "HC",
    chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_HC",
  },
  LIV1: {
    testo: "Livello 1",
    valoreNumerico: 10000,
    tipo: "LIV1",
    chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L1",
  },
  LIV2: {
    testo: "Livello 2",
    valoreNumerico: 5000,
    tipo: "LIV2",
    chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L2",
  },
  LIV3: {
    testo: "Livello 3",
    valoreNumerico: 3000,
    tipo: "LIV3",
    chiaveTraduzione: "VSR_FORM_SELECT_LEVEL_OPTION_L3",
  },
};

const LIMITI_GARE_PER_CATEGORIA = { HC: 1, LIV1: 3, LIV2: 6, LIV3: 10 };
let potenzialePuntiPerGraficoTorta = {};
let totalePotenzialePuntiPerGraficoTorta = 1;
const URL_ELENCO_REGATE =
  "https://cert.civis.net/LSV-Dash/api?context=api&context_type=allrace";

const SOGLIA_DEBOLEZZA = { 15000: 0.5, 10000: 0.4, 5000: 0.3, 3000: 0.25 };
// Le variabili di riferimento per le celle della tabella 3 sono ora gestite in `modules/credits-ui.js`

// --- Costanti Applicazione ---
const RACE_TYPES = {
  HC: "HC",
  L1: "LIV1",
  L2: "LIV2",
  L3: "LIV3",
  ND: "N/D",
};
const VIEW_MODES = {
  VALID_FOR_RANKING: "valide",
  ALL_HISTORY: "tutte",
  HISTORY_HC: "storico_hc",
  HISTORY_L1: "storico_liv1",
  HISTORY_L2: "storico_liv2",
  HISTORY_L3: "storico_liv3",
};
const EVENT_TYPES = {
  HALVING: "EVENT_TYPE_HALVING", // Usato internamente per logica, la traduzione avviene al display
  EXPIRY: "EVENT_TYPE_EXPIRY", // Usato internamente per logica
};
let statoVSRPrecedente = {
  punteggio: 0,
  eventiImminentiPrecedenti: [], // Array di oggetti {id, nome, tipoEvento, dataEvento, impattoNettoStimato, isContributingOriginale}
  timestampSalvataggio: null,
};

// --- Costanti per il Log Eventi ---
const DURATA_RIEPILOGO_GIORNI = 30;

// --- Funzioni Helper Globali per Calcoli VSR ---
function calcolaClassificaPerPuntiTarget(
  livelloValoreNumerico,
  puntiVsrTarget
) {
  if (!livelloValoreNumerico || puntiVsrTarget <= 0) return null;
  if (puntiVsrTarget >= livelloValoreNumerico) return 1;
  const rapporto = livelloValoreNumerico / puntiVsrTarget;
  const classificaCalcolata = Math.pow(rapporto, 8);
  return Math.max(1, Math.floor(classificaCalcolata));
}

// --- Funzioni di Navigazione e Inizializzazione ---
function handleNavClick(event) {
  if (!event.currentTarget || !event.currentTarget.id) return;
  const targetButtonId = event.currentTarget.id;
  const targetViewId = targetButtonId.replace("btn-show-", "") + "-view";

  viewSections.forEach((section) => (section.style.display = "none"));
  mainNavButtons.forEach((button) => button.classList.remove("active"));

  const targetSection = document.getElementById(targetViewId);
  if (targetSection) {
    targetSection.style.display = "block";
    event.currentTarget.classList.add("active");

    try {
      switch (targetViewId) {
        case "dashboard-view":
          aggiornaInfoClassificaView();
          aggiornaGraficoRadarSaluteSlot();
          break;
        case "gestione-crediti-view":
          // La logica di aggiornamento della calcolatrice è ora gestita dal suo modulo
          // ma potrebbe essere necessario chiamare una funzione di refresh se lo stato cambia altrove.
          // Per ora, l'init si occupa di tutto.
          break;
        case "classifica-vsr-view":
          aggiornaInfoClassificaView();
          aggiornaTabellaGare(); // Assicura che la tabella sia aggiornata quando si naviga alla vista
          break;
        case "analisi-view":
          aggiornaSezioneAnalisi();
          break;
        case "strategia-view":
          aggiornaSezioneStrategia();
          aggiornaGraficoTortaStatoStrategia();
          break;
      }
    } catch (error) {
      console.error(
        `Errore durante l'aggiornamento della sezione ${targetViewId}:`,
        error
      );
    }
  }
}

function getGareConScadenzeImminenti(serializzabile = false) {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const scadenze = [];
  const oggi = new Date();
  const contributingIds = getContributingGareIds(gareSalvate, oggi); // Ottieni gli ID delle gare che contribuiscono PRIMA di ogni simulazione

  gareSalvate.forEach((gara) => {
    const oggiLocale = new Date();
    oggiLocale.setHours(0, 0, 0, 0);
    const dataGaraDate = new Date(gara.data);
    dataGaraDate.setHours(0, 0, 0, 0);

    const dataDimezzamento = new Date(dataGaraDate);
    dataDimezzamento.setFullYear(dataDimezzamento.getFullYear() + 1);
    const dataScadenza = new Date(dataGaraDate);
    dataScadenza.setFullYear(dataScadenza.getFullYear() + 2);

    let tipoEvento = null;
    let dataEventoObj = null;
    let isUrgente = false;
    let impattoPuntiStimato = 0;
    let fattoreDecadimentoSimulato = -1; // -1 indica nessuna simulazione

    // Calculate warning periods (3 months before event)
    const warningDimezzamento = new Date(dataDimezzamento);
    warningDimezzamento.setMonth(warningDimezzamento.getMonth() - 3);
    const warningScadenza = new Date(dataScadenza);
    warningScadenza.setMonth(warningScadenza.getMonth() - 3);

    if (oggiLocale >= warningDimezzamento && oggiLocale < dataDimezzamento) {
      // Within 3 months before halving
      tipoEvento = EVENT_TYPES.HALVING;
      dataEventoObj = dataDimezzamento;
      isUrgente = calcolaGiorniTraDate(oggiLocale, dataDimezzamento) <= 30;
      impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5);
      fattoreDecadimentoSimulato = 0.5;
    } else if (oggiLocale >= warningScadenza && oggiLocale < dataScadenza) {
      // Within 3 months before expiry
      tipoEvento = EVENT_TYPES.EXPIRY;
      dataEventoObj = dataScadenza;
      isUrgente = calcolaGiorniTraDate(oggiLocale, dataScadenza) <= 30;
      impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5);
      fattoreDecadimentoSimulato = 0;
    }

    if (tipoEvento && dataEventoObj) {
      const isContributingOriginale = contributingIds.has(gara.id);
      const simulazioneRisultato = simulaImpattoNettoEVariazioneClassifica(
        gara,
        fattoreDecadimentoSimulato
      );

      const currentLanguage = document.documentElement.lang || "it";
      let dateLocale = "en-GB";
      if (currentLanguage === "it") dateLocale = "it-IT";
      else if (currentLanguage === "fr") dateLocale = "fr-FR";

      scadenze.push({
        ...gara,
        tipoEvento: tipoEvento,
        dataEvento: serializzabile
          ? dataEventoObj.toISOString()
          : dataEventoObj.toLocaleDateString(dateLocale),
        isUrgente,
        impattoPunti: impattoPuntiStimato,
        isContributingOriginale: isContributingOriginale,
        impattoNettoStimato: simulazioneRisultato.impattoNettoEffettivo,
      });
    }
  });
  return scadenze;
}

async function init() {
  await initI18n(() => {
    // Questa funzione viene eseguita OGNI volta che la lingua cambia
    // Aggiorna tutti i componenti UI che dipendono dalla lingua
    aggiornaInfoClassificaView();
    aggiornaTabellaGare();
  });

  // --- LOGICA DI CONTROLLO VARIAZIONE VSR (REVISIONATA E CORRETTA) ---

  // 1. Carica lo stato della sessione PRECEDENTE.
  caricaStatoVSRPrecedente(); // This populates statoVSRPrecedente
  const vsrPrecedente = statoVSRPrecedente?.punteggio;

  // 2. Calcola lo stato per la sessione CORRENTE.
  const gareSalvateCorrenti =
    JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrCorrenteCalcolato = getVsrScoreCalcolato(gareSalvateCorrenti, oggi);
  const eventiImminentiCorrenti = getGareConScadenzeImminenti(true);

  // 3. Confronta lo stato PRECEDENTE con quello CORRENTE e mostra la notifica se sono diversi.
  if (vsrPrecedente !== null && vsrCorrenteCalcolato !== vsrPrecedente) {
    mostraNotificaCambiamento(vsrPrecedente, vsrCorrenteCalcolato);
  }

  // 4. Salva lo stato CORRENTE in 'statoVSRPrecedente' per la PROSSIMA sessione.
  // Questo sostituisce il listener 'beforeunload' che era la causa del bug.
  const statoCorrenteDaSalvare = {
    punteggio: vsrCorrenteCalcolato,
    eventiImminentiPrecedenti: eventiImminentiCorrenti,
    timestampSalvataggio: new Date().toISOString(),
  };
  localStorage.setItem(
    "statoVSRPrecedente",
    JSON.stringify(statoCorrenteDaSalvare)
  );
  console.log(
    "Stato CORRENTE salvato come 'precedente' per la prossima sessione:",
    statoCorrenteDaSalvare
  );

  // 5. Imposta il valore 'classificaVsrAttuale' per l'interfaccia della sessione CORRENTE.
  localStorage.setItem("classificaVsrAttuale", vsrCorrenteCalcolato.toString());

  // 6. Continua con il resto dell'inizializzazione.
  caricaDatiDashboard(); // Mostra i dati iniziali (incluso il VSR appena calcolato)

  // Inizializza il modulo della calcolatrice crediti
  initCreditsCalculator(
    {
      tabella1,
      tabella3Body,
      outputCatEcon,
      inputBonusTotale,
      outputSpesa,
      outputSpesaEffettiva,
      outputPosRecupero,
    },
    livelliVsrStoricoMap
  );

  // Inizializza il modulo della UI per la classifica VSR
  initVsrRankingUI(
    {
      formAggiungiGara,
      dataGaraInput,
      livelloGaraVsrStoricoSelect,
      nomeRegataInput,
      classificaFinaleStoricoInput,
      puntiVsrCalcolatiInput,
      classificaVsrtbody,
      tabellaClassificaVsr,
      titoloFormGara,
      btnMostraTutteGare,
      btnMostraGareValide,
      btnStoricoHC,
      btnStoricoLiv1,
      btnStoricoLiv2,
      btnStoricoLiv3,
      livelliVsrStoricoMap,
    },
    {
      onDataChange: handleDataChange,
      getContributingGareIds: getContributingGareIds,
    }
  );

  setupDashboardListeners();
  if (btnEsportaDati) btnEsportaDati.addEventListener("click", esportaDati);
  if (fileImportaDatiInput)
    fileImportaDatiInput.addEventListener("change", importaDati);
  if (fileImportaRegateSuggeriteInput)
    fileImportaRegateSuggeriteInput.addEventListener(
      "change",
      preparaImportazioneRegateSuggerite
    );
  setupModaleAvvisoRegateListeners();
  if (btnApriModalElencoRegate)
    btnApriModalElencoRegate.addEventListener(
      "click",
      apriEPopolaModalElencoRegate
    );
  if (btnChiudiModalElencoRegate)
    btnChiudiModalElencoRegate.addEventListener(
      "click",
      chiudiModalElencoRegate
    );
  if (modalElencoRegate)
    modalElencoRegate.addEventListener("click", (event) => {
      if (event.target === modalElencoRegate) chiudiModalElencoRegate();
    });
  if (vsrChangeModalPrimaryButton)
    vsrChangeModalPrimaryButton.addEventListener(
      "click",
      handleVSRChangeModalPrimaryClick
    );
  if (vsrChangeModalSecondaryButton)
    vsrChangeModalSecondaryButton.addEventListener(
      "click",
      dismissVSRChangeModal
    );
  if (btnToggleRecentEvents)
    btnToggleRecentEvents.addEventListener(
      "click",
      popolaERendiVisibileRiepilogoEventi
    );
}

// --- Funzioni Dashboard ---
function setupDashboardListeners() {
  if (nomeBarcaInput)
    nomeBarcaInput.addEventListener("input", () => {
      salvaDatiDashboard();
      aggiornaInfoClassificaView();
    });
}

function caricaDatiDashboard() {
  if (nomeBarcaInput)
    nomeBarcaInput.value = localStorage.getItem("nomeBarca") || "";
  aggiornaInfoClassificaView();
}

function salvaDatiDashboard() {
  if (nomeBarcaInput) localStorage.setItem("nomeBarca", nomeBarcaInput.value);
}

function aggiornaInfoClassificaView() {
  const nomeBarca =
    localStorage.getItem("nomeBarca") || getTranslation("TEXT_NA");
  const classificaVsrRaw = localStorage.getItem("classificaVsrAttuale") || "0";
  const classificaVsrNum = parseFloat(classificaVsrRaw) || 0;

  // VSR View
  if (nomeBarcaDisplay) nomeBarcaDisplay.textContent = nomeBarca;
  if (classificaVsrAttualeDisplay)
    classificaVsrAttualeDisplay.textContent = formatNumber(classificaVsrNum, 0);

  // Dashboard View
  if (classificaVsrAttualeInput)
    classificaVsrAttualeInput.textContent = formatNumber(classificaVsrNum, 0);
}

// --- Funzioni Gestione Classifica VSR ---
// TUTTE LE FUNZIONI DELLA UI VSR SONO STATE SPOSTATE IN `modules/vsr-ui.js`

function getContributingGareIds(gareSalvate, dataRiferimento) {
  if (gareSalvate.length === 0) return new Set();
  const gareContributive = selezionaGareContributive(
    gareSalvate,
    dataRiferimento
  );
  const contributingIds = new Set();
  for (const tipoGara in LIMITI_GARE_PER_CATEGORIA) {
    if (Object.prototype.hasOwnProperty.call(gareContributive, tipoGara))
      gareContributive[tipoGara].forEach((gara) =>
        contributingIds.add(gara.id)
      );
  }
  return contributingIds;
}

// Funzione che si occupa di ricalcolare, salvare e aggiornare l'interfaccia.
// Questa viene chiamata DOPO un'azione dell'utente (aggiungi, elimina, importa).
function recalcolaEAggiornaVsrUI() {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrAttualeCalcolato = getVsrScoreCalcolato(gareSalvate, oggi);
  localStorage.setItem("classificaVsrAttuale", vsrAttualeCalcolato.toString());
  aggiornaInfoClassificaView(); // Aggiorna i display con il nuovo punteggio
}

// Callback per aggiornare tutto quando i dati cambiano
function handleDataChange() {
  aggiornaSezioneAnalisi();
  aggiornaSezioneStrategia();
  aggiornaGraficoTortaStatoStrategia();
  aggiornaGraficoRadarSaluteSlot();
  recalcolaEAggiornaVsrUI();
}

// TODO: La funzione `simulaImpattoNettoEVariazioneClassifica` è complessa e usa una logica di simulazione
// che ora è disallineata con `selezionaGareContributive`. Andrà rifattorizzata in un secondo momento
// per usare il nuovo modulo in modo più pulito. Per ora, la lasciamo così per non rompere la UI.
function simulaImpattoNettoEVariazioneClassifica(
  garaCheCambia,
  nuovoFattoreDecadimentoSimulato
) {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();

  if (gareSalvate.length === 0) {
    return {
      impattoNettoEffettivo: 0,
      vsrCorrente: 0,
      vsrDopoSimulazione: 0,
      gareBeneficiarie: [],
      laGaraSimulataContribuisceAncora: false,
    };
  }

  // Crea una copia delle gare per la simulazione
  const gareSimulate = JSON.parse(JSON.stringify(gareSalvate));
  const garaDaSimulare = gareSimulate.find((g) => g.id === garaCheCambia.id);

  if (!garaDaSimulare) {
    return { impattoNettoEffettivo: 0 }; // Gara non trovata
  }

  // Calcola VSR corrente
  const vsrCorrente = getVsrScoreCalcolato(gareSalvate, oggi);

  // Applica la modifica simulata
  // Questa è una semplificazione. La logica originale era più complessa
  // e modificava direttamente il fattore di decadimento.
  // Qui, per semplicità, modifichiamo la data per simulare l'evento.
  const dataSimulata = new Date(garaDaSimulare.data);
  if (nuovoFattoreDecadimentoSimulato === 0.5) {
    // Simula dimezzamento: sposta la data indietro di 1 anno
    dataSimulata.setFullYear(dataSimulata.getFullYear() - 1);
  } else if (nuovoFattoreDecadimentoSimulato === 0) {
    // Simula scadenza: sposta la data indietro di 2 anni
    dataSimulata.setFullYear(dataSimulata.getFullYear() - 2);
  }
  garaDaSimulare.data = dataSimulata.toISOString().split("T")[0];

  // Calcola VSR simulato
  const vsrDopoSimulazione = getVsrScoreCalcolato(gareSimulate, oggi);

  // Questa è una versione semplificata. La logica originale per trovare
  // le gare beneficiarie era molto complessa e legata alla vecchia implementazione.
  // Per ora, restituiamo un impatto netto corretto.
  return {
    impattoNettoEffettivo: vsrDopoSimulazione - vsrCorrente,
    vsrCorrente: vsrCorrente,
    vsrDopoSimulazione: vsrDopoSimulazione,
    gareBeneficiarie: [], // Semplificato
    laGaraSimulataContribuisceAncora: false, // Semplificato
  };
}

// --- Funzioni per Notifica e Riepilogo "Cosa è Cambiato?" ---

// Modificata per usare la nuova finestra modale
function mostraNotificaCambiamento(oldScore, newScore) {
  if (
    !vsrChangeModal ||
    !vsrChangeModalTitle ||
    !vsrChangeModalBody ||
    !vsrChangeModalInstruction
  )
    return;

  console.log("--- Esecuzione mostraNotificaCambiamento ---"); // Debug log
  console.log("Old Score:", oldScore); // Debug log
  console.log("New Score:", newScore); // Debug log

  vsrChangeModalTitle.textContent = getTranslation("VSR_CHANGE_MODAL_TITLE");
  vsrChangeModalBody.innerHTML = getTranslation("VSR_CHANGE_MODAL_BODY", {
    oldScore: formatNumber(oldScore, 0),
    newScore: formatNumber(newScore, 0),
  });
  vsrChangeModalInstruction.textContent = getTranslation(
    "VSR_CHANGE_MODAL_INSTRUCTION"
  );

  vsrChangeModal.style.display = "flex"; // Usa flex per centrare la modale
  console.log("Modal impostata su display: flex"); // Debug log
}

// Nuova funzione per gestire il click sul pulsante primario della modale
function handleVSRChangeModalPrimaryClick() {
  dismissVSRChangeModal(); // Chiude la modale
  const strategyButton = document.getElementById("btn-show-strategia");
  if (strategyButton) handleNavClick({ currentTarget: strategyButton }); // Naviga alla sezione Strategia
  popolaERendiVisibileRiepilogoEventi(); // Mostra il riepilogo eventi
}

function popolaERendiVisibileRiepilogoEventi() {
  if (!recentEventsSummary) return;

  // Se il riepilogo è già visibile, lo nascondiamo (comportamento toggle)
  if (recentEventsSummary.style.display === "block") {
    recentEventsSummary.style.display = "none";
    return;
  }

  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const eventiRecenti = [];
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const dataLimite = new Date();
  dataLimite.setDate(oggi.getDate() - DURATA_RIEPILOGO_GIORNI);

  gareSalvate.forEach((gara) => {
    const dataGaraDate = new Date(gara.data);
    dataGaraDate.setHours(0, 0, 0, 0);

    const dataDimezzamento = new Date(dataGaraDate);
    dataDimezzamento.setFullYear(dataDimezzamento.getFullYear() + 1);

    const dataScadenza = new Date(dataGaraDate);
    dataScadenza.setFullYear(dataScadenza.getFullYear() + 2);

    if (dataDimezzamento >= dataLimite && dataDimezzamento <= oggi) {
      const simulazione = simulaImpattoNettoEVariazioneClassifica(gara, 0.5);
      eventiRecenti.push({
        ...gara,
        tipoEvento: EVENT_TYPES.HALVING,
        dataEvento: dataDimezzamento,
        impattoNettoStimato: simulazione.impattoNettoEffettivo,
      });
    }
    if (dataScadenza >= dataLimite && dataScadenza <= oggi) {
      const simulazione = simulaImpattoNettoEVariazioneClassifica(gara, 0);
      eventiRecenti.push({
        ...gara,
        tipoEvento: EVENT_TYPES.EXPIRY,
        dataEvento: dataScadenza,
        impattoNettoStimato: simulazione.impattoNettoEffettivo,
      });
    }
  });

  eventiRecenti.sort((a, b) => b.dataEvento - a.dataEvento);

  let htmlContent = `<h4>${getTranslation("SUMMARY_RECENT_EVENTS_TITLE")}</h4>`;

  if (eventiRecenti.length === 0) {
    htmlContent += `<p>${getTranslation("SUMMARY_NO_RECENT_EVENTS")}</p>`;
  } else {
    htmlContent += "<ul>";
    eventiRecenti.forEach((evento) => {
      const currentLanguage = document.documentElement.lang || "it";
      let dateLocale = "en-GB";
      if (currentLanguage === "it") dateLocale = "it-IT";
      else if (currentLanguage === "fr") dateLocale = "fr-FR";
      const displayDate = evento.dataEvento.toLocaleDateString(dateLocale);

      const params = {
        raceName: evento.nome,
        eventDate: displayDate,
        netImpact: formatNumber(evento.impattoNettoStimato, 0), // Usiamo l'impatto calcolato al momento dell'evento
      };
      let chiaveTraduzione = "";
      if (evento.tipoEvento === EVENT_TYPES.HALVING) {
        chiaveTraduzione = "SUMMARY_EVENT_ITEM_HALVED";
      } else if (evento.tipoEvento === EVENT_TYPES.EXPIRY) {
        chiaveTraduzione = "SUMMARY_EVENT_ITEM_EXPIRED";
      }

      if (chiaveTraduzione) {
        htmlContent += `<li>${getTranslation(
          chiaveTraduzione,
          params
        )} <small>(${getTranslation("SUMMARY_EVENT_IMPACT_TEXT", {
          netImpact: params.netImpact,
        })})</small></li>`;
      }
    });
    htmlContent += "</ul>";
    htmlContent += `<p class="summary-note">${getTranslation(
      "SUMMARY_LOG_NOTE",
      { days: DURATA_RIEPILOGO_GIORNI }
    )}</p>`;
  }

  recentEventsSummary.innerHTML = htmlContent;
  recentEventsSummary.style.display = "block";
}

// Rinominata e modificata per la nuova modale
function dismissVSRChangeModal() {
  if (vsrChangeModal) {
    vsrChangeModal.style.display = "none";
  }
  // When dismissing, we align the "previous" state with the "current" one
  // to prevent the banner from reappearing on refresh for the same change.
  // We must save the CURRENT upcoming events, not an empty array.
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrCorrente = getVsrScoreCalcolato(gareSalvate, oggi); // Recalculate to be sure

  const eventiImminentiCorrenti = getGareConScadenzeImminenti(true); // Get current events

  const statoDaSalvare = {
    punteggio: vsrCorrente,
    eventiImminentiPrecedenti: eventiImminentiCorrenti, // FIX: Save the current events
    timestampSalvataggio: new Date().toISOString(),
  };
  localStorage.setItem("statoVSRPrecedente", JSON.stringify(statoDaSalvare));
  // Also update the in-memory state to prevent pop-up on simple UI updates without reload
  statoVSRPrecedente = JSON.parse(JSON.stringify(statoDaSalvare)); // Deep copy
  if (statoVSRPrecedente.timestampSalvataggio) {
    statoVSRPrecedente.timestampSalvataggio = new Date(
      statoVSRPrecedente.timestampSalvataggio
    );
  }
  console.log(
    "Notifica variazione VSR dismessa e stato precedente allineato allo stato corrente."
  );
}

// --- Funzioni per lo Stato VSR Precedente ---
function caricaStatoVSRPrecedente() {
  const statoSalvato = localStorage.getItem("statoVSRPrecedente");
  if (statoSalvato) {
    try {
      statoVSRPrecedente = JSON.parse(statoSalvato);
      // Converti timestampSalvataggio in oggetto Date se necessario, o lascialo come stringa/numero
      if (statoVSRPrecedente.timestampSalvataggio) {
        statoVSRPrecedente.timestampSalvataggio = new Date(
          statoVSRPrecedente.timestampSalvataggio
        );
      }
      console.log("Stato VSR precedente caricato:", statoVSRPrecedente);
    } catch (e) {
      console.error("Errore nel parsing dello stato VSR precedente:", e);
      statoVSRPrecedente = {
        punteggio: null,
        eventiImminentiPrecedenti: [],
        timestampSalvataggio: null,
      };
    }
  } else {
    statoVSRPrecedente = {
      punteggio: null,
      eventiImminentiPrecedenti: [],
      timestampSalvataggio: null,
    };
    console.log("Nessuno stato VSR precedente trovato in localStorage.");
  }
}

// --- Funzioni Esportazione/Importazione Dati ---
function esportaDati() {
  const datiDaEsportare = {
    nomeBarca: localStorage.getItem("nomeBarca") || "",
    classificaVsrAttuale: localStorage.getItem("classificaVsrAttuale") || "0",
    gareSalvate: JSON.parse(localStorage.getItem("gareSalvate")) || [],
  };
  const datiJson = JSON.stringify(datiDaEsportare, null, 2);
  const blob = new Blob([datiJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "VRCompass_backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert(getTranslation("ALERT_DOWNLOAD_READY"));
}

function importaDati(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const datiImportati = JSON.parse(e.target.result);
      if (
        typeof datiImportati.nomeBarca !== "undefined" &&
        typeof datiImportati.classificaVsrAttuale !== "undefined" &&
        Array.isArray(datiImportati.gareSalvate)
      ) {
        localStorage.setItem("nomeBarca", datiImportati.nomeBarca);
        localStorage.setItem(
          "classificaVsrAttuale",
          datiImportati.classificaVsrAttuale
        );
        localStorage.setItem(
          "gareSalvate",
          JSON.stringify(datiImportati.gareSalvate)
        );
        caricaDatiDashboard();
        aggiornaInfoClassificaView();
        aggiornaTabellaGare();
        recalcolaEAggiornaVsrUI();
        aggiornaSezioneStrategia();
        aggiornaSezioneAnalisi();
        aggiornaGraficoTortaStatoStrategia();
        aggiornaGraficoRadarSaluteSlot();
        // Non è necessario chiamare selezionaCategoria qui,
        // lo stato della calcolatrice non è parte del backup.
        alert(getTranslation("ALERT_DATA_IMPORTED_SUCCESSFULLY"));
      } else alert(getTranslation("ALERT_INVALID_BACKUP_FILE"));
    } catch (error) {
      console.error("Errore durante l'importazione dei dati:", error);
      alert(getTranslation("ALERT_ERROR_READING_FILE"));
    } finally {
      if (fileImportaDatiInput) fileImportaDatiInput.value = "";
    }
  };
  reader.readAsText(file);
}

// --- Funzioni per Importazione Regate Suggerite ---
function setupModaleAvvisoRegateListeners() {
  if (btnChiudiModaleAvvisoRegate)
    btnChiudiModaleAvvisoRegate.addEventListener("click", () => {
      if (modaleAvvisoCaricamentoRegate)
        modaleAvvisoCaricamentoRegate.style.display = "none";
      if (fileImportaRegateSuggeriteInput)
        fileImportaRegateSuggeriteInput.value = "";
      fileSelezionatoPerRegateSuggerite = null;
    });
  if (btnAnnullaCaricamentoRegate)
    btnAnnullaCaricamentoRegate.addEventListener("click", () => {
      if (modaleAvvisoCaricamentoRegate)
        modaleAvvisoCaricamentoRegate.style.display = "none";
      if (fileImportaRegateSuggeriteInput)
        fileImportaRegateSuggeriteInput.value = "";
      fileSelezionatoPerRegateSuggerite = null;
    });
  if (btnConfermaCaricamentoRegate)
    btnConfermaCaricamentoRegate.addEventListener(
      "click",
      importaRegateSuggeriteConfermate
    );
}

function preparaImportazioneRegateSuggerite(event) {
  fileSelezionatoPerRegateSuggerite = event.target.files[0];
  if (!fileSelezionatoPerRegateSuggerite) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const datiLetti = JSON.parse(e.target.result);
      const dataAggiornamento = datiLetti.dataUltimoAggiornamento || "N/D";
      if (dataAggiornamentoFileRegateSpan)
        dataAggiornamentoFileRegateSpan.textContent = dataAggiornamento;
      if (modaleAvvisoCaricamentoRegate)
        modaleAvvisoCaricamentoRegate.style.display = "flex";
    } catch (error) {
      console.error(
        "Errore durante la lettura del file delle regate suggerite:",
        error
      );
      alert(getTranslation("ALERT_ERROR_READING_SUGGESTED_RACES_FILE"));
      if (fileImportaRegateSuggeriteInput)
        fileImportaRegateSuggeriteInput.value = "";
      fileSelezionatoPerRegateSuggerite = null;
    }
  };
  reader.readAsText(fileSelezionatoPerRegateSuggerite);
}

function importaRegateSuggeriteConfermate() {
  if (!fileSelezionatoPerRegateSuggerite) {
    alert(getTranslation("ALERT_NO_FILE_SELECTED_FOR_IMPORT"));
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const datiImportati = JSON.parse(e.target.result);
      if (Array.isArray(datiImportati.gareSalvate)) {
        localStorage.setItem(
          "gareSalvate",
          JSON.stringify(datiImportati.gareSalvate)
        );
        aggiornaTabellaGare();
        recalcolaEAggiornaVsrUI();
        aggiornaSezioneAnalisi();
        aggiornaSezioneStrategia();
        aggiornaGraficoTortaStatoStrategia();
        aggiornaGraficoRadarSaluteSlot();
        alert(getTranslation("ALERT_SUGGESTED_RACES_IMPORTED_SUCCESSFULLY"));
      } else alert(getTranslation("ALERT_INVALID_SUGGESTED_RACES_JSON_ARRAY"));
    } catch (error) {
      console.error(
        "Errore durante l'importazione confermata delle regate suggerite:",
        error
      );
      alert(getTranslation("ALERT_ERROR_IMPORTING_SUGGESTED_RACES_FILE"));
    } finally {
      if (modaleAvvisoCaricamentoRegate)
        modaleAvvisoCaricamentoRegate.style.display = "none";
      if (fileImportaRegateSuggeriteInput)
        fileImportaRegateSuggeriteInput.value = "";
      fileSelezionatoPerRegateSuggerite = null;
    }
  };
  reader.readAsText(fileSelezionatoPerRegateSuggerite);
}

// --- Funzioni per la Modale Elenco Regate ---
function apriEPopolaModalElencoRegate() {
  if (
    !modalElencoRegate ||
    !infoAggiornamentoElencoRegate ||
    !tbodyElencoRegateSuggerite
  ) {
    alert(getTranslation("ALERT_ERROR_LOADING_RACE_LIST_NOW"));
    return;
  }
  modalElencoRegate.style.display = "block";
  caricaDatiElencoRegate();
}

function chiudiModalElencoRegate() {
  if (modalElencoRegate) modalElencoRegate.style.display = "none";
}

async function caricaDatiElencoRegate() {
  infoAggiornamentoElencoRegate.textContent = getTranslation(
    "TEXT_LOADING_RACE_LIST"
  );
  tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center;">${getTranslation(
    "TEXT_WAIT"
  )}</td></tr>`;

  // Ordre des catégories (par défaut si absent/inconnu → 99)
  const categoryOrder = { HC: 1, LIV1: 2, LIV2: 3, LIV3: 4 };

  // Helpers
  const normalizeLegId = (s) => String(s).replace(/^\d{4}_/, "");

  const mapVsrToLivello = (vsr) => {
    switch (Number(vsr)) {
      case -1:
        return "HC";
      case 1:
        return "LIV1";
      case 2:
        return "LIV2";
      case 3:
        return "LIV3";
      case 0:
      default:
        return ""; // rien pour 0 ou valeur inconnue
    }
  };
  // Map livello -> points par défaut
  const basePointsFromLivello = (livello) => {
    switch (String(livello).toUpperCase()) {
      case "HC":
        return 15000;
      case "LIV1":
        return 10000;
      case "LIV2":
        return 5000;
      case "LIV3":
        return 3000;
      default:
        return 0;
    }
  };
  const isValidISODate = (s) =>
    typeof s === "string" && /^\d{4}-\d{2}-\d{2}/.test(s);
  const toISODate = (v) => {
    if (!v) return new Date().toISOString().split("T")[0];
    if (isValidISODate(v)) return v.slice(0, 10);
    const d = new Date(v);
    return isNaN(d.getTime())
      ? new Date().toISOString().split("T")[0]
      : d.toISOString().split("T")[0];
  };
  const parsePoints = (x) => {
    const n = parseInt(x, 10);
    return Number.isFinite(n) ? n : 0;
  };

  // Normalisation d’un objet "regata" quel que soit le naming des champs
  const normalizeRegata = (row) => {
    //tentatives de mapping de clés possibles
    const idDatabase = row.idDatabase ?? normalizeLegId(row.rid) ?? "";
    const data = row.data ?? row.date ?? row.end ?? "";
    // const livello = row.livello ?? row.vsr ?? "";
    const livello = (() => {
      const lv = row.livello ?? row.category ?? row.cat ?? row.level;
      if (lv != null && String(lv).trim() !== "")
        return String(lv).toUpperCase();
      return mapVsrToLivello(row.vsr);
    })();
    const nome = row.nome ?? row.name ?? "";
    // 1) si le JSON fournit déjà des points -> on les prend
    // 2) sinon -> on applique la table (HC=15000, LIV1=10000, LIV2=5000, LIV3=3000)
    const explicit = row.puntiVSRBase ?? row.vsrPoints;
    const puntiVSRBase =
      explicit == null || Number.isNaN(parseInt(explicit, 10))
        ? basePointsFromLivello(livello)
        : parseInt(explicit, 10);

    return {
      idDatabase: String(idDatabase),
      data: toISODate(data),
      livello: String(livello).toUpperCase(),
      nome: String(nome),
      puntiVSRBase: parsePoints(puntiVSRBase),
    };
  };

  try {
    const response = await fetch(URL_ELENCO_REGATE, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} en chargeant la liste des régates.`
      );
    }

    // On tente JSON direttamente
    let payload;
    try {
      payload = await response.json();
    } catch (e) {
      // Message plus clair si l’URL ne renvoie pas du JSON
      const textPeek = await response.text();
      throw new Error(
        "La ressource n’est pas un JSON valide. Aperçu: " +
          textPeek.slice(0, 120)
      );
    }

    // Plusieurs structures possibles :
    // - { dataAggiornamentoDatabase, elencoRegateProposte:[...] }
    // - { updatedAt, regate:[...] } / { updatedAt, races:[...] }
    // - [ ...items ]
    let elenco = [];
    if (Array.isArray(payload)) {
      elenco = payload;
    } else if (payload && typeof payload === "object") {
      elenco =
        payload.elencoRegateProposte ??
        payload.regate ??
        payload.races ??
        payload.items ??
        payload.data ??
        [];
    }

    if (!Array.isArray(elenco)) {
      throw new Error(
        "Schéma JSON inattendu: la liste des régates n’est pas un tableau."
      );
    }

    // Date de MAJ
    const dataAggiornamentoDatabase = toISODate(
      payload?.dataAggiornamentoDatabase ??
        payload?.updatedAt ??
        payload?.lastUpdate
    );

    // Normalisation + filtrage minimal
    const parsedRegate = elenco
      .map(normalizeRegata)
      .filter((r) => r.idDatabase && r.nome);

    // Tri par catégorie puis date (récent → ancien)
    parsedRegate.sort((a, b) => {
      const cA = categoryOrder[a.livello] ?? 99;
      const cB = categoryOrder[b.livello] ?? 99;
      if (cA !== cB) return cA - cB;
      return new Date(b.data) - new Date(a.data);
    });

    const datiElenco = {
      dataAggiornamentoDatabase,
      elencoRegateProposte: parsedRegate,
    };

    // UI
    popolaTabellaElencoRegateSuggerite(datiElenco.elencoRegateProposte);
  } catch (error) {
    console.error(
      "Erreur lors du chargement de l’elenco regate (JSON):",
      error
    );
    infoAggiornamentoElencoRegate.textContent = getTranslation(
      "TEXT_ERROR_LOADING_RACE_LIST"
    );
    tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red;">${error.message}</td></tr>`;
  }
}

function popolaTabellaElencoRegateSuggerite(regateProposte) {
  tbodyElencoRegateSuggerite.innerHTML = "";
  if (regateProposte.length === 0) {
    tbodyElencoRegateSuggerite.innerHTML = `<tr><td colspan="6" style="text-align:center;">${getTranslation(
      "TEXT_NO_SUGGESTED_RACES"
    )}</td></tr>`;
    return;
  }
  const gareSalvateAttuali =
    JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const idGareSalvate = new Set(
    gareSalvateAttuali
      .filter((g) => g.idDatabaseMaster != null)
      .map((g) => g.idDatabaseMaster)
  );
  tbodyElencoRegateSuggerite.dataset.regateProposte =
    JSON.stringify(regateProposte);
  regateProposte.forEach((regata) => {
    const row = tbodyElencoRegateSuggerite.insertRow();
    row.insertCell().textContent = new Date(regata.data).toLocaleDateString(
      "it-IT"
    );
    row.insertCell().textContent = regata.nome;
    row.insertCell().textContent = getTranslation(
      livelliVsrStoricoMap[regata.livello]?.chiaveTraduzione || regata.livello
    );
    row.insertCell().textContent = formatNumber(regata.puntiVSRBase, 0);
    const cellaClassifica = row.insertCell();
    const inputClassifica = document.createElement("input");
    inputClassifica.type = "number";
    inputClassifica.min = "1";
    inputClassifica.placeholder = getTranslation("PLACEHOLDER_POSITION");
    inputClassifica.style.width = "60px";
    inputClassifica.style.textAlign = "center";
    cellaClassifica.appendChild(inputClassifica);
    const cellaAzione = row.insertCell();
    const btnAggiungi = document.createElement("button");
    btnAggiungi.textContent = getTranslation("BTN_ADD_RACE");
    btnAggiungi.classList.add("edit-btn");
    if (idGareSalvate.has(regata.idDatabase)) {
      btnAggiungi.textContent = getTranslation("TEXT_ALREADY_ADDED");
      btnAggiungi.disabled = true;
      inputClassifica.disabled = true;
    } else {
      btnAggiungi.onclick = () =>
        aggiungiRegataDaElencoAlloStorico(regata, inputClassifica.value);
    }
    cellaAzione.appendChild(btnAggiungi);
  });
}

function aggiungiRegataDaElencoAlloStorico(
  regataMaster,
  classificaFinaleUtenteString
) {
  const classificaFinale = parseInt(classificaFinaleUtenteString, 10);
  if (isNaN(classificaFinale) || classificaFinale <= 0) {
    alert(getTranslation("ALERT_INVALID_FINAL_RANKING"));
    return;
  }
  const infoLivello = Object.values(livelliVsrStoricoMap).find(
    (l) => l.tipo === regataMaster.livello
  );
  if (!infoLivello || infoLivello.valoreNumerico === null) {
    alert(getTranslation("ALERT_INVALID_RACE_LEVEL"));
    return;
  }
  const puntiVSRCalcolati = calcolaPuntiPerClassifica(
    infoLivello.valoreNumerico,
    classificaFinale
  );
  const nuovaGara = {
    id: Date.now(),
    data: regataMaster.data,
    livello: regataMaster.livello,
    nome: regataMaster.nome,
    classificaFinale: classificaFinale,
    puntiVSR: puntiVSRCalcolati,
    idDatabaseMaster: regataMaster.idDatabase,
  };
  let gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  gareSalvate.push(nuovaGara);
  localStorage.setItem("gareSalvate", JSON.stringify(gareSalvate));
  aggiornaTabellaGare();
  recalcolaEAggiornaVsrUI();
  aggiornaSezioneAnalisi();
  aggiornaSezioneStrategia();
  aggiornaGraficoTortaStatoStrategia();
  aggiornaGraficoRadarSaluteSlot();
  try {
    const regateOriginali = JSON.parse(
      tbodyElencoRegateSuggerite.dataset.regateProposte || "[]"
    );
    popolaTabellaElencoRegateSuggerite(regateOriginali);
  } catch (e) {
    console.error(
      "Errore nel ripopolare la tabella delle regate suggerite:",
      e
    );
  }
  alert(
    getTranslation("MSG_RACE_ADDED_TO_HISTORY", {
      raceName: nuovaGara.nome,
      points: nuovaGara.puntiVSR,
    })
  );
}

// --- Funzioni Sezione Analisi ---
function aggiornaSezioneAnalisi() {
  aggiornaPanoramicaSlotVSR();
}
function getGareContributiveConDettagli() {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  return selezionaGareContributive(gareSalvate, new Date());
}

function aggiornaPanoramicaSlotVSR() {
  const gareContributive = getGareContributiveConDettagli();
  const gareConScadenze = getGareConScadenzeImminenti();
  const idsGareConScadenze = new Set(gareConScadenze.map((g) => g.id));

  function popolaCategoriaSlot(
    tipoGara,
    gareCat,
    maxSlotPerFascia,
    elOccupati,
    elMinPunti,
    elGareSlot,
    elProgressBar,
    nomeCatBreve,
    elPuntiCategoria,
    elStackedPointsBarContainer,
    elPointsBar100,
    elPointsBar50,
    elPointsBarEmpty
  ) {
    const totaleSlotCategoria = maxSlotPerFascia * 2;
    elOccupati.textContent = gareCat.length;
    if (elGareSlot) elGareSlot.innerHTML = "";
    else {
      console.warn(
        `Elemento DOM elGareSlot non trovato per '${nomeCatBreve}'.`
      );
      return;
    }

    const idContainerBase = tipoGara.toLowerCase();
    const slotCategoriaContainer = document.getElementById(
      `slot-${idContainerBase}-container`
    );
    if (slotCategoriaContainer) {
      slotCategoriaContainer.classList.remove(
        "slot-debole",
        "slot-con-opportunita",
        "slot-con-preavviso"
      );
    }

    const chiaveMappaPerValoreNumerico = Object.keys(livelliVsrStoricoMap).find(
      (key) => livelliVsrStoricoMap[key].tipo === tipoGara
    );
    const infoLivelloDaMappa = chiaveMappaPerValoreNumerico
      ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico]
      : null;
    const livelloValoreNumerico = infoLivelloDaMappa
      ? infoLivelloDaMappa.valoreNumerico
      : null;

    let totalePuntiCategoria = 0;
    gareCat.forEach((g) => (totalePuntiCategoria += g.puntiEffettivi));
    if (elPuntiCategoria)
      elPuntiCategoria.textContent = formatNumber(totalePuntiCategoria, 0);

    if (
      elStackedPointsBarContainer &&
      elPointsBar100 &&
      elPointsBar50 &&
      elPointsBarEmpty &&
      livelloValoreNumerico
    ) {
      let punti100 = 0,
        punti50 = 0;
      gareCat.forEach((g) => {
        if (g.fattoreDecadimento === 1.0) punti100 += g.puntiEffettivi;
        else if (g.fattoreDecadimento === 0.5) punti50 += g.puntiEffettivi;
      });
      const potenzialeMaxPuntiCategoria =
        livelloValoreNumerico * maxSlotPerFascia * 1.5;
      let perc100 = 0,
        perc50 = 0,
        percEmpty = 100;
      if (potenzialeMaxPuntiCategoria > 0) {
        const numPunti100 = Number(punti100) || 0;
        const numPunti50 = Number(punti50) || 0;
        perc100 = (numPunti100 / potenzialeMaxPuntiCategoria) * 100;
        perc50 = (numPunti50 / potenzialeMaxPuntiCategoria) * 100;
        percEmpty = Math.max(0, 100 - perc100 - perc50);
      }
      elPointsBar100.style.width = `${perc100}%`;
      elPointsBar50.style.width = `${perc50}%`;
      elPointsBarEmpty.style.width = `${percEmpty}%`;
      elStackedPointsBarContainer.setAttribute(
        "title",
        `Punti 100%: ${formatNumber(punti100, 0)}\nPunti 50%: ${formatNumber(
          punti50,
          0
        )}\nPotenziale Max: ${formatNumber(potenzialeMaxPuntiCategoria, 0)}`
      );
    }

    if (elProgressBar) {
      elProgressBar.style.width = `${
        (gareCat.length / totaleSlotCategoria) * 100
      }%`;
      elProgressBar.classList.remove(
        "progress-bar-good",
        "progress-bar-medium",
        "progress-bar-low",
        "progress-bar-empty"
      );
      let tooltipText = `Slot ${nomeCatBreve}: ${gareCat.length}/${totaleSlotCategoria} gare. `;
      if (
        gareCat.length > 0 &&
        livelloValoreNumerico &&
        livelloValoreNumerico > 0
      ) {
        let sommaQualitaPercentuale = 0;
        gareCat.forEach(
          (g) =>
            (sommaQualitaPercentuale +=
              (g.puntiEffettivi /
                (livelloValoreNumerico * g.fattoreDecadimento)) *
              100)
        );
        const qualitaMediaPercentuale =
          sommaQualitaPercentuale / gareCat.length;
        if (qualitaMediaPercentuale >= 75)
          elProgressBar.classList.add("progress-bar-good");
        else if (qualitaMediaPercentuale >= 40)
          elProgressBar.classList.add("progress-bar-medium");
        else elProgressBar.classList.add("progress-bar-low");
      } else elProgressBar.classList.add("progress-bar-empty");
      elProgressBar.setAttribute("title", tooltipText.trim());
    }

    if (gareCat.length > 0) {
      if (elMinPunti)
        elMinPunti.textContent = formatNumber(
          gareCat[gareCat.length - 1].puntiEffettivi,
          0
        );
      else if (tipoGara === RACE_TYPES.HC && hcPuntiAttuali)
        hcPuntiAttuali.textContent =
          gareCat.length > 0
            ? formatNumber(gareCat[0].puntiEffettivi, 0)
            : getTranslation("TEXT_NA_DETAILED");
      gareCat.forEach((g) => {
        if (elGareSlot) {
          const p = document.createElement("p");
          p.classList.add("gara-dettaglio");
          const statoPercentuale =
            g.fattoreDecadimento === 1.0 ? "100%" : "50%";
          const currentLanguage = document.documentElement.lang || "it";
          let dateLocale = "en-GB";
          if (currentLanguage === "it") dateLocale = "it-IT";
          else if (currentLanguage === "fr") dateLocale = "fr-FR";
          p.textContent = `${g.nome}: ${formatNumber(
            g.puntiEffettivi,
            0
          )} pts (${statoPercentuale}, Data: ${new Date(
            g.data
          ).toLocaleDateString(dateLocale)})`;
          elGareSlot.appendChild(p);
        }
      });
    } else {
      if (elMinPunti)
        elMinPunti.textContent = getTranslation("TEXT_NA_DETAILED");
      else if (tipoGara === RACE_TYPES.HC && hcPuntiAttuali)
        hcPuntiAttuali.textContent = getTranslation("TEXT_NA_DETAILED");
      if (elGareSlot)
        elGareSlot.innerHTML = `<p class="no-data">${getTranslation(
          "TEXT_NO_VALID_RACES_IN_SLOT"
        )}</p>`;
    }
  }
  popolaCategoriaSlot(
    RACE_TYPES.HC,
    gareContributive[RACE_TYPES.HC] || [],
    LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.HC],
    hcOccupati,
    null,
    hcGareSlot,
    hcProgressBar,
    getTranslation(livelliVsrStoricoMap[RACE_TYPES.HC].chiaveTraduzione),
    hcPuntiCategoria,
    hcStackedPointsBarContainer,
    hcPointsBar100,
    hcPointsBar50,
    hcPointsBarEmpty
  );
  popolaCategoriaSlot(
    RACE_TYPES.L1,
    gareContributive[RACE_TYPES.L1] || [],
    LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L1],
    liv1Occupati,
    liv1MinPunti,
    liv1GareSlot,
    liv1ProgressBar,
    getTranslation(livelliVsrStoricoMap[RACE_TYPES.L1].chiaveTraduzione),
    liv1PuntiCategoria,
    liv1StackedPointsBarContainer,
    liv1PointsBar100,
    liv1PointsBar50,
    liv1PointsBarEmpty
  );
  popolaCategoriaSlot(
    RACE_TYPES.L2,
    gareContributive[RACE_TYPES.L2] || [],
    LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L2],
    liv2Occupati,
    liv2MinPunti,
    liv2GareSlot,
    liv2ProgressBar,
    getTranslation(livelliVsrStoricoMap[RACE_TYPES.L2].chiaveTraduzione),
    liv2PuntiCategoria,
    liv2StackedPointsBarContainer,
    liv2PointsBar100,
    liv2PointsBar50,
    liv2PointsBarEmpty
  );
  popolaCategoriaSlot(
    RACE_TYPES.L3,
    gareContributive[RACE_TYPES.L3] || [],
    LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L3],
    liv3Occupati,
    liv3MinPunti,
    liv3GareSlot,
    liv3ProgressBar,
    getTranslation(livelliVsrStoricoMap[RACE_TYPES.L3].chiaveTraduzione),
    liv3PuntiCategoria,
    liv3StackedPointsBarContainer,
    liv3PointsBar100,
    liv3PointsBar50,
    liv3PointsBarEmpty
  );
}

function aggiornaMonitoraggioScadenze() {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const gareInDimezzamento = [];
  const gareInScadenza = [];
  const oggi = new Date();
  const contributingIds = getContributingGareIds(gareSalvate, oggi);

  gareSalvate.forEach((gara) => {
    const oggiLocale = new Date();
    oggiLocale.setHours(0, 0, 0, 0);
    const dataGaraDate = new Date(gara.data);
    dataGaraDate.setHours(0, 0, 0, 0);

    const dataDimezzamento = new Date(dataGaraDate);
    dataDimezzamento.setFullYear(dataDimezzamento.getFullYear() + 1);
    const dataScadenza = new Date(dataGaraDate);
    dataScadenza.setFullYear(dataScadenza.getFullYear() + 2);

    const warningDimezzamento = new Date(dataDimezzamento);
    warningDimezzamento.setMonth(warningDimezzamento.getMonth() - 3);
    const warningScadenza = new Date(dataScadenza);
    warningScadenza.setMonth(warningScadenza.getMonth() - 3);

    if (oggiLocale >= warningDimezzamento && oggiLocale < dataDimezzamento) {
      const simulazioneRisultato = simulaImpattoNettoEVariazioneClassifica(
        gara,
        0.5
      );
      gareInDimezzamento.push({
        ...gara,
        dataEvento: dataDimezzamento,
        isUrgente: calcolaGiorniTraDate(oggiLocale, dataDimezzamento) <= 30,
        tipoEvento: EVENT_TYPES.HALVING,
        isContributing: contributingIds.has(gara.id),
        simulazioneRisultato: simulazioneRisultato,
      });
    } else if (oggiLocale >= warningScadenza && oggiLocale < dataScadenza) {
      const simulazioneRisultato = simulaImpattoNettoEVariazioneClassifica(
        gara,
        0
      );
      gareInScadenza.push({
        ...gara,
        dataEvento: dataScadenza,
        isUrgente: calcolaGiorniTraDate(oggiLocale, dataScadenza) <= 30,
        tipoEvento: EVENT_TYPES.EXPIRY,
        isContributing: contributingIds.has(gara.id),
        simulazioneRisultato: simulazioneRisultato,
      });
    }
  });

  function popolaListaScadenze(listaElement, gare, tipoEvento) {
    listaElement.innerHTML = "";
    if (gare.length > 0) {
      gare.sort((a, b) => a.dataEvento - b.dataEvento);
      gare.forEach((g) => {
        const li = document.createElement("li");
        const livelloTesto = getTranslation(
          livelliVsrStoricoMap[g.livello]?.chiaveTraduzione || g.livello
        );

        const simulazione = g.simulazioneRisultato;
        const impattoNettoStimatoVal = simulazione.impattoNettoEffettivo;
        const gareBeneficiarieSim = simulazione.gareBeneficiarie || [];
        const garaContribuisceDopo =
          simulazione.laGaraSimulataContribuisceAncora;
        const garaEsceDalRanking = g.isContributing && !garaContribuisceDopo;

        const currentLanguage = document.documentElement.lang || "it";
        let dateLocale = "en-GB";
        if (currentLanguage === "it") dateLocale = "it-IT";
        else if (currentLanguage === "fr") dateLocale = "fr-FR";
        const dataEventoString = g.dataEvento.toLocaleDateString(dateLocale);

        const impattoDirettoGaraVal = g.isContributing
          ? Math.round(
              g.puntiVSR *
                (g.tipoEvento === EVENT_TYPES.HALVING
                  ? 0.5
                  : g.fattoreDecadimento || 0.5)
            )
          : 0;

        let params = {
          raceName: g.nome,
          raceLevel: livelloTesto,
          eventType: getTranslation(g.tipoEvento).toLowerCase(),
          eventDate: dataEventoString,
          directImpactPoints: formatNumber(Math.abs(impattoDirettoGaraVal), 0),
          netImpactPoints: formatNumber(impattoNettoStimatoVal, 0),
        };

        let testoAvvisoKey = "";
        let mostraInfoRibilanciamento = false;

        if (
          impattoNettoStimatoVal > -Math.abs(impattoDirettoGaraVal) &&
          gareBeneficiarieSim.length > 0
        ) {
          const primaGaraBeneficiariaNonSimulata = gareBeneficiarieSim.find(
            (b) => b.id !== g.id
          );
          if (primaGaraBeneficiariaNonSimulata) {
            mostraInfoRibilanciamento = true;
            params.beneficiaryRaceName = primaGaraBeneficiariaNonSimulata.nome;
            params.beneficiaryRaceLevel = getTranslation(
              livelliVsrStoricoMap[primaGaraBeneficiariaNonSimulata.livello]
                ?.chiaveTraduzione || primaGaraBeneficiariaNonSimulata.livello
            );
          }
        }

        let laGaraStessaEntraDaNonContribuente = false;
        if (!g.isContributing && impattoNettoStimatoVal > 0) {
          laGaraStessaEntraDaNonContribuente = true;
          params.netImpactPoints = formatNumber(
            Math.abs(impattoNettoStimatoVal),
            0
          );
          if (g.tipoEvento === EVENT_TYPES.EXPIRY)
            laGaraStessaEntraDaNonContribuente = false;
        }

        const differenzaImpattoTrascurabile =
          Math.abs(impattoNettoStimatoVal - -Math.abs(impattoDirettoGaraVal)) <
          10;

        if (g.isUrgente) {
          params.remainingDays = calcolaGiorniTraDate(new Date(), g.dataEvento);
          params.daysText =
            Math.abs(params.remainingDays) === 1
              ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
              : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");
          if (currentLanguage === "it") {
            params.verboMancareIt =
              Math.abs(params.remainingDays) === 1 ? "Manca" : "Mancano";
          }
          li.classList.add("scadenza-urgente");

          if (garaEsceDalRanking) {
            testoAvvisoKey =
              g.tipoEvento === EVENT_TYPES.HALVING
                ? "STRATEGY_DEADLINE_ITEM_URGENT_HALVING_EXITS_TEMPORARILY_RANKING"
                : "STRATEGY_DEADLINE_ITEM_URGENT_EXITS_RANKING";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (
            !g.isContributing &&
            g.tipoEvento === EVENT_TYPES.HALVING &&
            impattoNettoStimatoVal > 0
          ) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_ENTERS_ON_EVENT";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (mostraInfoRibilanciamento) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_REBALANCE_POSITIVE";
          } else if (laGaraStessaEntraDaNonContribuente) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_ENTERS_ON_EVENT";
          } else if (differenzaImpattoTrascurabile) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE_NO_NET";
          } else if (impattoNettoStimatoVal === 0 && !g.isContributing) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE_NO_NET";
          } else {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE";
          }
        } else {
          li.classList.add("scadenza-in-preavviso-non-urgente");
          if (garaEsceDalRanking) {
            testoAvvisoKey =
              g.tipoEvento === EVENT_TYPES.HALVING
                ? "STRATEGY_DEADLINE_ITEM_NORMAL_HALVING_EXITS_TEMPORARILY_RANKING"
                : "STRATEGY_DEADLINE_ITEM_NORMAL_EXITS_RANKING";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (
            !g.isContributing &&
            g.tipoEvento === EVENT_TYPES.HALVING &&
            impattoNettoStimatoVal > 0
          ) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_ENTERS_ON_EVENT";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (mostraInfoRibilanciamento) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_REBALANCE_POSITIVE";
          } else if (laGaraStessaEntraDaNonContribuente) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_ENTERS_ON_EVENT";
          } else if (differenzaImpattoTrascurabile) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE_NO_NET";
          } else if (impattoNettoStimatoVal === 0 && !g.isContributing) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE_NO_NET";
          } else {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE";
          }
        }
        li.innerHTML = getTranslation(testoAvvisoKey, params);

        if (
          !g.isContributing &&
          testoAvvisoKey.indexOf("_ENTERS_ON_EVENT") === -1
        ) {
          if (!garaEsceDalRanking) {
            li.innerHTML += ` <span class="non-contributing-suffix">${getTranslation(
              "STRATEGY_DEADLINE_ITEM_NOT_CONTRIBUTING_SUFFIX"
            )}</span>`;
          }
        }
        listaElement.appendChild(li);
      });
    } else {
      listaElement.innerHTML = `<li class="no-data">${getTranslation(
        "TEXT_NO_IMMINENT_EVENT_RACES",
        {
          eventType: getTranslation(
            tipoEvento === EVENT_TYPES.HALVING
              ? "EVENT_TYPE_HALVING"
              : "EVENT_TYPE_EXPIRY"
          ).toLowerCase(),
        }
      )}</li>`;
    }
  }

  popolaListaScadenze(
    listaGareDimezzamento,
    gareInDimezzamento,
    EVENT_TYPES.HALVING
  );
  popolaListaScadenze(listaGareScadenza, gareInScadenza, EVENT_TYPES.EXPIRY);
}

// --- Funzioni Sezione Strategia ---
function aggiornaSezioneStrategia() {
  aggiornaMonitoraggioScadenze();
  aggiornaValutazioneStrategicaSlot();
}

function aggiornaValutazioneStrategicaSlot() {
  if (!listaSuggerimentiStrategiciSlot) return;
  try {
    const gareContributive = getGareContributiveConDettagli();
    const suggerimentiStrategici = [];
    const gareConScadenze = getGareConScadenzeImminenti();
    const idsGareConScadenze = new Set(gareConScadenze.map((g) => g.id));
    const ordineTipiPerStrategia = [
      RACE_TYPES.HC,
      RACE_TYPES.L1,
      RACE_TYPES.L2,
      RACE_TYPES.L3,
    ];

    ordineTipiPerStrategia.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      const chiaveMappaPerValoreNumerico = Object.keys(
        livelliVsrStoricoMap
      ).find((key) => livelliVsrStoricoMap[key].tipo === tipoGara);
      const infoLivelloDaMappa = chiaveMappaPerValoreNumerico
        ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico]
        : null;
      const livelloValoreNumerico = infoLivelloDaMappa
        ? infoLivelloDaMappa.valoreNumerico
        : null;
      const nomeCategoriaTradotto = infoLivelloDaMappa
        ? getTranslation(infoLivelloDaMappa.chiaveTraduzione)
        : tipoGara;

      if (!livelloValoreNumerico) return;

      const icona = getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_ICON`);
      let suggerimentoTestoCompleto = "";
      const limitePerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];

      const gare100Attuali = gareCat.filter(
        (g) => g.fattoreDecadimento === 1.0
      );
      const numGare100Attuali = gare100Attuali.length;
      const gare100InDimezzamentoImminenteObj = gare100Attuali.filter((g) => {
        const oggi = new Date();
        oggi.setHours(0, 0, 0, 0);
        const dataGaraDate = new Date(g.data);
        dataGaraDate.setHours(0, 0, 0, 0);
        const dataDimezzamento = new Date(dataGaraDate);
        dataDimezzamento.setFullYear(dataDimezzamento.getFullYear() + 1);
        const warningDimezzamento = new Date(dataDimezzamento);
        warningDimezzamento.setMonth(warningDimezzamento.getMonth() - 3);
        return oggi >= warningDimezzamento && oggi < dataDimezzamento;
      });
      const numGare100InDimezzamentoImminente =
        gare100InDimezzamentoImminenteObj.length;
      const slotAttualmenteVuoti100 = limitePerFascia - numGare100Attuali;

      let numSlotVuoti100ConsideratiPerSuggerimento = slotAttualmenteVuoti100;
      let gare100ConsideratePerAnalisiDebolezza = [...gare100Attuali];
      let dimezzamentiSonoStatiCompensati = false;

      if (numGare100InDimezzamentoImminente > 0) {
        const gareSalvate =
          JSON.parse(localStorage.getItem("gareSalvate")) || [];

        // Simula l'impatto di tutte le gare in dimezzamento
        const gareSimulate = JSON.parse(JSON.stringify(gareSalvate));
        gare100InDimezzamentoImminenteObj.forEach((garaDaDimezzare) => {
          const garaInArraySimulato = gareSimulate.find(
            (g) => g.id === garaDaDimezzare.id
          );
          if (garaInArraySimulato) {
            // Simula il dimezzamento spostando la data indietro di 1 anno
            const dataSimulata = new Date(garaInArraySimulato.data);
            dataSimulata.setFullYear(dataSimulata.getFullYear() - 1);
            garaInArraySimulato.data = dataSimulata.toISOString().split("T")[0];
          }
        });

        const gareContributiveDopoSimulazioneObj = selezionaGareContributive(
          gareSimulate,
          new Date()
        );

        const gare100PostSimulazionePerQuestoTipo = (
          gareContributiveDopoSimulazioneObj[tipoGara] || []
        )
          .filter((g) => g.fattoreDecadimento === 1.0)
          .sort((a, b) => b.puntiEffettivi - a.puntiEffettivi)
          .slice(0, limitePerFascia);

        numSlotVuoti100ConsideratiPerSuggerimento =
          limitePerFascia - gare100PostSimulazionePerQuestoTipo.length;
        gare100ConsideratePerAnalisiDebolezza =
          gare100PostSimulazionePerQuestoTipo;

        if (
          slotAttualmenteVuoti100 <= 0 &&
          numSlotVuoti100ConsideratiPerSuggerimento <= 0
        ) {
          dimezzamentiSonoStatiCompensati = true;
        }
      }

      let params = {
        categoryName: nomeCategoriaTradotto,
        totalSlots: limitePerFascia * 2,
      };

      if (dimezzamentiSonoStatiCompensati && slotAttualmenteVuoti100 <= 0) {
        suggerimentoTestoCompleto = `${icona} ${getTranslation(
          `STRATEGY_SUGGESTION_${tipoGara}_OPTIMAL_REBALANCED`,
          params
        )}`;
      } else if (numSlotVuoti100ConsideratiPerSuggerimento > 0) {
        const puntiEsempio = calcolaPuntiPerClassifica(
          livelloValoreNumerico,
          50
        );
        params.numRacesToAdd = numSlotVuoti100ConsideratiPerSuggerimento;
        params.raceWord =
          numSlotVuoti100ConsideratiPerSuggerimento > 1
            ? getTranslation("STRATEGY_SUGGESTION_RACES_PLURAL")
            : getTranslation("STRATEGY_SUGGESTION_RACE_SINGLE");
        params.examplePointsText = puntiEsempio
          ? getTranslation("STRATEGY_SUGGESTION_EXAMPLE_POINTS_TEXT", {
              targetRank: 50,
              points: formatNumber(puntiEsempio, 0),
            })
          : "";
        params.noteHalvingText = "";
        if (
          numGare100InDimezzamentoImminente > 0 &&
          !dimezzamentiSonoStatiCompensati
        ) {
          const keyHalving =
            numGare100InDimezzamentoImminente > 1
              ? "STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_PLURAL"
              : "STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_SINGLE";
          params.noteHalvingText = getTranslation(keyHalving, {
            numRaces: numGare100InDimezzamentoImminente,
          });
        }
        suggerimentoTestoCompleto = `${icona} ${getTranslation(
          `STRATEGY_SUGGESTION_${tipoGara}_EMPTY_SLOT`,
          params
        )}`;
      } else if (gare100ConsideratePerAnalisiDebolezza.length > 0) {
        const gare100Ordinate = [...gare100ConsideratePerAnalisiDebolezza].sort(
          (a, b) => a.puntiEffettivi - b.puntiEffettivi
        );
        const garaMenoPerformante100 = gare100Ordinate[0];
        const puntiMenoPerformanti100 = garaMenoPerformante100.puntiEffettivi;
        params.points = formatNumber(puntiMenoPerformanti100, 0);
        const sogliaDebolezzaPunti =
          livelloValoreNumerico *
          SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()];
        const isMenoPerformante100Debole =
          puntiMenoPerformanti100 < sogliaDebolezzaPunti;

        if (isMenoPerformante100Debole) {
          params.targetRank = calcolaClassificaPerPuntiTarget(
            livelloValoreNumerico,
            sogliaDebolezzaPunti + 1
          );
          suggerimentoTestoCompleto = `${icona} ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_WEAK_SLOT_BASE`,
            params
          )}`;
          suggerimentoTestoCompleto += ` ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_IMPROVEMENT_ACTION`,
            params
          )}`;
        } else {
          suggerimentoTestoCompleto = `${icona} ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_OK_SLOT_BASE`,
            params
          )}`;
          const garaMenoPerformanteComplessiva =
            gareCat.length > 0 ? gareCat[gareCat.length - 1] : null;
          if (
            tipoGara !== RACE_TYPES.HC &&
            garaMenoPerformanteComplessiva &&
            !idsGareConScadenze.has(garaMenoPerformanteComplessiva.id)
          ) {
            suggerimentoTestoCompleto += ` ${getTranslation(
              "STRATEGY_SUGGESTION_MONITOR_DEADLINES_TEXT"
            )}`;
          }
        }
      }

      if (gareCat.length > 0) {
        const garaMenoPerformante = gareCat[gareCat.length - 1];
        if (
          garaMenoPerformante &&
          idsGareConScadenze.has(garaMenoPerformante.id)
        ) {
          const garaInScadenza = gareConScadenze.find(
            (g) => g.id === garaMenoPerformante.id
          );
          if (garaInScadenza) {
            const { tipoEvento, dataEvento, impattoPunti, isUrgente } =
              garaInScadenza;
            const [day, month, year] = dataEvento.split("/");
            const dataEventoDate = new Date(
              parseInt(year, 10),
              parseInt(month, 10) - 1,
              parseInt(day, 10)
            );
            const giorniRimanentiEffettivi = calcolaGiorniTraDate(
              new Date(),
              dataEventoDate
            );

            let warningParams = {
              eventType: tipoEvento.toLowerCase(),
              eventDate: dataEvento,
              impactPoints: formatNumber(impattoPunti, 0),
              remainingDays: giorniRimanentiEffettivi,
              daysText: "",
            };
            warningParams.daysText =
              Math.abs(warningParams.remainingDays) === 1
                ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
                : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");

            let verboMancareItWarning = "";
            const currentLanguage = document.documentElement.lang || "it";
            if (currentLanguage === "it") {
              verboMancareItWarning =
                Math.abs(warningParams.remainingDays) === 1
                  ? "Manca"
                  : "Mancano";
            }

            let warningKey = "";
            const translatedEventTypeForWarning =
              tipoEvento === EVENT_TYPES.HALVING
                ? getTranslation("EVENT_TYPE_HALVING")
                : getTranslation("EVENT_TYPE_EXPIRY");
            if (isUrgente)
              warningKey =
                tipoEvento === EVENT_TYPES.HALVING
                  ? `STRATEGY_SUGGESTION_${tipoGara}_URGENT_HALVING_WARNING`
                  : `STRATEGY_SUGGESTION_${tipoGara}_URGENT_EXPIRY_WARNING`;
            else warningKey = `STRATEGY_SUGGESTION_${tipoGara}_PRE_WARNING`;

            let finalWarningParams = {
              ...warningParams,
              eventType: translatedEventTypeForWarning.toLowerCase(),
            };
            if (currentLanguage === "it") {
              finalWarningParams.verboMancareIt = verboMancareItWarning;
            }
            if (warningKey)
              suggerimentoTestoCompleto += ` ${getTranslation(
                warningKey,
                finalWarningParams
              )}`;
          }
        }
      }
      if (suggerimentoTestoCompleto)
        suggerimentiStrategici.push(suggerimentoTestoCompleto);
    });

    if (gareConScadenze.length > 0) {
      let testoScadenzeImportanti = getTranslation(
        "STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_BASE"
      );
      const gareHCoL1InScadenza = gareConScadenze.filter((g) => {
        const tipoGara = livelliVsrStoricoMap[g.livello]?.tipo;
        return tipoGara === RACE_TYPES.HC || tipoGara === RACE_TYPES.L1;
      });
      if (gareHCoL1InScadenza.length > 0) {
        gareHCoL1InScadenza.sort(
          (a, b) =>
            new Date(a.dataEvento.split("/").reverse().join("-")) -
            new Date(b.dataEvento.split("/").reverse().join("-"))
        );
        const scadenzaPiuImminente = gareHCoL1InScadenza[0];
        const [day, month, year] = scadenzaPiuImminente.dataEvento.split("/");
        const dataEventoDate = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        );
        const giorniRimanenti = calcolaGiorniTraDate(
          new Date(),
          dataEventoDate
        );
        const daysText =
          Math.abs(giorniRimanenti) === 1
            ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
            : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");
        const remainingTimeText = getTranslation(
          "STRATEGY_SUGGESTION_REMAINING_TIME_TEXT_FORMAT",
          {
            remainingDays: giorniRimanenti,
            daysText: daysText,
            eventDate: scadenzaPiuImminente.dataEvento,
          }
        );
        const translatedDeadlineEventType =
          scadenzaPiuImminente.tipoEvento === EVENT_TYPES.HALVING
            ? getTranslation("EVENT_TYPE_HALVING")
            : getTranslation("EVENT_TYPE_EXPIRY");
        testoScadenzeImportanti = getTranslation(
          "STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_PRIORITY",
          {
            eventType: translatedDeadlineEventType.toLowerCase(),
            remainingTimeText: remainingTimeText,
          }
        );
      }
      suggerimentiStrategici.unshift(
        `<span class="warning-triangle calendar-icon">🗓️</span> ${testoScadenzeImportanti}`
      );
    }

    listaSuggerimentiStrategiciSlot.innerHTML = "";
    if (suggerimentiStrategici.length > 0) {
      suggerimentiStrategici.forEach((sugg) => {
        const li = document.createElement("li");
        li.innerHTML = sugg;
        listaSuggerimentiStrategiciSlot.appendChild(li);
      });
    } else
      listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data">${getTranslation(
        "TEXT_NO_PRIORITY_STRATEGIC_ACTION"
      )}</li>`;
  } catch (error) {
    console.error("Errore in aggiornaValutazioneStrategicaSlot:", error);
    if (listaSuggerimentiStrategiciSlot)
      listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data text-danger">${getTranslation(
        "TEXT_ERROR_GENERATING_SUGGESTIONS"
      )}</li>`;
  }
}

// --- Funzioni Grafico Torta Strategia ---
const mappaTestoLabelGraficoATipoGara = {};

function aggiornaGraficoTortaStatoStrategia() {
  if (!canvasGraficoTorta) return;
  try {
    // Popola la mappa se è vuota (dopo che i18n è inizializzato)
    if (Object.keys(mappaTestoLabelGraficoATipoGara).length === 0) {
      Object.values(livelliVsrStoricoMap).forEach((level) => {
        if (level.chiaveTraduzione && level.tipo !== "N/D") {
          const translatedLabel = getTranslation(level.chiaveTraduzione);
          mappaTestoLabelGraficoATipoGara[translatedLabel] = level.tipo;
        }
      });
    }

    const saluteCategoriePerTooltip = {};
    const gareContributive = getGareContributiveConDettagli();
    const puntiAttualiPerCategoriaGrafico = {};
    const categorieOrdineTooltip = [
      RACE_TYPES.HC,
      RACE_TYPES.L1,
      RACE_TYPES.L2,
      RACE_TYPES.L3,
    ];
    categorieOrdineTooltip.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      puntiAttualiPerCategoriaGrafico[tipoGara] = gareCat.reduce(
        (sum, g) => sum + g.puntiEffettivi,
        0
      );
    });

    potenzialePuntiPerGraficoTorta = {
      [RACE_TYPES.HC]:
        (livelliVsrStoricoMap[RACE_TYPES.HC]?.valoreNumerico || 0) *
        LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.HC] *
        1.5,
      [RACE_TYPES.L1]:
        (livelliVsrStoricoMap[RACE_TYPES.L1]?.valoreNumerico || 0) *
        LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L1] *
        1.5,
      [RACE_TYPES.L2]:
        (livelliVsrStoricoMap[RACE_TYPES.L2]?.valoreNumerico || 0) *
        LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L2] *
        1.5,
      [RACE_TYPES.L3]:
        (livelliVsrStoricoMap[RACE_TYPES.L3]?.valoreNumerico || 0) *
        LIMITI_GARE_PER_CATEGORIA[RACE_TYPES.L3] *
        1.5,
    };
    totalePotenzialePuntiPerGraficoTorta =
      Object.values(potenzialePuntiPerGraficoTorta).reduce(
        (sum, val) => sum + val,
        0
      ) || 1;

    const labels = [];
    const dataValues = [];
    const backgroundColors = [];
    const colori = {
      [RACE_TYPES.HC]: {
        good: "rgba(220, 53, 69, 0.8)",
        needsImprovement: "rgba(220, 53, 69, 0.3)",
      },
      [RACE_TYPES.L1]: {
        good: "rgba(25, 135, 84, 0.8)",
        needsImprovement: "rgba(25, 135, 84, 0.3)",
      },
      [RACE_TYPES.L2]: {
        good: "rgba(255, 193, 7, 0.8)",
        needsImprovement: "rgba(255, 193, 7, 0.3)",
      },
      [RACE_TYPES.L3]: {
        good: "rgba(13, 110, 253, 0.8)",
        needsImprovement: "rgba(13, 110, 253, 0.3)",
      },
    };

    categorieOrdineTooltip.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
      const totaleSlotCategoria = maxSlotPerFascia * 2;
      const infoLivelloDaMappa = Object.values(livelliVsrStoricoMap).find(
        (l) => l.tipo === tipoGara
      );
      const livelloValoreNumerico = infoLivelloDaMappa?.valoreNumerico;
      const nomeCatBreve = infoLivelloDaMappa
        ? getTranslation(infoLivelloDaMappa.chiaveTraduzione)
        : tipoGara;

      if (totaleSlotCategoria === 0 || !livelloValoreNumerico) return;
      const percentualeRiempimento = gareCat.length / totaleSlotCategoria;
      let qualitaMediaPunti = 0;
      if (gareCat.length > 0 && livelloValoreNumerico > 0) {
        const sommaQualitaPercentuale = gareCat.reduce((sum, g) => {
          const potenzialeMaxSlotSpecifico =
            livelloValoreNumerico * g.fattoreDecadimento;
          return (
            sum +
            (potenzialeMaxSlotSpecifico > 0
              ? g.puntiEffettivi / potenzialeMaxSlotSpecifico
              : 0)
          );
        }, 0);
        qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length;
      }
      let pesoRiempimento = 0.5,
        pesoQualita = 0.5;
      if (maxSlotPerFascia === 1) {
        pesoRiempimento = 0.4;
        pesoQualita = 0.6;
      } else if (maxSlotPerFascia === 3) {
        pesoRiempimento = 0.45;
        pesoQualita = 0.55;
      } else if (maxSlotPerFascia === 10) {
        pesoRiempimento = 0.6;
        pesoQualita = 0.4;
      }
      const punteggioSalutePercent =
        Math.min(
          1,
          Math.max(
            0,
            percentualeRiempimento * pesoRiempimento +
              qualitaMediaPunti * pesoQualita
          )
        ) * 100;
      saluteCategoriePerTooltip[tipoGara] = punteggioSalutePercent;
      const pesoPuntiCategoria =
        potenzialePuntiPerGraficoTorta[tipoGara] /
        totalePotenzialePuntiPerGraficoTorta;
      const dimensioneBuona =
        pesoPuntiCategoria * (punteggioSalutePercent / 100);
      const dimensioneMigliorabile =
        pesoPuntiCategoria * (1 - punteggioSalutePercent / 100);
      if (dimensioneBuona > 0.001) {
        labels.push(
          `${nomeCatBreve} (${getTranslation(
            "STRATEGY_PIE_CHART_LABEL_OPTIMIZED"
          )})`
        );
        dataValues.push(dimensioneBuona);
        backgroundColors.push(colori[tipoGara].good);
      }
      if (dimensioneMigliorabile > 0.001) {
        labels.push(
          `${nomeCatBreve} (${getTranslation(
            "STRATEGY_PIE_CHART_LABEL_IMPROVABLE"
          )})`
        );
        dataValues.push(dimensioneMigliorabile);
        backgroundColors.push(colori[tipoGara].needsImprovement);
      }
    });

    if (dataValues.length === 0) {
      labels.push(getTranslation("TEXT_NO_DATA_AVAILABLE"));
      dataValues.push(1);
      backgroundColors.push("#e9ecef");
    }
    const data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    };

    if (graficoTortaIstanza) {
      graficoTortaIstanza.data = data;
      graficoTortaIstanza.update();
    } else {
      graficoTortaIstanza = new Chart(canvasGraficoTorta, {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: { boxWidth: 20, padding: 15 },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const labelOriginal = tooltipItem.label || "";
                  if (
                    labelOriginal === getTranslation("TEXT_NO_DATA_AVAILABLE")
                  )
                    return labelOriginal;
                  const match = labelOriginal.match(/^(.+?)\s*\((.+?)\)$/);
                  const nomeCatBase = match ? match[1].trim() : labelOriginal;
                  const statoFetta = match ? match[2].trim().toLowerCase() : "";
                  const tipoGaraPerTooltip =
                    mappaTestoLabelGraficoATipoGara[nomeCatBase];
                  if (!tipoGaraPerTooltip) return labelOriginal;
                  const tooltipLines = [
                    `${nomeCatBase} (${
                      statoFetta.charAt(0).toUpperCase() + statoFetta.slice(1)
                    })`,
                  ];
                  const salutePercentualeCategoria =
                    saluteCategoriePerTooltip[tipoGaraPerTooltip] || 0;
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_SLOT_HEALTH"
                    )} ${salutePercentualeCategoria.toFixed(1)}%`
                  );
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_POTENTIAL_IMPROVEMENT"
                    )} ${(100 - salutePercentualeCategoria).toFixed(1)}%`
                  );
                  const potenzialeMaxCategoria =
                    potenzialePuntiPerGraficoTorta[tipoGaraPerTooltip] || 0;
                  const puntiAttualiDellaCategoria =
                    puntiAttualiPerCategoriaGrafico[tipoGaraPerTooltip] || 0;
                  const percentualePuntiVSRPerCategoria =
                    potenzialeMaxCategoria > 0
                      ? (puntiAttualiDellaCategoria / potenzialeMaxCategoria) *
                        100
                      : 0;
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_VSR_POINTS"
                    )} ${formatNumber(
                      puntiAttualiDellaCategoria,
                      0
                    )} / ${formatNumber(potenzialeMaxCategoria, 0)}`
                  );
                  tooltipLines.push(
                    `(${percentualePuntiVSRPerCategoria.toFixed(
                      1
                    )}% ${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_PERCENT_CATEGORY_POTENTIAL"
                    )})`
                  );
                  if (tipoGaraPerTooltip !== "Generale") {
                    let punti100 = 0,
                      punti50 = 0;
                    (gareContributive[tipoGaraPerTooltip] || []).forEach(
                      (g) => {
                        if (g.fattoreDecadimento === 1.0)
                          punti100 += g.puntiEffettivi;
                        else if (g.fattoreDecadimento === 0.5)
                          punti50 += g.puntiEffettivi;
                      }
                    );
                    if (
                      punti100 > 0 ||
                      punti50 > 0 ||
                      potenzialeMaxCategoria > 0
                    ) {
                      tooltipLines.push(
                        `  ${getTranslation(
                          "STRATEGY_PIE_CHART_TOOLTIP_FROM_100_PERCENT_BAND"
                        )} ${formatNumber(punti100, 0)}`
                      );
                      tooltipLines.push(
                        `  ${getTranslation(
                          "STRATEGY_PIE_CHART_TOOLTIP_FROM_50_PERCENT_BAND"
                        )} ${formatNumber(punti50, 0)}`
                      );
                    }
                  }
                  let suggerimentoBreveTooltip = "";
                  const limitePerFasciaTooltip =
                    LIMITI_GARE_PER_CATEGORIA[tipoGaraPerTooltip];
                  const gare100AttualiTooltip = (
                    gareContributive[tipoGaraPerTooltip] || []
                  ).filter((g) => g.fattoreDecadimento === 1.0);
                  const numGare100AttualiTooltip = gare100AttualiTooltip.length;
                  const gare100InDimezzamentoTooltip =
                    gare100AttualiTooltip.filter(
                      (g) => g.mesiTrascorsi >= 9 && g.mesiTrascorsi < 12
                    ).length;
                  const slotVuoti100Tooltip =
                    limitePerFasciaTooltip - numGare100AttualiTooltip;
                  const numGareNecessarie100Tooltip =
                    slotVuoti100Tooltip + gare100InDimezzamentoTooltip;
                  if (numGareNecessarie100Tooltip > 0)
                    suggerimentoBreveTooltip = getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_COMPLETE_STABILIZE"
                    );
                  else if (gare100AttualiTooltip.length > 0) {
                    const gare100OrdinateTooltip = [
                      ...gare100AttualiTooltip,
                    ].sort((a, b) => a.puntiEffettivi - b.puntiEffettivi);
                    const garaMenoPerformante100Tooltip =
                      gare100OrdinateTooltip[0];
                    const valoreNumericoTooltip =
                      livelliVsrStoricoMap[
                        garaMenoPerformante100Tooltip.livello
                      ]?.valoreNumerico || 0;
                    const sogliaDebolezzaPuntiTooltip =
                      valoreNumericoTooltip *
                      SOGLIA_DEBOLEZZA[valoreNumericoTooltip.toString()];
                    if (
                      garaMenoPerformante100Tooltip.puntiEffettivi <
                      sogliaDebolezzaPuntiTooltip
                    )
                      suggerimentoBreveTooltip = getTranslation(
                        "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_IMPROVE_WEAK"
                      );
                    else
                      suggerimentoBreveTooltip = getTranslation(
                        "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK"
                      );
                  } else
                    suggerimentoBreveTooltip = getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK_NA"
                    );
                  if (suggerimentoBreveTooltip)
                    tooltipLines.push(suggerimentoBreveTooltip);
                  return tooltipLines;
                },
              },
            },
          },
        },
      });
    }
  } catch (error) {
    console.error("Errore in aggiornaGraficoTortaStatoStrategia:", error);
    if (graficoTortaIstanza) {
      graficoTortaIstanza.destroy();
      graficoTortaIstanza = null;
    }
    const ctx = canvasGraficoTorta.getContext("2d");
    ctx.clearRect(0, 0, canvasGraficoTorta.width, canvasGraficoTorta.height);
    ctx.textAlign = "center";
    ctx.fillText(
      getTranslation("TEXT_ERROR_LOADING_CHART"),
      canvasGraficoTorta.width / 2,
      canvasGraficoTorta.height / 2
    );
  }
}

// --- Funzioni Grafico Radar Dashboard ---
function aggiornaGraficoRadarSaluteSlot() {
  if (!canvasGraficoRadar) return;
  const gareContributive = getGareContributiveConDettagli();
  const datiPercentualePotenziale = [];
  const categorieRadar = [
    RACE_TYPES.HC,
    RACE_TYPES.L1,
    RACE_TYPES.L2,
    RACE_TYPES.L3,
  ];
  const etichetteRadar = [];

  categorieRadar.forEach((tipoGara) => {
    const gareCat = gareContributive[tipoGara] || [];
    const maxSlotPerFascia = LIMITI_GARE_PER_CATEGORIA[tipoGara];
    const infoLivelloDaMappa = Object.values(livelliVsrStoricoMap).find(
      (l) => l.tipo === tipoGara
    );
    const livelloValoreNumerico = infoLivelloDaMappa?.valoreNumerico;
    etichetteRadar.push(
      infoLivelloDaMappa
        ? getTranslation(infoLivelloDaMappa.chiaveTraduzione)
        : tipoGara
    );

    const totaleSlotCategoria = maxSlotPerFascia * 2;
    if (totaleSlotCategoria === 0 || !livelloValoreNumerico) {
      datiPercentualePotenziale.push(0);
      return;
    }
    const puntiAttuali = gareCat.reduce((sum, g) => sum + g.puntiEffettivi, 0);
    const potenzialeMaxCategoria =
      livelloValoreNumerico * maxSlotPerFascia * 1.5;
    const percentualeRaggiunta =
      potenzialeMaxCategoria > 0
        ? (puntiAttuali / potenzialeMaxCategoria) * 100
        : 0;
    datiPercentualePotenziale.push(
      Math.min(100, Math.max(0, percentualeRaggiunta))
    );
  });

  const data = {
    labels: etichetteRadar,
    datasets: [
      {
        label: getTranslation("DASHBOARD_RADAR_CHART_TITLE"),
        data: datiPercentualePotenziale,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  if (graficoRadarIstanza) {
    graficoRadarIstanza.data = data;
    graficoRadarIstanza.update();
  } else {
    graficoRadarIstanza = new Chart(canvasGraficoRadar, {
      type: "radar",
      data: data,
      options: {
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: { font: { size: 13 } },
            ticks: { callback: (value) => value + "%" },
          },
        },
        elements: { line: { borderWidth: 2 } },
        plugins: { legend: { display: false } },
      },
    });
  }
}

// --- Event Listener Generali ---
mainNavButtons.forEach((button) =>
  button.addEventListener("click", handleNavClick)
);

// --- Inizializzazione ---
init();
