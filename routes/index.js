var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const Cart = require('../models/cart');

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

router.get("/addToCart/:id/:price/:name", (req, res, next) => {

  const cartID = req.user._id;
  const newProductPrice = parseInt(req.params.price, 10);
  const newProduct = {
    _id: req.params.id,
    price: newProductPrice,
    name: req.params.name,
    quantity: 1,
  };

  Cart.findById(cartID)
    .exec()
    .then((cart) => {
      if (!cart) {
        const newCart = new Cart({
          _id: cartID,
          totalquantity: 1,
          totalPrice: newProductPrice,
          selectedProduct: [newProduct],
        });

        return newCart.save();
      }
      return cart;
    })
    .then((savedCart) => {
      if (savedCart) {
        console.log(savedCart);
        res.redirect("/")
      }
    })
    .catch((error) => {
      console.log(error);
    });


    
});

module.exports = router;
