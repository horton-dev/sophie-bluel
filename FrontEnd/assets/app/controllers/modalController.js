
import { GalleryModalView } from "../views/galleryModalView.js";
import { ModalModel } from "../models/modalModel.js";
import { fetchGallery } from "../utils/GalleryAPI.js";
import { categoriesNewSet } from "../utils/CategoriesAPI.js";

/**
 * Classe pour gérer la logique liée aux modals dans la galerie.
 */
export class ModalController {
  /**
   * Crée une instance du contrôleur pour les modals de la galerie.
   * @param {Object} workGalleryModel - Le modèle associé à la galerie.
   */
  constructor(workGalleryModel) {
    /** @type {GalleryModalView} */
    this.modalView = new GalleryModalView();

    /** @type {ModalModel} */
    this.modalModel = new ModalModel();

      /** @type {Object} */
    this.WorkGalleryModel = workGalleryModel;

    /** @type {Array} */
    this.works = null;

    /** @type {Array} */
    this.workIds = null;
  }
  
  /**
   * Méthode pour initialiser le modal.
   * @async
   */
  async initModal() {
 
    this.works = await fetchGallery();
    this.workIds = this.WorkGalleryModel.getWorks();

    this.modalView.attachOpenModalListener(async () => { 
      this.modalView.openModal();
      this.initializeAndShowWorks();
    });
    
    this.modalView.attachBackToGalleryListener(() => {
      this.modalView.backToGallery();
      this.initializeAndShowWorks();
    });
    
    this.modalView.attachOverlayListener(() => {
      this.modalView.closeModal();
    });

    document.addEventListener('workDeleted', async () => {
      this.works = await fetchGallery();
      this.workIds = this.WorkGalleryModel.getWorks();
      this.initializeAndShowWorks();
    });

    document.addEventListener('workAdded', async () => {
      this.modalView.backToGallery();
      this.works = await fetchGallery();
      this.workIds = this.WorkGalleryModel.getWorks();
      this.initializeAndShowWorks();
    });
  }
  
   /**
   * Initialise et affiche les œuvres dans le modal.
   * @async
   */
  async initializeAndShowWorks() {
    this.modalView.initializeEventListeners();
    this.modalView.showWorks(this.works, this.workIds);
    
    const addPicture = document.getElementById('addPicture');
    const categoriesSet = await categoriesNewSet();
    
    if (addPicture) {
      addPicture.addEventListener('click', () => {
        this.modalView.loadAddPictureModal();
        this.modalView.populateCategories(Array.from(categoriesSet));
        this.modalView.initializeImagePreview();
        this.modalView.initializeForm();
      });
    }  
  }  
}
