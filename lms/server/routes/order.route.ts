import express from "express";
import { createOrder, getAllOrdersAdmin, newPayment, sendStripePublicKey } from "../controller/order.controller";
import { authenticationRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controller/user.controller";

const orderRouter = express.Router();

orderRouter.post("/new-order",updateAccessToken,isAuthenticated ,createOrder);
orderRouter.get("/get-all-orders",updateAccessToken,isAuthenticated ,authenticationRoles("admin"),getAllOrdersAdmin);
orderRouter.get("/payment/sendPublicKey",updateAccessToken,isAuthenticated ,sendStripePublicKey);
orderRouter.post("/payment/newpayment",updateAccessToken,isAuthenticated ,newPayment);
export default orderRouter;