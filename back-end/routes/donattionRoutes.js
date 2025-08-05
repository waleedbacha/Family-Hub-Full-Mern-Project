import express from 'express'
import { getAllDonations, getdonationById, getdonationByIdAndDelete, getdonationByIdAndUpdate, postdonation } from '../controllers/donationController.js';
import { authorize, userAuthenticator } from '../middlewares/authenticators/authenticator.js';



const donationRoutes = express.Router();

donationRoutes
.post('/',userAuthenticator,authorize("create:donations"), postdonation)
.get('/' , userAuthenticator,authorize("read:donations"),getAllDonations)
.get('/:id' , userAuthenticator,authorize("read:donations"),getdonationById)
.put('/:id' , userAuthenticator,authorize("update:donations"),getdonationByIdAndUpdate)
.delete('/:id' , userAuthenticator,authorize("delete:donations"),getdonationByIdAndDelete);

export default donationRoutes;