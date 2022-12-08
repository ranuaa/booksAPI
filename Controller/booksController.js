/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const BookModel = require('../models/booksModel');

// API dapat menyimpan buku
const saveBook = async (req, res) => {
  const newBook = new BookModel(req.body);
  try {
    if (!newBook.name || newBook.name === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
    } if (newBook.readPage > newBook.pageCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }
    if (newBook.readPage === newBook.pageCount) {
      const data = await BookModel.create({ ...req.body, finished: true });
      return res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: data._id,
        },
      });
    }
    const data = await newBook.save();
    res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: data._id,
      },
    });
  } catch (error) {
    // res.status(500).send('Gagal menambahkan buku. Mohon isi nama buku');
    res.status(500).send(error.message);
  }
};

// API dapat menampilkan seluruh buku
const getAllBook = async (req, res) => {
  const { name, reading, finished } = req.query;
  //   const { name, reading, finsihed } = req.query;
  try {
    const data = await BookModel.find({}).select('name publisher');
    if (data.length <= 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          books: [],
        },
      });
    }
    if (name) {
      const dataName = await BookModel.find({ name: { $regex: new RegExp(name, 'i') } }).select('name publisher');
      return res.status(200).json({
        status: 'success',
        data: {
          books: dataName,
        },
      });
    }
    if (reading === '0') {
      const dataName = await BookModel.find({ reading: 'false' }).select('name publisher');
      return res.status(200).json({
        status: 'success',
        data: {
          books: dataName,
        },
      });
    }
    if (reading === '1') {
      const dataName = await BookModel.find({ reading: 'true' }).select('name publisher');
      return res.status(200).json({
        status: 'success',
        data: {
          books: dataName,
        },
      });
    }
    if (finished === '0') {
      const dataName = await BookModel.find({ finished: 'false' }).select('name publisher');
      return res.status(200).json({
        status: 'success',
        data: {
          books: dataName,
        },
      });
    }
    if (finished === '1') {
      const dataName = await BookModel.find({ finished: 'true' }).select('name publisher');
      return res.status(200).json({
        status: 'success',
        data: {
          books: dataName,
        },
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        books: data,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// API dapat menampilkan detail buku
const getBookDetail = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
    }
    const data = await BookModel.findById(id);
    if (!data) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        book: data,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// API dapat mengubah data buku
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body.name || req.body.name === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
    }
    if (req.body.readPage > req.body.pageCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }
    await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }
};

// API dapat menghapus buku
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
    }
    const data = await BookModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
module.exports = {
  saveBook, getAllBook, getBookDetail, updateBook, deleteBook,
};
