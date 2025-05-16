const models = require('../../models');

class MessageRepository {
    async create(messageData) {
        return await models.Message.create(messageData, {
            returning: ['id', 'title', 'content', 'userId', 'attachment', 'likes', 'createdAt', 'updatedAt']
        });
    }

    async findAll(options = {}) {
        return await models.Message.findAll(options);
    }

    async findById(id, options = {}) {
        return await models.Message.findByPk(id, options);
    }

    async findOne(options = {}) {
        return await models.Message.findOne(options);
    }

    async update(message, data) {
        return await message.update(data);
    }

    async delete(message) {
        return await message.destroy();
    }
}

module.exports = new MessageRepository();