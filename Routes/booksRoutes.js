const express = require('express');
const {
  saveBook, getAllBook, getBookDetail, updateBook, deleteBook,
} = require('../Controller/booksController');

const router = express.Router();
router.post('/', saveBook);
router.get('/', getAllBook);
router.get('/:id', getBookDetail);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
