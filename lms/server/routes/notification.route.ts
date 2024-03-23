import express from 'express';
import { getNotifications, updateNotification } from '../controller/notification.controller';
import { authenticationRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controller/user.controller';


const notificationRouter = express.Router();


notificationRouter.get('/get-all-notifications',updateAccessToken,isAuthenticated,authenticationRoles("admin"),getNotifications);
notificationRouter.put('/update-notifications/:id',updateAccessToken,isAuthenticated,authenticationRoles("admin"),updateNotification);

export default notificationRouter;