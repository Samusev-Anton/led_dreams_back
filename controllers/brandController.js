const { Brand } = require("../models/models");

class BrandController {
  async getBrands(req, res) {
    const brand = await Brand.findAll();
    return res.status(201).json(brand);
  }

  async addBrand(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.status(201).json(brand);
  }
}

module.exports = new BrandController();
