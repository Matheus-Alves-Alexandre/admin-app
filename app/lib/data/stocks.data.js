import { Stock } from "../models/stocks.model";
import { connectToDB } from "../utils";

export const fetchStocks = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();

    const count = await Stock.find({ title: { $regex: regex } }).count();
    const stock = await Stock.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, stock };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stock!");
  }
};
export const fetchStock = async (id) => {
  try {
    connectToDB();
    const stock = await Stock.findById(id);
    return stock;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stock!");
  }
};
export const fetchStocksTotal = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();

    const total = await Stock.find({ title: { $regex: regex } });
    return { total };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stock!");
  }
};
