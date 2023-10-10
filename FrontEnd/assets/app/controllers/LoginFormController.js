import { LoginFormView } from '../views/LoginFormView.js';
import { LoginFormModel } from '../models/LoginFormModel.js';

/**
 * Fonction asynchrone d'initialisation de la connexion.
 * @async
 */
export async function initLogin() {
  /** @type {HTMLElement} */
  const loginForm = document.getElementById('login-form');

   /** @type {LoginFormModel} */
  const loginFormModel = new LoginFormModel();

  /** @type {LoginFormView} */
  const loginFormView = new LoginFormView();
  
  // Ajout d'un gestionnaire d'événements pour le formulaire de connexion
  loginForm.addEventListener('submit', async (event) => {
    // Empêche le comportement par défaut du formulaire
    event.preventDefault();
    
    /** @type {string} */
    const email = document.getElementById('email').value.trim();

     /** @type {string} */
    const password = document.getElementById('current-password').value;

    /** @type {boolean} */
    const emailValidity = loginFormModel.emailValidityCheck(email);
    
    // Si l'email est valide, tente de connecter l'utilisateur
    if (emailValidity) {
      await loginFormModel.loginUser(email, password);
    } else {
      // Supprime le message d'erreur existant, s'il y en a un
      loginFormView.clearLoginError(loginForm);
      // Si l'email est invalide, affiche une erreur
      loginFormView.displayLoginError(loginForm);
    }
  });
}

