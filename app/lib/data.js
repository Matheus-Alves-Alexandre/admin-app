import { fetchCryptoTotal } from "./data/crypto.data";
import { fetchStocksTotal } from "./data/stocks.data";
import { Acoes, Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA
/* async function obterPrecoBitcoin() {
  const url = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    const preco = data?.bpi?.USD?.rate;
    if (preco === undefined) {
      throw new Error("Dados inesperados na resposta da API");
    }

    // Remova a vírgula e converta para número
    return parseFloat(preco.replace(/,/g, ""));
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    throw error;
  }
}
 */
export async function Teste() {
  const q = "";
  let totalStock = 0;
  const stock = await fetchStocksTotal(q);
  if (stock && stock.total && Array.isArray(stock.total)) {
    totalStock = stock.total.reduce((acc, a) => acc + a.investedValue, 0);
  }
  let totalCrypto = 0;
  const crypto = await fetchCryptoTotal(q);
  if (crypto && crypto.total && Array.isArray(stock.total)) {
    totalCrypto = crypto.total.reduce((acc, a) => acc + a.purchasePrice, 0);
  }

  let totalRevenue = 0;
  /* const crypto = await fetchCryptoTotal(q); */ /* 
  if (crypto && crypto.total && Array.isArray(stock.total)) {
    totalCrypto = crypto.total.reduce((acc, a) => acc + a.purchasePrice, 0);
  } */
  totalRevenue = totalCrypto + totalStock;
  const cards = [
    {
      id: 1,
      title: "Preço Bitcoin",
      number: totalCrypto,
      change: 12,
    },
    {
      id: 2,
      title: "Stock",
      number: totalStock,
      change: -2,
    },
    {
      id: 3,
      title: "Revenue",
      number: totalRevenue,
      change: 18,
    },
  ];
  return cards;
}
