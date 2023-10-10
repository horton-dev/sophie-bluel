/** @type {Object} - Cache pour les contenus traduits chargés. */
const cachedContents = {};

/** @type {Object} - Conteneur pour les messages traduits de l'application. */
let Messages = {};

/**
 * Détecte la langue préférée de l'utilisateur parmi les langues prises en charge.
 * @returns {string} - La langue détectée ou la langue par défaut si la langue détectée n'est pas prise en charge.
 */
function getPreferredLanguage() {
  const detectedLanguage = navigator.language.split('-')[0];
  const supportedLanguages = ['fr', 'en'];

  return supportedLanguages.includes(detectedLanguage) ? detectedLanguage : 'fr';
}

/**
 * Charge le contenu traduit pour une langue spécifiée.
 * @async
 * @param {string} languageCode - Code de la langue pour laquelle charger le contenu.
 * @returns {Object} - Le contenu traduit pour la langue spécifiée.
 * @throws {Error} - Si le chargement du contenu échoue.
 */
async function loadContentForLanguage(languageCode) {
  if (cachedContents[languageCode]) {
    return cachedContents[languageCode];
  }

  try {
    const response = await fetch(`./assets/app/locales/${languageCode}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    cachedContents[languageCode] = data;
    return data;
  } catch (error) {
    console.error(`Failed to load content for language: ${languageCode}`, error);
    throw error;
  }
}

/**
 * Initialise les ressources textuelles de l'application en fonction de la langue préférée de l'utilisateur.
 * @async
 * @returns {boolean} - `true` si le chargement réussit, `false` sinon.
 */
export async function initializeTextResources() {
  const language = getPreferredLanguage();

  try {
    Messages = await loadContentForLanguage(language);
    return true;
  } catch (error) {
    console.error('Messages failed to load:', error);
    return false;
  }
}

/**
 * Récupère un message traduit à partir de son chemin dans l'objet Messages.
 * @param {string} path - Chemin du message à récupérer, par exemple "error.network".
 * @returns {string} - Le message traduit ou un message d'erreur si le chemin ne correspond à aucun message.
 */
export function getMessage(path) {
  const result = path.split('.').reduce((acc, part) => acc && acc[part], Messages);
  if (!result) {
    console.warn(`No message found for path: ${path}`);
    return 'Message not found';
  }
  return result;
}
