/**
 * Module d'interface utilisateur responsable de la gestion du mode d'édition.
 * Il fournit des fonctionnalités pour activer et configurer le mode d'édition dans l'interface utilisateur, y compris l'affichage des boutons d'édition et la configuration des écouteurs d'événements pour les fenêtres modales.
 * Les fonctionnalités incluent la possibilité d'activer le mode d'édition, d'afficher les contrôles d'édition correspondants, d'ajuster le style de l'interface utilisateur pour ce mode, et de gérer les erreurs d'édition.
 * @module ui
 */

/**
 * @typedef {Object} UIModule
 * @property {function} activateEditMode - Une méthode qui gère l'activation du mode d'édition dans l'interface utilisateur. Elle contrôle l'affichage des boutons d'édition et configure les écouteurs d'événements pour les fenêtres modales associées. Cette méthode joue un rôle clé dans la facilitation de l'édition directe à travers l'interface utilisateur, permettant une expérience utilisateur flexible et dynamique.
 * @property {function} removeExistingErrors - Une méthode qui supprime les éléments d'erreur existants dans l'interface utilisateur. Elle parcourt une liste d'identifiants d'erreur spécifiques et supprime l'élément correspondant s'il existe dans le DOM. Cette méthode permet de nettoyer les messages d'erreur précédents et contribue à une expérience utilisateur plus propre et plus efficace.
 */


/**
 * @description Active le mode d'édition dans l'interface utilisateur, un aspect essentiel de la gestion des contenus éditables.
 * Cette fonction prend en charge l'affichage des contrôles d'édition et la configuration des écouteurs d'événements pour les fenêtres modales associées. En activant ce mode, les utilisateurs peuvent accéder à des fonctionnalités d'édition avancées directement depuis l'interface, permettant des modifications en temps réel et une interaction utilisateur plus fluide et intuitive.
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
 * @description Gère la suppression des messages d'erreur dans l'interface utilisateur pour une expérience plus propre.
 * Cette fonction parcourt une liste d'identifiants d'erreur spécifiques, tels que "titleError", "categoryError", "fileError", "successMessage" et " errorMessage" et supprime l'élément correspondant s'il existe dans le DOM. Cela permet de s'assurer que les erreurs précédentes ne gênent pas l'utilisateur et contribue à une interface plus ordonnée. La méthode est conçue pour être flexible et peut être étendue pour supporter d'autres types d'erreurs à l'avenir.
 * @function
 */

export function removeExistingErrors() {
  const errorIds = ["titleError", "categoryError", "fileError", "successMessage", "errorMessage"];
  
  errorIds.forEach((id) => {
    const errorElement = document.getElementById(id);
    if (errorElement) errorElement.remove();
  });
}


