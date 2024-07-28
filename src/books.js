const { nanoid } = require('nanoid');
let books = [];

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };
  books.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  }).code(201);
};

const getAllBooksHandler = (request, h) => {
  const responseBooks = books.map(({ id, name, publisher }) => ({
    id, name, publisher
  }));
  return {
    status: 'success',
    data: {
      books: responseBooks
    }
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find(b => b.id === bookId);

  if (book) {
    return {
      status: 'success',
      data: {
        book
      }
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  }).code(404);
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }

    const updatedAt = new Date().toISOString();
    const finished = readPage === pageCount;

    books[bookIndex] = {
      ...books[bookIndex],
      name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui'
    };
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return {
      status: 'success',
      message: 'Buku berhasil dihapus'
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  }).code(404);
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler };