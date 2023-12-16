import express from "express";
import { isAdmin, requireSignIn } from "../Middleware/authMiddleware.js";
import {
  orderSuccess,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productImageController,
  productListController,
  updateProductController,
} from "../Controler/productController.js";
import formidable from 'express-formidable';
const router = express.Router();

router.post(
  '/create-product', 
  formidable(),
  createProductController)


// FOR UPDATINGRoutes
router.put(
  "/update-product/:pid",
  formidable(),
  updateProductController
);

//getting all the products
router.get("/get-product", getProductController);

//single Product
router.get("/get-product/:slug", getSingleProductController);

//FOR GETTING IMAGES
router.get("/product-photo/:pid", productImageController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Filter Product
router.post("/product-filters", productFiltersController);

//FOR PAGINATION
router.get("/product-count", productCountController);

//PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

//PAYMENTS
router.post("/order/orderpost", orderSuccess);

export default router;
