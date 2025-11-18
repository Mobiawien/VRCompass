import { getTranslation } from "./i18n.js";

/**
 * Formatta un numero in una stringa localizzata.
 * @param {number | null | undefined} num Il numero da formattare.
 * @param {number} decimalPlaces Il numero di cifre decimali.
 * @returns {string} Il numero formattato o una stringa 'N/A'.
 */
export function formatNumber(num, decimalPlaces = 0) {
  if (num === null || num === undefined || isNaN(num))
    return getTranslation("TEXT_NA_DETAILED") || "N/A";
  const numLocale = document.documentElement.lang || "en-US";
  if (decimalPlaces === 0) {
    return Math.round(num).toLocaleString(numLocale);
  } else {
    return num.toLocaleString(numLocale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }
}

export function calcolaMesiTrascorsi(dataGaraString, dataRiferimento) {
  const dataGara = new Date(dataGaraString);
  const oggi = dataRiferimento || new Date();
  dataGara.setHours(0, 0, 0, 0);
  oggi.setHours(0, 0, 0, 0);
  let mesi = (oggi.getFullYear() - dataGara.getFullYear()) * 12;
  mesi -= dataGara.getMonth();
  mesi += oggi.getMonth();
  if (oggi.getDate() < dataGara.getDate()) mesi--;
  return mesi < 0 ? 0 : mesi;
}

export function calcolaGiorniTraDate(data1, data2) {
  const unGiorno = 24 * 60 * 60 * 1000;
  const primaData = new Date(data1);
  let secondaData = new Date(data2); // Può essere una stringa 'gg/mm/aaaa'
  if (typeof data2 === "string" && data2.includes("/")) {
    const parts = data2.split("/");
    secondaData = new Date(parts[2], parseInt(parts[1]) - 1, parts[0]); // Mese è 0-indicizzato
  }
  primaData.setHours(0, 0, 0, 0);
  secondaData.setHours(0, 0, 0, 0);
  return Math.round((secondaData - primaData) / unGiorno);
}
