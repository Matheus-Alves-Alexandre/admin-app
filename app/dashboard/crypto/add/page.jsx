import { addCrypto } from "@/app/lib/actions/crypto.action";
import { addStock } from "@/app/lib/actions/stocks.action";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddCriptoPage = () => {
  return (
    <div className={styles.container}>
      <form action={addCrypto} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <input type="text" placeholder="code" name="code" required />
        <input type="number" placeholder="quantity" name="quantity" required />
        <input type="number" placeholder="purchasePrice" name="purchasePrice" />
        <input type="number" placeholder="currentPrice" name="currentPrice" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCriptoPage;
