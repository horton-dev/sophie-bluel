/**
 * Fichier d'initialisation de la page de connexion.
 * Ce fichier charge le header et le footer de la page, puis initialise le formulaire de connexion.
 * @module Login
 */

import { loadHeaderFooter } from './services/layoutService.js';
import { initLogin } from './controllers/LoginFormController.js';
import { initializeTextResources } from './locales/languageLoader.js';
import { updateTextContent } from './locales/localizationElements.js';

/**
 * Écouteur d'événement DOMContentLoaded qui déclenche l'initialisation de la page de connexion.
 * @function initializeLoginPage
 */
document.addEventListener("DOMContentLoaded", async () => {

  // Initialise les ressources textuelles
  const success = await initializeTextResources();
  
  // Charge le header et le footer
  await loadHeaderFooter();

  if (success) {
    updateTextContent(); // Appel à la fonction qui met à jour les textes
  }

  /**
   * Fonction d'initialisation du formulaire de connexion.
   * @function initLoginForm
   */
  initLogin();

});

