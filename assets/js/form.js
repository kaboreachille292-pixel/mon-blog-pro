/**
 * Gestion de l'envoi du formulaire de contact via Netlify Forms
 * Ce script intercepte l'envoi, affiche un message d'attente,
 * et confirme le succès ou l'erreur sans recharger la page.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sélection des éléments HTML nécessaires
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  // 2. Écoute du clic sur le bouton "ENVOYER"
  form.addEventListener("submit", async (e) => {
    // Empêche le comportement par défaut (rechargement de la page)
    e.preventDefault();

    // Affiche un indicateur visuel de chargement pour l'utilisateur
    status.textContent = "📤 Message en cours d'envoi...";
    status.style.color = "orange";

    // 3. Préparation des données du formulaire
    // FormData récupère toutes les saisies (nom, email, etc.)
    const formData = new FormData(form);

    try {
      // 4. Envoi de la requête à Netlify
      // On envoie vers "/" car Netlify intercepte les requêtes POST à la racine
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // On transforme les données en format lisible pour les serveurs statiques
        body: new URLSearchParams(formData).toString(),
      });

      // 5. Vérification du succès de l'envoi
      if (response.ok) {
        // Message de succès
        status.textContent = "✅ Message envoyé avec succès !";
        status.style.color = "#27ae60"; // Vert
        
        // Vide les champs du formulaire pour un nouvel envoi
        form.reset();
      } else {
        // Cas où le serveur répond mais avec une erreur
        status.textContent = "❌ Erreur lors de l'envoi du message.";
        status.style.color = "#e74c3c"; // Rouge
      }
    } catch (error) {
      // Cas où la connexion internet ou le serveur échoue complètement
      status.textContent = "❌ Erreur réseau : " + error.message;
      status.style.color = "#e74c3c";
    }
  });
});