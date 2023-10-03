export class ModalModel {
  constructor() {
    this.currentModal = null; // Pour suivre quelle modal est actuellement ouverte
  }

  setCurrentModal(modalId) {
    this.currentModal = modalId;
  }

  clearCurrentModal() {
    this.currentModal = null;
  }

}
