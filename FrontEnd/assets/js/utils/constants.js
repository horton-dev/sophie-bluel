/**
 * @file
 * Ce fichier contient des constantes et des variables globales utilisées dans toute l'application.
 * Ces constantes peuvent être importées et utilisées dans différents modules pour maintenir un code organisé et modulaire.
 * Elles contribuent à la centralisation de l'information, facilitant ainsi la gestion et l'évolutivité du code.
 */

/**
 * @description Un ensemble qui stocke tous les projets uniques pour éviter les duplications.
 * Il permet d'assurer que chaque projet est unique dans l'ensemble de l'application, en aidant à maintenir l'intégrité des données.
 * @type {Set<Object>}
 */
export const allWorks = new Set();

/**
 * @description Un ensemble qui stocke toutes les catégories uniques pour éviter les duplications.
 * Il permet de s'assurer que chaque catégorie est unique dans l'ensemble de l'application, contribuant ainsi à l'organisation des informations.
 * @type {Set<Object>}
 */
export const allCategories = new Set();

/**
 * @description Récupère le token d'accès à partir de la session. Ce token est essentiel pour la gestion de l'authentification dans l'application, permettant ainsi de valider l'identité de l'utilisateur.
 * @type {string}
 */
export const token = sessionStorage.accessToken;




