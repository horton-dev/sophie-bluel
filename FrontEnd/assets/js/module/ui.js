/**
 * @description Active le mode d'édition dans l'interface utilisateur, affichant les boutons d'édition et les fenêtres modales associées.
 * Cette fonction permet d'activer le mode d'édition dans l'interface utilisateur en affichant les boutons d'édition et en configurant les écouteurs d'événements pour les fenêtres modales.
 * @function
 */
export function activateEditMode() {
  // Sélectionner l'élément de contrôle d'édition
  const editionControl = document.querySelector('.edit-mode');
  const edition = document.querySelector('.edit-mode-project');
  // Sélectionner tous les boutons d'édition
  const modifyDescription = document.querySelector('.modify-description-image');
  const openModal = document.querySelector('.open-project-modal');
  const body = document.querySelector('body');

  // Activer le style d'édition
  editionControl.style.display = 'flex';
  modifyDescription.style.display = 'block';
  openModal.style.display = 'flex';
  edition.style.paddingLeft = "100px";
  body.style.paddingTop = "60px";
  }
