// Questo file conterrà tutta la logica per la calcolatrice della Gestione Crediti.
import { formatNumber } from "./utils.js"; // <-- ECCO LA RIGA MANCANTE!

export const tabellaPremiData = {
  cat1: {
    1: 8600,
    2: 6518,
    3: 5542,
    4: 4711,
    5: 4146,
    6: 3731,
    7: 3411,
    8: 3159,
    9: 2952,
    10: 2778,
    11: 2629,
    12: 2500,
    13: 2387,
    14: 2287,
    15: 2197,
    16: 2116,
    17: 1975,
    18: 1913,
    19: 1856,
    20: 1803,
    21: 1754,
    22: 1707,
    23: 1664,
    24: 1623,
    25: 1584,
  },
  cat2: {
    1: 7150,
    2: 5419,
    3: 4607,
    4: 3916,
    5: 3446,
    6: 3099,
    7: 2834,
    8: 2624,
    9: 2452,
    10: 2308,
    11: 2184,
    12: 2077,
    13: 1983,
    14: 1900,
    15: 1825,
    16: 1758,
    17: 1696,
    18: 1641,
    19: 1590,
    20: 1542,
    21: 1498,
    22: 1457,
    23: 1418,
    24: 1382,
    25: 1348,
  },
  cat3: {
    1: 5700,
    2: 4320,
    3: 3673,
    4: 3122,
    5: 2747,
    6: 2472,
    7: 2260,
    8: 2092,
    9: 1955,
    10: 1840,
    11: 1741,
    12: 1656,
    13: 1581,
    14: 1515,
    15: 1455,
    16: 1401,
    17: 1352,
    18: 1308,
    19: 1267,
    20: 1229,
    21: 1194,
    22: 1161,
    23: 1130,
    24: 1101,
    25: 1074,
  },
  cat4: {
    1: 4300,
    2: 3259,
    3: 2771,
    4: 2355,
    5: 2073,
    6: 1865,
    7: 1705,
    8: 1579,
    9: 1474,
    10: 1387,
    11: 1312,
    12: 1249,
    13: 1192,
    14: 1143,
    15: 1098,
    16: 1057,
    17: 1019,
    18: 985,
    19: 954,
    20: 926,
    21: 900,
    22: 875,
    23: 851,
    24: 829,
    25: 809,
  },
  cat5: {
    1: 2850,
    2: 2160,
    3: 1837,
    4: 1561,
    5: 1373,
    6: 1235,
    7: 1130,
    8: 1046,
    9: 977,
    10: 919,
    11: 869,
    12: 827,
    13: 789,
    14: 757,
    15: 727,
    16: 699,
    17: 675,
    18: 652,
    19: 632,
    20: 613,
    21: 596,
    22: 580,
    23: 564,
    24: 549,
    25: 536,
  },
  cat6: {
    1: 1425,
    2: 1080,
    3: 918,
    4: 781,
    5: 686,
    6: 618,
    7: 565,
    8: 523,
    9: 488,
    10: 460,
    11: 435,
    12: 414,
    13: 395,
    14: 379,
    15: 364,
    16: 350,
    17: 338,
    18: 326,
    19: 316,
    20: 307,
    21: 298,
    22: 290,
    23: 282,
    24: 275,
    25: 268,
  },
};

/**
 * Calcola la posizione minima in classifica per recuperare una data spesa effettiva.
 * @param {number} spesaEffettiva - Il costo da recuperare.
 * @param {string} categoriaSelezionata - La categoria economica della gara (es. 'cat1').
 * @returns {number|null} La posizione di recupero, 0 se si è già in profitto, o null se i dati non sono validi.
 */
export function calcolaPosizioneRecupero(spesaEffettiva, categoriaSelezionata) {
  if (!categoriaSelezionata) return null;
  const premiCat = tabellaPremiData[categoriaSelezionata];
  if (!premiCat || typeof premiCat["1"] === "undefined") return null;
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

/**
 * Calcola i crediti vinti, il netto e i punti VSR per una data simulazione.
 * @param {object} params - I parametri per il calcolo.
 * @param {string} params.categoria - La categoria economica (es. 'cat1').
 * @param {number} params.spesaEffettiva - La spesa da considerare.
 * @param {number} params.classifica - La posizione in classifica.
 * @param {number|null} params.livelloGaraValore - Il valore numerico del livello VSR (es. 10000).
 * @returns {{creditiVinti: number|null, nettoCrediti: number|null, puntiVSR: number|null}} Un oggetto con i risultati calcolati.
 */
export function ricalcolaRisultati(params) {
  const { categoria, spesaEffettiva, classifica, livelloGaraValore } = params;

  if (!categoria) {
    return { creditiVinti: null, nettoCrediti: null, puntiVSR: null };
  }

  let creditiVintiCalc = null;
  const premiCatData = tabellaPremiData[categoria];
  if (
    premiCatData &&
    typeof premiCatData["1"] !== "undefined" &&
    classifica > 0
  ) {
    const premMax = premiCatData["1"];
    creditiVintiCalc = premMax / Math.pow(classifica, 0.4);
  }

  const nettoCreditiCalc =
    creditiVintiCalc !== null ? creditiVintiCalc - spesaEffettiva : null;

  let puntiVSRCalc = null;
  if (livelloGaraValore !== null && livelloGaraValore > 0 && classifica > 0) {
    puntiVSRCalc = livelloGaraValore / Math.pow(classifica, 0.125);
  }

  return {
    creditiVinti: creditiVintiCalc,
    nettoCrediti: nettoCreditiCalc,
    puntiVSR: puntiVSRCalc,
  };
}
