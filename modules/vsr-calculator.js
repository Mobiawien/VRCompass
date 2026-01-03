import { calcolaMesiTrascorsi } from "./utils.js";

const RACE_TYPES = {
  HC: "HC",
  L1: "LIV1",
  L2: "LIV2",
  L3: "LIV3",
  ND: "N/D",
};

const livelliVsrStoricoMap = {
  HC: { valoreNumerico: 15000, tipo: "HC" },
  LIV1: { valoreNumerico: 10000, tipo: "LIV1" },
  LIV2: { valoreNumerico: 5000, tipo: "LIV2" },
  LIV3: { valoreNumerico: 3000, tipo: "LIV3" },
};

const LIMITI_GARE_PER_CATEGORIA = { HC: 1, LIV1: 3, LIV2: 6, LIV3: 10 };

/**
 * Seleziona le gare che contribuiscono al punteggio VSR totale.
 * Questa è la logica centrale del calcolo VSR.
 * @param {Array} gareSalvateRaw - L'array grezzo delle gare salvate.
 * @param {Date} dataRiferimento - La data usata come "oggi" per i calcoli.
 * @returns {Object} Un oggetto con le gare contributive raggruppate per tipo.
 */
export function selezionaGareContributive(gareSalvateRaw, dataRiferimento) {
  // Se non viene fornita una data di riferimento valida, non procedere.
  // Questo previene il calcolo errato basato sulla data odierna quando non dovrebbe.
  if (!dataRiferimento || !(dataRiferimento instanceof Date)) {
    console.error(
      "selezionaGareContributive: dataRiferimento non valida.",
      dataRiferimento
    );
    return { HC: [], LIV1: [], LIV2: [], LIV3: [] };
  }
  const gareConDettagli = gareSalvateRaw
    .map((gara) => {
      const mesiTrascorsi = calcolaMesiTrascorsi(gara.data, dataRiferimento);
      let fattoreDecadimento = 0;
      if (mesiTrascorsi < 12) {
        fattoreDecadimento = 1.0;
      } else if (mesiTrascorsi < 24) {
        fattoreDecadimento = 0.5;
      }

      const infoLivello = livelliVsrStoricoMap[gara.livello];
      // Ripristino logica precedente: Ricalcoliamo i punti da zero per evitare il doppio arrotondamento.
      // Usiamo la classifica e il valore numerico del livello per la massima precisione.
      if (
        fattoreDecadimento > 0 &&
        gara.classificaFinale > 0 &&
        infoLivello &&
        infoLivello.valoreNumerico
      ) {
        const puntiNonArrotondati =
          infoLivello.valoreNumerico / Math.pow(gara.classificaFinale, 0.125);

        // VR Logic: Arrotonda il punteggio pieno all'intero PRIMA del decadimento
        const puntiPieniArrotondati = Math.round(puntiNonArrotondati);

        // Calcola i punti raw (che saranno interi o finiranno con .5)
        const puntiRaw = puntiPieniArrotondati * fattoreDecadimento;

        // VR Display Logic: Tronca il decimale per la visualizzazione (es. 4357.5 -> 4357)
        const puntiEffettivi = Math.floor(puntiRaw);
        return {
          ...gara,
          puntiEffettivi,
          puntiRaw,
          fattoreDecadimento,
          mesiTrascorsi,
          tipoGara: infoLivello.tipo,
        };
      }
      return null;
    })
    .filter((g) => g !== null);

  const gareRecenti = [];
  const gareMenoRecenti = [];
  gareConDettagli.forEach((gara) => {
    if (gara.mesiTrascorsi < 12) gareRecenti.push(gara);
    else if (gara.mesiTrascorsi < 24) gareMenoRecenti.push(gara);
  });

  const gareRecentiRaggruppate = {};
  const gareMenoRecentiRaggruppate = {};
  Object.values(livelliVsrStoricoMap)
    .filter((l) => l.tipo !== RACE_TYPES.ND)
    .forEach((l) => {
      gareRecentiRaggruppate[l.tipo] = [];
      gareMenoRecentiRaggruppate[l.tipo] = [];
    });

  gareRecenti.forEach((gara) => {
    if (
      Object.prototype.hasOwnProperty.call(
        gareRecentiRaggruppate,
        gara.tipoGara
      )
    )
      gareRecentiRaggruppate[gara.tipoGara].push(gara);
  });
  gareMenoRecenti.forEach((gara) => {
    if (
      Object.prototype.hasOwnProperty.call(
        gareMenoRecentiRaggruppate,
        gara.tipoGara
      )
    )
      gareMenoRecentiRaggruppate[gara.tipoGara].push(gara);
  });

  const gareContributiveFinali = {};
  for (const tipo in LIMITI_GARE_PER_CATEGORIA) {
    if (Object.prototype.hasOwnProperty.call(LIMITI_GARE_PER_CATEGORIA, tipo)) {
      const limite = LIMITI_GARE_PER_CATEGORIA[tipo];
      const miglioriRecenti = (gareRecentiRaggruppate[tipo] || [])
        .sort((a, b) =>
          b.puntiRaw !== a.puntiRaw
            ? b.puntiRaw - a.puntiRaw
            : new Date(b.data) - new Date(a.data)
        )
        .slice(0, limite);
      const miglioriMenoRecenti = (gareMenoRecentiRaggruppate[tipo] || [])
        .sort((a, b) =>
          b.puntiRaw !== a.puntiRaw
            ? b.puntiRaw - a.puntiRaw
            : new Date(b.data) - new Date(a.data)
        )
        .slice(0, limite);
      gareContributiveFinali[tipo] =
        miglioriRecenti.concat(miglioriMenoRecenti);
    }
  }

  for (const tipo in gareContributiveFinali) {
    if (Object.prototype.hasOwnProperty.call(gareContributiveFinali, tipo))
      gareContributiveFinali[tipo].sort((a, b) => b.puntiRaw - a.puntiRaw);
  }

  return gareContributiveFinali;
}

