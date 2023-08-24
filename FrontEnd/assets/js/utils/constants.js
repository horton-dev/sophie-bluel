/**
 * Ce fichier contient des constantes et des variables globales utilisées dans toute l'application.
 * Ces constantes peuvent être importées et utilisées dans différents modules pour maintenir un code organisé et modulaire.
 */

/**
 * @description Ensemble pour stocker tous les travaux, évite les duplications.
 * @type {Set}
 */
export const allWorks = new Set();

/**
 * @description Ensemble pour stocker toutes les catégories, évite les duplications.
 * @type {Set}
 */
export const allCategories = new Set();

/**
 * @description Récupère le token d'accès à partir de la session. Utile pour la gestion de l'authentification.
 * @type {string}
 */
export const token = sessionStorage.accessToken;



