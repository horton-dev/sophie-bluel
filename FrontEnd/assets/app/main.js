import { loadHeaderFooter } from './services/layoutService.js';
import { WorkGalleryController } from './controllers/WorkGalleryController.js';
import { FilterController } from './controllers/FilterController.js';
import { ACCESS_TOKEN } from './core/constants.js';
import { UserDashboardController } from './controllers/UserDashboardController.js';
import { ModalController } from './controllers/modalController.js';
import { WorkGalleryModel } from './models/WorkGalleryModel.js';

const workGalleryModel = new WorkGalleryModel();
const workGalleryController = new WorkGalleryController(workGalleryModel); // supposant que vous avez ajusté le constructeur
const modalController = new ModalController(workGalleryModel); // injectez le même modèle ici

async function initializeApplication() {
  try {
    // Charge les textes
    // ...

    // Charge le header et le footer
    loadHeaderFooter();

    // Initialise la galerie
    await workGalleryController.initGallery();
    // console.log("WorkGalleryModel after initGallery:", workGalleryModel);
    

    if (ACCESS_TOKEN) {
      const dashboardController = new UserDashboardController();
      dashboardController.init();
      modalController.initModal(); // Utilisez cette instance qui a le modèle injecté
    } else {
      const filterController = new FilterController();
      filterController.initFilter();
    }
    // console.log("WorkGalleryModel after initModal:", workGalleryModel);

  } catch (error) {
    console.error(`Erreur lors de l'initialisation et du chargement des projets: ${error}`);
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', initializeApplication);
