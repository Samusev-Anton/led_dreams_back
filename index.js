const express = require("express");

require("dotenv").config();

const sequalize = require("./db");

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await sequalize.authenticate();
    await sequalize.sync();
    app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
