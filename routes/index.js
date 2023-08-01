var express = require("express");
var router = express.Router();
const Product = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  Product.find({})
    .then((docs) => {
      let productGrid = [];
      let colGrid = 3;

      for (let i = 0; i < docs.length; i += colGrid) {
        productGrid.push(docs.slice(i, i + colGrid));
      }

      res.render("index", {
        title: "Shopping-cart",
        products: productGrid,
        checkUser: req.isAuthenticated(),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
