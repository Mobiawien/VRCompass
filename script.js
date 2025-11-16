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
import {
  initAnalysisUI,
  aggiornaSezioneAnalisi,
} from "./modules/analysis-ui.js";
import {
  initStrategyUI,
  aggiornaSezioneStrategia,
  aggiornaGraficoTortaStatoStrategia,
} from "./modules/strategy.js";

// --- Elementi DOM ---
// Navigazione
const mainNavButtons = document.querySelectorAll("nav > button.nav-button"); // Seleziona solo i .nav-button diretti figli di nav
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
const vsrSortHint = document.getElementById("vsr-sort-hint");

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
const liv1MaxPunti = document.getElementById("liv1-max-punti");
const liv1MinPunti100 = document.getElementById("liv1-min-punti-100");
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
const liv2MaxPunti = document.getElementById("liv2-max-punti");
const liv2MinPunti100 = document.getElementById("liv2-min-punti-100");
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
const liv3MaxPunti = document.getElementById("liv3-max-punti");
const liv3MinPunti100 = document.getElementById("liv3-min-punti-100");
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

// --- Stato Applicazione ---
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
const URL_ELENCO_REGATE =
  "https://cert.civis.net/LSV-Dash/api?context=api&context_type=allrace";

const SOGLIA_DEBOLEZZA = { 15000: 0.5, 10000: 0.4, 5000: 0.3, 3000: 0.25 };

// --- Costanti Applicazione ---
const RACE_TYPES = {
  HC: "HC",
  L1: "LIV1",
  L2: "LIV2",
  L3: "LIV3",
  ND: "N/D",
};
const EVENT_TYPES = {
  HALVING: "EVENT_TYPE_HALVING",
  EXPIRY: "EVENT_TYPE_EXPIRY",
};
let statoVSRPrecedente = {
  punteggio: 0,
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
          break;
        case "classifica-vsr-view":
          aggiornaInfoClassificaView();
          aggiornaTabellaGare();
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

/**
 * Funzione di callback per aggiornare tutti i componenti UI quando cambia la lingua.
 */
function updateAllUIComponents() {
  aggiornaInfoClassificaView();
  aggiornaTabellaGare();
  aggiornaSezioneAnalisi();
  aggiornaSezioneStrategia();
  aggiornaGraficoTortaStatoStrategia();
  aggiornaGraficoRadarSaluteSlot();
}

/**
 * Inizializza l'applicazione.
 */
async function init() {
  // 1. Inizializza i18n e passa il callback per aggiornare l'UI al cambio lingua
  await initI18n(updateAllUIComponents);

  // 2. Controlla le variazioni di VSR dovute al tempo trascorso
  caricaStatoVSRPrecedente();
  const vsrPrecedente = statoVSRPrecedente?.punteggio;
  const gareSalvateCorrenti =
    JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrCorrenteCalcolato = getVsrScoreCalcolato(gareSalvateCorrenti, oggi);

  if (vsrPrecedente !== null && vsrCorrenteCalcolato !== vsrPrecedente) {
    mostraNotificaCambiamento(vsrPrecedente, vsrCorrenteCalcolato);
  }

  // Aggiorna lo stato VSR corrente nel localStorage per i prossimi avvii
  const statoCorrenteDaSalvare = {
    punteggio: vsrCorrenteCalcolato,
    timestampSalvataggio: new Date().toISOString(),
  };
  localStorage.setItem(
    "statoVSRPrecedente",
    JSON.stringify(statoCorrenteDaSalvare)
  );
  localStorage.setItem("classificaVsrAttuale", vsrCorrenteCalcolato.toString());

  // 3. Inizializza i componenti UI con i dati corretti
  initializeUI();

  // 4. Imposta gli event listeners
  setupEventListeners();

  // 5. Aggiorna tutte le viste con i dati caricati e processati
  updateAllUIComponents();

  // Imposta la vista di default sulla Dashboard
  document.getElementById("btn-show-dashboard").click();
}

/**
 * Raggruppa l'inizializzazione di tutti i moduli UI.
 */
function initializeUI() {
  caricaDatiDashboard();

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
      vsrSortHint,
      livelliVsrStoricoMap,
    },
    {
      onDataChange: handleDataChange,
      getContributingGareIds: getContributingGareIds,
    }
  );

  initAnalysisUI(
    {
      hcOccupati,
      hcPuntiCategoria,
      hcPuntiAttuali,
      hcGareSlot,
      hcProgressBar,
      hcStackedPointsBarContainer,
      hcPointsBar100,
      hcPointsBar50,
      hcPointsBarEmpty,
      liv1Occupati,
      liv1PuntiCategoria,
      liv1MinPunti,
      liv1MaxPunti,
      liv1MinPunti100,
      liv1GareSlot,
      liv1ProgressBar,
      liv1StackedPointsBarContainer,
      liv1PointsBar100,
      liv1PointsBar50,
      liv1PointsBarEmpty,
      liv2Occupati,
      liv2PuntiCategoria,
      liv2MinPunti,
      liv2MaxPunti,
      liv2MinPunti100,
      liv2GareSlot,
      liv2ProgressBar,
      liv2StackedPointsBarContainer,
      liv2PointsBar100,
      liv2PointsBar50,
      liv2PointsBarEmpty,
      liv3Occupati,
      liv3PuntiCategoria,
      liv3MinPunti,
      liv3MaxPunti,
      liv3MinPunti100,
      liv3GareSlot,
      liv3ProgressBar,
      liv3StackedPointsBarContainer,
      liv3PointsBar100,
      liv3PointsBar50,
      liv3PointsBarEmpty,
      livelliVsrStoricoMap,
      LIMITI_GARE_PER_CATEGORIA,
    },
    {
      getGareContributiveConDettagli,
    }
  );

  initStrategyUI(
    {
      listaGareDimezzamento,
      listaGareScadenza,
      listaSuggerimentiStrategiciSlot,
      canvasGraficoTorta,
      livelliVsrStoricoMap,
      LIMITI_GARE_PER_CATEGORIA,
      RACE_TYPES,
      EVENT_TYPES,
      SOGLIA_DEBOLEZZA,
    },
    {
      getGareContributiveConDettagli,
      getGareConScadenzeImminenti,
      calcolaPuntiPerClassifica,
      calcolaClassificaPerPuntiTarget,
      getTranslation,
    }
  );
}

