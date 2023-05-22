const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const { User, Basket } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("All fields must be full"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest(`User thif ${email} already exist;`));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, email, user.role);
    return res.status(201).json({ result: { user, basket, token } });
  }

  async signin(req, res) {}

  async logout(req, res) {}

  async current(req, res) {
    res.status(200).json("wegwaveih");
  }
}

module.exports = new UserController();
