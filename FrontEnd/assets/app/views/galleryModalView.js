import { WorkGalleryModel } from '../models/WorkGalleryModel.js';



export class GalleryModalView {
  constructor() {
    this.modalContainer = document.getElementById('modal-container');
    this.modalContent = document.getElementById('modal-content');
    this.overlay = document.getElementById('overlay');
    this.back = document.getElementById('backToFirstModal');
    this.model = new WorkGalleryModel();
    
    if (!this.modalContainer || !this.overlay ) {
      console.warn('Un ou plusieurs éléments du DOM sont introuvables.');
    }
  }

  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
      element[key] = value;
    }
    element.append(...children);
    return element;
  }

  loadGalleryModal(){
    const galleryModalTitle = this.createElement('h2', {textContent: 'Gallerie photo'});
    const galleryModalGallery = this.createElement('div', {id: 'modalGallery'});
    const galleryModalSeparator = this.createElement('hr', {className: 'separator'});
    const galleryModalFooter = this.createElement('div', {className: 'modal-footer'});

    const addWork = this.createElement('button', {id: 'addPicture', textContent: 'Ajouter une photo'});
    const deleteGallery = this.createElement('a', {id: 'delete-gallery', textContent: 'Supprimer la galerie'});

    galleryModalFooter.append(addWork, deleteGallery);

    return this.createElement('section', {className: 'modal-gallery'}, [galleryModalTitle, galleryModalGallery, galleryModalSeparator, galleryModalFooter]);
  }

  createWorkElementModal(work) {
    const workElement = this.createElement('figure', {className: 'modal-work'});
    workElement.dataset.id = work.id;

    const imageElement = this.createElement('img', {src: work.imageUrl, alt: work.title});

    const caption = this.createElement('figcaption', {textContent: "éditer"});

    workElement.append(imageElement, caption);

    return workElement;
  }

  showWorks(works) {
    const modalGallery = document.getElementById('modalGallery');
    let html = '';
  
    works.forEach(work => {
      html += `
        <figure class="work-item">
          <img src="${work.imageUrl}" alt="${work.title}" />
          <button class="delete-button" data-id="${work.id}">Supprimer</button>
        </figure>`;
    });
  
    modalGallery.innerHTML = html;
  
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        // Appelez une méthode pour supprimer l'œuvre
      });
    });
  }
  



  loadAddPicture() {
    
    const addPictureTitle = this.createElement('h2', {textContent: 'Ajout photo'});
    const addPictureForm = this.createElement('form', {id: 'modal-form', method: 'post', enctype: 'multipart/form-data', action: '#'});

    const addPictureFileLabel = this.createElement('label', {for: 'file', textContent: '+ Photo'});
    const addPictureFile = this.createElement('input', {type: 'file', name: 'file', id: 'file', accept: 'image/png, image/jpeg'});

    const addPicturePreviexContainer = this.createElement('div', {id: 'preview'});
    const addPicturePreview = this.createElement('img', {id: 'image-preview', src: '', alt: ''});

    addPicturePreviexContainer.append(addPicturePreview);

    const addPictureTitleInputLabel = this.createElement('label', {for: 'title', textContent: 'Titre'});
    const addPictureTitleInput = this.createElement('input', {type: 'text', name: 'title', id: 'title'});

    const addPictureCategoryLabel = this.createElement('label', {for: 'category', textContent: 'Catégorie'});
    const addPictureCategory = this.createElement('select', {name: 'category', id: 'category'});
    const addPictureCategoryOption1 = this.createElement('option', {value: '1', textContent: ""});

    addPictureCategory.append(addPictureCategoryOption1);

    const addPictureSeparator = this.createElement('hr', {className: 'separator'});
    const addPictureSubmit = this.createElement('button', {id: 'submit', textContent: 'Ajouter'});

    addPictureForm.append(addPictureFileLabel, addPictureFile, addPicturePreviexContainer, addPictureTitleInputLabel, addPictureTitleInput, addPictureCategoryLabel, addPictureCategory, addPictureSeparator, addPictureSubmit);

    return this.createElement('section', {className: 'modal-addPicture'}, [addPictureTitle, addPictureForm]);
  }

  openModal() {
    if (this.modalContainer) {
      this.overlay.style.visibility = 'visible';
      this.modalContainer.style.visibility = 'visible';
      this.back.style.visibility = 'hidden';
      this.modalContent.append(this.loadGalleryModal());
    }
  }

  backToGallery() {
    if (this.modalContainer) {
      this.modalContent.innerHTML = '';
      this.modalContent.append(this.loadGalleryModal());
      this.back.style.visibility = 'hidden';
    }
  }

  loadAddPictureModal() {
    if (this.modalContainer) {
      this.modalContent.innerHTML = '';
      this.modalContent.append(this.loadAddPicture());
      this.back.style.visibility = 'visible';
    }
  }

  closeModal() {
    if (this.modalContainer) {
      this.modalContainer.style.visibility = 'hidden';
      this.modalContent.innerHTML = '';
      this.overlay.style.visibility = 'hidden';

    }
  }

  initializeEventListeners() {
    const addPicture = document.getElementById('addPicture');
    const closeModal = document.getElementById('closeModal');
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
}