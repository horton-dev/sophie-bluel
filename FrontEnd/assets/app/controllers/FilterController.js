import { FilterModel } from '../models/FilterModel.js';
import { FilterView } from '../views/FilterView.js';
import { WorkGalleryController } from './WorkGalleryController.js';

/**
 * Classe FilterController pour gérer les filtres.
 */
export class FilterController {
    /**
     * Construit une nouvelle instance de FilterController et l'initialise.
     */
    constructor() {
      /** @type {FilterModel} */
      this.model = new FilterModel();

       /** @type {FilterView} */
      this.view = new FilterView(document.getElementById('filter-container'));

      /** @type {WorkGalleryController} */
      this.WorkGalleryController = new WorkGalleryController();
  
      this.initFilter();
    }
  
    /**
     * Initialise le filtre.
     * @async
     */
    async initFilter() {
      await this.model.init();
      this.view.renderCategoryFilters(this.model.categories);
      this.bindEvents();
    }

    /**
     * Lie les événements aux éléments de l'interface utilisateur.
     */
    bindEvents() {
        // Associe les clics de catégorie au rappel
        this.view.bindCategoryClick(this.handleCategoryFilter.bind(this));
    }

    /**
     * Gère le filtrage par catégorie.
     * @param {string} category - La catégorie à filtrer.
     */
    handleCategoryFilter(category) {
        const filteredWorks = this.model.filterWorksByCategory(category);
        this.view.setActiveCategory(category);
        this.WorkGalleryController.updateGalleryView(filteredWorks);
  }
}


