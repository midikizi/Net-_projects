const articleRepository = require('../repositories/articleRepository');
const models = require('../../models');

class ArticleService {
    async validateArticleData(title, content) {
        const errors = [];
        if (!title || title.trim().length < 3) {
            errors.push('Le titre doit contenir au moins 3 caractères');
        }
        if (!content || content.trim().length < 10) {
            errors.push('Le contenu doit contenir au moins 10 caractères');
        }
        return errors;
    }

    async createArticle(userId, title, content, image) {
        const errors = await this.validateArticleData(title, content);
        if (errors.length > 0) {
            throw { status: 400, errors };
        }

        return await articleRepository.create({
            title,
            content,
            userId,
            image: image || null,
            likes: 0
        });
    }

    async getAllArticles() {
        return await articleRepository.findAll({
            attributes: ['id', 'title', 'content', 'userId', 'image', 'likes', 'createdAt', 'updatedAt'],
            include: [{
                model: models.User,
                attributes: ['id', 'username', 'email', 'isAdimin']
            }],
            order: [['createdAt', 'DESC']]
        });
    }

    async getArticleById(id) {
        const article = await articleRepository.findById(id, {
            attributes: ['id', 'title', 'content', 'userId', 'image', 'likes', 'createdAt', 'updatedAt'],
            include: [{
                model: models.User,
                attributes: ['username', 'email']
            }]
        });

        if (!article) {
            throw { status: 404, message: 'Article non trouvé' };
        }

        return article;
    }

    async updateArticle(id, userId, title, content, image) {
        const article = await articleRepository.findOne({
            where: { id, userId },
            attributes: ['id', 'title', 'content', 'userId', 'image', 'likes', 'createdAt', 'updatedAt']
        });

        if (!article) {
            throw { status: 404, message: 'Article non trouvé ou accès non autorisé' };
        }

        if (title || content) {
            const errors = await this.validateArticleData(
                title || article.title,
                content || article.content
            );
            if (errors.length > 0) {
                throw { status: 400, errors };
            }
        }

        return await articleRepository.update(article, {
            title: title || article.title,
            content: content || article.content,
            image: image || article.image
        });
    }

    async deleteArticle(id, userId) {
        const article = await articleRepository.findOne({
            where: { id, userId },
            attributes: ['id', 'title', 'content', 'userId', 'image', 'likes', 'createdAt', 'updatedAt']
        });

        if (!article) {
            throw { status: 404, message: 'Article non trouvé ou accès non autorisé' };
        }

        await articleRepository.delete(article);
        return { message: 'Article supprimé avec succès' };
    }
}

module.exports = new ArticleService();