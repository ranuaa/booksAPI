/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRouter = require('./Routes/booksRoutes');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use('/books', bookRouter);

mongoose.connect('mongodb+srv://admin:123123123@cluster0.7uiwduv.mongodb.net/book?retryWrites=true&w=majority')
  .then(() => app.listen(PORT, () => {
    console.log(`Server is runnong on port ${PORT}`);
  }))
  .catch((error) => console.log(error));
