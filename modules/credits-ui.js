import { getTranslation } from "./i18n.js";
import { formatNumber } from "./utils.js";
import { calcolaPosizioneRecupero, ricalcolaRisultati } from "./calculator.js";

// Stato interno del modulo
let stato = {
  categoriaSelezionata: null,
  attrezzatureSelezionate: {},
  bonusBase: 0,
  spesaAttrezzature: 0,
  bonusExtra: 0,
  livelloGara: null,
  classificaFinale: 0,
  classificaFinaleModificataManualmente: false,
};

// Riferimenti agli elementi DOM
let dom = {};

function popolaRisultatiTabella3() {
  if (
    !stato.categoriaSelezionata ||
    !dom.cellaCreditiTab3Ref ||
    !dom.cellaNettoTab3Ref ||
    !dom.cellaPuntiTab3Ref
  ) {
    return;
  }

  const spesaEffettiva = Math.max(
    0,
    stato.spesaAttrezzature - (stato.bonusBase + stato.bonusExtra)
  );

  const risultati = ricalcolaRisultati({
    categoria: stato.categoriaSelezionata,
    spesaEffettiva: spesaEffettiva,
    classifica: stato.classificaFinale,
    livelloGaraValore: stato.livelloGara,
  });

  dom.cellaCreditiTab3Ref.textContent = formatNumber(risultati.creditiVinti, 0);
  dom.cellaNettoTab3Ref.textContent = formatNumber(risultati.nettoCrediti, 0);
  dom.cellaPuntiTab3Ref.textContent = formatNumber(risultati.puntiVSR, 0);
}

