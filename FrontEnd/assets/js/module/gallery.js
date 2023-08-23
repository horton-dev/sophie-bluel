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

/**
 * @description Affiche les travaux dans une galerie modale et fournit des options pour éditer et supprimer les travaux.
 * Chaque travail est représenté par un élément "figure" contenant une image, un bouton d'édition et un bouton de suppression.
 * Le bouton de suppression a un gestionnaire d'événements qui confirme et traite la suppression, y compris la gestion des codes d'erreur.
 * @function
 * @requires allWorks - Un Set d'objets représentant tous les travaux, chaque objet doit avoir des propriétés 'id', 'imageUrl', et 'title'.
 */
export function showWorksInModal() {
  // Container qui contient les travaux dans la fenêtre modale
  const worksContainer = document.querySelector('.worksContainer');

  // Vide le contenu de la fenêtre modale
  worksContainer.innerHTML = "";

  // Parcourir chaque travail et afficher dans la fenêtre modale
  allWorks.forEach((work) => {
    const figureModal = document.createElement('figure');
    const figureImageModal = document.createElement('img');
    const editButton = document.createElement('button');
    const moveButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    // Récupérer l'image et le titre
    figureModal.dataset.id = work.id;
    figureImageModal.src = work.imageUrl;
    figureImageModal.alt = work.title;
    editButton.innerText = 'éditer';
    editButton.classList.add('edit');
    moveButton.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
    moveButton.classList.add('move');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('delete');

    // Ajouter un événement pour la suppression
    deleteButton.addEventListener("click", async (e) => {
      const figureElement = e.target.closest("figure");
      const workId = figureElement.dataset.id;
      const deleteCode = await confirmDeleteWork(workId);

      // Chaque cas correspond à un code d'erreur différent
      switch (deleteCode) {
        case 204:
          figureElement.remove();
          const galleryFigure = document.querySelector("#figure-" + workId);
          galleryFigure.remove();

          // Permet de supprimer l'image dans le Set
          for (const workItem of allWorks) {
            if (workItem.id == workId) {
              allWorks.delete(workItem);
              break;
            }
          }
          break;
        case 401:
          alert("Erreur 401: Accès non autorisé. Vous n'avez peut-être pas les permissions nécessaires pour effectuer cette action.");
          break;
        case 500:
          alert("Erreur 500: Problème de serveur. Veuillez réessayer plus tard ou contacter le support technique.");
          break;
        case "abort":
          alert("Opération annulée par l'utilisateur ou par le système.");
          break;
        default:
          alert("Erreur inattendue: " + deleteCode + ". Veuillez contacter le support technique.");
          break;
      }
    });

    // Ajouter les éléments créés à la fenêtre modale
    figureModal.append(figureImageModal);
    figureModal.append(editButton);
    figureModal.append(deleteButton);
    figureModal.append(moveButton);
    worksContainer.append(figureModal);
  });
}