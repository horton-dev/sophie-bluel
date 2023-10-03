import { FilterModel } from '../models/FilterModel.js';
import { FilterView } from '../views/FilterView.js';
import { WorkGalleryController } from './WorkGalleryController.js';

export class FilterController {
    constructor() {
      this.model = new FilterModel();
      this.view = new FilterView(document.getElementById('filter-container'));
      this.WorkGalleryController = new WorkGalleryController();
  
      this.initFilter();
    }
  
    async initFilter() {
      await this.model.init();
      this.view.renderCategoryFilters(this.model.categories);
      this.bindEvents();
    }

    bindEvents() {
        // Associe les clics de catégorie au rappel
        this.view.bindCategoryClick(this.handleCategoryFilter.bind(this));
    }

    handleCategoryFilter(category) {
        const filteredWorks = this.model.filterWorksByCategory(category);
        this.view.setActiveCategory(category);
        // Mise à jour de la galerie ici
        this.WorkGalleryController.updateGalleryView(filteredWorks);
  }
}


