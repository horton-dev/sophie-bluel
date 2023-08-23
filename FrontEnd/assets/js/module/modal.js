import { allCategories } from "../utils/constants.js";
import { addWork, updateWork } from "../utils/api.js";
import { allWorks } from "../utils/constants.js";
import { showWorksInModal, generateWorksInGallery } from "./gallery.js";

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


export function handleImageUpload() {
  // Récupère les éléments HTML nécessaires
  const imageInput = document.getElementById("uploadImage");
  const addImageContainer = document.querySelector(".addImageContainer");
  const imagePreviewContainer = document.querySelector(".imagePreviewContainer");
  const imagePreview = document.getElementById("imagePreview");
  const submitButton = document.getElementById("submitButton");
  const uploadTitleInput = document.getElementById("uploadTitleInput");
  const categorySelect = document.getElementById("categorySelect");

  let file;
  let imageUrl;

  // Écouteur d'événements pour gérer la sélection de l'image
  imageInput.addEventListener("change", (e) => {
    // Supprime l'ancien message d'erreur s'il existe
    const existingError = document.getElementById("imageError");
    if (existingError) existingError.remove();

    const selectedFile = e.target.files[0];
    const allowedFileTypes = ["image/jpeg", "image/png"];
    const isValidFormat = allowedFileTypes.includes(selectedFile.type);

    if (isValidFormat && selectedFile.size <= 1024 * 1024 * 4) {
      imageUrl = URL.createObjectURL(selectedFile);
      imagePreview.src = imageUrl;
      imagePreviewContainer.style.visibility = 'visible';
      imagePreview.style.visibility = 'visible';
      addImageContainer.style.visibility = 'hidden';
      file = selectedFile;
      submitButton.style.backgroundColor = '#1D6154';
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.id = "imageError"; // Ajout d'un identifiant pour pouvoir le supprimer plus tard
      errorMessage.innerText = isValidFormat ? "Taille incorrecte : 4 Mo maximum" : "Format incorrect : PNG/JPG attendu";
      errorMessage.className = "inputErrorImage"; // Ajout d'une classe pour le style CSS
      errorMessage.style.textAlign = 'center';
      errorMessage.style.color = 'red';
      addImageContainer.parentNode.append(errorMessage); // Ajoute le message d'erreur en dessous du conteneur d'image
    }
  });

  // Requête POST pour envoyer un nouveau travail
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    // Supprime les anciens messages d'erreur s'ils existent
    const existingTitleError = document.getElementById("titleError");
    const existingCategoryError = document.getElementById("categoryError");
    if (existingTitleError) existingTitleError.remove();
    if (existingCategoryError) existingCategoryError.remove();

    let hasError = false;

    // Vérification du titre
    if (!uploadTitleInput.value) {
      const titleError = document.createElement("p");
      titleError.id = "titleError"; 
      titleError.className = "inputErrorTitle";
      titleError.innerText = "*Le titre est requis";
      titleError.style.textAlign = 'center';
      titleError.style.color = 'red';
      uploadTitleInput.parentNode.append(titleError);
      hasError = true;
    }

    // Vérification de la catégorie
    if (!categorySelect.value) {
      const categoryError = document.createElement("p");
      categoryError.id = "categoryError";
      categoryError.className = "inputErrorSelect";
      categoryError.innerText = "*La catégorie est requise";
      // categoryError.style.textAlign = 'center';
      categoryError.style.color = 'red';
      categorySelect.parentNode.append(categoryError);
      hasError = true;
    }

    // Vérification de l'image
    if (!file) {
      hasError = true;
      // Vous pouvez également ajouter un message d'erreur pour l'image ici si nécessaire
    }

    if (hasError) return; // Si une erreur est détectée, arrêtez le traitement ici

        // Le reste de la logique d'envoi du formulaire (identique à votre code précédent)
        try {
          const firstModalLayout = document.querySelector(".firstModalLayout");
          const secondModalLayout = document.querySelector(".secondModalLayout");
          const formData = new FormData();
          formData.append("image", file);
          formData.append("title", uploadTitleInput.value);
          formData.append("category", categorySelect.value);
    
          secondModalLayout.style.display = 'none';
          alert("Votre projet a bien été ajouté");
          firstModalLayout.style.display = 'flex';
    
          const newWork = await addWork(formData); // suppose une fonction asynchrone `addWork` pour ajouter le travail
          allWorks.add(newWork);
          showWorksInModal(); // suppose une fonction pour montrer les travaux dans un modal
          generateWorksInGallery(); // suppose une fonction pour générer les travaux dans la galerie
    
          // Réinitialisation du formulaire
          imagePreview.src = "";
          imagePreviewContainer.style.visibility = 'hidden';
          imagePreview.style.visibility = 'hidden';
          addImageContainer.style.visibility = 'visible';
          file = null;
          submitButton.style.backgroundColor = '';
          URL.revokeObjectURL(imageUrl);
          document.getElementById("sendImageForm").reset();
        } catch (error) {
          console.error("Une erreur s'est produite lors de l'envoi du formulaire:", error);
        }
      });
    }


