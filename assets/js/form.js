/**
 * Script de gestion du formulaire pour Netlify
 * Ce code envoie les données sans recharger la page (AJAX).
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      
      status.textContent = "📤 Envoi en cours...";
      status.style.color = "orange";

      // On récupère toutes les données du formulaire
      const formData = new FormData(form);
      
      /**
       * CORRECTION CRUCIALE : 
       * Pour Netlify, on doit transformer les données en format URL-encoded
       * et s'assurer que 'form-name' est présent dans le corps de la requête.
       */
      const data = new URLSearchParams(formData).toString();

      try {
        // Envoi de la requête vers la racine du site
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data,
        });

        if (response.ok) {
          // Si Netlify répond avec succès
          status.textContent = "✅ Message envoyé avec succès !";
          status.style.color = "#27ae60";
          form.reset(); // Vide le formulaire
        } else {
          // Si Netlify rejette la requête (ex: spam détecté ou form-name manquant)
          status.textContent = "❌ Erreur lors de l'envoi du message.";
          status.style.color = "#e74c3c";
        }
      } catch (error) {
        // En cas de problème de connexion (hors ligne)
        status.textContent = "❌ Erreur réseau : " + error.message;
        status.style.color = "#e74c3c";
      }
    });
  }
});