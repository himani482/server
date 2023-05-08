const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const routingApis = require('../controllers/posts.js');
const upload = multer({
  dest: "./mydoc"
});
const attach = upload.single('image');
router.get('/posting',routingApis.getposts);
router.post('/', attach, routingApis.createPost);
router.get('/:id', routingApis.getPost);
router.post('/updatePost', routingApis.updatedPost);
router.post('/delete', routingApis.deletePost);
router.post('/likePost', routingApis.likePost);
router.post('/upload', routingApis.upload);

module.exports = router;