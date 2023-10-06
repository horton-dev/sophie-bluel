import { WorkGalleryModel } from '../models/WorkGalleryModel.js';


/**
 * Classe qui gère la vue de la fenêtre modale de la galerie.
 * @class
 */
export class GalleryModalView {
  /**
   * Crée une instance de GalleryModalView.
   * @constructor
   */
  constructor() {
    /**
     * Conteneur de la fenêtre modale.
     * @type {HTMLElement}
     */
    this.modalContainer = document.getElementById('modal-container');

     /**
     * Contenu de la fenêtre modale.
     * @type {HTMLElement}
     */
    this.modalContent = document.getElementById('modal-content');

    /**
     * Overlay de la fenêtre modale.
     * @type {HTMLElement}
     */
    this.overlay = document.getElementById('overlay');

    /**
     * Bouton de retour à la galerie.
     * @type {HTMLElement}
     */
    this.back = document.getElementById('backToFirstModal');

    /**
     * Modèle de galerie de travaux.
     * @type {WorkGalleryModel}
     */
    this.model = new WorkGalleryModel();
    
    if (!this.modalContainer || !this.overlay ) {
      console.warn('Un ou plusieurs éléments du DOM sont introuvables.');
    }
  }

   /**
   * Crée un élément HTML avec les attributs et les enfants spécifiés.
   * @param {string} tag - Le nom de la balise HTML à créer.
   * @param {Object} attributes - Les attributs de l'élément HTML.
   * @param {HTMLElement[]} children - Les éléments enfants à ajouter.
   * @returns {HTMLElement} - L'élément HTML créé.
   */
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
      element[key] = value;
    }
    element.append(...children);
    return element;
  }

  /**
   * Charge le contenu de la fenêtre modale de la galerie.
   * @returns {HTMLElement} - Le contenu de la fenêtre modale.
   */
  loadGalleryModal(){
    const galleryModalTitle = this.createElement('h2', {className: 'modal-title', textContent: 'Gallerie photo'});
    const galleryModalGallery = this.createElement('div', {id: 'modalGallery'});
    const galleryModalSeparator = this.createElement('hr', {className: 'separator'});
    const galleryModalFooter = this.createElement('div', {className: 'modal-footer'});

    const addWork = this.createElement('button', {id: 'addPicture', textContent: 'Ajouter une photo'});
    const deleteGallery = this.createElement('button', {id: 'delete-gallery', textContent: 'Supprimer la galerie'});

    galleryModalFooter.append(addWork, deleteGallery);

    return this.createElement('section', {className: 'modal-gallery'}, [galleryModalTitle, galleryModalGallery, galleryModalSeparator, galleryModalFooter]);
  }

   /**
   * Affiche les œuvres dans la fenêtre modale.
   * @param {Object[]} works - Les données des œuvres à afficher.
   */
  showWorks(works) {
    const modalGallery = document.getElementById('modalGallery');
    let html = '';
    let isFirst = true;
  
    works.forEach(work => {
      html += `
        <figure class="work-item">
          <img src="${work.imageUrl}" alt="${work.title}" />
          <button class="edit-button" data-id="${work.id}">éditer</button>`;
  
      if (isFirst) {
        html += `<i class="fas fa-arrows-alt move-icon"></i>`;
        html += `<i class="fas fa-trash trash-icon"></i>`;
        isFirst = false;
      } else {
        html += `<i class="fas fa-trash trash-icon"></i>`;
      }
  
      html += `</figure>`;
    });
  
    modalGallery.innerHTML = html;
  
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        // Appelez une méthode pour supprimer l'œuvre
      });
    });
  }
  
   /**
   * Charge le contenu de la fenêtre modale pour ajouter une nouvelle image.
   * @returns {HTMLElement} - Le contenu de la fenêtre modale pour ajouter une image.
   */
  loadAddPicture() {
    
    const addPictureTitle = this.createElement('h2', {className: 'modal-title',textContent: 'Ajout photo'});
    const addPictureForm = this.createElement('form', {id: 'modal-form', method: 'post', enctype: 'multipart/form-data', action: '#'});

    const addPictureContainer = this.createElement('div', {id: 'addPictureContainer'});

    const addPictureFileIcon = this.createElement('i', {className: 'fas fa-regular fa-image icon-preview'});

    const addPictureFileLabel = this.createElement('label', {htmlFor: 'file', textContent: '+ Ajouter photo'});
    const addPictureFile = this.createElement('input', {type: 'file', name: 'file', id: 'file', accept: 'image/png, image/jpeg'});
    const addPictureFileInfo = this.createElement('p', {id: 'file-info', textContent: 'jpg, png : 4mo max'});

    const addPicturePreviewContainer = this.createElement('div', {id: 'preview'});
    const addPicturePreview = this.createElement('img', {id: 'image-preview', src: '', alt: ''});

    addPicturePreviewContainer.append(addPicturePreview);
    addPictureContainer.append(addPictureFileIcon, addPictureFileLabel, addPictureFile, addPictureFileInfo, addPicturePreviewContainer);

    const addPictureInputContainer = this.createElement('div', {id: 'addPictureInputContainer'});


    const addPictureTitleInputLabel = this.createElement('label', {htmlFor: 'title', textContent: 'Titre'});
    const addPictureTitleInput = this.createElement('input', {type: 'text', name: 'title', id: 'title'});

    const addPictureCategoryLabel = this.createElement('label', {htmlFor: 'category', textContent: 'Catégorie'});
    const addPictureCategory = this.createElement('select', {name: 'category', id: 'category'});
    const addPictureCategoryOption1 = this.createElement('option', {value: '1', textContent: ""});

    addPictureCategory.append(addPictureCategoryOption1);
    addPictureInputContainer.append(addPictureTitleInputLabel, addPictureTitleInput, addPictureCategoryLabel, addPictureCategory);

    const addPictureFooter = this.createElement('div', {className: 'add-Picture-footer'});
    const addPictureSeparator = this.createElement('hr', {className: 'separator'});
    const addPictureSubmit = this.createElement('button', {id: 'addPictureSubmit', textContent: 'Valider'});

    addPictureFooter.append(addPictureSeparator, addPictureSubmit);

    addPictureForm.append(addPictureContainer,addPictureInputContainer, addPictureFooter);

    return this.createElement('section', {className: 'modal-addPicture'}, [addPictureTitle, addPictureForm]);
  }

  /**
   * Ouvre la fenêtre modale.
   */
  openModal() {
    if (this.modalContainer) {
      this.overlay.style.visibility = 'visible';
      this.modalContainer.style.visibility = 'visible';
      this.back.style.visibility = 'hidden';
      this.modalContent.append(this.loadGalleryModal());
    }
  }

  /**
   * Revient à la galerie dans la fenêtre modale.
   */
  backToGallery() {
    if (this.modalContainer) {
      this.modalContent.innerHTML = '';
      this.modalContent.append(this.loadGalleryModal());
      this.back.style.visibility = 'hidden';
    }
  }

  /**
   * Charge la fenêtre modale pour ajouter une image.
   */
  loadAddPictureModal() {
    if (this.modalContainer) {
      this.modalContent.innerHTML = '';
      this.modalContent.append(this.loadAddPicture());
      this.back.style.visibility = 'visible';
    }
  }

  /**
   * Ferme la fenêtre modale.
   */
  closeModal() {
    if (this.modalContainer) {
      this.modalContainer.style.visibility = 'hidden';
      this.back.style.visibility = 'hidden';
      this.modalContent.innerHTML = '';
      this.overlay.style.visibility = 'hidden';

    }
  }

  /**
   * Attache un écouteur d'événement pour ouvrir la fenêtre modale.
   * @param {Function} callback - La fonction de rappel à exécuter lors de l'ouverture de la fenêtre modale.
   */
  attachOpenModalListener(callback) {
    const openModal = document.getElementById('openModal');
    if (openModal) {
      openModal.addEventListener('click', callback);
    }
  }

   /**
   * Attache un écouteur d'événement pour revenir à la galerie dans la fenêtre modale.
   * @param {Function} callback - La fonction de rappel à exécuter lors du retour à la galerie.
   */
  attachBackToGalleryListener(callback) {
    const backToGallery = document.getElementById('backToFirstModal');
    if (backToGallery) {
      backToGallery.addEventListener('click', callback);
    }
  }

  /**
   * Attache un écouteur d'événement pour fermer la fenêtre modale en cliquant sur l'overlay.
   * @param {Function} callback - La fonction de rappel à exécuter lors de la fermeture de la fenêtre modale.
   */
  attachOverlayListener(callback) {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.addEventListener('click', callback);
    }
  }

  /**
   * Initialise les écouteurs d'événements pour les boutons d'ajout, de fermeture et de suppression.
   */
  initializeEventListeners() {
    /**
     * Bouton pour ajouter une image.
     * @type {HTMLElement}
     */
    const addPicture = document.getElementById('addPicture');
    
    /**
     * Bouton pour fermer la fenêtre modale.
     * @type {HTMLElement}
     */
    const closeModal = document.getElementById('closeModal');
    
    /**
     * Bouton pour supprimer la galerie.
     * @type {HTMLElement}
     */
    const deleteGallery = document.getElementById('delete-gallery');

    if (addPicture) {
      addPicture.addEventListener('click', () => {
        this.loadAddPictureModal();
      });
    }

    if (closeModal) {
      closeModal.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (deleteGallery) {
      deleteGallery.addEventListener('click', () => {
        this.deleteGallery();
      });
    }
  }


   /**
   * Remplit la liste déroulante des catégories avec les catégories fournies.
   * @param {Object[]} categoriesArray - Un tableau d'objets représentant les catégories.
   */
  populateCategories(categoriesArray) {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      categoriesArray.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    } else {
      console.warn("Élément <select> pour les catégories non trouvé.");
    }
  }

  /**
   * Initialise la prévisualisation de l'image lors de la sélection d'un fichier.
   */
  initializeImagePreview() {
    const fileInput = document.getElementById('file');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview');
    const addPictureSubmit = document.getElementById('addPictureSubmit');
    
    if (fileInput && imagePreview) {
      fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
  
        const reader = new FileReader();
  
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
        // Cache tous les éléments enfants de addPictureContainer
        Array.from(addPictureContainer.children).forEach(child => {
          child.style.display = 'none';
        });

        // Affiche uniquement l'image de prévisualisation
        previewContainer.style.display = 'block';
        addPictureSubmit.style.background = '#1D6154';
      };
  
        reader.readAsDataURL(file);
      });
    }
  } 
}