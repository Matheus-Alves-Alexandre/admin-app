import { Crypto } from "../models/crypto.model";
import { Stock } from "../models/stocks.model";
import { connectToDB } from "../utils";

export const fetchCryptos = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();

    const count = await Crypto.find({ title: { $regex: regex } }).count();
    const crypto = await Crypto.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, crypto };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch crypto!");
  }
};
export const fetchCrypto = async (id) => {
  try {
    connectToDB();
    const crypto = await Crypto.findById(id);
    return crypto;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch crypto!");
  }
};
export const fetchCryptoTotal = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();

    const total = await Crypto.find({ title: { $regex: regex } });
    return { total };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Crypto!");
  }
};
