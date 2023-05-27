const Router = require("express");
const router = new Router();
const { getBrands, addBrand } = require("../controllers/brandController");
const getRoleMiddleware = require("../middlewares/getRoleMiddleware");

router.post("/", getRoleMiddleware("ADMIN"), addBrand);
router.get("/", getBrands);

module.exports = router;
