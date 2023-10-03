import {getMessage} from '../locales/languageLoader.js';

/**
 * Retourne le message d'erreur associé à un code d'erreur donné.
 *
 * @param {string} errorCode - Le code d'erreur.
 * @return {string} - Le message d'erreur associé.
 */
export function getErrorMessage(errorCode) {
  const errorMessage = getMessage(`errors.${errorCode}`);
  const defaultErrorMessage = 'Une erreur inattendue s\'est produite.';
  return errorMessage || defaultErrorMessage;
}


/**
 * Affiche un message d'erreur dans la console.
 *
 * @param {string} errorCode - Le code d'erreur.
 */
export function logError(errorCode) {
  const errorMessage = getErrorMessage(errorCode);
  console.error(`Erreur (${errorCode}): ${errorMessage}`);
}

/**
 * Affiche un message d'erreur dans un élément DOM spécifié.
 * Si le message existe déjà, il n'ajoute pas de doublon.
 *
 * @param {string} errorCode - Le code d'erreur.
 * @param {string|HTMLElement} target - L'ID de l'élément DOM ou l'élément DOM lui-même où le message d'erreur doit être affiché.
 * @param {string} [className] - La classe CSS à appliquer au message d'erreur (facultatif).
 */
export function displayErrorOnDOM(errorCode, target, className) {
  const errorMessage = getErrorMessage(errorCode);

  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.getElementById(target);
  } else {
    targetElement = target;
  }

  if (className) {
    const existingError = targetElement.querySelector(`.${className}`);
    if (!existingError) {
      const errorElement = document.createElement('p');
      errorElement.innerText = errorMessage;
      errorElement.classList.add('error-message'); // Ajoutez la classe pour le style
      errorElement.classList.add(className);
      targetElement.insertBefore(errorElement, targetElement.lastElementChild);
    } else {
      existingError.textContent = errorMessage;
    }
  } else {
    targetElement.textContent = errorMessage;
  }
}

/**
 * Affiche une alerte avec un message d'erreur, sans duplication.
 *
 * @param {string} errorCode - Le code d'erreur.
 */
export function showAlertWithoutDuplication(errorCode) {
  const existingAlert = document.getElementById(errorCode);

  if (!existingAlert) {
    const errorMessage = getErrorMessage(errorCode);
    alert(errorMessage);
  }
}


