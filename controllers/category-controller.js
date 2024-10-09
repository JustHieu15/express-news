const categoryService = require('../services/category-service');

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.render('admin/category/list', { categories: categories, layout: 'admin/index' });
        }
        catch (error) {
            res.status(500).send('Error getting category');
        }
    }

    async createCategory(req, res) {
        try {
            res.render('admin/category/create', { layout: 'admin/index' });
        }
        catch (error) {
            res.status(500).send('Error loading');
        }
    }

    async storeCategory(req, res) {
        try {
            const { title } = req.body;
            const newCategory = {
                name: title,
                status: 'hoạt động'
            };
            await categoryService.createCategory(newCategory);
            res.redirect('/category/list');
        } catch (error) {
            res.status(500).send('Error creating category');
        }
    }
}

module.exports = new CategoryController;