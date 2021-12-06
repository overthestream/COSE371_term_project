const server = require('./app');

const port = 3001;

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
