const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categories = require("./categories");
const user = require("./user")
const order = require("./orders")

const router = Router();

router.use('/products', productRouter);
router.use('/categories',categories);
router.use('/users',user);
router.use('/orders',order);

module.exports = router;
