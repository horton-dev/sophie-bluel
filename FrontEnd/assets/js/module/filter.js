/**
 * Gère les fonctionnalités de filtrage, y compris l'affichage des boutons de filtre et la configuration des événements de filtrage.
 * @module filter
 */

/**
 * @typedef {Object} FilterModule
 * @property {function} displayCategoryFilterButtons - Affiche les boutons de filtre dans la galerie.
 * @property {function} setCategoryFilterEvent - Configure les événements de clic sur les boutons de filtre pour filtrer les travaux par catégorie.
 */

import { allCategories } from "../utils/constants.js";
import { generateWorksInGallery } from "./gallery.js";


/**
 * @description Affiche les boutons de filtre dans la galerie, y compris une option "Tous" et un bouton pour chaque catégorie.
 * Chaque bouton est créé avec une classe "filter" et un attribut data-id correspondant à l'ID de la catégorie. 
 * Le bouton "Tous" a un ID de 0 et est actif par défaut.
 * Après avoir affiché tous les boutons, la fonction setFilterEvent est appelée pour configurer les écouteurs d'événements sur les boutons.
 * @function
 * @requires allCategories - Un tableau d'objets représentant toutes les catégories, chaque objet doit avoir des propriétés 'id' et 'name'.
 */

export function displayCategoryFilterButtons() {
  // Sélectionne l'élément de conteneur qui accueillera les boutons de filtre
  const filterButtonsContainer = document.querySelector(".filter-container");
  // Crée un fragment de document pour construire efficacement les boutons
  const buttonsFragment = document.createDocumentFragment();

  // Crée et configure le bouton de filtre "Tous", qui sera actif par défaut
  const allCategoriesFilterButton = document.createElement("button");
  allCategoriesFilterButton.classList.add("active", "filter-button");
  allCategoriesFilterButton.dataset.id = 0;
  allCategoriesFilterButton.textContent = "Tous";
  // Ajoute le bouton de filtre "Tous" au fragment
  buttonsFragment.appendChild(allCategoriesFilterButton);

  // Parcoure et crée un bouton de filtre pour chaque catégorie dans la collection "allCategories"
  for (const category of allCategories) {
    const categoryFilterButton = document.createElement("button");
    categoryFilterButton.classList.add("filter-button");
    categoryFilterButton.dataset.id = category.id;
    categoryFilterButton.textContent = category.name;
    // Ajoute chaque bouton de catégorie au fragment
    buttonsFragment.appendChild(categoryFilterButton);
  }

  // Ajoute le fragment complet, contenant tous les boutons de filtre, au conteneur de boutons de filtre dans le DOM
  filterButtonsContainer.append(buttonsFragment);

  // Appelle la fonction pour configurer les écouteurs d'événements sur les boutons de filtre
  setCategoryFilterEvent();
}

/**
 * @description Configure les événements de clic sur les boutons de filtre pour filtrer les travaux par catégorie.
 * Cela suppose que chaque bouton de filtre ait une classe "filter" et contienne un attribut data-id avec l'ID de la catégorie correspondante.
 * Après avoir cliqué sur un bouton de filtre, la fonction generateWorksInGallery sera appelée avec l'ID de la catégorie sélectionnée,
 * et le bouton cliqué sera mis en évidence en ajoutant la classe "active".
 * @function
 */
function setCategoryFilterEvent() {
  // Sélectionne tous les boutons de filtre dans le DOM
  const filterButtons = document.querySelectorAll(".filter-button");

  // Itère sur chaque bouton de filtre pour ajouter un écouteur d'événements
  for (const filterButton of filterButtons) {
    filterButton.addEventListener("click", (event) => {
      // Récupère le bouton de filtre qui a été cliqué
      const clickedFilterButton = event.target;

      // Récupère l'ID de la catégorie associée au bouton de filtre cliqué
      const selectedCategoryId = parseInt(clickedFilterButton.dataset.id);

      // Génère et affiche les travaux filtrés par la catégorie sélectionnée
      generateWorksInGallery(selectedCategoryId);

      // Trouve et désactive le bouton de filtre actif précédemment
      const previouslyActiveButton = document.querySelector(".active");
      previouslyActiveButton.classList.remove("active");

      // Active le bouton de filtre cliqué en ajoutant la classe 'active'
      clickedFilterButton.classList.add("active");
    });
  }
}

