/**
 * Ottiene una stringa tradotta dalla chiave fornita.
 * @param {string} key La chiave di traduzione.
 * @param {object} variables Un oggetto di variabili da sostituire nella stringa.
 * @returns {string} La stringa tradotta o la chiave stessa se non trovata.
 */
export function getTranslation(key, variables = {}) {
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
let onLanguageChangeCallback = null;

// Questa mappa verrà popolata dopo il caricamento delle traduzioni
export const mappaTestoLabelGraficoATipoGara = {};

/**
 * Applica le traduzioni caricate agli elementi DOM.
 */
function applyTranslations() {
  if (!translations[currentLanguage]) return;

  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const key = element.getAttribute("data-i18n-key");
    const translation = getTranslation(key);

    if (element.tagName === "TITLE" && document.title !== translation) {
      document.title = translation;
    } else if (element.tagName === "INPUT" && element.placeholder) {
      element.placeholder = translation;
    } else {
      // Aggiunta di un controllo per i DIV
      if (element.tagName === 'DIV' && element.children.length > 0) {
        // Se è un DIV con elementi figli, non fare nulla per evitare di rompere il layout.
        // Potremmo voler tradurre solo i nodi di testo, ma per ora questo è più sicuro.
        console.warn(`Traduzione saltata per l'elemento DIV con figli (chiave: ${key})`);
      } else {
        element.innerHTML = translation;
      }
    }
  });

  if (onLanguageChangeCallback) onLanguageChangeCallback();
}

/**
 * Carica il file JSON per la lingua specificata.
 * @param {string} lang La lingua da caricare (es. 'it').
 */
async function loadTranslations(lang) {
  try {
    const response = await fetch(`${lang}.json?v=${Date.now()}`);
    if (!response.ok) {
      throw new Error(
        `Errore nel caricamento del file di traduzione per ${lang}: ${response.statusText}`
      );
    }
    translations[lang] = await response.json();
    console.log(`Traduzioni per ${lang} caricate.`);
    applyTranslations();
  } catch (error) {
    console.error(`Impossibile caricare le traduzioni per ${lang}:`, error);
    if (lang !== DEFAULT_LANGUAGE) {
      console.warn(`Torno alla lingua di default (${DEFAULT_LANGUAGE})`);
      await setLanguage(DEFAULT_LANGUAGE);
    }
  }
}

/**
 * Imposta la lingua corrente dell'applicazione.
 * @param {string} lang La nuova lingua.
 */
async function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("vrCompassLanguage", lang);
  document.getElementById("language-selector").value = lang;
  document.documentElement.lang = lang;
  await loadTranslations(lang);
}

/**
 * Inizializza il sistema di internazionalizzazione.
 */
export async function initI18n(callback) {
  onLanguageChangeCallback = callback;
  const savedLang =
    localStorage.getItem("vrCompassLanguage") || DEFAULT_LANGUAGE;
  await setLanguage(savedLang);
  document
    .getElementById("language-selector")
    .addEventListener("change", async (event) => {
      await setLanguage(event.target.value);
    });
}