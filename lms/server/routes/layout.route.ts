import express from 'express';
import { CreateLayout, editLayout, getLayourByType } from '../controller/layout.controller';
import { authenticationRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controller/user.controller';
const layoutRouter = express.Router();



layoutRouter.post('/create-layout',updateAccessToken,isAuthenticated,authenticationRoles("admin"),CreateLayout);
layoutRouter.put('/edit-layout/:id',updateAccessToken,isAuthenticated,authenticationRoles("admin"),editLayout);
layoutRouter.get('/get-layout',getLayourByType);
export default layoutRouter;