/**
 * Raggruppa l'impostazione di tutti gli event listeners.
 */
function setupEventListeners() {
  mainNavButtons.forEach((button) =>
    button.addEventListener("click", handleNavClick)
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

  if (nomeBarcaDisplay) nomeBarcaDisplay.textContent = nomeBarca;
  if (classificaVsrAttualeDisplay)
    classificaVsrAttualeDisplay.textContent = formatNumber(classificaVsrNum, 0);
  if (classificaVsrAttualeInput)
    classificaVsrAttualeInput.textContent = formatNumber(classificaVsrNum, 0);
}

// --- Funzioni Gestione Classifica VSR ---
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

function recalcolaEAggiornaVsrUI() {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrAttualeCalcolato = getVsrScoreCalcolato(gareSalvate, oggi);
  localStorage.setItem("classificaVsrAttuale", vsrAttualeCalcolato.toString());
  aggiornaInfoClassificaView();
}

function handleDataChange() {
  aggiornaSezioneAnalisi();
  aggiornaSezioneStrategia();
  aggiornaGraficoTortaStatoStrategia();
  aggiornaGraficoRadarSaluteSlot();
  recalcolaEAggiornaVsrUI();
}

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

  const gareSimulate = JSON.parse(JSON.stringify(gareSalvate));
  const garaDaSimulare = gareSimulate.find((g) => g.id === garaCheCambia.id);

  if (!garaDaSimulare) {
    return { impattoNettoEffettivo: 0 };
  }

  const vsrCorrente = getVsrScoreCalcolato(gareSalvate, oggi);

  const dataSimulata = new Date(garaDaSimulare.data);
  if (nuovoFattoreDecadimentoSimulato === 0.5) {
    dataSimulata.setFullYear(dataSimulata.getFullYear() - 1);
  } else if (nuovoFattoreDecadimentoSimulato === 0) {
    dataSimulata.setFullYear(dataSimulata.getFullYear() - 2);
  }
  garaDaSimulare.data = dataSimulata.toISOString().split("T")[0];

  const vsrDopoSimulazione = getVsrScoreCalcolato(gareSimulate, oggi);

  const gareContributiveDopoSimulazione = selezionaGareContributive(
    gareSimulate,
    oggi
  );
  let laGaraSimulataContribuisceAncora = false;
  for (const tipo in gareContributiveDopoSimulazione) {
    if (
      gareContributiveDopoSimulazione[tipo].some(
        (g) => g.id === garaDaSimulare.id
      )
    ) {
      laGaraSimulataContribuisceAncora = true;
      break;
    }
  }

  return {
    impattoNettoEffettivo: vsrDopoSimulazione - vsrCorrente,
    laGaraSimulataContribuisceAncora: laGaraSimulataContribuisceAncora,
  };
}

