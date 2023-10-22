const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

router.post('/send', (req, res) => {
    const { name, firstname, phone, mail, message } = req.body;

    console.log(req.body);

    const formattedMessage = `
        Nom: ${name}
        Prénom: ${firstname}
        Téléphone: ${phone}
        Email: ${mail}
        Message: ${message}
    `;

    emailService.sendEmail(formattedMessage, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail'+error+' ------- '+info });
        } else {
            console.log('Email envoyé: ' + info.response);
            res.status(200).json({ message: 'Email envoyé' });
        }
    });
});

module.exports = router;
