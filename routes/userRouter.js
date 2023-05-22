const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const {
  registration,
  signin,
  logout,
  current,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registration", registration);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/current", authMiddleware, current);

module.exports = router;
