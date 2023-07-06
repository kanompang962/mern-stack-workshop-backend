const express = require('express');
const router = express.Router();

const { create, read, readSingle, remove, update } = require('../controllers/blogController');

router.post('/create', create);
router.get('/read', read);
router.get('/read/:slug', readSingle);
router.delete('/read/:slug', remove);
router.put('/read/:slug', update);


module.exports = router;