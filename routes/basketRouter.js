const Router = require("express");
const router = new Router();
const { getBasket, addToBasket } = require("../controllers/basketController");

router.post("/", addToBasket);
router.get("/", getBasket);

module.exports = router;
