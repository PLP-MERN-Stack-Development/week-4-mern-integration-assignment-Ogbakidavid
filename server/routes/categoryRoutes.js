const express = require('express');
const { getCategories, createCategories } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategories);

module.exports = router;
