import { WorkGalleryModel } from '../models/WorkGalleryModel.js';
import { WorkGalleryView } from '../views/WorkGalleryView.js';
import { fetchGallery } from '../utils/GalleryAPI.js'; // Import de la fonction fetchGallery

// Cette classe coordonne le modèle et la vue
export class WorkGalleryController {
  constructor(workGalleryModel) {
    this.model = workGalleryModel;
    this.view = new WorkGalleryView();
  }
  

  // Méthode pour initialiser la galerie
  async initGallery() {
    // Récupération des données depuis l'API
    const works = await fetchGallery();


    // Mise à jour de la vue et du modèle avec les données récupérées
    this.updateGalleryView(works);
  }

  // Méthode pour mettre à jour la vue de la galerie
  updateGalleryView(works) {
    this.model.clearWorks();
    this.view.renderGallery(works);
    works.forEach(work => {
      this.model.addWork(work);
    });
  }
}
