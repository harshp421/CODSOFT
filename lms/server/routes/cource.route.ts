import express from 'express';
import { addAnswer, addQuestion, addReplyToReview, addReviewToCource, deleteCource, generateVideoUrl, getAllCources, getAllCourcesAdmin, getCourceByUser, getSingeCource, updateCource, uploadCource } from '../controller/cource.controller';
import { authenticationRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controller/user.controller';
const courceRouter=express.Router();

courceRouter.post('/create-cource',updateAccessToken,isAuthenticated,authenticationRoles("admin"),uploadCource);
courceRouter.put('/edit-cource/:id',updateAccessToken,isAuthenticated,authenticationRoles("admin"), updateCource);
courceRouter.get('/get-course/:id',getSingeCource);
courceRouter.get('/get-courses',getAllCources);
courceRouter.get('/get-course-content/:id',updateAccessToken,isAuthenticated,getCourceByUser);
courceRouter.put('/add-question',updateAccessToken,isAuthenticated,addQuestion);
courceRouter.put('/add-answer',updateAccessToken,isAuthenticated,addAnswer);
courceRouter.put('/add-review/:id',updateAccessToken,isAuthenticated,addReviewToCource);
courceRouter.put('/add-reply',updateAccessToken,isAuthenticated,authenticationRoles("admin"), addReplyToReview);
courceRouter.get('/get-all-course',updateAccessToken,isAuthenticated,authenticationRoles("admin"), getAllCourcesAdmin);
courceRouter.delete('/delete-cource/:courceId',updateAccessToken,isAuthenticated,authenticationRoles("admin"), deleteCource);
courceRouter.post("/getvdocipherotp",generateVideoUrl)
export default courceRouter;
