const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController')

router.get('/', movieController.getAll)
router.get('/:id', movieController.getById)

module.exports = router