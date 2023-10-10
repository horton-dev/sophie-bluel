/**
 * Fichier d'initialisation de la page de connexion.
 * Ce fichier charge le header et le footer de la page, puis initialise le formulaire de connexion.
 * @module Login
 */

import { loadHeaderFooter } from './services/layoutService.js';
import { initLogin } from './controllers/LoginFormController.js';
import { initializeTextResources } from './locales/languageLoader.js';

/**
 * Écouteur d'événement DOMContentLoaded qui déclenche l'initialisation de la page de connexion.
 * @function initializeLoginPage
 */
document.addEventListener("DOMContentLoaded", () => {

  // Initialise les ressources textuelles
  initializeTextResources();
  
  // Charge le header et le footer
  loadHeaderFooter();

  /**
   * Fonction d'initialisation du formulaire de connexion.
   * @function initLoginForm
   */
  initLogin();

});
