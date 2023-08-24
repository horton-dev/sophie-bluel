import { allCategories } from "../utils/constants.js";
import { addWork } from "../utils/api.js";
import { allWorks } from "../utils/constants.js";
import { showWorksInModal, generateWorksInGallery } from "./gallery.js";
import { removeExistingErrors } from "./ui.js";

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
    removeExistingErrors();
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

/**
 * @description Gère la navigation entre la première et la deuxième modale, ainsi que la fermeture des modales.
 * Cette fonction définit les écouteurs d'événements pour le passage entre les modales et la fermeture des modales.
 * @function
 */

export function handleModalRedirection() {
  // Sélectionne les boutons pour ajouter un travail et fermer les modales
  const addWorkButton = document.querySelector(".addWork");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const backButton = document.querySelector(".back");

  // Écouteur d'événements pour passer de la première modale à la deuxième modale
  addWorkButton.addEventListener("click", () => {
    firstModalLayout.style.display = "none";
    secondModalLayout.style.display = "flex";
  });

  // Écouteur d'événements pour le bouton back dans la deuxième modale

  backButton.addEventListener("click", () => {
    firstModalLayout.style.display = "flex";
    secondModalLayout.style.display = "none";
    backToFirstModal();
  });
}

/**
 * @description Récupère dynamiquement les catégories et les ajoute à un élément de sélection HTML pour l'ajout de projet.
 * Cette fonction parcourt la collection 'allCategories' et crée dynamiquement des éléments 'option' pour chaque catégorie.
 * Chaque élément 'option' affiche le nom de la catégorie et a sa valeur définie comme l'ID de la catégorie.
 * @function
 * @requires allCategories - Un tableau d'objets représentant toutes les catégories, chaque objet doit avoir des propriétés 'id' et 'name'.
 */
export function populateSelectCategory() {
  // Récupère l'élément HTML 'select' avec l'ID 'categorie' qui permettra à l'utilisateur de choisir une catégorie
  const categorySelectElement = document.getElementById("categorySelect");

  // Crée et ajoute une première option vide
  const emptyOptionElement = document.createElement("option");
  emptyOptionElement.textContent = ""; // Texte vide
  emptyOptionElement.value = ""; // Valeur vide
  categorySelectElement.appendChild(emptyOptionElement);

  // Parcourt toutes les catégories disponibles dans la collection 'allCategories'
  for (const category of allCategories) {
    // Crée un nouvel élément HTML 'option' pour représenter la catégorie dans la liste déroulante
    const categoryOptionElement = document.createElement("option");

    // Définit le texte affiché dans l'élément 'option' comme le nom de la catégorie
    categoryOptionElement.textContent = category.name;

    // Définit la valeur de l'élément 'option' comme l'ID de la catégorie, afin qu'elle puisse être utilisée lors de la sélection
    categoryOptionElement.value = category.id;

    // Ajoute l'élément 'option' à l'élément 'select', rendant la catégorie disponible pour la sélection
    categorySelectElement.appendChild(categoryOptionElement);
  }
}

/**
 * @description Gère le téléchargement d'une image en exécutant les tâches suivantes :
 *   1. Récupère les éléments HTML nécessaires pour le téléchargement et l'affichage.
 *   2. Écoute les changements sur l'input de type fichier pour sélectionner une image.
 *   3. Valide le type et la taille du fichier sélectionné (PNG/JPG, 4 Mo maximum).
 *   4. Prévisualise l'image si les validations réussissent, sinon affiche des messages d'erreur.
 *   5. Gère l'envoi du formulaire associé, en incluant des validations supplémentaires pour le titre et la catégorie.
 *   6. Traite les réponses et met à jour l'interface utilisateur en conséquence.
 * @function
 * @exports
 */
