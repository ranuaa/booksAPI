/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const moment = require('moment');

const bookSchema = mongoose.Schema(
  {
    name: String,
    year: Number,
    author: String,
    summary: String,
    publisher: String,
    pageCount: Number,
    readPage: Number,
    reading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    insertedAt: {
      type: Date,
      default: moment(new Date().toISOString()),
    },
    updatedAt: {
      type: Date,
      default: moment(new Date().toISOString()),
    },
  },
);
bookSchema.virtual('id').get(function () {
  return this._id;
});

// Ensure virtual fields are serialised.
bookSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
  },
});
const userModel = mongoose.model('Book', bookSchema);
module.exports = userModel;
