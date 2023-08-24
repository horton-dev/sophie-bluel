/**
 * @description Gère l'affichage d'une galerie de projets, y compris la génération de la galerie, l'affichage des projets dans une fenêtre modale et la confirmation et le traitement de la suppression des projets.
 * Le module fournit des fonctions pour gérer la galerie de projets sur le site Web, permettant une intégration fluide avec d'autres modules.
 * @module gallery
 */

/**
 * @typedef {Object} GalleryModule
 * @property {function} generateWorksInGallery - Une méthode qui génère et affiche les projets dans la galerie en fonction d'un filtre de catégorie. Elle permet une présentation dynamique des œuvres selon la catégorie choisie.
 * @property {function} showWorksInModal - Une méthode qui affiche les projets dans une galerie modale avec des options d'édition et de suppression. Elle offre une interface utilisateur pour la gestion des projets dans la galerie.
 * @property {function} confirmDeleteWork - Une méthode qui confirme et traite la suppression d'un projet, y compris la gestion des codes d'erreur. Elle assure une expérience utilisateur soignée lors de la suppression d'œuvres.
 */

/// Importations de variables et de fonctions depuis différents fichiers pour le fonctionnement du module.
import { allWorks } from "../utils/constants.js";
import { deleteWork } from "../utils/api.js";

/**
 * @description Génère et affiche les projets dans la galerie. Cette fonction prend un identifiant de catégorie en entrée et utilise ce filtre pour afficher uniquement les projets correspondants. Si aucun filtre n'est spécifié ou si le filtre est 0, tous les projets seront affichés. Chaque projets est représenté par un élément "figure" contenant une image et un titre. La galerie existante est d'abord effacée avant de rendre les nouveaux projets.
 * 
 * @function
 * @param {number} [categoryFilter=0] - Identifiant de la catégorie pour filtrer les projets. 0 signifie aucun filtre, et donc tous les projets seront affichés.
 * @requires allWorks - Un tableau d'objets représentant tous les projets, chaque objet doit avoir des propriétés 'id', 'categoryId', 'imageUrl', et 'title'.
 */
export function generateWorksInGallery(categoryFilter = 0) {
  // Collection des projets à afficher, initialement tous les projets
  let worksToDisplay = allWorks;

  // Si un filtre de catégorie est spécifié, filtre les projets par cette catégorie
  if (categoryFilter !== 0) {
    worksToDisplay = [...allWorks].filter((work) => work.categoryId === categoryFilter);
  }

  // Sélectionne l'élément de la galerie dans le DOM pour insérer les projets
  const galleryContainerDiv = document.querySelector(".gallery");
  // Vide le contenu actuel de la galerie pour le nouveau rendu
  galleryContainerDiv.innerHTML = "";

  // Parcoure et affiche chaque projet dans la collection filtrée
  for (const individualWork of worksToDisplay) {
    // Crée un élément "figure" pour chaque projet individuel
    const workFigureElement = document.createElement("figure");
    workFigureElement.id = "figure-" + individualWork.id;

    // Crée un élément "img" pour l'image de chaque projet
    const workImageElement = document.createElement("img");
    workImageElement.src = individualWork.imageUrl;
    workImageElement.alt = individualWork.title;

    // Crée un élément "figcaption" pour le titre de chaque projet
    const workTitleElement = document.createElement("figcaption");
    workTitleElement.textContent = individualWork.title;

    // Assemble et ajoute les éléments individuels à la galerie
    workFigureElement.append(workImageElement);
    workFigureElement.append(workTitleElement);
    galleryContainerDiv.append(workFigureElement);
  }
}

/**
 * @description Affiche les projets dans une galerie modale et fournit des options pour éditer et supprimer les projets. Chaque projet est représenté par un élément "figure" contenant une image, un bouton d'édition, un bouton de déplacement et un bouton de suppression. Le bouton de suppression a un gestionnaire d'événements qui confirme et traite la suppression, y compris la gestion des codes d'erreur.
 * 
 * @function
 * @requires allWorks - Un Set d'objets représentant tous les travaux, chaque objet doit avoir des propriétés 'id', 'imageUrl', et 'title'.
 */
export function showWorksInModal() {
  // Container qui contient les projets dans la fenêtre modale
  const worksContainer = document.querySelector('.worksContainer');

  // Vide le contenu de la fenêtre modale
  worksContainer.innerHTML = "";

  // Parcourir chaque projet et afficher dans la fenêtre modale
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

/**
 * @description Confirme la suppression d'un projet et, si confirmé, appelle la fonction de suppression correspondante.
 * La confirmation est demandée à l'utilisateur via une boîte de dialogue native.
 * 
 * @async
 * @function
 * @param {string} workId - L'ID du travail à supprimer.
 * @returns {Promise<number>|undefined} - Le code d'état de la réponse HTTP si confirmé, sinon undefined.
 */
export async function confirmDeleteWork(workId) {
  // Vérifie si l'utilisateur confirme la suppression
  if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    // Appelle la fonction de suppression et attend sa réponse
    const deleteStatus = await deleteWork(workId);
    return deleteStatus; // Renvoie le code d'état de la réponse HTTP
  }
  // Si l'utilisateur n'a pas confirmé la suppression, renvoie undefined
}