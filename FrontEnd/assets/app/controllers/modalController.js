import { GalleryModalView } from "../views/galleryModalView.js";
import { ModalModel } from "../models/modalModel.js";
import { fetchGallery } from "../utils/GalleryAPI.js";

export class ModalController {
  constructor(workGalleryModel) {
    this.modalView = new GalleryModalView();
    this.modalModel = new ModalModel();
    this.WorkGalleryModel = workGalleryModel;
  }
  
  async initModal() {
    const overlay = document.getElementById('overlay');
    const modalContent = document.getElementById('modal-content');
    const openModal = document.getElementById('openModal');
    const backToGallery = document.getElementById('backToFirstModal');
    // Modification ici
    const works = await fetchGallery();
    const workIds = this.WorkGalleryModel.getWorks();
    
    if (openModal && modalContent) { 
      openModal.addEventListener('click', async () => { 
        this.modalView.openModal();
        this.modalView.initializeEventListeners();
        this.modalView.showWorks(works, workIds);
      });
    }
    if (backToGallery) {
      backToGallery.addEventListener('click', () => {
        this.modalView.backToGallery();
        this.modalView.initializeEventListeners();
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.modalView.closeModal();
      });
    }
  }

  showWorkInModal() {
    const workID = this.WorkGalleryModel.getWorks();
    this.modalView.showWork(workID);
  }
}
