export class UserDashboardView {
  
  createButtonWithIcon(buttonId, buttonText, iconName) {
    // Créer le bouton
    const button = document.createElement('button');
    
    // Créer l'élément <i> pour l'icône FontAwesome
    const icon = document.createElement('i');
    icon.classList.add('fas', iconName); // Utilise le nom de l'icône passé en paramètre
    
    // Ajouter l'icône et le texte au bouton
    button.appendChild(icon); // Ajoute l'icône en premier
    button.appendChild(document.createTextNode(' ' + buttonText)); // Ensuite le texte
    
    // Configurer l'ID du bouton
    button.id = buttonId;
  
    // Retourner le bouton
    return button;
  }
  
  
  
  createPublishButton() {
    const publishButton = document.createElement('button');
    publishButton.classList.add('publish-button');
    publishButton.innerText = 'publier les changements';
    return publishButton;
  }

}
