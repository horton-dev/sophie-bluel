import { UserDashboardView } from '../views/UserDashboardView.js';

/**
 * Classe UserDashboardController pour gérer le tableau de bord utilisateur.
 */
export class UserDashboardController {
  /**
   * Construit une nouvelle instance de UserDashboardController et l'initialise.
   */
  constructor() {
    /** @type {UserDashboardView} */
    this.view = new UserDashboardView();
  }

  /**
   * Initialise les éléments du tableau de bord utilisateur.
   */
  init() {
    // Créer les boutons
    /** @type {HTMLElement} */
    const editButton = this.view.createButtonWithIcon('modifyButton', 'Mode édition', 'fa-edit');

    /** @type {HTMLElement} */
    const publishButton = this.view.createPublishButton();

    // Créer la div qui contiendra les boutons
    /** @type {HTMLElement} */
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container');

    // Ajouter les boutons à la div
    buttonDiv.append(editButton);
    buttonDiv.append(publishButton);

    // Ajouter la div au header
    /** @type {HTMLElement|null} */
    const header = document.getElementById('userDashboard-container');

    /** @type {HTMLElement|null} */
    const headerContainer = document.getElementById('header-container');
    
    if (header) {
      header.append(buttonDiv);
      headerContainer.style.marginTop = '100px';
    } else {
      console.warn('Élément <header> non trouvé dans le DOM.');
    }

    // Ajouter les autre buttons au Dom
    /** @type {HTMLElement|null} */
    const intro = document.getElementById('introFigure');
    
    /** @type {HTMLElement} */
    const modifyButtonIntro = this.view.createButtonWithIcon('modifyButtonIntro', 'Modifier', 'fa-edit');

    intro.append(modifyButtonIntro);

    /** @type {HTMLElement|null} */
    const titleGallery = document.getElementById('titleGallery');

    /** @type {HTMLElement} */
    const modifyButtonTitle = this.view.createButtonWithIcon('openModal', 'Modifier', 'fa-edit');

    titleGallery.append(modifyButtonTitle);
  }
}
