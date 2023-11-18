const newRouter = require("./news");
const productRouter = require("./product");
const siteRouter = require("./site");
function route(myWeb) {
  myWeb.use("/news", newRouter);
  myWeb.use("/product", productRouter);
  myWeb.use("/", siteRouter);
}

module.exports = route;
