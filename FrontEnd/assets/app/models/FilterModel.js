import { fetchGallery } from '../utils/GalleryAPI.js';
import { fetchCategories } from '../utils/CategoriesAPI.js';
import { getMessage } from '../locales/languageLoader.js';

/**
 * Classe qui gère le modèle du filtre.
 * @class
 */
export class FilterModel {
  /**
   * Crée une instance de FilterModel.
   * @constructor
   */
  constructor() {
     /**
     * Tableau contenant toutes les œuvres.
     * @type {Object[]}
     */
    this.allWorks = [];

    /**
     * Tableau contenant toutes les catégories.
     * @type {string[]}
     */
    this.categories = [];
  }

   /**
   * Initialise les données du modèle en récupérant les œuvres et les catégories.
   * @async
   * @function
   */
  async init() {
    const rawWorks = await fetchGallery();
    this.allWorks = Array.from(new Set(rawWorks)); // Élimine les doublons une fois
    const rawCategories = await fetchCategories(); 
    this.categories = Array.from(new Set(rawCategories));
  }

   /**
   * Filtre les œuvres en fonction de la catégorie spécifiée.
   * @function
   * @param {string} category - La catégorie à utiliser pour le filtrage.
   * @returns {Object[]} - Un tableau contenant les œuvres filtrées.
   */
  filterWorksByCategory(category) {
    return category === getMessage("categories.all") 
      ? this.allWorks 
      : this.allWorks.filter(item => item.category.name === category);
  }
}
