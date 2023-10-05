import { ACCESS_TOKEN } from "../core/constants.js";

export class AuthController {
  constructor() {
    this.loginLink = document.getElementById("login");
    this.init();
  }

  init() {

    if (ACCESS_TOKEN) {
      this.loginLink.innerText = 'Logout';
    } else {
      this.loginLink.innerText = 'Login';
    }

    this.loginLink.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    
      console.log("Clic détecté");
      console.log(ACCESS_TOKEN);
      // Reste du code
    
    
    e.preventDefault();

    if (ACCESS_TOKEN) {
      sessionStorage.removeItem("accessToken");
      console.log("token supprimé" + ACCESS_TOKEN);
      window.location.reload();
    } else {
      window.location.href = "/login.html";
    }
  }};
