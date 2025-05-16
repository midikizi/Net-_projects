const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const articleService = require('../src/services/articleService');

// Créer un article
router.post('/create', auth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const article = await articleService.createArticle(req.user.id, title, content, image);
        res.status(201).json(article);
    } catch (error) {
        console.error('Erreur création article:', error);
        res.status(error.status || 500).json(error.errors ? { errors: error.errors } : { 'error': 'Impossible de créer l\'article' });
    }
});

// Récupérer tous les articles
router.get('/', async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        console.error('Erreur récupération articles:', error);
        res.status(500).json({ 'error': 'Impossible de récupérer les articles' });
    }
});

// Récupérer un article spécifique
router.get('/:id', async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        console.error('Erreur récupération article:', error);
        res.status(error.status || 500).json({ 'error': error.message || 'Impossible de récupérer l\'article' });
    }
});

// Mettre à jour un article
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const article = await articleService.updateArticle(req.params.id, req.user.id, title, content, image);
        res.status(200).json(article);
    } catch (error) {
        console.error('Erreur mise à jour article:', error);
        res.status(error.status || 500).json(error.errors ? { errors: error.errors } : { 'error': error.message || 'Impossible de mettre à jour l\'article' });
    }
});

// Supprimer un article
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await articleService.deleteArticle(req.params.id, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur suppression article:', error);
        res.status(error.status || 500).json({ 'error': error.message || 'Impossible de supprimer l\'article' });
    }
});

module.exports = router;