import { getTranslation } from "./i18n.js";
import { formatNumber, calcolaMesiTrascorsi } from "./utils.js";
import {
  calcolaPuntiPerClassifica,
  selezionaGareContributive,
} from "./vsr-calculator.js";

// Stato interno del modulo
let stato = {
  vistaStoricoAttuale: "valide",
  idGaraInModifica: null,
  currentSortKey: "data",
  currentSortDirection: "desc",
};

// Riferimenti agli elementi DOM e alle funzioni di callback globali
let dom = {};
let callbacks = {};

function aggiornaTestiPulsantiFormGara() {
  const submitButton = dom.formAggiungiGara.querySelector(
    'button[type="submit"]'
  );
  if (submitButton)
    submitButton.textContent = stato.idGaraInModifica
      ? getTranslation("BTN_SAVE_CHANGES")
      : getTranslation("BTN_ADD_RACE");
  if (dom.titoloFormGara)
    dom.titoloFormGara.textContent = stato.idGaraInModifica
      ? getTranslation("FORM_TITLE_EDIT_RACE")
      : getTranslation("FORM_TITLE_ADD_RACE");
}

function calcolaEPopolaPuntiVSRStorico() {
  const livelloSelezionatoValue = dom.livelloGaraVsrStoricoSelect.value;
  const classifica = parseInt(dom.classificaFinaleStoricoInput.value, 10);
  if (
    livelloSelezionatoValue &&
    livelloSelezionatoValue !== "0" &&
    !isNaN(classifica) &&
    classifica > 0
  ) {
    const categoriaInfo = dom.livelliVsrStoricoMap[livelloSelezionatoValue];
    if (categoriaInfo && categoriaInfo.valoreNumerico !== null) {
      dom.puntiVsrCalcolatiInput.value = calcolaPuntiPerClassifica(
        categoriaInfo.valoreNumerico,
        classifica
      );
    } else dom.puntiVsrCalcolatiInput.value = "";
  } else dom.puntiVsrCalcolatiInput.value = "";
}

function rimuoviEvidenziazioneTutteLeRighe() {
  const righeEvidenziate = dom.classificaVsrtbody.querySelectorAll(
    "tr.riga-in-modifica"
  );
  righeEvidenziate.forEach((riga) => riga.classList.remove("riga-in-modifica"));
}

function updateSortIndicators() {
  const headers = dom.tabellaClassificaVsr.querySelectorAll("th[data-sort]");
  headers.forEach((header) => {
    const sortKey = header.dataset.sort;
    header.classList.remove("sort-asc", "sort-desc");
    if (sortKey === stato.currentSortKey) {
      header.classList.add(
        stato.currentSortDirection === "asc" ? "sort-asc" : "sort-desc"
      );
    }
  });
}

function handleSort(event) {
  const newSortKey = event.currentTarget.dataset.sort;
  if (!newSortKey) return;

  // L'ordinamento non si applica alla vista 'valide'
  if (stato.vistaStoricoAttuale === "valide") return;

  if (stato.currentSortKey === newSortKey) {
    stato.currentSortDirection =
      stato.currentSortDirection === "asc" ? "desc" : "asc";
  } else {
    stato.currentSortKey = newSortKey;
    // Imposta una direzione di default per le nuove colonne
    stato.currentSortDirection =
      newSortKey === "data" ||
      newSortKey === "puntiVSR" ||
      newSortKey === "classificaFinale"
        ? "desc"
        : "asc";
  }

  aggiornaTabellaGare();
  updateSortIndicators();
}

