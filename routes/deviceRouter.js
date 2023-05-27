const Router = require("express");
const router = new Router();

const getRoleMiddleware = require("../middlewares/getRoleMiddleware");
const {
  getDevice,
  getDeviceById,
  addDevice,
} = require("../controllers/deviceController");

router.post("/", getRoleMiddleware("ADMIN"), addDevice);
router.get("/", getDevice);
router.get("/:id", getDeviceById);

module.exports = router;
