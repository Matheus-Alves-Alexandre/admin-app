import { addStock } from "@/app/lib/actions/stocks.action";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddStockPage = () => {
  return (
    <div className={styles.container}>
      <form action={addStock} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <input type="number" placeholder="quantity" name="quantity" required />
        <input type="number" placeholder="purchasePrice" name="purchasePrice" />
        <input type="number" placeholder="currentPrice" name="currentPrice" />
        <input type="number" placeholder="investedValue" name="investedValue" />
        <input
          type="number"
          placeholder="priceVariation"
          name="priceVariation"
        />{" "}
        <input type="text" placeholder="sector" name="sector" />
        <input type="number" placeholder="dividends" name="dividends" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStockPage;
