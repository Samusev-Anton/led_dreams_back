const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const {
  registration,
  signin,
  logout,
  current,
} = require("../controllers/userController");

router.post("/registration", registration);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/current", current);

module.exports = router;
