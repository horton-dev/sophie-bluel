// Cette classe sert à gérer les données de la galerie d'œuvres
export class WorkGalleryModel {
  constructor() {
    // Utilisation d'un Set pour stocker les identifiants des œuvres
    this.worksSet = new Set();
  }

  // Ajoute une œuvre à la galerie en utilisant son identifiant
  addWork(work) {
    this.worksSet.add(work.id);
  }

  // Retire une œuvre de la galerie en utilisant son identifiant
  removeWork(work) {
    this.worksSet.delete(work.id);
  }

  // Renvoie un tableau contenant les identifiants des œuvres de la galerie
  getWorks() {
    return Array.from(this.worksSet);
  }

  // Vide la galerie
  clearWorks() {
    this.worksSet.clear();
  }
}
