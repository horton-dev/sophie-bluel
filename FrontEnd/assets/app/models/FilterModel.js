import { fetchGallery } from '../utils/GalleryAPI.js';
import { fetchCategories } from '../utils/CategoriesAPI.js';

export class FilterModel {
  constructor() {
    this.allWorks = [];
    this.categories = [];
  }

  async init() {
    const rawWorks = await fetchGallery();
    this.allWorks = Array.from(new Set(rawWorks)); // Élimine les doublons une fois
    const rawCategories = await fetchCategories(); 
    this.categories = Array.from(new Set(rawCategories)); // Élimine les doublons une fois 
  }
  filterWorksByCategory(category) {
    return category === 'tous' 
      ? this.allWorks 
      : this.allWorks.filter(item => item.category.name === category);
  }
}
