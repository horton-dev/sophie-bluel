/**
 * Gère l'activation du mode d'édition dans l'interface utilisateur, affichant les boutons d'édition et les fenêtres modales associées.
 * @module ui
 */

/**
 * @typedef {Object} UIModule
 * @property {function} activateEditMode - Active le mode d'édition dans l'interface utilisateur, affichant les boutons d'édition et configurant les écouteurs d'événements pour les fenêtres modales.
 */

/**
 * @description Active le mode d'édition dans l'interface utilisateur, affichant les boutons d'édition et les fenêtres modales associées.
 * Cette fonction permet d'activer le mode d'édition dans l'interface utilisateur en affichant les boutons d'édition et en configurant les écouteurs d'événements pour les fenêtres modales.
 * @function
 */
export function activateEditMode() {
  // Sélectionner l'élément de contrôle d'édition et les boutons associés
  const editionControl = document.querySelector('.edit-mode');
  const edition = document.querySelector('.edit-mode-project');
  const modifyDescription = document.querySelector('.modify-description-image');
  const openModal = document.querySelector('.open-project-modal');
  const body = document.querySelector('body');

  // Activer le style d'édition en ajustant l'affichage et le padding
  editionControl.style.display = 'flex';
  modifyDescription.style.display = 'block';
  openModal.style.display = 'flex';
  edition.style.paddingLeft = "100px";
  body.style.paddingTop = "60px";
}

/**
 * @description Supprime les éléments d'erreur existants de l'interface utilisateur.
 * Cette fonction parcourt une liste d'identifiants d'erreur spécifiques et supprime l'élément correspondant s'il existe dans le DOM.
 * Actuellement, les identifiants d'erreur pris en charge sont "titleError", "categoryError", et "fileError".
 * @function
 * @exports
 */
export function removeExistingErrors() {
  const errorIds = ["titleError", "categoryError", "fileError", "successMessage", "errorMessage"];
  
  errorIds.forEach((id) => {
    const errorElement = document.getElementById(id);
    if (errorElement) errorElement.remove();
  });
}


