const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async getTypes(req, res) {
    const type = await Type.findAll();
    return res.status(200).json(type);
  }

  async addType(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.status(201).json(type);
  }
}

module.exports = new TypeController();
