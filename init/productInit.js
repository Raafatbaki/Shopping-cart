const Product = require("../models/product");
const mongoose = require("mongoose");

const products = [
  new Product({
    imagePath:
      "/images/Huawei Y9 2019 Dual SIM - 64GB, 4GB RAM, 4G LTE, Arabic Blue.jpg",
    productName: "Huawei Y9",
    information: {
      storageCapacity: 64,
      numberOfSIM: "Dual SIM",
      cameraResolution: 16,
      displaySize: 6.5,
    },
    price: 220,
  }),

  new Product({
    imagePath:
      "/images/Apple iPhone X with FaceTime - 64GB, 4G LTE, Space Grey.jpg",
    productName: "Apple iPhone X",
    information: {
      storageCapacity: 64,
      numberOfSIM: "Dual SIM",
      cameraResolution: 12,
      displaySize: 5.5,
    },
    price: 200,
  }),

  new Product({
    imagePath: "/images/Oppo A3S Dual SIM - 16GB, 2GB RAM, 4G LTE, Purple.jpg",
    productName: "Oppo A3S",
    information: {
      storageCapacity: 64,
      numberOfSIM: "Dual SIM",
      cameraResolution: 20,
      displaySize: 5.5,
    },
    price: 230,
  }),

  new Product({
    imagePath:
      "/images/Samsung Galaxy Note 9 Dual SIM - 128GB, 6GB RAM, 4G LTE, Midnight Black.jpg",
    productName: "Samsung Galaxy Note 9",
    information: {
      storageCapacity: 128,
      numberOfSIM: "Dual SIM",
      cameraResolution: 12,
      displaySize: 6.4,
    },
    price: 250,
  }),

  new Product({
    imagePath:
      "/images/Sony Xperia XZ1 Dual Sim - 64 GB, 4GB RAM, 4G LTE, Moonlight Blue.jpg",
    productName: "Sony Xperia XZ1",
    information: {
      storageCapacity: 64,
      numberOfSIM: "Dual SIM",
      cameraResolution: 19,
      displaySize: 5.2,
    },
    price: 180,
  }),

  new Product({
    imagePath:
      "/images/HTC Desire 10 Pro Dual Sim - 64GB, 4GB RAM, 4G LTE, Polar White.jpg",
    productName: "HTC Desire 10",
    information: {
      storageCapacity: 16,
      numberOfSIM: "Dual SIM",
      cameraResolution: 13,
      displaySize: 6.2,
    },
    price: 170,
  }),
];

let done = 0;

const saveProduct = async (product) => {
  try {
    const savedProduct = await product.save();
    console.log(savedProduct);
    done++;
    if (done === products.length) {
      mongoose.disconnect();
    }
  } catch (error) {
    console.log(error);
  }
};

const saveProducts = async () => {
  for (let i = 0; i < products.length; i++) {
    await saveProduct(products[i]);
  }
};

mongoose.connect("mongodb://127.0.0.1:27017/Shopping-cart", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
    saveProducts();
  })
  .catch((error) => {
    console.log(error);
  });
