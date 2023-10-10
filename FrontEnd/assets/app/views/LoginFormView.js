import { getMessage } from "../locales/languageLoader.js";
/**
 * Classe qui gère la vue du formulaire de connexion.
 * @class
 */
export class LoginFormView {
  
  /**
   * Affiche un message d'erreur de connexion.
   * @param {HTMLElement} connexion - L'élément DOM contenant le formulaire de connexion.
   */
  displayLoginError(connexion) {
    /**
     * Élément DOM représentant le message d'erreur.
     * @type {HTMLParagraphElement}
     */
      const error = document.createElement("p");
      error.innerText = getMessage("auth.loginError");
      error.classList.add("error-message");
      error.style.textAlign = 'center';
      error.style.color = 'red';
      connexion.insertBefore(error, connexion.lastElementChild);
  }
  /**
 * Supprime le message d'erreur de connexion s'il existe.
 * @param {HTMLElement} connexion - L'élément DOM contenant le formulaire de connexion.
 */
  clearLoginError(connexion) {
    const errorElement = connexion.querySelector('.error-message');
    if (errorElement) {
      connexion.removeChild(errorElement);
    }
  }
}
