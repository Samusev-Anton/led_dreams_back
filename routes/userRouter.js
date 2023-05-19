const Router = require("express");
const router = new Router();

router.post("/registration");
router.post("/signin");
router.post("/logout");
router.get("/current", (req, res) => {
  res.status(200).json({ message: "Yes" });
});

module.exports = router;
