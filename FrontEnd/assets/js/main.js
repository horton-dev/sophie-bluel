/**
 * Module principal servant de point d'entrée de l'application.
 * Ce module prend en charge :
 *   - L'initialisation de l'application, y compris le chargement des projets et des catégories depuis la base de données.
 *   - La configuration des fonctionnalités telles que les modales, les boutons et les filtres, en fonction de l'état d'authentification de l'utilisateur.
 *   - L'activation de fonctions spécifiques, comme le mode édition, si l'utilisateur est authentifié.
 *   - L'affichage des projets et des catégories dans la galerie et dans les modales, et la génération dynamique des éléments de l'interface utilisateur.
 * 
 * En résumé, ce module gère l'orchestration de la mise en place et du fonctionnement initial de l'application, en assurant que toutes les parties sont correctement configurées et prêtes à être utilisées par l'utilisateur.
 * @module main
 */

/**
 * Importation des modules et des constantes nécessaires.
 * - Les fonctions API pour interagir avec la base de données.
 * - Les collections pour stocker les projets et les catégories.
 * - Les fonctions liées à la gestion de la galerie et de l'affichage.
 * - Les fonctions pour gérer l'authentification et l'interface utilisateur.
 * - Les constantes globales comme le jeton d'authentification.
 */
import { getAPIData } from "./utils/api.js";
import { allWorks, allCategories } from "./utils/constants.js";
import { generateWorksInGallery, showWorksInModal } from "./module/gallery.js";
import { displayCategoryFilterButtons } from "./module/filter.js";
import { configureLoginButton } from "./module/auth.js";
import { token } from "./utils/constants.js";
import { activateEditMode } from "./module/ui.js";
import { openModal, closeModals, handleModalRedirection, populateSelectCategory, handleImageUpload } from "./module/modal.js";

/**
 * Initialise l'application, en effectuant les tâches suivantes:
 * - Chargement des projets et des catégories depuis la base de données.
 * - Configuration des modales, boutons, et autres fonctionnalités en fonction de l'état d'authentification de l'utilisateur.
 * - Activation du mode édition si l'utilisateur est authentifié.
 * - Configuration des boutons et de la navigation dans la modale.
 * - Affichage des projets et catégories dans la galerie et dans les modales.
 * 
 * @async
 * @function initializeApplication
 * @throws {Error} Lève une erreur si le chargement des projets ou des catégories échoue, ou si une autre erreur se produit pendant l'initialisation.
 */
async function initializeApplication() {
  try {
    // Chargement des projets depuis la base de données
    const works = await getAPIData("works");
    for (const work of works) {
      allWorks.add(work);
    }

    // Chargement des catégories depuis la base de données
    const categories = await getAPIData("categories");
    for (const category of categories) {
      allCategories.add(category);
    }

    // Configuration si l'utilisateur est authentifié
    if (token) {
      activateEditMode();        // Activation du mode édition
      openModal();               // Configuration des modales
      closeModals();             // Configuration des boutons de fermeture des modales
      showWorksInModal();        // Affichage des projets dans la modale
      handleModalRedirection();  // Configuration des boutons de redirection dans la modale
      populateSelectCategory();  // Configuration du menu déroulant de sélection de catégorie
      handleImageUpload();       // Configuration du bouton d'upload d'image
    } else {
      // Configure les écouteurs d'événements sur les boutons de filtre
      displayCategoryFilterButtons();
    }

    // Génère et affiche les projets dans la galerie
    generateWorksInGallery();

    // Configure le bouton de déconnexion
    configureLoginButton();

  } catch (error) {
    console.error(
      `Erreur lors de l'initialisation et du chargement des projets: ${error}`
    );
    throw error;
  }
}

// Appelle la fonction d'initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', initializeApplication);