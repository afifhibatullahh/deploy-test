const express = require("express");
const fileUpload = require("express-fileupload");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database conntection failed. ", err);
  });
