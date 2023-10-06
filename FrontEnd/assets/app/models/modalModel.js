/**
 * Classe qui gère le modèle des modales.
 * @class
 */
export class ModalModel {
  /**
   * Crée une instance de ModalModel.
   * @constructor
   */
  constructor() {
    /**
     * Identifiant de la modal actuellement ouverte.
     * @type {string|null}
     */
    this.currentModal = null; 
  }

   /**
   * Définit l'identifiant de la modal actuellement ouverte.
   * @param {string} modalId - L'identifiant de la modal à définir comme actuelle.
   */
  setCurrentModal(modalId) {
    this.currentModal = modalId;
  }

  /**
   * Efface l'identifiant de la modal actuellement ouverte.
   */
  clearCurrentModal() {
    this.currentModal = null;
  }
}
