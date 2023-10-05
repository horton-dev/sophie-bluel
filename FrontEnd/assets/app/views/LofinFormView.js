

// Vue pour le formulaire de connexion
export class LoginFormView {

  
  displayLoginError(connexion) {
    const error = document.createElement("p");
    error.innerText = "Identifiant ou mot de passe incorrect. Veuillez réessayer.";
    error.classList.add("error-message");
    error.style.textAlign = 'center';
    error.style.color = 'red';
    connexion.insertBefore(error, connexion.lastElementChild);
  }
}

