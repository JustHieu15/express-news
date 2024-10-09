const articleRepository = require('../repositories/article-repository');
const slugify = require('slugify');

class ArticleService {
    async getAllArticles() {
        return articleRepository.getArticles()
    }

    async createArticle(articleData) {
        // Tạo slug từ tiêu đề bài viết
        const slug = slugify(articleData.title, { lower: true, strict: true });
        articleData.slug = slug;  // Gán slug vào dữ liệu bài viết
        return await articleRepository.createArticle(articleData);
    }

    async updateArticle(id, updateData) {
        // Cập nhật slug nếu tiêu đề thay đổi
        if (updateData.title) {
            const slug = slugify(updateData.title, { lower: true, strict: true });
            updateData.slug = slug;
        }
        return await articleRepository.updateArticle(id, updateData);
    }

    async getArticleById(id) {
        return await articleRepository.getArticleById(id);
    }

    async deleteArticle(id) {
        return await articleRepository.deleteArticle(id);
    }

    async searchArticles(query, page, limit) {
        const skip = (page - 1) * limit;
        return await articleRepository.searchArticles(query, { skip, limit });
    }
}

module.exports = new ArticleService();
