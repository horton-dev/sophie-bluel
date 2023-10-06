/**
 * Fichier principal de l'application.
 * Ce fichier initialise l'application et charge les différents modules nécessaires.
 * @module Main
 */

import { loadHeaderFooter } from './services/layoutService.js';
import { WorkGalleryController } from './controllers/WorkGalleryController.js';
import { FilterController } from './controllers/FilterController.js';
import { ACCESS_TOKEN } from './core/constants.js';
import { UserDashboardController } from './controllers/UserDashboardController.js';
import { ModalController } from './controllers/modalController.js';
import { WorkGalleryModel } from './models/WorkGalleryModel.js';
import { AuthController } from './controllers/AuthController.js';

/**
 * Modèle de galerie de travaux.
 * @type {WorkGalleryModel}
 */
const workGalleryModel = new WorkGalleryModel();

/**
 * Contrôleur de galerie de travaux.
 * @type {WorkGalleryController}
 */
const workGalleryController = new WorkGalleryController(workGalleryModel); // supposant que vous avez ajusté le constructeur

/**
 * Contrôleur de modal.
 * @type {ModalController}
 * Injecte le même modèle de galerie de travaux ici.
 */
const modalController = new ModalController(workGalleryModel);

/**
 * Initialise l'application.
 * Charge les textes, le header, et le footer.
 * Initialise le contrôleur d'authentification et la galerie de travaux.
 * @async
 * @function initializeApplication
 */
async function initializeApplication() {
  try {
    // Charge les textes
    // ...

    // Charge le header et le footer
    await loadHeaderFooter();

    /**
     * Contrôleur d'authentification.
     * @type {AuthController}
     */
    const authController = new AuthController();

    // Initialise la galerie
    await workGalleryController.initGallery();

    if (ACCESS_TOKEN) {
      /**
       * Contrôleur du tableau de bord de l'utilisateur.
       * @type {UserDashboardController}
       */
      const dashboardController = new UserDashboardController();
      dashboardController.init();

      /**
       * Initialise le contrôleur de modal.
       */
      modalController.initModal();
    } else {
      /**
       * Contrôleur de filtre.
       * @type {FilterController}
       */
      const filterController = new FilterController();
      filterController.initFilter();
    }

  } catch (error) {
    console.error(`Erreur lors de l'initialisation et du chargement des projets: ${error}`);
    throw error;
  }
}

/**
 * Écouteur d'événement DOMContentLoaded qui déclenche l'initialisation de l'application.
 */
window.addEventListener('DOMContentLoaded', initializeApplication);
