const Router = require("express");
const router = new Router();
const {
  getDevice,
  getDeviceById,
  addDevice,
} = require("../controllers/deviceController");

router.post("/", addDevice);
router.get("/", getDevice);
router.get("/:id", getDeviceById);

module.exports = router;
