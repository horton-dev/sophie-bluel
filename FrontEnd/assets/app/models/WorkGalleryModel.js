/**
 * Classe qui gère les données de la galerie d'œuvres.
 * @class
 */
export class WorkGalleryModel {
   /**
   * Crée une instance de WorkGalleryModel.
   * @constructor
   */
  constructor() {
    /**
     * Ensemble (Set) contenant les identifiants des œuvres dans la galerie.
     * @type {Set<number>}
     */
    this.worksSet = new Set();
  }

  /**
   * Ajoute une œuvre à la galerie en utilisant son identifiant.
   * @param {Object} work - L'objet représentant l'œuvre à ajouter.
   */
  addWork(work) {
    this.worksSet.add(work.id);
  }

  /**
   * Retire une œuvre de la galerie en utilisant son identifiant.
   * @param {Object} work - L'objet représentant l'œuvre à retirer.
   */
  removeWork(work) {
    this.worksSet.delete(work.id);
  }

  /**
   * Renvoie un tableau contenant les identifiants des œuvres de la galerie.
   * @returns {number[]} - Un tableau contenant les identifiants des œuvres.
   */
  getWorks() {
    return Array.from(this.worksSet);
  }

  /**
   * Vide la galerie en supprimant toutes les œuvres.
   */
  clearWorks() {
    this.worksSet.clear();
  }
}
