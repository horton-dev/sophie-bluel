import { getMessage } from './languageLoader.js';

export function updateTextContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.dataset.i18n;
    const text = getMessage(key);

    if (element.tagName === 'INPUT' && element.type === 'submit') {
      // Mettre à jour l'attribut 'value' pour les éléments input de type submit
      element.value = text;
    } else if (element.children.length > 0) {
      // Si l'élément a des enfants, mettre à jour seulement le premier noeud texte
      if (element.childNodes[0].nodeType === 3) { 
        element.childNodes[0].nodeValue = text;
      }
    } else {
      // Sinon, mettre à jour tout le contenu textuel
      element.textContent = text;
    }
  });
}


