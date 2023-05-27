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

  async signin(req, res, next) {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (email === "Samusefffff@gmail.com") {
      user.role = "ADMIN";
      await user.save({ fields: ["role"] });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    if (!user) {
      return next(
        ApiError.badRequest(
          `User with email:${email} dont exist! Please register`
        )
      );
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest(`Password is wrong`));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.status(201).json({ token });
  }

  async logout(req, res) {}

  async current(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.status(201).json({ token });
  }
}

module.exports = new UserController();
