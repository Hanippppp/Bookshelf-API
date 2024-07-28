const Hapi = require('@hapi/hapi');
const { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler } = require('./books');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route([
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: updateBookByIdHandler
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();