import { ACCESS_TOKEN } from "../core/constants.js";
import { getMessage } from "../locales/languageLoader.js";

/**
 * Classe AuthController pour gérer la connexion/déconnexion.
 * @class
 */
export class AuthController {
  /**
   * Construit une nouvelle instance de AuthController et l'initialise.
   */
  constructor() {
    this.loginLink = document.getElementById("login");
    this.init();
  }

  /**
   * Initialise l'instance de AuthController.
   */
  init() {

    if (ACCESS_TOKEN) {
      this.loginLink.innerText = getMessage("auth.logout");
    } else {
      this.loginLink.innerText = getMessage("auth.login");
    }

     // Attache un gestionnaire d'événement au clic sur le lien de connexion.
    this.loginLink.addEventListener("click", this.handleClick.bind(this));
  }

  /**
   * Gère l'événement de clic sur le lien de connexion.
   * @param {Event} e - L'objet d'événement de clic.
   */
  handleClick(e) {
    // Annule l'action par défaut de l'événement.
    e.preventDefault();

    // Supprime le jeton d'accès du stockage de session et recharge la page si connecté.
    // Sinon, redirige vers la page de connexion.
    if (ACCESS_TOKEN) {
      // Demande de confirmation de la déconnexion
      const userConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
      if (userConfirmed) {
        // Supprime le jeton d'accès du stockage de session
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      } else {
        return;
      }
    } else {
      window.location.href = "/login.html";
    }
  }};
