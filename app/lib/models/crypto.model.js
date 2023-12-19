import mongoose from "mongoose";
const cryptoWalletSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    code: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    purchasePrice: {
      type: Number,
    },
    currentPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Crypto =
  mongoose.models.Crypto || mongoose.model("Crypto", cryptoWalletSchema);
