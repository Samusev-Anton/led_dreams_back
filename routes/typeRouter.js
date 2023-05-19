const Router = require("express");
const router = new Router();
const { getTypes, addType } = require("../controllers/typeController");

router.post("/", addType);
router.get("/", getTypes);

module.exports = router;
