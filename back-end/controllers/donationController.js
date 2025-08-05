import { donationModel } from "../models/donationModel.js";
import { userModel } from "../models/userModel.js";
import { sendSMS } from "../utils/sendSms.js";

export const getAllDonations = async (req, res) => {
  try {
    const donation = await donationModel
      .find()
      .populate("donor", "name email phone_number address");
    res.status(200).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getdonationById = async (req, res) => {
  try {
    const donation = await donationModel
      .findById(req.params.id)
      .populate("donor", "name email phone_number address");
    donation
      ? res.status(200).json(donation)
      : res.status(400).send("Cannot found donation by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getdonationByIdAndUpdate = async (req, res) => {
  try {
    const donation = await donationModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    donation
      ? res.status(200).json(donation)
      : res.status(400).send("Cannot Update donation by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getdonationByIdAndDelete = async (req, res) => {
  try {
    const donation = await donationModel.findByIdAndDelete(req.params.id);
    donation
      ? res.status(200).json(donation)
      : res.status(400).send("Cannot Delete donation by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postdonation = async (req, res) => {
  try {
    const { amount, message } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const donation = await donationModel.create({
      donor: user._id,
      phone: user.phone_number,
      address: user.address,
      amount,
      message,
    });

    await sendSMS(
      `+${user.phone_number}`,
      `Thank you! Your donation of Rs. ${amount} was successful.`
    );

    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
