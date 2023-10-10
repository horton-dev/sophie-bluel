import { apiFetch } from '../utils/apiService.js';
import { LoginFormView } from '../views/LoginFormView.js';

/**
 * Classe qui gère le modèle de la connexion.
 * @class
 */
export class LoginFormModel {
   /**
   * Crée une instance de LoginFormModel.
   * @constructor
   */
   constructor() {
      /**
      * L'instance de la vue du formulaire de connexion.
      * @type {LoginFormView}
      */
      this.loginFormView = new LoginFormView();
   }

   /**
   * Tente de connecter l'utilisateur en utilisant les informations d'identification fournies.
   * @async
   * @function
   * @param {string} email - L'adresse e-mail de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   */
  async loginUser(email, password) {
    try {
      const data = await apiFetch("users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (data && data.token) {
        sessionStorage.setItem("accessToken", data.token);
        window.location.href = `http://${window.location.hostname}:5500/index.html`;
      } else {
        console.error(`Erreur: Pas de token dans la réponse`);
      }
    } catch (error) {
      this.loginFormView.clearLoginError(document.getElementById("login-form"));
      this.loginFormView.displayLoginError(document.getElementById("login-form"));
    }
  }

  /**
   * Vérifie la validité d'une adresse e-mail en utilisant une expression régulière.
   * @function
   * @param {string} email - L'adresse e-mail à vérifier.
   * @returns {boolean} - True si l'adresse e-mail est valide, sinon false.
   */
  emailValidityCheck(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return regex.test(email);
  }
}
