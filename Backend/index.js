const express = require("express");

const app = express();
const dotEnv = require("dotenv");

const mongoose = require("mongoose");
const VendorRoute = require("./routes/VendorRoutes");
const ProductRoute = require("./routes/ProductRoutes");
const bodyparser = require("body-parser");
const FirmRoute = require("./routes/FirmRoutes");
const cors=require("cors");
const PORT = process.env.PORT || 4000;

console.log("Connection String: " + process.env.Mongo);
dotEnv.config();
app.use(cors())
mongoose
  .connect(process.env.Mongo)
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
