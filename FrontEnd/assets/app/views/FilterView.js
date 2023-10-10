import { getMessage } from '../locales/languageLoader.js';

/**
 * Classe qui gère la vue des filtres de catégories.
 * @class
 */
export class FilterView {
    /**
   * Crée une instance de FilterView.
   * @constructor
   * @param {HTMLElement} filterContainer - L'élément conteneur des filtres.
   */
    constructor(filterContainer) {
        /**
     * Conteneur des filtres.
     * @type {HTMLElement}
     */
      this.filterContainer = filterContainer;
    }

    /**
   * Crée un bouton de catégorie.
   * @param {string} category - Le nom de la catégorie.
   * @returns {HTMLButtonElement} - Le bouton de catégorie créé.
   */
    createCategoryButton(category) {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-button');  // Classe pour le style
        button.dataset.category = category;  // Pour identifier la catégorie lors des interactions
    
        // Active le bouton "Tous" par défaut
        if (category === getMessage("categories.all")) {
            button.id = 'all';
            button.classList.add('active');
        }
    
        button.addEventListener('click', function() {
            document.dispatchEvent(new CustomEvent('filterChanged', { detail: category }));
        });
    
        return button;
    }

    /**
   * Attache un écouteur d'événement pour le clic sur les boutons de catégorie.
   * @param {Function} callback - La fonction de rappel à exécuter lors du clic sur un bouton de catégorie.
   */
    bindCategoryClick(callback) {
        filterContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('category-button')) {
                const selectedCategory = event.target.dataset.category;
                callback(selectedCategory);
            }
        });
    }
  
    /**
   * Affiche les filtres de catégories.
   * @param {string[]} categories - Les noms des catégories à afficher.
   */
    renderCategoryFilters(categories) {
      // Supprimer les boutons précédents
        filterContainer.innerHTML = '';

    // Ajoute le bouton "Tous"
        const allButton = this.createCategoryButton(getMessage("categories.all"));
        filterContainer.append(allButton);

    // Ajoute des boutons pour chaque catégorie
        categories.forEach(category => {
            const button = this.createCategoryButton(category.name);
            filterContainer.append(button);
        });
    }
  
    /**
   * Définit la catégorie active en mettant en surbrillance le bouton correspondant.
   * @param {string} category - Le nom de la catégorie active.
   */
    setActiveCategory(category) {
      const buttons = filterContainer.querySelectorAll('.category-button');
        buttons.forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
  }
  
/**
 * Élément conteneur des filtres de catégories.
 * @type {HTMLElement}
 */
const filterContainer = document.getElementById('filter-container');

