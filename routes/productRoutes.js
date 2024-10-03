import express from "express";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  addToWishlist,
  rating,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, upload.single("url"), createProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProduct);
productRouter.post("/addToWishlist/:productID", authMiddleware, addToWishlist);
productRouter.post("/rating", authMiddleware, rating);

export default productRouter;
