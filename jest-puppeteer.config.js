const port = process.env.TEST_SERVER_PORT ? Number(process.env.TEST_SERVER_PORT) : 8080;

module.exports = {
  server: {
    command: `PORT=${port} npm run server`,
    port,
  },
};
