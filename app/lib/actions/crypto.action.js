"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { redirect } from "next/navigation";
import { Stock } from "../models/stocks.model";
import { Crypto } from "../models/crypto.model";
export const addCrypto = async (formData) => {
  const { title, code, quantity, purchasePrice, currentPrice } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newCrypto = new Crypto({
      title,
      code,
      quantity,
      purchasePrice,
      currentPrice,
    });

    await newCrypto.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Crypto!");
  }

  revalidatePath("/dashboard/crypto");
  redirect("/dashboard/crypto");
};
export const deleteCrypto = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Crypto.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Crypto!");
  }

  revalidatePath("/dashboard/crypto");
};

export const updateCrypto = async (formData) => {
  const { id, title, code, quantity, purchasePrice, currentPrice } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      code,
      quantity,
      purchasePrice,
      currentPrice,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Crypto.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Crypto!");
  }

  revalidatePath("/dashboard/crypto");
  redirect("/dashboard/crypto");
};
