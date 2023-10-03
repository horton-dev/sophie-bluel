export class UserDashboardView {
  
  createEditButton(buttonId, buttonText) {
    const editButton = document.createElement('button');
    editButton.innerText = buttonText;
    editButton.id = buttonId;
    return editButton;
  }
  
  createPublishButton() {
    const publishButton = document.createElement('button');
    publishButton.classList.add('publish-button');
    publishButton.innerText = 'Publier';
    return publishButton;
  }

}
