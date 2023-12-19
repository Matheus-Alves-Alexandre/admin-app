"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { redirect } from "next/navigation";
import { Stock } from "../models/stocks.model";
export const addStock = async (formData) => {
  const {
    title,
    quantity,
    purchasePrice,
    currentPrice,
    investedValue,
    priceVariation,
    purchaseDate,
    sector,
    dividends,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const newStock = new Stock({
      title,
      quantity,
      purchasePrice,
      currentPrice,
      investedValue,
      priceVariation,
      sector,
      dividends,
    });

    await newStock.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Stock!");
  }

  revalidatePath("/dashboard/stock");
  redirect("/dashboard/stock");
};
export const deleteStocks = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Stock.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/stock");
};

export const updateStock = async (formData) => {
  const {
    id,
    title,
    quantity,
    purchasePrice,
    currentPrice,
    investedValue,
    priceVariation,
    sector,
    dividends,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      quantity,
      purchasePrice,
      currentPrice,
      investedValue,
      priceVariation,
      sector,
      dividends,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Stock.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Stock!");
  }

  revalidatePath("/dashboard/stock");
  redirect("/dashboard/stock");
};
