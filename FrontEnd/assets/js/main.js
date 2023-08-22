/**
 * Point d'entrée principal de l'application.
 * Gère l'initialisation de l'application, chargement des données,
 * configuration des fonctionnalités, et démarrage de l'interface utilisateur.
 */

import { getAPIData } from "./utils/api.js";
import { allWorks, allCategories } from "./utils/constants.js";
import { generateWorksInGallery } from "./module/gallery.js";

/**
 * @description Initialise l'application en chargeant les projets, les catégories et en configurant les modales et les boutons.
 * @async
 * @function
 */
async function initializeApplication() {
  try {
    // Chargement des travaux depuis la base de données
    const works = await getAPIData("works");
    for (const work of works) {
      allWorks.add(work);
    }

    // Chargement des catégories depuis la base de données
    const categories = await getAPIData("categories");
    for (const category of categories) {
      allCategories.add(category);
    }

    // Génère et affiche les travaux dans la galerie
    generateWorksInGallery();

  } catch (error) {
    console.error(
      `Erreur lors de l'initialisation et du chargement des projets: ${error}`
    );
  }
}

// Appelle la fonction d'initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', initializeApplication);
// console.log(getAPIData('allWorks'));