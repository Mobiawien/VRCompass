import { getTranslation } from "./i18n.js";
import { formatNumber } from "./utils.js";

// Riferimenti agli elementi DOM e alle funzioni di callback globali
let dom = {};
let callbacks = {};

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
    console.warn(`Elemento DOM elGareSlot non trovato per '${nomeCatBreve}'.`);
    return;
  }

  const chiaveMappaPerValoreNumerico = Object.keys(
    dom.livelliVsrStoricoMap
  ).find((key) => dom.livelliVsrStoricoMap[key].tipo === tipoGara);
  const infoLivelloDaMappa = chiaveMappaPerValoreNumerico
    ? dom.livelliVsrStoricoMap[chiaveMappaPerValoreNumerico]
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
      const qualitaMediaPercentuale = sommaQualitaPercentuale / gareCat.length;
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
    else if (tipoGara === "HC" && dom.hcPuntiAttuali)
      dom.hcPuntiAttuali.textContent =
        gareCat.length > 0
          ? formatNumber(gareCat[0].puntiEffettivi, 0)
          : getTranslation("TEXT_NA_DETAILED");
    gareCat.forEach((g) => {
      if (elGareSlot) {
        const p = document.createElement("p");
        p.classList.add("gara-dettaglio");
        const statoPercentuale = g.fattoreDecadimento === 1.0 ? "100%" : "50%";
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
    if (elMinPunti) elMinPunti.textContent = getTranslation("TEXT_NA_DETAILED");
    else if (tipoGara === "HC" && dom.hcPuntiAttuali)
      dom.hcPuntiAttuali.textContent = getTranslation("TEXT_NA_DETAILED");
    if (elGareSlot)
      elGareSlot.innerHTML = `<p class="no-data">${getTranslation(
        "TEXT_NO_VALID_RACES_IN_SLOT"
      )}</p>`;
  }
}

function aggiornaPanoramicaSlotVSR() {
  const gareContributive = callbacks.getGareContributiveConDettagli();

  popolaCategoriaSlot(
    "HC",
    gareContributive["HC"] || [],
    dom.LIMITI_GARE_PER_CATEGORIA["HC"],
    dom.hcOccupati,
    null,
    dom.hcGareSlot,
    dom.hcProgressBar,
    getTranslation(dom.livelliVsrStoricoMap["HC"].chiaveTraduzione),
    dom.hcPuntiCategoria,
    dom.hcStackedPointsBarContainer,
    dom.hcPointsBar100,
    dom.hcPointsBar50,
    dom.hcPointsBarEmpty
  );
  popolaCategoriaSlot(
    "LIV1",
    gareContributive["LIV1"] || [],
    dom.LIMITI_GARE_PER_CATEGORIA["LIV1"],
    dom.liv1Occupati,
    dom.liv1MinPunti,
    dom.liv1GareSlot,
    dom.liv1ProgressBar,
    getTranslation(dom.livelliVsrStoricoMap["LIV1"].chiaveTraduzione),
    dom.liv1PuntiCategoria,
    dom.liv1StackedPointsBarContainer,
    dom.liv1PointsBar100,
    dom.liv1PointsBar50,
    dom.liv1PointsBarEmpty
  );
  popolaCategoriaSlot(
    "LIV2",
    gareContributive["LIV2"] || [],
    dom.LIMITI_GARE_PER_CATEGORIA["LIV2"],
    dom.liv2Occupati,
    dom.liv2MinPunti,
    dom.liv2GareSlot,
    dom.liv2ProgressBar,
    getTranslation(dom.livelliVsrStoricoMap["LIV2"].chiaveTraduzione),
    dom.liv2PuntiCategoria,
    dom.liv2StackedPointsBarContainer,
    dom.liv2PointsBar100,
    dom.liv2PointsBar50,
    dom.liv2PointsBarEmpty
  );
  popolaCategoriaSlot(
    "LIV3",
    gareContributive["LIV3"] || [],
    dom.LIMITI_GARE_PER_CATEGORIA["LIV3"],
    dom.liv3Occupati,
    dom.liv3MinPunti,
    dom.liv3GareSlot,
    dom.liv3ProgressBar,
    getTranslation(dom.livelliVsrStoricoMap["LIV3"].chiaveTraduzione),
    dom.liv3PuntiCategoria,
    dom.liv3StackedPointsBarContainer,
    dom.liv3PointsBar100,
    dom.liv3PointsBar50,
    dom.liv3PointsBarEmpty
  );
}

export function initAnalysisUI(domElements, globalCallbacks) {
  dom = domElements;
  callbacks = globalCallbacks;
  // La prima chiamata per popolare la UI viene fatta da script.js quando si naviga alla sezione
}

export function aggiornaSezioneAnalisi() {
  aggiornaPanoramicaSlotVSR();
}
