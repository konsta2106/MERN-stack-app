const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/v1", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:8000",
    })
  );
  app.use(
    ["/api/v1", "/currentuser"],
    createProxyMiddleware({
      target: "http://localhost:8000",
    })
  );
};
