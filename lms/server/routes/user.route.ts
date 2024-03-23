import express from 'express';
import { activateAccount, deleteUser, getAllUsers, getUserinfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateProfilePicture, updateUserInfo, updateUserPassword, updateUserRole } from '../controller/user.controller';
import { authenticationRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post("/activation",activateAccount );

userRouter.post("/login",loginUser );

userRouter.get('/logout',isAuthenticated , logoutUser)

userRouter.get("/refresh",updateAccessToken)

userRouter.get('/me',updateAccessToken,isAuthenticated,getUserinfo);

userRouter.post('/social-auth',socialAuth);

userRouter.put('/update-user-info',updateAccessToken,isAuthenticated,updateUserInfo);

userRouter.put('/update-user-password',updateAccessToken,isAuthenticated,updateUserPassword);

userRouter.put('/update-user-avatar',updateAccessToken,isAuthenticated,updateProfilePicture);

userRouter.get('/get-all-users',updateAccessToken,isAuthenticated,authenticationRoles("admin"),getAllUsers);

userRouter.put('/update-user-role',updateAccessToken,isAuthenticated,authenticationRoles("admin"),updateUserRole);
userRouter.put('/delete-user',updateAccessToken,isAuthenticated,authenticationRoles("admin"),deleteUser);
export default userRouter;