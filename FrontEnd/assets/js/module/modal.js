/**
 * Module de gestion des fenêtres modales pour l'interaction avec l'utilisateur.
 * Il fournit des fonctionnalités pour ouvrir, fermer et naviguer entre différentes fenêtres modales, y compris la manipulation dynamique des éléments de la liste déroulante et la gestion du téléchargement d'images.
 * Les fonctionnalités incluent l'ouverture de la première fenêtre modale, la fermeture de toutes les fenêtres modales, la navigation entre les fenêtres modales, la population dynamique des catégories, le téléchargement d'images et le retour à la première fenêtre modale.
 * @module modal
 */

/**
 * @typedef {Object} ModalModule
 * @property {function} openModal - Une méthode qui gère l'ouverture de la première fenêtre modale. Elle déclenche l'affichage des éléments associés dans le DOM, permettant une interaction utilisateur fluide.
 * @property {function} closeModals - Une méthode qui ferme à la fois la première et la deuxième fenêtres modales. Elle gère les boutons de fermeture et assure une expérience utilisateur soignée.
 * @property {function} handleModalRedirection - Une méthode qui gère la navigation entre la première et la deuxième fenêtre modale. Elle configure les écouteurs d'événements pour le passage entre les fenêtres modales.
 * @property {function} populateSelectCategory - Une méthode qui récupère dynamiquement les catégories et les ajoute à un élément de sélection HTML. Elle facilite le choix des catégories lors de l'ajout d'un projet.
 * @property {function} handleImageUpload - Une méthode qui gère le téléchargement d'images dans la fenêtre modale. Elle permet le téléchargement et la prévisualisation des images avant leur soumission.
 * @property {function} backToFirstModal - Une méthode qui permet de revenir à la première fenêtre modale. Elle offre une navigation fluide entre différentes sections de l'interface utilisateur.
 */

// Importations de variables et de fonctions depuis différents fichiers pour le fonctionnement du module.
import { allCategories } from "../utils/constants.js";
import { addWork } from "../utils/api.js";
import { allWorks } from "../utils/constants.js";
import { showWorksInModal, generateWorksInGallery } from "./gallery.js";
import { removeExistingErrors } from "./ui.js";

/**
 * @description Ouvre la première fenêtre modale lorsqu'un utilisateur clique sur l'élément ayant la classe ".open-project-modal".
 * La fonction gère le comportement d'ouverture de la première modale, en ajustant les propriétés CSS nécessaires pour rendre les éléments visibles.
 * En outre, elle masque la deuxième modale (si elle est visible) et appelle la fonction `removeExistingErrors` pour effacer les erreurs existantes.
 * 
 * @function
 * @requires .open-project-modal - L'élément HTML qui, lorsqu'il est cliqué, déclenche l'ouverture de la première fenêtre modale.
 * @requires .modalContainer - L'élément HTML contenant toutes les fenêtres modales.
 * @requires .firstModalLayout - L'élément HTML représentant la première fenêtre modale.
 * @requires .secondModalLayout - L'élément HTML représentant la deuxième fenêtre modale.
 * @requires .overlay - L'élément HTML représentant l'arrière-plan semi-transparent derrière les modales.
 */
export function openModal() {
  // Sélectionne l'élément qui déclenchera l'ouverture de la première modale
  const openProjectModal = document.querySelector(".open-project-modal");

  // Sélectionne les éléments nécessaires pour contrôler l'affichage des modales et de l'overlay
  const modalContainer = document.querySelector(".modalContainer");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const overlay = document.querySelector(".overlay");

  // Définit un écouteur d'événements pour le clic sur "openProjectModal"
  openProjectModal.addEventListener("click", () => {
    // Affiche l'overlay et la première modale
    overlay.style.display = "block";
    modalContainer.style.display = "block";
    firstModalLayout.style.display = "flex";

    // Cache la deuxième modale, si elle est visible
    secondModalLayout.style.display = "none";

    // Appelle la fonction `removeExistingErrors` pour effacer les erreurs existantes
    removeExistingErrors();
  });
}

/**
 * @description Ferme les deux modales dans l'interface utilisateur, en offrant des moyens multiples pour quitter les modales.
 * La fonction met en place les écouteurs d'événements nécessaires pour fermer les modales :
 *   1. En cliquant sur les boutons de fermeture spécifiques dans chaque modale.
 *   2. En cliquant sur l'overlay en dehors des modales.
 * Lors de la fermeture, la fonction assure que tous les éléments nécessaires sont masqués, en restaurant l'état initial de l'interface utilisateur.
 * 
 * @function
 */
export function closeModals() {
  // Sélection des éléments nécessaires pour contrôler la fermeture des modales
  const closeFirstModals = document.querySelectorAll(".closeFirstModal");
  const closeSecondModals = document.querySelectorAll(".closeSecondModal");
  const modalContainer = document.querySelector(".modalContainer");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const overlay = document.querySelector(".overlay");

  // Écouteur d'événements pour fermer la première modale, en cachant tous les éléments connexes
  closeFirstModals.forEach((closeFirstModal) => {
    closeFirstModal.addEventListener("click", () => {
      modalContainer.style.display = "none";
      firstModalLayout.style.display = "none";
      overlay.style.display = "none";
    });
  });

  // Écouteur d'événements pour fermer la deuxième modale, en cachant tous les éléments connexes
  closeSecondModals.forEach((closeSecondModal) => {
    closeSecondModal.addEventListener("click", () => {
      overlay.style.display = "none";
      modalContainer.style.display = "none";
      secondModalLayout.style.display = "none";
    });
  });

  // Écouteur d'événements pour fermer les modales en cliquant sur l'overlay
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    modalContainer.style.display = "none";
    firstModalLayout.style.display = "none";
    secondModalLayout.style.display = "none";
  });
}

