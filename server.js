const express = require('express')

const app = express();
const port = 3000;
const run = async => {


  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

// error handler middleware
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

  app.listen(port, _=>console.log(`listening on port ${port}`))
}
