import { UserDashboardView } from '../views/UserDashboardView.js';

export class UserDashboardController {
  constructor() {
    this.view = new UserDashboardView();
  }

  init() {
    // Créer les boutons
    const editButton = this.view.createEditButton('modifyButton', 'Mode édition');
    const publishButton = this.view.createPublishButton();

    // Créer la div qui contiendra les boutons
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container');

    // Ajouter les boutons à la div
    buttonDiv.append(editButton);
    buttonDiv.append(publishButton);

    // Ajouter la div au header
    const header = document.getElementById('userDashboard-container');
    const headerContainer = document.getElementById('header-container');
    
    if (header) {
      header.append(buttonDiv);
      headerContainer.style.marginTop = '100px';
    } else {
      console.warn('Élément <header> non trouvé dans le DOM.');
    }

    // Ajouter les autre buttons au Dom
    const intro = document.getElementById('introFigure');
    const modifyButtonIntro = this.view.createEditButton('modifyButtonIntro', 'Modifier');
    intro.append(modifyButtonIntro);

    const titleGallery = document.getElementById('titleGallery');
    const modifyButtonTitle = this.view.createEditButton('openModal', 'Modifier');

    titleGallery.append(modifyButtonTitle);
  }
}
