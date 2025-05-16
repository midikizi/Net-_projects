const messageRepository = require('../repositories/messageRepository');
const models = require('../../models');

class MessageService {
    async validateMessageData(title, content) {
        const errors = [];
        if (!title || title.trim().length < 2) {
            errors.push('Le titre doit contenir au moins 2 caractères');
        }
        if (!content || content.trim().length < 1) {
            errors.push('Le contenu ne peut pas être vide');
        }
        return errors;
    }

    async createMessage(userId, title, content, attachment) {
        const errors = await this.validateMessageData(title, content);
        if (errors.length > 0) {
            throw { status: 400, errors };
        }

        return await messageRepository.create({
            title,
            content,
            userId,
            attachment: attachment || null,
            likes: 0
        });
    }

    async getAllMessages() {
        return await messageRepository.findAll({
            attributes: ['id', 'title', 'content', 'userId', 'attachment', 'likes', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });
    }

    async updateMessage(id, userId, title, content, attachment) {
        const message = await messageRepository.findOne({
            where: { id, userId },
            attributes: ['id', 'title', 'content', 'userId', 'attachment', 'likes', 'createdAt', 'updatedAt']
        });

        if (!message) {
            throw { status: 404, message: 'Message non trouvé ou accès non autorisé' };
        }

        if (title || content) {
            const errors = await this.validateMessageData(
                title || message.title,
                content || message.content
            );
            if (errors.length > 0) {
                throw { status: 400, errors };
            }
        }

        return await messageRepository.update(message, {
            title: title || message.title,
            content: content || message.content,
            attachment: attachment || message.attachment
        });
    }

    async deleteMessage(id, userId) {
        const message = await messageRepository.findOne({
            where: { id, userId },
            attributes: ['id', 'title', 'content', 'userId', 'attachment', 'likes', 'createdAt', 'updatedAt']
        });

        if (!message) {
            throw { status: 404, message: 'Message non trouvé ou accès non autorisé' };
        }

        await messageRepository.delete(message);
        return { message: 'Message supprimé avec succès' };
    }
}

module.exports = new MessageService();