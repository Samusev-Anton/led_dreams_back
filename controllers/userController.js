class UserController {
  async registration(req, res) {}

  async signin(req, res) {}

  async logout(req, res) {}

  async current(req, res) {
    res.status(200).json("wegwaveih");
  }
}

module.exports = new UserController();
