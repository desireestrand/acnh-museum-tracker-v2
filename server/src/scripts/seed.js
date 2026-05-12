import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../models/Item.js";

import bugs from "../data/bugs.json" with { type: "json" };
import fish from "../data/fish.json" with { type: "json" };
import fossils from "../data/fossils.json" with { type: "json" };
import art from "../data/art.json" with { type: "json" };
import seacreatures from "../data/seacreatures.json" with { type: "json" };

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });

const transformItem = (item, category) => ({
  fileId: item.id ?? null,
  fileName: item["file-name"],
  category,
  nameEn: item.name["name-USen"],
  imageUri: item.image_uri ?? null,
  iconUri: item.icon_uri ?? null,
  price: item.price ?? null,
  availability: item.availability ?? null,
  hasFake: item.hasFake ?? null,
  museumPhrase: item["museum-phrase"] ?? null,
  partOf: item["part-of"] ?? null,
});

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Item.deleteMany({});
    console.log("Cleared existing items");

    const items = [
      ...bugs.map((item) => transformItem(item, "bug")),
      ...fish.map((item) => transformItem(item, "fish")),
      ...fossils.map((item) => transformItem(item, "fossil")),
      ...art.map((item) => transformItem(item, "art")),
      ...seacreatures.map((item) => transformItem(item, "seacreature")),
    ];

    await Item.insertMany(items);
    console.log(`Seeded ${items.length} items`);

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
