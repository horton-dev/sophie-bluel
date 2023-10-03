import { apiFetch } from '../utils/apiService.js';

// Modèle pour la gestion de la connexion
export class LoginFormModel {
  async loginUser(email, password) {
    try {
      const data = await apiFetch("users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (data && data.token) {
        sessionStorage.setItem("accessToken", data.token);
        window.location.href = `http://${window.location.hostname}:5500/index.html`;
      } else {
        console.error(`Erreur: Pas de token dans la réponse`);
      }
    } catch (error) {
      console.error(`Erreur lors de la tentative de connexion: ${error}`);
    }
  }

  emailValidityCheck(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return regex.test(email);
  }
}
