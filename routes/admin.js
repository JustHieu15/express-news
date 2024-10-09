var express = require('express');
var router = express.Router();
const articleController = require('../controllers/article-controller');
const categoryController = require('../controllers/category-controller');

router.get('/', function(req, res, next) {
    res.render('admin/home', { layout: 'admin/index' });
})

// Artical Routes
router.get('/article/list', function(req, res, next) {
    res.render('admin/article/list', { layout: 'admin/index' });
})

router.get('/article/create', function(req, res, next) {
    res.render('admin/article/create', { layout: 'admin/index' });
})

router.post('/article/store', function(req, res, next) {

})

router.get('/article/edit', function(req, res, next) {
    res.render('admin/article/edit', { layout: 'admin/index' });
})

router.post('/article/update', function(req, res, next) {

})


// Category Routes
router.get('/category/list', async function(req, res, next) {
    await categoryController.getAllCategories(req, res);
})

router.get('/category/create', async function(req, res, next) {
    await categoryController.createCategory(req, res);
})

router.post('/category/store',async function(req, res, next) {
    await categoryController.storeCategory(req, res);
})

router.get('/category/edit', function(req, res, next) {
    res.render('admin/category/edit', { layout: 'admin/index' });
})

router.post('/category/update', function(req, res, next) {

})

router.post('/category/delete', function(req, res, next) {

})


module.exports = router