function aggiornaTabella3() {
  dom.tabella3Body.innerHTML = "";
  dom.inputClassificaTab3Ref = null;
  dom.cellaCreditiTab3Ref = null;
  dom.cellaNettoTab3Ref = null;
  dom.cellaPuntiTab3Ref = null;
  if (!stato.categoriaSelezionata) return;

  const row = dom.tabella3Body.insertRow();
  const cellaLivello = row.insertCell(0);
  const selectLivello = document.createElement("select");
  const opzioniLivelloGara = [
    { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_DEFAULT", valore: "" },
    { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_HC", valore: "HC" },
    { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L1", valore: "LIV1" },
    { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L2", valore: "LIV2" },
    { chiaveTesto: "CREDITS_TABLE3_SELECT_LEVEL_OPTION_L3", valore: "LIV3" },
  ];
  opzioniLivelloGara.forEach((opzione) => {
    const option = document.createElement("option");
    option.value = opzione.valore;
    option.textContent = getTranslation(opzione.chiaveTesto);
    if (opzione.valore === "") {
      option.disabled = true;
      option.selected = stato.livelloGara === null;
    } else if (dom.livelliVsrStoricoMap[opzione.valore]) {
      option.selected =
        stato.livelloGara ===
        dom.livelliVsrStoricoMap[opzione.valore].valoreNumerico;
    }
    selectLivello.appendChild(option);
  });
  selectLivello.addEventListener("change", (e) => {
    const selectedKey = e.target.value;
    stato.livelloGara =
      selectedKey && dom.livelliVsrStoricoMap[selectedKey]
        ? dom.livelliVsrStoricoMap[selectedKey].valoreNumerico
        : null;
    popolaRisultatiTabella3();
  });
  cellaLivello.appendChild(selectLivello);

  const cellaClassifica = row.insertCell(1);
  dom.inputClassificaTab3Ref = document.createElement("input");
  dom.inputClassificaTab3Ref.type = "number";
  dom.inputClassificaTab3Ref.value =
    stato.classificaFinale > 0 ? stato.classificaFinale : "";
  dom.inputClassificaTab3Ref.min = "1";
  dom.inputClassificaTab3Ref.placeholder = getTranslation(
    "PLACEHOLDER_POSITION"
  );
  dom.inputClassificaTab3Ref.addEventListener("input", (e) => {
    stato.classificaFinaleModificataManualmente = true;
    stato.classificaFinale = parseInt(e.target.value, 10) || 0;
    popolaRisultatiTabella3();
  });
  cellaClassifica.appendChild(dom.inputClassificaTab3Ref);

  dom.cellaCreditiTab3Ref = row.insertCell(2);
  dom.cellaCreditiTab3Ref.classList.add("calculated-result-cell");
  dom.cellaNettoTab3Ref = row.insertCell(3);
  dom.cellaNettoTab3Ref.classList.add("calculated-result-cell");
  dom.cellaPuntiTab3Ref = row.insertCell(4);
  dom.cellaPuntiTab3Ref.classList.add("calculated-result-cell");

  popolaRisultatiTabella3();
}

function aggiornaTabella2() {
  if (!stato.categoriaSelezionata) {
    if (dom.outputCatEcon)
      dom.outputCatEcon.textContent = getTranslation("TEXT_NA");
    if (dom.inputBonusTotale) dom.inputBonusTotale.value = 0;
    if (dom.outputSpesa)
      dom.outputSpesa.textContent = getTranslation("TEXT_NA");
    if (dom.outputSpesaEffettiva)
      dom.outputSpesaEffettiva.textContent = getTranslation("TEXT_NA");
    if (dom.outputPosRecupero)
      dom.outputPosRecupero.textContent = getTranslation("TEXT_NA");
    stato.bonusExtra = 0;
    return;
  }
  const bonusTotaleCorrente = stato.bonusBase + stato.bonusExtra;
  const spesaEffettiva = Math.max(
    0,
    stato.spesaAttrezzature - bonusTotaleCorrente
  );
  const posRecuperoNumerica = calcolaPosizioneRecupero(
    spesaEffettiva,
    stato.categoriaSelezionata
  );
  if (dom.outputCatEcon)
    dom.outputCatEcon.textContent = stato.categoriaSelezionata;
  if (dom.inputBonusTotale)
    dom.inputBonusTotale.title = `Bonus base: ${stato.bonusBase}`;
  if (dom.outputSpesa)
    dom.outputSpesa.textContent = formatNumber(stato.spesaAttrezzature, 0);
  if (dom.outputSpesaEffettiva)
    dom.outputSpesaEffettiva.textContent = formatNumber(spesaEffettiva, 0);
  if (dom.outputPosRecupero) {
    if (spesaEffettiva <= 0 && posRecuperoNumerica !== null) {
      dom.outputPosRecupero.textContent = formatNumber(posRecuperoNumerica, 0);
      dom.outputPosRecupero.classList.remove("important-result");
      dom.outputPosRecupero.classList.add("profit-result");
    } else {
      dom.outputPosRecupero.textContent =
        posRecuperoNumerica !== null && posRecuperoNumerica > 0
          ? formatNumber(posRecuperoNumerica, 0)
          : posRecuperoNumerica === 0
          ? "0"
          : getTranslation("TEXT_NA");
      dom.outputPosRecupero.classList.remove("profit-result");
      if (posRecuperoNumerica !== null && posRecuperoNumerica > 0)
        dom.outputPosRecupero.classList.add("important-result");
      else dom.outputPosRecupero.classList.remove("important-result");
    }
  }
  if (!stato.classificaFinaleModificataManualmente)
    stato.classificaFinale =
      posRecuperoNumerica !== null && posRecuperoNumerica > 0
        ? posRecuperoNumerica
        : 0;
}

function ricalcolaSpesaAttrezzature() {
  stato.spesaAttrezzature = 0;
  if (
    stato.categoriaSelezionata &&
    stato.attrezzatureSelezionate[stato.categoriaSelezionata]?.items
  ) {
    for (const nome in stato.attrezzatureSelezionate[stato.categoriaSelezionata]
      .items) {
      if (
        Object.prototype.hasOwnProperty.call(
          stato.attrezzatureSelezionate[stato.categoriaSelezionata].items,
          nome
        )
      ) {
        stato.spesaAttrezzature +=
          stato.attrezzatureSelezionate[stato.categoriaSelezionata].items[nome];
      }
    }
  }
  if (stato.categoriaSelezionata) {
    stato.attrezzatureSelezionate[stato.categoriaSelezionata] =
      stato.attrezzatureSelezionate[stato.categoriaSelezionata] || {};
    stato.attrezzatureSelezionate[stato.categoriaSelezionata].costoTotale =
      stato.spesaAttrezzature;
  }
}

function handleBonusInputChange(e) {
  const nuovoBonusTotale = parseInt(e.target.value, 10) || 0;
  stato.bonusExtra = Math.max(0, nuovoBonusTotale - stato.bonusBase);
  aggiornaTabella2();
  aggiornaTabella3();
}

function toggleAttrezzatura(cell) {
  if (!stato.categoriaSelezionata) {
    alert(getTranslation("ALERT_SELECT_CATEGORY_FIRST"));
    return;
  }
  const nomeAttrezzatura = cell.parentNode.cells[0].textContent;
  const costo = parseInt(cell.textContent, 10);
  const catCorrente = cell.dataset.categoria;
  stato.classificaFinaleModificataManualmente = false;
  if (catCorrente !== stato.categoriaSelezionata) return;
  stato.attrezzatureSelezionate[stato.categoriaSelezionata] =
    stato.attrezzatureSelezionate[stato.categoriaSelezionata] || {};
  stato.attrezzatureSelezionate[stato.categoriaSelezionata].items =
    stato.attrezzatureSelezionate[stato.categoriaSelezionata].items || {};
  if (
    stato.attrezzatureSelezionate[stato.categoriaSelezionata].items[
      nomeAttrezzatura
    ]
  ) {
    delete stato.attrezzatureSelezionate[stato.categoriaSelezionata].items[
      nomeAttrezzatura
    ];
    cell.classList.remove("selected");
    cell.parentNode.cells[0].classList.remove("selected-name");
  } else {
    stato.attrezzatureSelezionate[stato.categoriaSelezionata].items[
      nomeAttrezzatura
    ] = costo;
    cell.classList.add("selected");
    cell.parentNode.cells[0].classList.add("selected-name");
  }
  ricalcolaSpesaAttrezzature();
  aggiornaTabella2();
  aggiornaTabella3();
}

function selezionaCategoria(cat) {
  stato.categoriaSelezionata = cat;
  stato.attrezzatureSelezionate = {};
  stato.spesaAttrezzature = 0;
  stato.classificaFinaleModificataManualmente = false;
  stato.classificaFinale = 0;
  stato.livelloGara = null;
  dom.tabella1
    .querySelectorAll("td.attrezzatura-cell.selected")
    .forEach((td) => td.classList.remove("selected"));
  dom.tabella1
    .querySelectorAll("td.selected-name")
    .forEach((td) => td.classList.remove("selected-name"));
  stato.bonusExtra = 0;
  dom.tabella1
    .querySelectorAll("th.categoria-cell")
    .forEach((th) => th.classList.remove("selected-category"));
  const headerCliccato = dom.tabella1.querySelector(
    `th.categoria-cell[data-categoria="${cat}"]`
  );
  if (headerCliccato) headerCliccato.classList.add("selected-category");
  const bonusCell = dom.tabella1.querySelector(
    `.bonus-row td[data-categoria="${cat}"]`
  );
  stato.bonusBase = bonusCell ? parseInt(bonusCell.textContent, 10) : 0;
  if (dom.inputBonusTotale) {
    dom.inputBonusTotale.value = stato.bonusBase;
    dom.inputBonusTotale.title = `Bonus base: ${stato.bonusBase}`;
  }
  ricalcolaSpesaAttrezzature();
  aggiornaTabella2();
  aggiornaTabella3();
}

export function initCreditsCalculator(domElements, livelliVsrMap) {
  dom = domElements;
  dom.livelliVsrStoricoMap = livelliVsrMap; // Aggiungiamo la mappa dei livelli al nostro oggetto dom

  dom.tabella1
    .querySelectorAll("th.categoria-cell")
    .forEach((th) =>
      th.addEventListener("click", () =>
        selezionaCategoria(th.dataset.categoria)
      )
    );
  dom.tabella1
    .querySelectorAll("td.attrezzatura-cell")
    .forEach((td) =>
      td.addEventListener("click", () => toggleAttrezzatura(td))
    );
  if (dom.inputBonusTotale)
    dom.inputBonusTotale.addEventListener("input", handleBonusInputChange);
}
