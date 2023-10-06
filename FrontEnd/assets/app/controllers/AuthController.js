import { ACCESS_TOKEN } from "../core/constants.js";

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
      this.loginLink.innerText = 'Logout';
    } else {
      this.loginLink.innerText = 'Login';
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
      sessionStorage.removeItem("accessToken");
      console.log("token supprimé" + ACCESS_TOKEN);
      window.location.reload();
    } else {
      window.location.href = "/login.html";
    }
  }};
