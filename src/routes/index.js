const newRouter = require("./news");
const siteRouter = require("./site");
function route(myWeb) {
  myWeb.use("/news", newRouter);
  myWeb.use("/", siteRouter);
}

module.exports = route;