/**
 * Calcola il punteggio VSR totale partendo dalle gare contributive.
 * @param {Object} gareContributive - L'oggetto di gare contributive restituito da selezionaGareContributive.
 * @returns {number} Il punteggio VSR totale.
 */
export function calcolaVsrTotaleDaContributive(gareContributive) {
  let punteggioFinaleTotale = 0;
  for (const tipoGara in gareContributive) {
    if (Object.prototype.hasOwnProperty.call(gareContributive, tipoGara)) {
      punteggioFinaleTotale += gareContributive[tipoGara].reduce(
        (sum, gara) => sum + (gara.puntiRaw || gara.puntiEffettivi),
        0
      );
    }
  }
  return Math.round(punteggioFinaleTotale);
}

/**
 * Funzione principale che orchestra il calcolo del punteggio VSR.
 * @param {Array} gareSalvate - L'array grezzo delle gare salvate.
 * @param {Date} dataRiferimento - La data usata come "oggi".
 * @returns {number} Il punteggio VSR calcolato.
 */
export function getVsrScoreCalcolato(gareSalvate, dataRiferimento) {
  if (!gareSalvate || gareSalvate.length === 0) {
    return 0;
  }
  const gareContributive = selezionaGareContributive(
    gareSalvate,
    dataRiferimento
  );
  return calcolaVsrTotaleDaContributive(gareContributive);
}

/**
 * Calcola i punti VSR per una data classifica e livello di gara.
 * @param {number} livelloValoreNumerico - Il valore numerico del livello (es. 15000 per HC).
 * @param {number} classifica - La posizione in classifica.
 * @returns {number} I punti VSR calcolati.
 */
export function calcolaPuntiPerClassifica(livelloValoreNumerico, classifica) {
  if (!livelloValoreNumerico || classifica <= 0) return 0;
  return Math.round(livelloValoreNumerico / Math.pow(classifica, 0.125));
}
