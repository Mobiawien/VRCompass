/**
 * Ottiene una stringa tradotta dalla chiave fornita.
 * @param {string} key La chiave di traduzione.
 * @param {object} variables Un oggetto di variabili da sostituire nella stringa.
 * @returns {string} La stringa tradotta o la chiave stessa se non trovata.
 */
export function getTranslation(key, variables = {}) {
  // eslint-disable-next-line no-use-before-define
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    let translatedString = translations[currentLanguage][key];
    for (const varName in variables) {
      const regex = new RegExp(`{{${varName}}}`, "g");
      translatedString = translatedString.replace(regex, variables[varName]);
    }
    return translatedString;
  }
  console.warn(
    `Traduzione mancante per la chiave '${key}' in ${currentLanguage}. Restituisco la chiave.`
  );
  return key;
}

let currentLanguage = "it";
const DEFAULT_LANGUAGE = "it";
let translations = {};

// Questa mappa verrà popolata dopo il caricamento delle traduzioni
export const mappaTestoLabelGraficoATipoGara = {};

/**
 * Applica le traduzioni caricate agli elementi DOM.
 */
function applyTranslations(onLanguageChangeCallback) {
  if (!translations[currentLanguage]) return;

  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const key = element.getAttribute("data-i18n-key");
    const translation = getTranslation(key);

    if (element.tagName === "TITLE" && document.title !== translation) {
      document.title = translation;
    } else if (element.tagName === "INPUT" && element.placeholder) {
      element.placeholder = translation;
    } else {
      element.innerHTML = translation;
    }
  });

  if (onLanguageChangeCallback) onLanguageChangeCallback();
}

/**
 * Carica il file JSON per la lingua specificata.
 * @param {string} lang La lingua da caricare (es. 'it').
 */
async function loadTranslations(lang, onLanguageChangeCallback) {
  try {
    const response = await fetch(`${lang}.json?v=${Date.now()}`);
    if (!response.ok) {
      throw new Error(
        `Errore nel caricamento del file di traduzione per ${lang}: ${response.statusText}`
      );
    }
    translations[lang] = await response.json();
    console.log(`Traduzioni per ${lang} caricate.`);
    applyTranslations(onLanguageChangeCallback);
  } catch (error) {
    console.error(`Impossibile caricare le traduzioni per ${lang}:`, error);
    if (lang !== DEFAULT_LANGUAGE) {
      console.warn(`Torno alla lingua di default (${DEFAULT_LANGUAGE})`);
      // eslint-disable-next-line no-use-before-define
      await setLanguage(DEFAULT_LANGUAGE, onLanguageChangeCallback);
    }
  }
}

/**
 * Imposta la lingua corrente dell'applicazione.
 * @param {string} lang La nuova lingua.
 */
async function setLanguage(lang, onLanguageChangeCallback) {
  currentLanguage = lang;
  localStorage.setItem("vrCompassLanguage", lang);
  document.getElementById("language-selector").value = lang;
  document.documentElement.lang = lang;
  await loadTranslations(lang, onLanguageChangeCallback);
}

/**
 * Inizializza il sistema di internazionalizzazione.
 */
export async function initI18n(onLanguageChangeCallback) {
  const savedLang =
    localStorage.getItem("vrCompassLanguage") || DEFAULT_LANGUAGE;
  await setLanguage(savedLang, onLanguageChangeCallback);
  document
    .getElementById("language-selector")
    .addEventListener("change", async (event) => {
      await setLanguage(event.target.value, onLanguageChangeCallback);
    });
}
