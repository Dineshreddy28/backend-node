const express = require("express");

const app = express();
const dotEnv = require("dotenv");

const mongoose = require("mongoose");
const VendorRoute = require("./routes/VendorRoutes");
const ProductRoute = require("./routes/ProductRoutes");
const bodyparser = require("body-parser");
const FirmRoute = require("./routes/FirmRoutes");
const PORT = 4000;

dotEnv.config();
mongoose
  .connect(process.env.mongo)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));
app.use(bodyparser.json());
app.use("/vendor", VendorRoute);
app.use("/firm", FirmRoute);
app.use("/product", ProductRoute);

app.listen(PORT, () => {
  console.log(`Server started running at ${PORT}`);
});

app.use("/home", (req, res) => {
  res.send("<h1> Welcome to Swiggy");
});
