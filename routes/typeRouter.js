const Router = require("express");
const router = new Router();

const { getTypes, addType } = require("../controllers/typeController");
const getRoleMiddleware = require("../middlewares/getRoleMiddleware");

router.post("/", getRoleMiddleware("ADMIN"), addType);
router.get("/", getTypes);

module.exports = router;
