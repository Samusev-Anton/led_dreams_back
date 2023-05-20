const uuid = require("uuid");
const path = require("path");
const { Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async getDevice(req, res, next) {
    let { brandId, typeId, limit = 9, page = 1 } = req.query;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.status(200).json(devices);
  }

  async addDevice(req, res, next) {
    try {
      const { name, price, brandId, typeId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + "." + "jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      return res.status(201).json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getDeviceById(req, res) {}
}

module.exports = new DeviceController();
