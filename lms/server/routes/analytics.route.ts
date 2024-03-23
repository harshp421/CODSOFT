import express from 'express';
import { getCourceAnalytics, getOrderAnalytics, getUserAnalytics } from '../controller/analytics.controller';
import { authenticationRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controller/user.controller';
const analyticsRouter = express.Router();


analyticsRouter.get('/get-user-all-analytics', updateAccessToken,isAuthenticated,authenticationRoles("admin"),getUserAnalytics)
analyticsRouter.get('/get-cource-all-analytics',updateAccessToken, isAuthenticated,authenticationRoles("admin"),getCourceAnalytics)
analyticsRouter.get('/get-order-all-analytics', updateAccessToken,isAuthenticated,authenticationRoles("admin"),getOrderAnalytics)


export default analyticsRouter;