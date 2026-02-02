/**
 * Script de gestion du formulaire pour Netlify
 * Ce code envoie les données sans recharger la page.
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

      try {
        // Envoi de la requête vers la racine du site (Netlify gère le reste)
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          // Si Netlify répond OK
          status.textContent = "✅ Message envoyé avec succès !";
          status.style.color = "#27ae60";
          form.reset(); // On vide les cases du formulaire
        } else {
          // Si le serveur répond avec une erreur
          status.textContent = "❌ Erreur lors de l'envoi du message.";
          status.style.color = "#e74c3c";
        }
      } catch (error) {
        // Si la connexion internet échoue
        status.textContent = "❌ Erreur réseau : " + error.message;
        status.style.color = "#e74c3c";
      }
    });
  }
});