const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageService = require('../src/services/messageService');

// Créer un message
router.post('/send', auth, async (req, res) => {
    try {
        const { title, content, attachment } = req.body;
        const message = await messageService.createMessage(req.user.id, title, content, attachment);
        res.status(201).json(message);
    } catch (error) {
        console.error('Erreur envoi message:', error);
        res.status(error.status || 500).json(error.errors ? { errors: error.errors } : { 'error': 'Impossible d\'envoyer le message' });
    }
});

// Récupérer tous les messages
router.get('/', async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Erreur récupération messages:', error);
        res.status(500).json({ 'error': 'Impossible de récupérer les messages' });
    }
});

// Mettre à jour un message
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content, attachment } = req.body;
        const message = await messageService.updateMessage(req.params.id, req.user.id, title, content, attachment);
        res.status(200).json(message);
    } catch (error) {
        console.error('Erreur mise à jour message:', error);
        res.status(error.status || 500).json(error.errors ? { errors: error.errors } : { 'error': error.message || 'Impossible de mettre à jour le message' });
    }
});

// Supprimer un message
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await messageService.deleteMessage(req.params.id, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur suppression message:', error);
        res.status(error.status || 500).json({ 'error': error.message || 'Impossible de supprimer le message' });
    }
});

module.exports = router;