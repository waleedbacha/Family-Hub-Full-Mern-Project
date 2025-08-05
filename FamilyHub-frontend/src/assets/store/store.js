import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import userReducer from "../Slices/userSlice";
import donationReducer from "../Slices/donationSlice";
import scholarshipReducer from "../Slices/scholarshipSlice";
import SuccesstoryReducer from "../Slices/storySlice";
import familyHistoryReducer from "../Slices/familyHistorySlice";
import productReducer from "../Slices/productSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    donations: donationReducer,
    scholarships: scholarshipReducer,
    successtory: SuccesstoryReducer,
    familyHistory: familyHistoryReducer,
    products: productReducer,
  },
});
