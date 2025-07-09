const Post = require('../models/Post');
const Category = require('../models/Category');

console.log('Post model test:', typeof Post, typeof Post.find);
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate({
                path: 'author',
                select: 'username',
                model: 'User'
            })
            .populate({
                path: 'category',
                select: 'name',
                model: 'Category'
            })
            .lean();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('category').populate('author', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found ' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

         // Check required fields
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category || null,
            author: req.user.id,
            featuredImage: req.file?.path
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json(updatePost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
        }

        await post.remove();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};