/**
 * @description Ouvre la première fenêtre modale lorsqu'un élément "pushModal" est cliqué.
 * Cette fonction s'attend à ce que les éléments "pushModal", "modalContainer" et "firstModal" soient disponibles dans le DOM ou passés en tant que paramètres.
 * Lorsque l'élément "pushModal" est cliqué, la propriété "display" de "modalContainer" est définie sur "flex" et la propriété "display" de "firstModal" est définie sur "flex" pour les afficher.
 * @function
 * @requires openProjectModal - L'élément HTML qui, lorsqu'il est cliqué, déclenche l'ouverture de la première fenêtre modale.
 * @requires modalContainer - L'élément HTML qui contient toutes les fenêtres modales.
 * @requires firstModal - La première fenêtre modale à afficher.
 */
export function openModal() {
  // Assurez-vous que les éléments "pushModal", "modalContainer", et "firstModal" sont sélectionnés dans cette fonction ou passez-les en tant que paramètres
  const openProjectModal = document.querySelector(".open-project-modal");
  const modalContainer = document.querySelector(".modalContainer");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const overlay = document.querySelector(".overlay");

  openProjectModal.addEventListener("click", () => {
    overlay.style.display = "block";
    modalContainer.style.display = "block";
    firstModalLayout.style.display = `flex`;
    secondModalLayout.style.display = `none`;
  });
}

/**
 * @function
 * @description Ferme à la fois la première et la deuxième modales.
 * Cette fonction est utilisée comme gestionnaire d'événements pour les boutons de fermeture des modales.
 */
export function closeModals() {

  const closeFirstModals = document.querySelectorAll(".closeFirstModal");
  const closeSecondModals = document.querySelectorAll(".closeSecondModal");
  const modalContainer = document.querySelector(".modalContainer");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const overlay = document.querySelector(".overlay");

  closeFirstModals.forEach((closeFirstModal) => {
    closeFirstModal.addEventListener("click", () => {
      modalContainer.style.display = "none";
      firstModalLayout.style.display = `none`;
      overlay.style.display = "none";
    });
  });

  closeSecondModals.forEach((closeSecondModal) => {
    closeSecondModal.addEventListener("click", () => {
      overlay.style.display = "none";
      modalContainer.style.display = "none";
      secondModalLayout.style.display = `none`;
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    modalContainer.style.display = "none";
    firstModalLayout.style.display = "none";
    secondModalLayout.style.display = "none";
  });
}

