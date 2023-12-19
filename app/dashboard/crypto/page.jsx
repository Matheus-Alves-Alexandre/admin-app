import { deleteCrypto } from "@/app/lib/actions/crypto.action";
import { deleteStocks } from "@/app/lib/actions/stocks.action";
import { fetchCryptos } from "@/app/lib/data/crypto.data";
import { fetchStocks } from "@/app/lib/data/stocks.data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

const CriptoPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, crypto } = await fetchCryptos(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/crypto/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>title</td>
            <td>quantity</td>
            <td>code</td>
            <td>purchasePrice</td>
            <td>currentPrice</td>
          </tr>
        </thead>

        <tbody>
          {crypto.map((cryptos) => (
            <tr key={cryptos.id}>
              <td>
                <div className={styles.user}>{cryptos.title}</div>
              </td>
              <td>{cryptos.quantity}</td>
              <td>{cryptos.code}</td>
              <td>{cryptos.purchasePrice}</td>
              <td>{cryptos.currentPrice}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/crypto/${cryptos.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCrypto}>
                    <input type="hidden" name="id" value={cryptos.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        {/*  <Pagination count={count} /> */}
      </table>
    </div>
  );
};

export default CriptoPage;
