const Article = require('../models/article');

class ArticleRepository {
    // Lấy tất cả bài viết
    async getArticles() {
        return Article.find();
    }

    // Tạo bài viết mới
    async createArticle(articleData) {
        const article = new Article(articleData);
        return await article.save();
    }

    // Cập nhật bài viết
    async updateArticle(id, updateData) {
        return Article.findByIdAndUpdate(id, updateData);
    }

    // Lấy bài viết theo ID
    async getArticleById(id) {
        return Article.findById(id);
    }

    // Xoá bài viết
    async deleteArticle(id) {
        return Article.findByIdAndDelete(id);
    }

    // Tìm kiếm và phân trang
    async searchArticles(condition, { skip, limit }) {
        const pipeline = [];

        // Điều kiện tìm kiếm theo tiêu đề, tác giả và ngày đăng
        if (condition.title) {
            pipeline.push({
                $match: { title: { $regex: condition.title, $options: 'i' } }
            });
        }

        if (condition.author) {
            pipeline.push({
                $match: { author: { $regex: condition.author, $options: 'i' } }
            });
        }

        if (condition.createdAt) {
            pipeline.push({
                $match: { createdAt: { $gte: new Date(condition.createdAt) } }
            });
        }

        // Sắp xếp bài viết theo ngày tạo mới nhất
        pipeline.push({
            $sort: { createdAt: -1 }
        });

        // Phân trang
        pipeline.push(
            { $skip: skip },
            { $limit: limit }
        );

        // Lấy dữ liệu bài viết cùng với danh mục liên kết (populate)
        pipeline.push({
            $lookup: {
                from: 'categories', // tên collection của Category
                localField: 'category',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        });

        // Dự án các trường cần thiết
        pipeline.push({
            $project: {
                title: 1,
                slug: 1,
                description: 1,
                thumbnail: 1,
                content: 1,
                author: 1,
                createdAt: 1,
                updatedAt: 1,
                status: 1,
                categoryDetails: { $arrayElemAt: ['$categoryDetails', 0] } // lấy thông tin category đầu tiên
            }
        });

        return Article.aggregate(pipeline);
    }
}

module.exports = new ArticleRepository();
