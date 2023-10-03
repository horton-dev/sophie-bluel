import { LoginFormView } from '../views/LofinFormView.js';
import { LoginFormModel } from '../models/LoginFormModel.js';

export async function initLogin() {
  const loginForm = document.getElementById('login-form');
  const loginFormModel = new LoginFormModel();
  const loginFormView = new LoginFormView();
  
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('current-password').value;
    
    const emailValidity = loginFormModel.emailValidityCheck(email);
    
    if (emailValidity) {
      await loginFormModel.loginUser(email, password);
    } else {
      console.error('Invalid email');
      // Affichez l'erreur en utilisant la méthode de la vue
      loginFormView.displayLoginError(loginForm);
    }
  });
}
