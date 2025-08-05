import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    age: { type: Number, required: [true, "Age is required"] },
    address: { type: String, required: [true, "Address is required"] },
    phone_number: {
      type: Number,
      required: [true, "phone_number is required"],
    },
    image: { type: String },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be greater than 4 characters"],
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    permissions: {
      type: [String],
      default: [
        "read:familyHistory",
        "create:familyHistory",
        "update:familyHistory",
        "delete:familyHistory",

        // Marketplace
        "read:marketplace",
        "create:marketplace",
        "update:marketplace",
        "delete:marketplace",

        // Success Stories
        "read:stories",
        "create:stories",
        "update:stories",
        "delete:stories",

        // Scholarships
        "read:scholarships",
        "create:scholarships",
        "update:scholarships",
        "delete:scholarships",

        // Donations
        "read:donations",
        "create:donations",
        "update:donations",
        "delete:donations",

        // Users
        "read:users",
        "update:users",
        "delete:users",
        "edit:users",
      ],
    },
  },
  { timestamps: true }
);

// PASSWORD HASHING USING BCRYPT
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password);
};

export const userModel = mongoose.model("User", userSchema);
