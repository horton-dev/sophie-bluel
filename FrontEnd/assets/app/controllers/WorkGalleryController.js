import { WorkGalleryModel } from '../models/WorkGalleryModel.js';
import { WorkGalleryView } from '../views/WorkGalleryView.js';
import { fetchGallery } from '../utils/GalleryAPI.js';

/**
 * Classe WorkGalleryController pour coordonner le modèle et la vue de la galerie.
 */
export class WorkGalleryController {
  /**
   * Construit une nouvelle instance de WorkGalleryController.
   * @param {WorkGalleryModel} workGalleryModel - Le modèle de la galerie de travaux.
   */
  constructor(workGalleryModel) {
    /** @type {WorkGalleryModel} */
    this.model = workGalleryModel;

    /** @type {WorkGalleryView} */
    this.view = new WorkGalleryView();
  }
  
  /**
   * Méthode asynchrone pour initialiser la galerie.
   * @async
   */
  async initGallery() {
    // Récupération des données depuis l'API
    const works = await fetchGallery();


    // Mise à jour de la vue et du modèle avec les données récupérées
    this.updateGalleryView(works);
  }

  /**
   * Méthode pour mettre à jour la vue de la galerie.
   * @param {Array} works - Le tableau des œuvres à afficher.
   */
  updateGalleryView(works) {
    /** @type {WorkGalleryModel} */
    const newModel = new WorkGalleryModel(); // Création d'un nouveau modèle

    works.forEach(work => {
      newModel.addWork(work); // Ajout des œuvres au nouveau modèle
    });
    
    this.model = newModel; // Mise à jour de la référence du modèle
    this.view.renderGallery(works); // Mise à jour de la vue
  }
}