function getGareConScadenzeImminenti(serializzabile = false) {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const scadenze = [];
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

    let tipoEvento = null;
    let dataEventoObj = null;
    let fattoreDecadimentoSimulato = -1;

    const warningDimezzamento = new Date(dataDimezzamento);
    warningDimezzamento.setMonth(warningDimezzamento.getMonth() - 3);
    const warningScadenza = new Date(dataScadenza);
    warningScadenza.setMonth(warningScadenza.getMonth() - 3);

    if (oggiLocale >= warningDimezzamento && oggiLocale < dataDimezzamento) {
      tipoEvento = EVENT_TYPES.HALVING;
      dataEventoObj = dataDimezzamento;
      fattoreDecadimentoSimulato = 0.5;
    } else if (oggiLocale >= warningScadenza && oggiLocale < dataScadenza) {
      tipoEvento = EVENT_TYPES.EXPIRY;
      dataEventoObj = dataScadenza;
      fattoreDecadimentoSimulato = 0;
    }

    if (tipoEvento && dataEventoObj) {
      const simulazioneRisultato = simulaImpattoNettoEVariazioneClassifica(
        gara,
        fattoreDecadimentoSimulato
      );
      scadenze.push({
        ...gara,
        tipoEvento,
        dataEvento: serializzabile
          ? dataEventoObj.toISOString()
          : dataEventoObj,
        isUrgente: calcolaGiorniTraDate(oggiLocale, dataEventoObj) <= 30,
        isContributing: contributingIds.has(gara.id),
        simulazioneRisultato,
      });
    }
  });
  return scadenze;
}

// --- Funzioni per Notifica e Riepilogo "Cosa è Cambiato?" ---
function mostraNotificaCambiamento(oldScore, newScore) {
  if (
    !vsrChangeModal ||
    !vsrChangeModalTitle ||
    !vsrChangeModalBody ||
    !vsrChangeModalInstruction
  )
    return;

  vsrChangeModalTitle.textContent = getTranslation("VSR_CHANGE_MODAL_TITLE");
  vsrChangeModalBody.innerHTML = getTranslation("VSR_CHANGE_MODAL_BODY", {
    oldScore: formatNumber(oldScore, 0),
    newScore: formatNumber(newScore, 0),
  });
  vsrChangeModalInstruction.textContent = getTranslation(
    "VSR_CHANGE_MODAL_INSTRUCTION"
  );

  vsrChangeModal.style.display = "flex";
}

function handleVSRChangeModalPrimaryClick() {
  dismissVSRChangeModal();
  const strategyButton = document.getElementById("btn-show-strategia");
  if (strategyButton) handleNavClick({ currentTarget: strategyButton });
  popolaERendiVisibileRiepilogoEventi();
}

