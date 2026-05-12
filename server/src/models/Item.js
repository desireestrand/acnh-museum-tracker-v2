import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    "month-northern": String,
    "month-southern": String,
    time: String,
    isAllDay: Boolean,
    isAllYear: Boolean,
    location: String,
    rarity: String,
    "month-array-northern": [Number],
    "month-array-southern": [Number],
    "time-array": [Number],
  },
  { _id: false },
);

const itemSchema = new mongoose.Schema(
  {
    fileId: Number,
    fileName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["bug", "fish", "fossil", "art", "seacreature"],
    },
    nameEn: {
      type: String,
      required: true,
    },
    imageUri: String,
    iconUri: String,
    price: Number,
    availability: availabilitySchema,
    hasFake: Boolean,
    museumPhrase: String,
    partOf: String,
  },
  { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