export function handleImageUpload() {
  // Éléments HTML pour l'interaction utilisateur
  const selectors = {
    imageInput: "#uploadImage",
    addImageContainer: ".addImageContainer",
    imagePreviewContainer: ".imagePreviewContainer",
    imagePreview: "#imagePreview",
    submitButton: "#submitButton",
    uploadTitleInput: "#uploadTitleInput",
    categorySelect: "#categorySelect",
  };
  
  const addImageContainer = document.querySelector(selectors.addImageContainer);
  const imagePreviewContainer = document.querySelector(selectors.imagePreviewContainer);
  const imagePreview = document.querySelector(selectors.imagePreview);
  const submitButton = document.querySelector(selectors.submitButton);
  const uploadTitleInput = document.querySelector(selectors.uploadTitleInput);
  const categorySelect = document.querySelector(selectors.categorySelect);
  

  const elements = {};
  for (const key in selectors) {
    elements[key] = document.querySelector(selectors[key]);
  }

  // Variables pour stocker l'état du téléchargement
  let file;
  let imageUrl;

  /**
   * @description Affiche un message d'erreur
   * @param {HTMLElement} element - Élément parent du message d'erreur
   * @param {string} errorId - ID unique pour le message d'erreur
   * @param {string} message - Texte du message d'erreur
   */
  function displayError(element, errorId, message) {
    const error = document.createElement("p");
    error.id = errorId;
    error.className = `inputError${errorId}`;
    error.innerText = message;
    error.style.textAlign = "center";
    error.style.color = "red";
    element.parentNode.append(error);
  }

  // Gestion de la sélection de l'image et de la validation du fichier
  elements.imageInput.addEventListener("change", (e) => {
    // Supprimer les messages d'erreur précédents
    const existingError = document.getElementById("imageError");
    if (existingError) existingError.remove();

    // Vérifier le type et la taille du fichier
    const selectedFile = e.target.files[0];
    const allowedFileTypes = ["image/jpeg", "image/png"];
    const isValidFormat = allowedFileTypes.includes(selectedFile.type);

    // Si le fichier est valide, prévisualiser l'image
    if (isValidFormat && selectedFile.size <= 1024 * 1024 * 4) {
      imageUrl = URL.createObjectURL(selectedFile);
      elements.imagePreview.src = imageUrl;
      elements.imagePreviewContainer.style.visibility = "visible";
      elements.imagePreview.style.visibility = "visible";
      elements.addImageContainer.style.visibility = "hidden";
      file = selectedFile;
      elements.submitButton.style.backgroundColor = "#1D6154";
    } else {
      // Créer et afficher le message d'erreur approprié
      const message = isValidFormat
        ? "Taille incorrecte : 4 Mo maximum"
        : "Format incorrect : PNG/JPG attendu";
      displayError(elements.addImageContainer, "imageError", message);
    }
  });

    // Gestion de l'envoi du formulaire
    elements.submitButton.addEventListener("click", async (e) => {
      e.preventDefault();
  
      // Supprimer les messages d'erreur précédents
      removeExistingErrors();
  
      // Valider les champs du formulaire
      let hasError = false;
  
      // Vérifier le titre
      if (!elements.uploadTitleInput.value) {
        displayError(elements.uploadTitleInput, "titleError", "*Le titre est requis");
        hasError = true;
      }
  
      // Vérifier la catégorie
      if (!elements.categorySelect.value) {
        displayError(elements.categorySelect, "categoryError", "*La catégorie est requise");
        hasError = true;
      }
  
      // Vérifier l'image
if (!file) {
  const imageError = document.createElement("p");
  imageError.id = "fileError";
  imageError.className = "inputErrorImage";
  imageError.innerText = "*Une image est requise";
  imageError.style.textAlign = "center";
  imageError.style.color = "red";
  addImageContainer.parentNode.append(imageError);
  hasError = true;
}

  
      // Si une erreur est détectée, arrêter le traitement
      if (hasError) return;
  
// Traitement de l'envoi du formulaire
try {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", uploadTitleInput.value);
  formData.append("category", categorySelect.value);

  // Envoi des données du formulaire
  const newWork = await addWork(formData);
  allWorks.add(newWork);
  showWorksInModal();
  generateWorksInGallery();

  // Appel de la fonction de réinitialisation
  backToFirstModal();
  
  // Message de confirmation
  const container = document.querySelector('#sendImageForm');
  const message = document.createElement('button');
  message.className = "successMessage";
  message.id = "successMessage";
  message.innerHTML = `
  <i class="fa-solid fa-circle-check"></i>
  Votre projet a bien été ajouté
  `;
  message.style.color = "green"; // Pour le style, vous pouvez aussi utiliser une classe CSS
  container.insertBefore(message, container.firstChild);
} catch (error) {
  console.error(
    "Une erreur s'est produite lors de l'envoi du formulaire:",
    error
  );
  // Logique supplémentaire pour informer l'utilisateur
  const container = document.querySelector('#sendImageForm');
  const message = document.createElement('button');
  message.className = "errorMessage";
  message.id = "errorMessage";
  message.innerHTML = `
  <i class="fa-solid fa-triangle-exclamation"></i>
  Une erreur s'est produite lors de l'ajout de votre projet. Veuillez réessayer.
  `;
  message.style.color = "red"; // Pour le style, vous pouvez aussi utiliser une classe CSS
  container.insertBefore(message, container.firstChild);
}


    });
  }
  
export function backToFirstModal(imageUrl) {
    // Éléments HTML pour la réinitialisation
    const imagePreviewContainer = document.querySelector(".imagePreviewContainer");
    const addImageContainer = document.querySelector(".addImageContainer");
    const imagePreview = document.getElementById("imagePreview");
    const submitButton = document.getElementById("submitButton");
  
    // Réinitialisation du formulaire
    removeExistingErrors();
    imagePreview.src = "";
    imagePreviewContainer.style.visibility = "hidden";
    imagePreview.style.visibility = "hidden";
    addImageContainer.style.visibility = "visible";
    submitButton.style.backgroundColor = "";
    URL.revokeObjectURL(imageUrl);
    document.getElementById("sendImageForm").reset();

}
  