function popolaERendiVisibileRiepilogoEventi() {
  if (!recentEventsSummary) return;

  if (recentEventsSummary.style.display === "block") {
    recentEventsSummary.style.display = "none";
    return;
  }

  const eventiRecenti = [];
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const dataLimite = new Date();
  dataLimite.setDate(oggi.getDate() - DURATA_RIEPILOGO_GIORNI);

  const scadenze = getGareConScadenzeImminenti();

  scadenze.forEach((evento) => {
    const dataEvento = new Date(evento.dataEvento);
    dataEvento.setHours(0, 0, 0, 0);

    if (dataEvento >= dataLimite && dataEvento <= oggi) {
      eventiRecenti.push({
        ...evento,
        impattoNettoStimato: evento.simulazioneRisultato.impattoNettoEffettivo,
      });
    }
  });

  eventiRecenti.sort((a, b) => new Date(b.dataEvento) - new Date(a.dataEvento));

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
      const displayDate = new Date(evento.dataEvento).toLocaleDateString(
        dateLocale
      );

      const params = {
        raceName: evento.nome,
        eventDate: displayDate,
        netImpact: formatNumber(evento.impattoNettoStimato, 0),
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

function dismissVSRChangeModal() {
  if (vsrChangeModal) {
    vsrChangeModal.style.display = "none";
  }
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const oggi = new Date();
  const vsrCorrente = getVsrScoreCalcolato(gareSalvate, oggi);

  const statoDaSalvare = {
    punteggio: vsrCorrente,
    timestampSalvataggio: new Date().toISOString(),
  };
  localStorage.setItem("statoVSRPrecedente", JSON.stringify(statoDaSalvare));
  statoVSRPrecedente = JSON.parse(JSON.stringify(statoDaSalvare));
  if (statoVSRPrecedente.timestampSalvataggio) {
    statoVSRPrecedente.timestampSalvataggio = new Date(
      statoVSRPrecedente.timestampSalvataggio
    );
  }
}

// --- Funzioni per lo Stato VSR Precedente ---
function caricaStatoVSRPrecedente() {
  const statoSalvato = localStorage.getItem("statoVSRPrecedente");
  if (statoSalvato) {
    try {
      statoVSRPrecedente = JSON.parse(statoSalvato);
      if (statoVSRPrecedente.timestampSalvataggio) {
        statoVSRPrecedente.timestampSalvataggio = new Date(
          statoVSRPrecedente.timestampSalvataggio
        );
      }
    } catch (e) {
      statoVSRPrecedente = {
        punteggio: null,
        timestampSalvataggio: null,
      };
    }
  } else {
    statoVSRPrecedente = {
      punteggio: null,
      timestampSalvataggio: null,
    };
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
        handleDataChange();
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
        handleDataChange();
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

  const categoryOrder = { HC: 1, LIV1: 2, LIV2: 3, LIV3: 4 };

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
        return "";
    }
  };
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

  const normalizeRegata = (row) => {
    const idDatabase = row.idDatabase ?? normalizeLegId(row.rid) ?? "";
    const data = row.data ?? row.date ?? row.end ?? "";
    const livello = (() => {
      const lv = row.livello ?? row.category ?? row.cat ?? row.level;
      if (lv != null && String(lv).trim() !== "")
        return String(lv).toUpperCase();
      return mapVsrToLivello(row.vsr);
    })();
    const nome = row.nome ?? row.name ?? "";
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

    let payload;
    try {
      payload = await response.json();
    } catch (e) {
      const textPeek = await response.text();
      throw new Error(
        "La ressource n’est pas un JSON valide. Aperçu: " +
          textPeek.slice(0, 120)
      );
    }

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

    const dataAggiornamentoDatabase = toISODate(
      payload?.dataAggiornamentoDatabase ??
        payload?.updatedAt ??
        payload?.lastUpdate
    );

    const parsedRegate = elenco
      .map(normalizeRegata)
      .filter((r) => r.idDatabase && r.nome);

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
  handleDataChange();
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
function getGareContributiveConDettagli(sourceGare) {
  const gareSalvate =
    sourceGare || JSON.parse(localStorage.getItem("gareSalvate")) || [];
  return selezionaGareContributive(gareSalvate, new Date());
}

// --- Funzioni Grafico Radar Dashboard ---
function aggiornaGraficoRadarSaluteSlot() {
  console.log(
    "aggiornaGraficoRadarSaluteSlot called. canvasGraficoRadar:",
    canvasGraficoRadar
  );
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
    graficoRadarIstanza.destroy();
  }
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

// --- Inizializzazione ---
init();
