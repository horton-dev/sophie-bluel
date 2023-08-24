/**
 * @description Ce module gère la logique de soumission du formulaire de connexion.
 * Il importe la fonction handleLoginFormSubmit depuis le module auth.js et l'attache à l'événement de chargement de la page.
 * Le formulaire de connexion sera validé, et si les informations d'authentification sont correctes, l'utilisateur sera authentifié.
 * @module login
 */

// Import de la fonction handleLoginFormSubmit depuis le module auth.js
import { handleLoginFormSubmit } from "./module/auth.js";

// Vérification que le document est complètement chargé avant d'appeler la fonction
document.addEventListener('DOMContentLoaded', () => {
  /**
   * @description Gère la soumission du formulaire de connexion, y compris la validation des entrées de l'utilisateur et l'authentification de l'utilisateur si les informations sont correctes.
   */
  handleLoginFormSubmit();
});

