// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyServer } = require("@mutagen-d/node-proxy-server");

const port = 8080;
const server = createProxyServer();

server.on("error", error => {
  console.log("server error", error);
});

server.on("connection", conn => {
  console.log("Successfully connected", conn);
});

server.listen(port, "0.0.0.0", () =>
  console.log("proxy-server listening port", port)
);
