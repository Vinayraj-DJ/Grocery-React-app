import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  createPaymentIntent,
  getAllOrders,
  getUserOrders,
  getSellerOrders,
  placeOrderCOD,
  updateOrderStatus,
} from "../controller/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();
router.post("/cod", authUser, placeOrderCOD);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getSellerOrders);
router.post("/status", authSeller, updateOrderStatus);
router.post("/create-payment-intent", authUser, createPaymentIntent);

export default router;
