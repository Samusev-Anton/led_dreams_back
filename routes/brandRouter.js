const Router = require("express");
const router = new Router();
const { getBrands, addBrand } = require("../controllers/brandController");

router.post("/", addBrand);
router.get("/", getBrands);

module.exports = router;
