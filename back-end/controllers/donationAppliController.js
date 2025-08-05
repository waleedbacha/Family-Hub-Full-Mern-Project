import { donAppliModel } from "../models/donationApplicModel.js";
import { userModel } from "../models/userModel.js";
import { sendSMS } from "../utils/sendSms.js";

export const getAllApplications = async (req, res) => {
  try {
    const application = await donAppliModel
      .find()
      .populate("applicant", "name email address phone_number");
    res.status(200).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await donAppliModel
      .findById(req.params.id)
      .populate("applicant", "name email address phone_number ");
    application
      ? res.status(200).json(application)
      : res.status(400).send("Cannot found application by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getApplicationByIdAndUpdate = async (req, res) => {
  try {
    const application = await donAppliModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("applicant", "name email address phone_number");

    if (!application) {
      return res.status(400).send("Cannot Update application by this ID");
    }

    // Send SMS if status is updated
    const userPhone = application?.applicant?.phone_number;

    if (userPhone && req.body.status) {
      let message = "";
      if (req.body.status === "approved") {
        message =
          "🎉 Congratulations! Your scholarship application has been approved.";
      } else if (req.body.status === "rejected") {
        message =
          "We're sorry to inform you that your scholarship application has been rejected.";
      }

      if (message) {
        try {
          await sendSMS(`+${userPhone}`, message);
        } catch (smsErr) {
          console.error("SMS error:", smsErr.message);
        }
      }
    }

    res.status(200).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getApplicationByIdAndDelete = async (req, res) => {
  try {
    const application = await donAppliModel.findByIdAndDelete(req.params.id);
    application
      ? res.status(200).json(application)
      : res.status(400).send("Cannot Delete application by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postApplication = async (req, res) => {
  try {
    const { purpose, description, amount } = req.body;

    if (!purpose || !description || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const application = await donAppliModel.create({
      applicant: user._id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      purpose,
      description,
      amount,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
