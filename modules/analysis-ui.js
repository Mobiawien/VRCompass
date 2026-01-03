import { getTranslation } from "./i18n.js";
import { formatNumber } from "./utils.js";

// Riferimenti agli elementi DOM e alle funzioni di callback globali
let dom = {};
let callbacks = {};
let graficoRadarIstanza = null;

function popolaCategoriaSlot(
  tipoGara,
  gareCat,
  elMaxPunti,
  elMinPunti100,
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
  gareCat.forEach(
    (g) => (totalePuntiCategoria += g.puntiRaw || g.puntiEffettivi)
  );
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
      const punti = g.puntiRaw || g.puntiEffettivi;
      if (g.fattoreDecadimento === 1.0) punti100 += punti;
      else if (g.fattoreDecadimento === 0.5) punti50 += punti;
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
            ((g.puntiRaw || g.puntiEffettivi) /
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

  // Calcolo e visualizzazione del punteggio massimo e minimo contributivo
  if (gareCat.length > 0) {
    if (elMaxPunti) {
      elMaxPunti.textContent = formatNumber(gareCat[0].puntiEffettivi, 0);
    }
    if (elMinPunti) {
      elMinPunti.textContent = formatNumber(
        gareCat[gareCat.length - 1].puntiEffettivi,
        0
      );
    }
    // Gestione speciale per HC
    if (tipoGara === "HC" && dom.hcPuntiAttuali) {
      const puntiGaraHC = gareCat.length > 0 ? gareCat[0].puntiEffettivi : 0;
      dom.hcPuntiAttuali.textContent = formatNumber(puntiGaraHC, 0);
    }

    // Popola l'elenco dettagliato delle gare
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
    // Se non ci sono gare, imposta i valori a N/A
    if (elMaxPunti) elMaxPunti.textContent = getTranslation("TEXT_NA_DETAILED");
    if (elMinPunti) elMinPunti.textContent = getTranslation("TEXT_NA_DETAILED");
    // Gestione speciale per HC
    if (tipoGara === "HC" && dom.hcPuntiAttuali) {
      dom.hcPuntiAttuali.textContent = getTranslation("TEXT_NA_DETAILED");
    }
    if (elGareSlot) {
      elGareSlot.innerHTML = `<p class="no-data">${getTranslation(
        "TEXT_NO_VALID_RACES_IN_SLOT"
      )}</p>`;
    }
  }

  // Calcolo e visualizzazione del punteggio minimo da battere (solo gare 100%)
  if (elMinPunti100) {
    const gare100 = gareCat.filter((g) => g.fattoreDecadimento === 1.0);
    const minPunti100Val =
      gare100.length > 0 ? gare100[gare100.length - 1].puntiEffettivi : 0;

    // Mostra l'obiettivo solo se la fascia 100% è piena.
    const isFascia100Piena = gare100.length === maxSlotPerFascia;

    if (isFascia100Piena && minPunti100Val > 0 && livelloValoreNumerico) {
      const targetRank = callbacks.calcolaClassificaPerPuntiTarget(
        livelloValoreNumerico,
        minPunti100Val
      );
      elMinPunti100.innerHTML = targetRank
        ? `&lt; ${targetRank}°`
        : getTranslation("TEXT_NA_DETAILED");
      // Aggiungiamo la classe per l'evidenziazione e il tooltip
      elMinPunti100.classList.add("target-rank-highlight");
      elMinPunti100.title = `${getTranslation(
        "ANALYSIS_SLOT_TOOLTIP_TARGET_SCORE"
      )} ${formatNumber(minPunti100Val, 0)} pts`;
    } else {
      // Se non c'è un valore, pulisci l'elemento e rimuovi la classe
      elMinPunti100.textContent = getTranslation("ANALYSIS_FILL_SLOT_TARGET");
      elMinPunti100.title = "";
      elMinPunti100.classList.remove("target-rank-highlight");
    }
  }
}

function aggiornaGraficoRadarSaluteSlot() {
  // Ottiene il canvas qui, quando la sezione è visibile, invece che all'init.
  const canvasGraficoRadar = document.getElementById("graficoRadarSaluteSlot");
  if (!canvasGraficoRadar) return;

  const gareContributive = callbacks.getGareContributiveConDettagli();
  const datiPercentualePotenziale = [];
  // Usa le costanti RACE_TYPES e LIMITI_GARE_PER_CATEGORIA salvate nell'oggetto dom locale
  const categorieRadar = Object.values(dom.RACE_TYPES).filter(
    (t) => t !== "N/D"
  );
  const etichetteRadar = [];

  categorieRadar.forEach((tipoGara) => {
    const gareCat = gareContributive[tipoGara] || [];
    const maxSlotPerFascia = dom.LIMITI_GARE_PER_CATEGORIA[tipoGara] || 0;
    const infoLivelloDaMappa = Object.values(dom.livelliVsrStoricoMap).find(
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
    const puntiAttuali = gareCat.reduce(
      (sum, g) => sum + (g.puntiRaw || g.puntiEffettivi),
      0
    );
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
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: { font: { size: 12 } },
          ticks: { callback: (value) => value + "%" },
        },
      },
      elements: { line: { borderWidth: 2 } },
      plugins: { legend: { display: false } },
    },
  });
}

function aggiornaPanoramicaSlot() {
  const gareContributive = callbacks.getGareContributiveConDettagli();

  popolaCategoriaSlot(
    "HC",
    gareContributive["HC"] || [],
    null,
    dom.hcMinPunti100, // Usiamo il nuovo elemento corretto
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
    dom.liv1MaxPunti,
    dom.liv1MinPunti100,
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
    dom.liv2MaxPunti,
    dom.liv2MinPunti100,
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
    dom.liv3MaxPunti,
    dom.liv3MinPunti100,
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
  // Salva le costanti necessarie nell'oggetto dom locale per un uso futuro
  dom.livelliVsrStoricoMap = domElements.livelliVsrStoricoMap;
  dom.LIMITI_GARE_PER_CATEGORIA = domElements.LIMITI_GARE_PER_CATEGORIA;
  // Definiamo RACE_TYPES qui per coerenza, anche se non passato direttamente
  dom.RACE_TYPES = { HC: "HC", L1: "LIV1", L2: "LIV2", L3: "LIV3", ND: "N/D" };

  // La prima chiamata per popolare la UI viene fatta da script.js quando si naviga alla sezione
}

export function aggiornaSezioneAnalisi() {
  aggiornaPanoramicaSlot();
  aggiornaGraficoRadarSaluteSlot();
}
