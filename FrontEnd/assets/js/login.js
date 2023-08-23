/**
 * Ce fichier gère la logique de soumission du formulaire de connexion.
 * Il importe la fonction handleLoginFormSubmit depuis le module auth.js et la déclenche au chargement de la page.
 */

// Import de la fonction handleLoginFormSubmit depuis le module auth.js
import { handleLoginFormSubmit } from "./module/auth.js";

// Vérification que le document est complètement chargé avant d'appeler la fonction
document.addEventListener('DOMContentLoaded', () => {

  handleLoginFormSubmit();
});