/**
 * @description Gère la navigation entre la première et la deuxième modale de l'interface utilisateur, en assurant une transition en douceur entre les différentes étapes du processus d'ajout de travail.
 * Cette fonction met en place les écouteurs d'événements nécessaires pour :
 *   1. Naviguer de la première à la deuxième modale lors de l'ajout d'un travail.
 *   2. Revenir à la première modale à partir de la deuxième en utilisant un bouton de retour.
 *   3. Gérer la logique de réinitialisation nécessaire lors de la navigation entre les modales.
 * La fonction organise l'interaction de l'utilisateur avec les modales, garantissant que l'interface utilisateur réagit de manière intuitive aux actions de l'utilisateur.
 * 
 * @function
 */
export function handleModalRedirection() {
  // Sélectionne les éléments HTML nécessaires pour contrôler la navigation entre les modales
  const addWorkButton = document.querySelector(".addWork");
  const firstModalLayout = document.querySelector(".firstModalLayout");
  const secondModalLayout = document.querySelector(".secondModalLayout");
  const backButton = document.querySelector(".back");

  // Écouteur d'événements pour ouvrir la deuxième modale lorsque l'utilisateur clique sur "Ajouter une photo"
  addWorkButton.addEventListener("click", () => {
    firstModalLayout.style.display = "none";
    secondModalLayout.style.display = "flex";
  });

  // Écouteur d'événements pour revenir à la première modale lors du clic sur le bouton de retour dans la deuxième modale
  backButton.addEventListener("click", () => {
    firstModalLayout.style.display = "flex";
    secondModalLayout.style.display = "none";
    backToFirstModal(); // Appel à la fonction de réinitialisation pour effacer les données du formulaire
  });
}

/**
 * @description Génère et ajoute dynamiquement les options de catégorie à un élément de sélection HTML pour l'ajout de projets.
 * Cette fonction joue un rôle crucial dans l'interface utilisateur en permettant aux utilisateurs de choisir parmi les catégories existantes lors de l'ajout d'un nouveau projet.
 * Elle effectue les actions suivantes :
 *   1. Récupère l'élément 'select' de l'interface utilisateur qui héberge les options de catégorie.
 *   2. Ajoute une option vide en tant que choix par défaut.
 *   3. Parcourt la collection 'allCategories', transformant chaque catégorie en un élément 'option'.
 *   4. Utilise le nom de la catégorie comme texte affiché et l'ID de la catégorie comme valeur de l'élément 'option'.
 *   5. Insère chaque élément 'option' dans l'élément 'select', les rendant disponibles pour la sélection par l'utilisateur.
 * Cette fonction contribue à l'expérience utilisateur dynamique et adaptable en rendant les catégories disponibles pour l'ajout de projets de manière programmatique.
 * 
 * @function
 * @requires allCategories - Un tableau d'objets représentant toutes les catégories, chaque objet doit avoir des propriétés 'id' et 'name'.
 */
export function populateSelectCategory() {
  // Récupère l'élément HTML 'select' avec l'ID 'categorie' qui permettra à l'utilisateur de choisir une catégorie
  const categorySelectElement = document.getElementById("categorySelect");

  // Crée et ajoute une première option vide
  const emptyOptionElement = document.createElement("option");
  emptyOptionElement.textContent = ""; 
  emptyOptionElement.value = ""; 
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
 * @description Gère le téléchargement d'une image dans l'application en exécutant les étapes suivantes:
 *   1. Récupère les éléments HTML nécessaires pour interagir avec l'utilisateur lors du téléchargement et de l'affichage de l'image.
 *   2. Écoute les changements sur l'élément d'entrée de type fichier, déclenchant la sélection d'une image.
 *   3. Valide le type de fichier (PNG/JPG) et la taille (4 Mo maximum), affichant des messages d'erreur si nécessaire.
 *   4. Si les validations réussissent, prévisualise l'image; sinon, affiche des messages d'erreur.
 *   5. Gère l'envoi du formulaire, avec des validations supplémentaires pour le titre et la catégorie, et le traitement des réponses.
 *   6. Met à jour l'interface utilisateur en fonction des résultats, y compris l'ajout d'une nouvelle œuvre et l'affichage de messages de confirmation ou d'erreur.
 * La fonction est robuste et conçue pour offrir une expérience utilisateur cohérente et agréable tout au long du processus de téléchargement de l'image.
 * 
 * @function
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
      message.style.color = "red";
      container.insertBefore(message, container.firstChild);
    }
  });
}

/**
 * @description Réinitialise et revient à la première fenêtre modale dans le flux d'ajout d'image.
 * Cette fonction est utilisée pour remettre à zéro l'interface d'ajout d'image, en cachant l'aperçu de l'image et en réaffichant le conteneur d'ajout d'image initial. Elle supprime également les erreurs existantes, réinitialise le formulaire et révoque l'URL de l'objet d'image.
 * Conçue pour être appelée lorsqu'un utilisateur souhaite recommencer le processus d'ajout d'image depuis le début, cette fonction contribue à une expérience utilisateur fluide et cohérente.
 * 
 * @function
 * @param {string} imageUrl - L'URL de l'objet de l'image à révoquer, permettant la libération des ressources.
 */
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
  
