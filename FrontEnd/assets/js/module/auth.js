/**
 * Module de gestion des fonctionnalités d'authentification et de sessions utilisateur.
 * Il fournit les mécanismes pour gérer la soumission du formulaire de connexion, configurer le bouton de connexion/déconnexion,
 * et gérer la connexion et la déconnexion de l'utilisateur.
 * @module auth
 */

/**
 * @typedef {Object} AuthModule
 * @property {function} handleLoginFormSubmit - Une méthode qui gère la soumission du formulaire de connexion, y compris la validation, la requête à l'API, et la gestion de la réponse. Elle assure une expérience utilisateur soignée lors de la connexion.
 * @property {function} configureLoginButton - Une méthode qui configure le bouton pour gérer la connexion et la déconnexion de l'utilisateur, et gère l'affichage en fonction de l'état de connexion. Elle permet une interaction fluide avec l'état d'authentification de l'utilisateur.
 */

/**
 * @description Gère la soumission du formulaire de connexion, incluant la récupération des informations d'identification, l'envoi de la requête, et la gestion de la réponse.
 * Si la connexion est réussie, stocke le jeton d'accès et redirige l'utilisateur.
 * En cas d'échec, affiche un message d'erreur.
 * 
 * @function
 * @async
 * @param {Event} e - L'événement de soumission du formulaire.
 */
export async function handleLoginFormSubmit() {
  // Sélectionne le formulaire et ajoute un écouteur d'événements pour la soumission
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    // Empêche le formulaire de se soumettre automatiquement
    e.preventDefault();

    // Récupère l'e-mail et le mot de passe entrés par l'utilisateur
    const email = document.getElementById("email").value.trim(); // Utilise trim() pour éliminer les espaces en début et fin
    const invalidEmailMessage = document.querySelector(".invalid-email");
    const password = document.getElementById("password").value;

    // Sélectionne l'élément HTML où afficher le message d'erreur
    const connexion = document.querySelector(".connexion-message");
    const existingError = document.querySelector(".error-message");

    // Supprime le message d'erreur existant s'il y en a un
    if (existingError) {
      existingError.remove();
    }

    // Validation de l'adresse e-mail
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      invalidEmailMessage.innerText = "Oops! Il semble y avoir une erreur dans l'adresse e-mail. Veuillez la vérifier.";
      return; // Arrête l'exécution si l'e-mail est invalide
    } else {
      invalidEmailMessage.innerText = ""; // Efface le message d'erreur si l'e-mail est valide
    }

    // Envoie une requête POST à l'API pour se connecter avec les informations d'identification de l'utilisateur
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Si la réponse est réussie
      if (response.ok) {
        // Récupère les données de la réponse
        const data = await response.json();
        // Stocke le jeton d'accès dans la session de l'utilisateur
        sessionStorage.setItem("accessToken", data.token);
        // Redirige l'utilisateur vers la page d'accueil
        window.location.href = `http://${window.location.hostname}:5501/index.html`;
      } else {
        // Crée un élément HTML pour afficher le message d'erreur
        const error = document.createElement("p");
        // Définit le texte du message d'erreur
        error.innerText = "Identifiant ou mot de passe incorrect. Veuillez réessayer.";
        // Ajoute une classe pour gérer le style dans CSS
        error.classList.add("error-message");
        // Centre le texte du message d'erreur
        error.style.textAlign = 'center';
        // Définit la couleur du texte du message d'erreur
        error.style.color = 'red';
        // Insère le message d'erreur avant le dernier élément enfant de l'élément HTML sélectionné
        connexion.insertBefore(error, connexion.lastElementChild);
      }
    } catch (error) {
      console.error("Une erreur est survenue :", error);
      const networkError = document.createElement("p");
      networkError.innerText = "Une erreur réseau s'est produite. Veuillez réessayer.";
      networkError.style.color = 'red';
      networkError.style.textAlign = 'center';
      connexion.insertBefore(networkError, connexion.lastElementChild);
    }
  });
}

/**
 * @description Configure le bouton de connexion/déconnexion de l'utilisateur en fonction de son état de connexion.
 * Si l'utilisateur est connecté (jeton présent), le bouton affiche "Logout" et gère la déconnexion.
 * Sinon, il affiche "Login" et redirige vers la page de connexion lorsqu'il est cliqué.
 * 
 * @function
 */
export function configureLoginButton() {
  /** @type {HTMLElement} */
  const loginButtonElement = document.querySelector('.login');
  
  // Récupération du token d'accès depuis la session
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    // Si un token est trouvé, l'utilisateur est connecté
    loginButtonElement.textContent = "Logout";

    loginButtonElement.addEventListener("click", (event) => {
      event.preventDefault();

      // Suppression du token d'accès de la session
      sessionStorage.removeItem("accessToken");

      // Rechargement de la page pour appliquer les changements
      window.location.reload();
    });
  } else {
    // Si aucun token n'est trouvé, l'utilisateur n'est pas connecté
    loginButtonElement.textContent = "Login";
    
    // Ajoute un écouteur d'événements pour rediriger vers la page de connexion
    loginButtonElement.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
}
