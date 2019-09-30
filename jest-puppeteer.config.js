const port = process.env.TEST_SERVER_PORT ? Number(process.env.TEST_SERVER_PORT) : 8080;
const host = process.env.TEST_SERVER_HOST ? process.env.TEST_SERVER_HOST : '127.0.0.1';

module.exports = {
  server: {
    command: `PORT=${port} HOST=${host} npm run server`,
    port,
    host,
  },
};
