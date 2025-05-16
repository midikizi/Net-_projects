const models = require('../../models');

class ArticleRepository {
    async create(articleData) {
        return await models.Article.create(articleData, {
            returning: ['id', 'title', 'content', 'userId', 'image', 'likes', 'createdAt', 'updatedAt']
        });
    }

    async findAll(options = {}) {
        return await models.Article.findAll(options);
    }

    async findById(id, options = {}) {
        return await models.Article.findByPk(id, options);
    }

    async findOne(options = {}) {
        return await models.Article.findOne(options);
    }

    async update(article, data) {
        return await article.update(data);
    }

    async delete(article) {
        return await article.destroy();
    }
}

module.exports = new ArticleRepository();