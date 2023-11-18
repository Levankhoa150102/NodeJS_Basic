const Products = require("../models/Product");
class SiteController {
  //[GET] /home
  index(req, res, next) {
    Products.getAllProducts()
      .then((products) => {
        res.render("home", { products: products });
      })
      .catch(next);
  }

  //[GET] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