export function aggiornaTabellaGare() {
  let gareDaMostrare = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  dom.classificaVsrtbody.innerHTML = "";
  const headerAzioni = document.getElementById("header-colonna-azioni");
  if (dom.tabellaClassificaVsr) {
    if (stato.vistaStoricoAttuale === "valide") {
      dom.tabellaClassificaVsr.classList.remove("vista-tutte-attiva");
      if (headerAzioni) headerAzioni.style.display = "none";
    } else {
      dom.tabellaClassificaVsr.classList.add("vista-tutte-attiva");
      if (headerAzioni) headerAzioni.style.display = "";
    }
  }
  let contributingGareIds = new Set();
  let livelloPrecedentePerSeparatore = null;
  const oggi = new Date();

  if (stato.vistaStoricoAttuale === "valide") {
    const gareContributivePerClassifica = selezionaGareContributive(
      gareDaMostrare,
      oggi
    );
    let gareFiltrateEOrdinate = [];
    const ordineVisualizzazioneTipi = ["HC", "LIV1", "LIV2", "LIV3"];
    ordineVisualizzazioneTipi.forEach((tipoGara) => {
      if (
        Object.prototype.hasOwnProperty.call(
          gareContributivePerClassifica,
          tipoGara
        )
      )
        gareFiltrateEOrdinate = gareFiltrateEOrdinate.concat(
          gareContributivePerClassifica[tipoGara]
        );
    });
    gareDaMostrare = gareFiltrateEOrdinate;
    contributingGareIds = callbacks.getContributingGareIds(
      JSON.parse(localStorage.getItem("gareSalvate")) || [], // Usa l'array completo per l'ID
      oggi
    );
  } else {
    // Filtra prima di ordinare per le viste 'storico_*'
    if (stato.vistaStoricoAttuale.startsWith("storico_")) {
      const tipoFiltro = stato.vistaStoricoAttuale.split("_")[1].toUpperCase();
      gareDaMostrare = gareDaMostrare.filter((gara) => {
        const infoLivello = dom.livelliVsrStoricoMap[gara.livello];
        return infoLivello && infoLivello.tipo === tipoFiltro;
      });
    }

    // Applica l'ordinamento dinamico
    gareDaMostrare.sort((a, b) => {
      let valA = a[stato.currentSortKey];
      let valB = b[stato.currentSortKey];

      switch (stato.currentSortKey) {
        case "data":
          valA = new Date(valA);
          valB = new Date(valB);
          break;
        case "nome":
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
          break;
        case "livello":
          const order = { HC: 0, LIV1: 1, LIV2: 2, LIV3: 3 };
          valA = order[valA] ?? 99;
          valB = order[valB] ?? 99;
          break;
        default:
          // Per 'classificaFinale' e 'puntiVSR' la conversione a numero è implicita
          break;
      }

      if (valA < valB) return stato.currentSortDirection === "asc" ? -1 : 1;
      if (valA > valB) return stato.currentSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    contributingGareIds = callbacks.getContributingGareIds(
      JSON.parse(localStorage.getItem("gareSalvate")) || [], // Usa l'array completo per l'ID
      oggi
    );
  }
  gareDaMostrare.forEach((gara) => {
    const row = dom.classificaVsrtbody.insertRow();
    const infoLivelloGara = dom.livelliVsrStoricoMap[gara.livello];
    const tipoGaraCorrente = infoLivelloGara ? infoLivelloGara.tipo : "N/D";
    if (
      stato.vistaStoricoAttuale === "valide" &&
      tipoGaraCorrente !== livelloPrecedentePerSeparatore
    ) {
      if (livelloPrecedentePerSeparatore !== null)
        row.classList.add("nuovo-gruppo-livello");
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
        row.classList.add("in-preavviso");
        inPreavvisoTesto = ` ${getTranslation(
          "VSR_TABLE_STATUS_WARNING_SUFFIX"
        )}`;
      }
    } else if (mesiTrascorsi < 24) {
      statoPunti = "50%";
      classeStato = "stato-50";
      if (mesiTrascorsi >= 21) {
        row.classList.add("in-preavviso");
        inPreavvisoTesto = ` ${getTranslation(
          "VSR_TABLE_STATUS_WARNING_SUFFIX"
        )}`;
      }
    } else {
      statoPunti = "Scaduta";
      classeStato = "stato-scaduta";
    }
    if (
      stato.vistaStoricoAttuale !== "valide" &&
      classeStato !== "stato-scaduta" &&
      contributingGareIds &&
      !contributingGareIds.has(gara.id)
    ) {
      classeStato = "stato-scaduta";
      row.classList.remove("in-preavviso");
      inPreavvisoTesto = "";
    }
    row.classList.add(classeStato);
    const [year, month, day] = gara.data.split("-");

    row.insertCell(0).textContent = `${day}/${month}/${year}`;
    row.insertCell(1).textContent = gara.nome;
    row.insertCell(2).textContent = infoLivelloGara
      ? getTranslation(infoLivelloGara.chiaveTraduzione)
      : gara.livello;
    row.insertCell(3).textContent = gara.classificaFinale;
    let puntiDaMostrare;
    let colorePunti = "";
    if (stato.vistaStoricoAttuale === "valide") {
      puntiDaMostrare = gara.puntiEffettivi;
      if (gara.fattoreDecadimento === 0.5 || puntiDaMostrare < 0)
        colorePunti = "red";
      else if (puntiDaMostrare >= 0) colorePunti = "green";
    } else {
      puntiDaMostrare = gara.puntiVSR;
      if (classeStato !== "stato-scaduta" && contributingGareIds.has(gara.id))
        colorePunti = "green";
      else if (classeStato === "stato-scaduta") colorePunti = "";
    }
    const puntiFormatted =
      puntiDaMostrare >= 0
        ? `+${formatNumber(Math.round(puntiDaMostrare), 0)}`
        : formatNumber(Math.round(puntiDaMostrare), 0);
    const cellPunti = row.insertCell(4);
    cellPunti.textContent = puntiFormatted;
    if (colorePunti) cellPunti.style.color = colorePunti;
    const cellaStatoPunti = row.insertCell(5);
    let testoStato =
      (stato.vistaStoricoAttuale === "valide" ? statoPunti : "") +
      inPreavvisoTesto.trim();
    if (
      stato.vistaStoricoAttuale !== "valide" &&
      classeStato === "stato-scaduta" &&
      !contributingGareIds.has(gara.id)
    ) {
      testoStato = getTranslation("VSR_TABLE_STATUS_NOT_CONTRIBUTING");
    }
    cellaStatoPunti.textContent = testoStato;
    if (stato.vistaStoricoAttuale !== "valide") {
      const cellaAzioni = row.insertCell(6);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = getTranslation("BTN_DELETE");
      deleteButton.classList.add("delete-btn");
      deleteButton.dataset.id = gara.id;
      cellaAzioni.appendChild(deleteButton);
      const editButton = document.createElement("button");
      editButton.textContent = getTranslation("BTN_EDIT");
      editButton.classList.add("edit-btn");
      editButton.dataset.id = gara.id;
      cellaAzioni.appendChild(editButton);
    }
  });
}

function popolaFormPerModifica(idGara) {
  const gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  const garaDaModificare = gareSalvate.find(
    (g) => String(g.id) === String(idGara)
  );
  if (garaDaModificare) {
    if (stato.vistaStoricoAttuale === "valide") {
      stato.vistaStoricoAttuale = "tutte";
      const tuttiIBottoniFiltro = [
        dom.btnMostraGareValide,
        dom.btnMostraTutteGare,
        dom.btnStoricoHC,
        dom.btnStoricoLiv1,
        dom.btnStoricoLiv2,
        dom.btnStoricoLiv3,
      ];
      tuttiIBottoniFiltro.forEach((btn) => btn.classList.remove("active"));
      if (dom.btnMostraTutteGare)
        dom.btnMostraTutteGare.classList.add("active");
    }
    if (stato.vistaStoricoAttuale !== "valide") {
      if (dom.formAggiungiGara) dom.formAggiungiGara.style.display = "block";
      if (dom.titoloFormGara) dom.titoloFormGara.style.display = "block";
      const headerAzioni = document.getElementById("header-colonna-azioni");
      if (headerAzioni) headerAzioni.style.display = "";
      if (dom.tabellaClassificaVsr)
        dom.tabellaClassificaVsr.classList.add("vista-tutte-attiva");
      aggiornaTabellaGare();
    }
    stato.idGaraInModifica = idGara;
    rimuoviEvidenziazioneTutteLeRighe();
    const rigaDaEvidenziare = dom.classificaVsrtbody
      .querySelector(`button.edit-btn[data-id="${idGara}"]`)
      ?.closest("tr");
    if (rigaDaEvidenziare) rigaDaEvidenziare.classList.add("riga-in-modifica");
    dom.dataGaraInput.value = garaDaModificare.data;
    dom.livelloGaraVsrStoricoSelect.value = garaDaModificare.livello;
    dom.nomeRegataInput.value = garaDaModificare.nome;
    dom.classificaFinaleStoricoInput.value = garaDaModificare.classificaFinale;
    calcolaEPopolaPuntiVSRStorico();
    aggiornaTestiPulsantiFormGara();
    setTimeout(() => {
      if (dom.formAggiungiGara)
        dom.formAggiungiGara.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  } else {
    console.error("Gara non trovata per la modifica:", idGara);
    alert(getTranslation("ALERT_RACE_NOT_FOUND_FOR_EDIT"));
  }
}

function handleSubmitGara(event) {
  event.preventDefault();
  const dataGara = dom.dataGaraInput.value;
  const livelloGaraStoricoVal = dom.livelloGaraVsrStoricoSelect.value;
  const nomeRegata = dom.nomeRegataInput.value.trim();
  const classificaFinaleStorico = parseInt(
    dom.classificaFinaleStoricoInput.value,
    10
  );
  const puntiVSR = parseFloat(dom.puntiVsrCalcolatiInput.value);
  if (
    !dataGara ||
    livelloGaraStoricoVal === "0" ||
    !nomeRegata ||
    isNaN(classificaFinaleStorico) ||
    classificaFinaleStorico <= 0 ||
    isNaN(puntiVSR)
  ) {
    alert(getTranslation("ALERT_FILL_ALL_FIELDS_CORRECTLY"));
    return;
  }
  let gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  if (stato.idGaraInModifica !== null) {
    const index = gareSalvate.findIndex(
      (g) => String(g.id) === String(stato.idGaraInModifica)
    );
    if (index !== -1) {
      gareSalvate[index] = {
        ...gareSalvate[index],
        data: dataGara,
        livello: livelloGaraStoricoVal,
        nome: nomeRegata,
        classificaFinale: classificaFinaleStorico,
        puntiVSR: puntiVSR,
      };
    }
    stato.idGaraInModifica = null;
  } else {
    const nuovaGara = {
      id: Date.now(),
      data: dataGara,
      livello: livelloGaraStoricoVal,
      nome: nomeRegata,
      classificaFinale: classificaFinaleStorico,
      puntiVSR: puntiVSR,
    };
    gareSalvate.push(nuovaGara);
  }
  localStorage.setItem("gareSalvate", JSON.stringify(gareSalvate));
  aggiornaTabellaGare();
  rimuoviEvidenziazioneTutteLeRighe();
  callbacks.onDataChange(); // Chiama la callback per aggiornare il resto dell'UI
  dom.formAggiungiGara.reset();
  dom.puntiVsrCalcolatiInput.value = "";
  aggiornaTestiPulsantiFormGara();
}

function eliminaGara(idGara) {
  if (!confirm(getTranslation("CONFIRM_DELETE_RACE"))) return;
  let gareSalvate = JSON.parse(localStorage.getItem("gareSalvate")) || [];
  gareSalvate = gareSalvate.filter((g) => String(g.id) !== String(idGara));
  localStorage.setItem("gareSalvate", JSON.stringify(gareSalvate));
  aggiornaTabellaGare();
  callbacks.onDataChange(); // Chiama la callback per aggiornare il resto dell'UI
}

function setupFiltriStoricoListeners() {
  const tuttiIBottoniFiltro = [
    dom.btnMostraGareValide,
    dom.btnMostraTutteGare,
    dom.btnStoricoHC,
    dom.btnStoricoLiv1,
    dom.btnStoricoLiv2,
    dom.btnStoricoLiv3,
  ];
  function impostaFiltro(nuovaVista, bottoneAttivo) {
    stato.vistaStoricoAttuale = nuovaVista;
    tuttiIBottoniFiltro.forEach((btn) => btn.classList.remove("active"));
    if (bottoneAttivo) bottoneAttivo.classList.add("active");
    rimuoviEvidenziazioneTutteLeRighe();
    if (dom.formAggiungiGara) dom.formAggiungiGara.reset();
    if (dom.puntiVsrCalcolatiInput) dom.puntiVsrCalcolatiInput.value = "";
    stato.idGaraInModifica = null;
    aggiornaTestiPulsantiFormGara();
    if (nuovaVista === "valide") {
      if (dom.formAggiungiGara) dom.formAggiungiGara.style.display = "none";
      if (dom.titoloFormGara) dom.titoloFormGara.style.display = "none";
      const headerAzioni = document.getElementById("header-colonna-azioni");
      if (headerAzioni) headerAzioni.style.display = "none";
      if (dom.vsrSortHint) dom.vsrSortHint.style.display = "none"; // Nascondi suggerimento
      if (dom.tabellaClassificaVsr)
        dom.tabellaClassificaVsr.classList.remove("vista-tutte-attiva");
    } else {
      if (dom.formAggiungiGara) dom.formAggiungiGara.style.display = "block";
      if (dom.titoloFormGara) {
        dom.titoloFormGara.style.display = "block";
      }
      if (dom.vsrSortHint) dom.vsrSortHint.style.display = "block"; // Mostra suggerimento
      const headerAzioni = document.getElementById("header-colonna-azioni");
      if (headerAzioni) headerAzioni.style.display = "";
      if (dom.tabellaClassificaVsr)
        dom.tabellaClassificaVsr.classList.add("vista-tutte-attiva");
    }
    aggiornaTabellaGare();
  }
  if (dom.btnMostraGareValide)
    dom.btnMostraGareValide.addEventListener("click", () =>
      impostaFiltro("valide", dom.btnMostraGareValide)
    );
  if (dom.btnMostraTutteGare)
    dom.btnMostraTutteGare.addEventListener("click", () =>
      impostaFiltro("tutte", dom.btnMostraTutteGare)
    );
  if (dom.btnStoricoHC)
    dom.btnStoricoHC.addEventListener("click", () =>
      impostaFiltro("storico_hc", dom.btnStoricoHC)
    );
  if (dom.btnStoricoLiv1)
    dom.btnStoricoLiv1.addEventListener("click", () =>
      impostaFiltro("storico_liv1", dom.btnStoricoLiv1)
    );
  if (dom.btnStoricoLiv2)
    dom.btnStoricoLiv2.addEventListener("click", () =>
      impostaFiltro("storico_liv2", dom.btnStoricoLiv2)
    );
  if (dom.btnStoricoLiv3)
    dom.btnStoricoLiv3.addEventListener("click", () =>
      impostaFiltro("storico_liv3", dom.btnStoricoLiv3)
    );
}

export function initVsrRankingUI(domElements, globalCallbacks) {
  dom = domElements;
  callbacks = globalCallbacks;

  dom.formAggiungiGara.addEventListener("submit", handleSubmitGara);
  if (dom.puntiVsrCalcolatiInput) dom.puntiVsrCalcolatiInput.readOnly = true;
  dom.livelloGaraVsrStoricoSelect.addEventListener(
    "change",
    calcolaEPopolaPuntiVSRStorico
  );
  dom.classificaFinaleStoricoInput.addEventListener(
    "input",
    calcolaEPopolaPuntiVSRStorico
  );
  dom.classificaVsrtbody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const idGara = event.target.dataset.id;
      if (idGara) eliminaGara(idGara);
    } else if (event.target.classList.contains("edit-btn")) {
      const idGara = event.target.dataset.id;
      if (idGara) popolaFormPerModifica(idGara);
    }
  });
  const formInputs = [
    dom.dataGaraInput,
    dom.livelloGaraVsrStoricoSelect,
    dom.nomeRegataInput,
    dom.classificaFinaleStoricoInput,
  ];
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      if (stato.vistaStoricoAttuale === "valide" && dom.btnMostraTutteGare) {
        if (dom.formAggiungiGara) dom.formAggiungiGara.style.display = "block";
        dom.btnMostraTutteGare.click();
      }
    });
  });

  // Aggiungi event listener per l'ordinamento
  const sortableHeaders =
    dom.tabellaClassificaVsr.querySelectorAll("th[data-sort]");
  sortableHeaders.forEach((header) => {
    header.addEventListener("click", handleSort);
  });

  setupFiltriStoricoListeners();
  // Chiamata iniziale per impostare lo stato corretto
  aggiornaTabellaGare();
  aggiornaTestiPulsantiFormGara();
}
