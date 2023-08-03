var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");

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

// router.get("/addToCart/:id/:price/:name", (req, res, next) => {
//   const cartID = req.user._id;
//   const newProductPrice = parseInt(req.params.price, 10);
//   const newProduct = {
//     _id: req.params.id,
//     price: newProductPrice,
//     name: req.params.name,
//     quantity: 1,
//   };

//   Cart.findById(cartID)
//     .exec()
//     .then((cart) => {
//       if (!cart) {
//         const newCart = new Cart({
//           _id: cartID,
//           totalquantity: 1,
//           totalPrice: newProductPrice,
//           selectedProduct: [newProduct],
//         });
//         return newCart.save();
        
//       }
//       // return cart;
//       if (cart) {  
//         let indexOfProduct = -1;
//         for (let i = 0; i < cart.selectedProduct.length; i++) {
//           if (req.params.id === cart.selectedProduct[i]._id) {
//             indexOfProduct = i;
//             break;
//           }
//         }
//         if (indexOfProduct >= 0) {
//           consol.log(indexOfProdukt);
//         } 
//       }

      

//       // else {
//       //   cart.totalquantity = cart.totalquantity + 1;
//       //   cart.totalPrice = cart.totalPrice + newproductPrice;
//       //   cart.selectedProduct.push(newProduct);
//       //   cart.createAt = Date.now();
  
//       //   Cart.updateOne({ _id: cartID }, (error, doc) => {
//       //     if (error) {
//       //       console.log(error);
//       //     }
//       //     console.log(doc);
//       //     console.log(cart);
//       //   });
//       // }
//       return cart;
//     })
//     .then((savedCart) => {
//       if (savedCart) {
//         console.log(savedCart);
//         res.redirect("/");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   });




// router.get("/addToCart/:id/:price/:name", (req, res, next) => {
//   const cartID = req.user._id;
//   const newProductPrice = parseInt(req.params.price, 10);
//   const newProduct = {
//     _id: req.params.id,
//     price: newProductPrice,
//     name: req.params.name,
//     quantity: 1,
//   };

//   Cart.findById(cartID)
//     .exec()
//     .then((cart) => {
//       if (!cart) {
//         const newCart = new Cart({
//           _id: cartID,
//           totalquantity: 1,
//           totalPrice: newProductPrice,
//           selectedProduct: [newProduct],
//         });
//         return newCart.save();
//       }

//       // هنا نحدد الـ indexOfProduct
//       let indexOfProduct = -1;
//       for (let i = 0; i < cart.selectedProduct.length; i++) {
//         if (req.params.id === cart.selectedProduct[i]._id) {
//           indexOfProduct = i;
//           break;
//         }
//       }

//       // الآن نقوم بالتحقق من indexOfProduct
//       if (indexOfProduct >= 0) {
//         console.log(indexOfProduct);
//       } else {
//         cart.totalquantity = cart.totalquantity + 1;
//         cart.totalPrice = cart.totalPrice + newProductPrice;
//         cart.selectedProduct.push(newProduct);
//         cart.createAt = Date.now();

//         // هنا سنقوم بحفظ التغييرات
//         return cart.save();
//       }
//     })
//     .then((savedCart) => {
//       if (savedCart) {
//         console.log(savedCart);
//         res.redirect("/");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get('/addToCart/:id/:price/:name', (req, res, next) => {
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
      } else {
        let indexOfProduct = -1;
        for (let i = 0; i < cart.selectedProduct.length; i++) {
          if (req.params.id === cart.selectedProduct[i]._id) {
            indexOfProduct = i;
            break;
          }
        }

        if (indexOfProduct >= 0) {
          cart.selectedProduct[indexOfProduct].quantity += 1;
          cart.selectedProduct[indexOfProduct].price += newProductPrice;
          cart.totalquantity += 1;
          cart.totalPrice += newProductPrice;
        } else {
          cart.totalquantity += 1;
          cart.totalPrice += newProductPrice;
          cart.selectedProduct.push(newProduct);
        }
        return cart.save();
      }
    })
    .then((savedCart) => {
      console.log(savedCart);  
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/');
    });
});




module.exports = router;
