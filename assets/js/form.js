document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "📤 Message en cours d'envoi...";

    // On prépare les données pour Netlify
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        status.textContent = "✅ Message envoyé avec succès !";
        form.reset(); // Vide le formulaire après l'envoi
      } else {
        status.textContent = "❌ Erreur lors de l'envoi du message.";
      }
    } catch (error) {
      status.textContent = "❌ Erreur réseau : " + error.message;
    }
  });
});