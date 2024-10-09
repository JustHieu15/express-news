const articleService = require('../services/article-service');

class ArticleController {
    async getAllArticle(req, res) {
        try {
            const articles = await articleService.getAllArticles()
            res.render('admin/article/list', { articles: articles });
        }
        catch (error) {
            res.status(500).send('Error getting articles');
        }
    }

    async createArticle(req, res) {
        try {
            res.render('admin/article/create')
        }
        catch (error) {
            res.status(400).send(error);
        }
    }

    async storeArticle(req, res) {

    }

    async getArticleById(req, res) {
        try {
            const article = await articleService.getArticleById(req.params.id);
            res.render()
        } catch (error) {
            res.status(404).send('Article not found');
        }
    }

    async updateArticle(req, res) {
        try {
            const article = await articleService.updateArticle();
        }
        catch (error) {
            res.status(500).send('Error updating article');
        }
    }

    async deleteArticle(req, res) {

    }
}

module.exports = new ArticleController;