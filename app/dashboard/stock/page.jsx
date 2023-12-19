import { deleteUser } from "@/app/lib/actions";
import { deleteStocks } from "@/app/lib/actions/stocks.action";
import { fetchStocks } from "@/app/lib/data/stocks.data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const StoksPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, stock } = await fetchStocks(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/stock/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>title</td>
            <td>quantity</td>
            <td>purchasePrice</td>
            <td>currentPrice</td>
            <td>investedValue</td>
            <td>priceVariation</td>
            <td>sector</td>
            <td>dividends</td>
          </tr>
        </thead>

        <tbody>
          {stock.map((stocks) => (
            <tr key={stocks.id}>
              <td>
                <div className={styles.user}>{stocks.title}</div>
              </td>
              <td>{stocks.quantity}</td>
              <td>{stocks.purchasePrice}</td>
              <td>{stocks.currentPrice}</td>
              <td>{stocks.investedValue}</td>
              <td>{stocks.priceVariation}</td>
              <td>{stocks.sector}</td>
              <td>{stocks.dividends}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/stock/${stocks.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteStocks}>
                    <input type="hidden" name="id" value={stocks.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default StoksPage;
