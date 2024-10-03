import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import ecomRouter from "./routes/ecomRoutes.js";
import productRouter from "./routes/productRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import cartRouter from "./routes/couponRoutes.js";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // This allows the server to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods
};
// {
//   Authorization: Bearer 34rddit8034fioe905rueiohfioew8y54894efhuoewihr8943hfiuo4tu
// }

const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ecomRouter);
app.use("/api/product", productRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/cart", cartRouter);

try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ihir0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  );
  app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
} catch (err) {
  console.log(err);
}
