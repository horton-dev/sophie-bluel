export class FilterView {
    constructor(filterContainer) {
      this.filterContainer = filterContainer;
    }

    createCategoryButton(category) {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-button');  // Classe pour le style
        button.dataset.category = category;  // Pour identifier la catégorie lors des interactions
    
        // Active le bouton "Tous" par défaut
        if (category === 'tous') {
            button.id = 'all';
            button.classList.add('active');
        }
    
        button.addEventListener('click', function() {
            document.dispatchEvent(new CustomEvent('filterChanged', { detail: category }));
        });
    
        return button;
    }

    bindCategoryClick(callback) {
        filterContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('category-button')) {
                const selectedCategory = event.target.dataset.category;
                callback(selectedCategory);
            }
        });
    }
  
    renderCategoryFilters(categories) {
      // Supprimer les boutons précédents
        filterContainer.innerHTML = '';

    // Ajoute le bouton "Tous"
        const allButton = this.createCategoryButton("tous");
        filterContainer.append(allButton);

    // Ajoute des boutons pour chaque catégorie
        categories.forEach(category => {
            const button = this.createCategoryButton(category.name);
            filterContainer.append(button);
        });
    }
  
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
  

const filterContainer = document.getElementById('filter-container');

