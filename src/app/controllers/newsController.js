const Cart = require("../models/Product");
let cart_total = 0;
class CartController {
  index(req, res, next) {
    Cart.getSize() // 1
      .then(function (size) {
        res.render("news", {
          title: "Giỏ hàng",
          size: size,
        });
      })
      .catch(next);
  }
}

module.exports = new CartController();
