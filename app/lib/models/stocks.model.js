import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    investedValue: {
      type: Number,
    },
    priceVariation: {
      type: Number,
    },
    sector: {
      type: String,
    },
    dividends: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Stock =
  mongoose.models.Stock || mongoose.model("Stock", stockSchema);
