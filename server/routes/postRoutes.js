const express = require('express');
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/upload.js');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, upload.single('featuredImage'), createPost);
router.put('/:id', protect, upload.single('featuredImage'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
