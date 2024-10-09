const Category = require('../models/category');

class CategoryRepository {
    async createCategory(categoryData) {
        return await Category.create(categoryData);
    }

    async getCategoryById(id) {
        return Category.findById(id);
    }

    async updateCategory(id, updateData) {
        return Category.findByIdAndUpdate(id, updateData);
    }

    async deleteCategory(id) {
        return Category.findByIdAndDelete(id);
    }

    async getAllCategories() {
        return Category.find();
    }
}

module.exports = new CategoryRepository();
