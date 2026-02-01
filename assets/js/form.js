// Attendre que toute la page soit chargée avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {

  // Récupère le formulaire grâce à son ID "contactForm"
  const form = document.getElementById("contactForm");

  // Récupère la zone où on affichera les messages (en cours, succès, erreur)
  const status = document.getElementById("form-status");

  // Écoute l'événement "submit" (quand on clique sur ENVOYER)
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche le rechargement automatique de la page

    // Étape 1 : afficher immédiatement le message "en cours d'envoi"
    status.textContent = "📤 Message en cours d'envoi...";

    try {
      // Envoie les données du formulaire vers send.php avec AJAX (fetch)
      const response = await fetch(form.action, {
        method: form.method,          // méthode POST
        body: new FormData(form)      // données du formulaire
      });

      // Récupère la réponse envoyée par send.php (ex: "success" ou "error")
      const result = await response.text();

      // Étape 2 : afficher le bon message selon la réponse
      if (result.trim() === "success") {
        // Si send.php renvoie "success"
        status.textContent = "✅ Message envoyé avec succès !";
      } else if (result.trim() === "error") {
        // Si send.php renvoie "error"
        status.textContent = "❌ Erreur lors de l'envoi du message.";
      } else {
        // Si send.php renvoie autre chose (ex: une page HTML)
        status.textContent = "❌ Réponse inattendue : " + result;
      }

    } catch (error) {
      // Si une erreur réseau survient (connexion, serveur inaccessible, etc.)
      status.textContent = "❌ Erreur réseau : " + error.message;
    }
  });
});
