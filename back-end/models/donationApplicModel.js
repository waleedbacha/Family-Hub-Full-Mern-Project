import mongoose from "mongoose";

const donApplicationSchema = mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant Name is required"],
    },
    phoneNumber: { type: Number },
    address: { type: String },
    purpose: { type: String, requied: true },
    description: { type: String, required: true },
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const donAppliModel = mongoose.model(
  "Application",
  donApplicationSchema
);
