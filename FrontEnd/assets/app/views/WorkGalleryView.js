/**
 * Classe qui gère la vue de la galerie d'œuvres.
 * @class
 */
export class WorkGalleryView {
  /**
   * Crée une instance de WorkGalleryView.
   * @constructor
   */
  constructor() {
    /**
     * Élément DOM qui contient la galerie.
     * @type {HTMLElement}
     */
    this.galleryElement = document.querySelector('.gallery');
  }

  /**
   * Crée un élément DOM pour une œuvre.
   * @param {Object} work - Les données de l'œuvre.
   * @param {number} work.id - L'identifiant de l'œuvre.
   * @param {string} work.imageUrl - L'URL de l'image de l'œuvre.
   * @param {string} work.title - Le titre de l'œuvre.
   * @returns {HTMLElement} - L'élément DOM représentant l'œuvre.
   */
  createWorkElement(work) {
    // Crée une nouvelle balise <figure>
    const workElement = document.createElement('figure');
    workElement.dataset.id = work.id;

    // Crée une balise <img> pour l'image
    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    workElement.append(imageElement);

    // Crée une balise <figcaption> pour le titre
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;
    workElement.append(caption);

    return workElement;
  }

  /**
   * Vide la galerie en supprimant tous les éléments enfants.
   */
  clearGallery() {
    this.galleryElement.innerHTML = '';
  }

  /**
   * Affiche toutes les œuvres dans la galerie.
   * @param {Object[]} works - Un tableau d'objets représentant les œuvres.
   */
  renderGallery(works) {
    this.clearGallery();
    works.forEach(work => {
      const workElement = this.createWorkElement(work);
      this.galleryElement.append(workElement);
    });
  }
}
