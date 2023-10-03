import { loadHeaderFooter } from './services/layoutService.js';
import { initLogin} from './controllers/LoginFormController.js';

document.addEventListener("DOMContentLoaded", () => {
  
  //charge le header et le footer
  loadHeaderFooter();

  //initialise le login
  initLogin();


});