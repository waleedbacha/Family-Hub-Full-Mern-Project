import express from 'express';
import { getAllApplications, getApplicationById, getApplicationByIdAndDelete, getApplicationByIdAndUpdate, postApplication } from '../controllers/donationAppliController.js';
import { authorize, userAuthenticator } from '../middlewares/authenticators/authenticator.js';


const donAppliRoutes = express.Router();

donAppliRoutes
.post('/',userAuthenticator,authorize("create:scholarships"), postApplication)
.get('/' , userAuthenticator,authorize("read:scholarships"),getAllApplications)
.get('/:id' , userAuthenticator,authorize("read:scholarships"),getApplicationById)
.put('/:id' , userAuthenticator,authorize("update:scholarships"),getApplicationByIdAndUpdate)
.delete('/:id' , userAuthenticator,authorize("delete:scholarships"),getApplicationByIdAndDelete);

export default donAppliRoutes;