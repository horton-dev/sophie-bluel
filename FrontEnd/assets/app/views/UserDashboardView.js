/**
 * Classe qui gère la vue du tableau de bord de l'utilisateur.
 * @class
 */
export class UserDashboardView {
  
  /**
   * Crée un bouton avec une icône FontAwesome.
   * @param {string} buttonId - L'identifiant du bouton.
   * @param {string} buttonText - Le texte du bouton.
   * @param {string} iconName - Le nom de l'icône FontAwesome à utiliser.
   * @returns {HTMLButtonElement} - Le bouton créé avec l'icône et le texte.
   */
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
  
  /**
   * Crée un bouton de publication.
   * @returns {HTMLButtonElement} - Le bouton de publication.
   */
  createPublishButton() {
    const publishButton = document.createElement('button');
    publishButton.classList.add('publish-button');
    publishButton.innerText = 'publier les changements';
    return publishButton;
  }
}
