// Cette classe sert à gérer la vue de la galerie
export class WorkGalleryView {
  constructor() {
    // On accède à l'élément DOM qui contiendra la galerie
    this.galleryElement = document.querySelector('.gallery');
  }

  // Cette méthode crée un élément DOM pour une œuvre
  createWorkElement(work) {
    // On crée une nouvelle balise <figure>
    const workElement = document.createElement('figure');
    workElement.dataset.id = work.id;

    // On crée une balise <img> pour l'image
    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    workElement.append(imageElement);

    // On crée une balise <figcaption> pour le titre
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;
    workElement.append(caption);

    return workElement;
  }

  // Cette méthode vide la galerie
  clearGallery() {
    this.galleryElement.innerHTML = '';
  }

  // Cette méthode affiche toutes les œuvres dans la galerie
  renderGallery(works) {
    this.clearGallery();
    works.forEach(work => {
      const workElement = this.createWorkElement(work);
      this.galleryElement.append(workElement);
    });
  }
}
