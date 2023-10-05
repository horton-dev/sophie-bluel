import { GalleryModalView } from "../views/galleryModalView.js";
import { ModalModel } from "../models/modalModel.js";
import { fetchGallery } from "../utils/GalleryAPI.js";
import { categoriesNewSet } from "../utils/CategoriesAPI.js";

export class ModalController {
  constructor(workGalleryModel) {
    this.modalView = new GalleryModalView();
    this.modalModel = new ModalModel();
    this.WorkGalleryModel = workGalleryModel;
    this.works = null;
    this.workIds = null;
  }
  
  async initModal() {

    // const categoriesSet = await categoriesNewSet();
    // this.modalView.populateCategories(Array.from(categoriesSet));
 
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

  }
  
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
      });
    }  
  }
}
