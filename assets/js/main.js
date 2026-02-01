// --- 🌙 GESTION DU THÈME ---
// Récupère le bouton qui change le thème (jour/nuit)
const themeToggle = document.getElementById('theme-toggle');
// Récupère la racine du document (html) pour changer l'attribut data-theme
const root = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // Vérifie si le thème actuel est "dark"
    const isDark = root.getAttribute('data-theme') === 'dark';
    // Change le thème : si dark -> light, sinon -> dark
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    // Change l'icône du bouton (🌙 ou ☀️)
    themeToggle.textContent = isDark ? '🌙' : '☀️';
  });
}

// --- 🌍 GESTION DE LA TRADUCTION ---
// Récupère le selecteur de langue
const langSelect = document.getElementById('lang-select');

if (langSelect) {
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value; // "fr" ou "en"
    // Parcourt tous les éléments qui ont data-lang-fr et data-lang-en
    document.querySelectorAll('[data-lang-fr]').forEach(el => {
      // Change le texte selon la langue choisie
      el.textContent = el.getAttribute(lang === 'fr' ? 'data-lang-fr' : 'data-lang-en');
    });
  });
}

// --- 📬 MODALE CONTACT ---
// Récupère la modale de contact et les boutons associés
const contactModal = document.getElementById('contact-modal');
const closeContact = document.getElementById('close-contact');
// Récupère le bouton/lien qui ouvre la page contact
const contactBtn = document.querySelector('a[href="contact.html"]');

if (contactBtn && contactModal) {
  // Quand on clique sur "Contact", on ouvre la modale au lieu de rediriger
  contactBtn.addEventListener('click', (e) => {
    e.preventDefault(); // empêche la redirection vers contact.html
    contactModal.classList.remove('hidden');
    contactModal.style.display = 'flex';
  });

  // Bouton pour fermer la modale
  if (closeContact) {
    closeContact.addEventListener('click', () => {
      contactModal.classList.add('hidden');
      contactModal.style.display = 'none';
    });
  }

  // Fermer la modale si on clique en dehors du contenu
  window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.add('hidden');
      contactModal.style.display = 'none';
    }
  });
}

// --- 📄 CHARGER COMPETENCES ---
// Charge le contenu de competences.html dans la section #competences
fetch('competences.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('competences').innerHTML = html;
  });

// --- 🍔 MENU BURGER ---
// Récupère la navigation et crée un bouton burger
const navLinks = document.querySelector('.nav-links');
const burgerBtn = document.createElement('button');
burgerBtn.textContent = '☰'; // icône burger
burgerBtn.style.background = 'var(--btn-bg)';
burgerBtn.style.color = 'var(--btn-text)';
burgerBtn.style.border = 'none';
burgerBtn.style.padding = '0.4rem 0.8rem';
burgerBtn.style.borderRadius = '6px';
burgerBtn.style.cursor = 'pointer';

// Ajoute le bouton burger avant les liens de navigation
document.querySelector('.nav-container').insertBefore(burgerBtn, navLinks);

// Quand on clique sur le burger, on affiche/masque les liens
burgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
