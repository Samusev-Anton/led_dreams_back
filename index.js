const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const router = require("./routes/index");
const models = require("./models/models");
const sequalize = require("./db");
const handleError = require("./middlewares/handleError");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
app.use(handleError);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Working!!!" });
// });

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
