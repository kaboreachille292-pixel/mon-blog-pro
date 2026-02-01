<?php
// Importation des classes PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Chargement automatique des dépendances (PHPMailer via Composer)
require 'vendor/autoload.php';

// Vérifie que la requête est bien envoyée en POST (depuis ton formulaire)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Création d'une instance de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP pour Gmail
        $mail->isSMTP();                          // Utiliser SMTP
        $mail->Host = 'smtp.gmail.com';           // Serveur SMTP
        $mail->SMTPAuth = true;                   // Activer l’authentification
        $mail->Username = 'kaboreachille292@gmail.com'; // Ton adresse Gmail
        $mail->Password = 'ovwv ijaa frte akbq';  // Mot de passe d’application Gmail
        $mail->SMTPSecure = 'tls';                // Sécurisation TLS
        $mail->Port = 587;                        // Port SMTP

        // Expéditeur et destinataire
        $mail->setFrom('kaboreachille292@gmail.com', 'Achille'); // Expéditeur
        $mail->addReplyTo($email, $name);         // Permet de répondre au visiteur
        $mail->addAddress('kaboreachille292@gmail.com'); // Destinataire (toi-même)

        // Contenu du mail
        $mail->isHTML(true);                      // Format HTML
        $mail->Subject = "Nouveau message de $name"; // Sujet
        $mail->Body    = nl2br($message);         // Corps du message

        // Debug désactivé en production
        $mail->SMTPDebug = 0;

        // Envoi du mail
        $mail->send();

        // Réponse envoyée au navigateur/JS
        echo "success"; 
    } catch (Exception $e) {
        // Affiche l’erreur si l’envoi échoue
        echo "Erreur : {$mail->ErrorInfo}";
    }
}
?>
