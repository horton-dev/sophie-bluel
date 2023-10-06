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
    error.innerText = "Identifiant ou mot de passe incorrect. Veuillez réessayer.";
    error.classList.add("error-message");
    error.style.textAlign = 'center';
    error.style.color = 'red';
    connexion.insertBefore(error, connexion.lastElementChild);
  }
}
