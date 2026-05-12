import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../models/Item.js";
import User from "../models/User.js";
import Donation from "../models/Donation.js";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });
const teardown = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Item.deleteMany({});
    await User.deleteMany({});
    await Donation.deleteMany({});
    console.log("Database cleared");

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

teardown();
