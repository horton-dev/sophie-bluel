/**
 * Gère l'affichage d'une galerie de travaux
 * @module gallery
 */

/**
 * @typedef {Object} GalleryModule
 * @property {function} generateWorksInGallery - Génère et affiche les travaux dans la galerie
 */

import { allWorks } from "../utils/constants.js";

/**
 * @description Génère et affiche les travaux dans la galerie en fonction du filtre de catégorie spécifié.
 * Si aucun filtre n'est spécifié ou si le filtre est 0, tous les travaux seront affichés.
 * Chaque travail est représenté par un élément "figure" contenant une image et un titre.
 * @function
 * @param {number} [categoryFilter=0] - Identifiant de la catégorie pour filtrer les travaux. 0 signifie aucun filtre.
 * @requires allWorks - Un tableau d'objets représentant tous les travaux, chaque objet doit avoir des propriétés 'id', 'categoryId', 'imageUrl', et 'title'.
 */
export function generateWorksInGallery(categoryFilter = 0) {
  // Collection des travaux à afficher, initialement tous les travaux
  let worksToDisplay = allWorks;

  // Si un filtre de catégorie est spécifié, filtre les travaux par cette catégorie
  if (categoryFilter !== 0) {
    worksToDisplay = [...allWorks].filter((work) => work.categoryId === categoryFilter);
  }

  // Sélectionne l'élément de la galerie dans le DOM pour insérer les travaux
  const galleryContainerDiv = document.querySelector(".gallery");
  // Vide le contenu actuel de la galerie pour le nouveau rendu
  galleryContainerDiv.innerHTML = "";

  // Parcoure et affiche chaque travail dans la collection filtrée
  for (const individualWork of worksToDisplay) {
    // Crée un élément "figure" pour chaque travail individuel
    const workFigureElement = document.createElement("figure");
    workFigureElement.id = "figure-" + individualWork.id;

    // Crée un élément "img" pour l'image de chaque travail
    const workImageElement = document.createElement("img");
    workImageElement.src = individualWork.imageUrl;
    workImageElement.alt = individualWork.title;

    // Crée un élément "figcaption" pour le titre de chaque travail
    const workTitleElement = document.createElement("figcaption");
    workTitleElement.textContent = individualWork.title;

    // Assemble et ajoute les éléments individuels à la galerie
    workFigureElement.append(workImageElement);
    workFigureElement.append(workTitleElement);
    galleryContainerDiv.append(workFigureElement);
  }
}