import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  { timestamps: true },
);

donationSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export default mongoose.model("Donation", donationSchema);
