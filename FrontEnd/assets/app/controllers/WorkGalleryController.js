import { WorkGalleryModel } from '../models/WorkGalleryModel.js';
import { WorkGalleryView } from '../views/WorkGalleryView.js';
import { fetchGallery } from '../utils/GalleryAPI.js';
import { apiFetch } from '../utils/apiService.js';
import { ACCESS_TOKEN } from '../core/constants.js';

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

    document.addEventListener('workAdded', async () => {
      await this.initGallery();
    });
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
    console.log("Données reçues pour mettre à jour la vue :", works);
    /** @type {WorkGalleryModel} */
    const newModel = new WorkGalleryModel(); // Création d'un nouveau modèle

    works.forEach(work => {
      newModel.addWork(work); // Ajout des œuvres au nouveau modèle
    });
    
    this.model = newModel; // Mise à jour de la référence du modèle
    this.view.renderGallery(works); // Mise à jour de la vue
  }

  async deleteWork(id) {
    try {
      const response = await apiFetch(`works/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      });
      console.log(response);
  
      if (response === null) {
        console.log("Suppression réussie.");
        // Mettre à jour le modèle
        this.model.removeWork({id: id});
        console.log("Modèle mis à jour.");
  
        await this.initGallery();
        console.log("Vue mise à jour.");

        document.dispatchEvent(new Event('workDeleted'));
        
  
        return true;
      } else {
        console.log(`Erreur lors de la suppression du travail avec l'ID ${id}`);
        return false;
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression du travail avec l'ID ${id}: ${error}`);
      return false;
    }
  }
  
  
}
