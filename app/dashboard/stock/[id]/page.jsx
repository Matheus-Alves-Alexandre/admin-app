import { updateProduct } from "@/app/lib/actions";
import { updateStock } from "@/app/lib/actions/stocks.action";
import { fetchProduct } from "@/app/lib/data";
import { fetchStock } from "@/app/lib/data/stocks.data";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleStockPage = async ({ params }) => {
  const { id } = params;
  const stock = await fetchStock(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{stock.title}</div>
      <div className={styles.formContainer}>
        <form action={updateStock} className={styles.form}>
          <input type="hidden" name="id" value={stock.id} />
          <input type="text" name="title" placeholder={stock.title} />
          <label>Title</label>
          <input type="number" name="quantity" placeholder={stock.quantity} />
          <input
            type="number"
            placeholder={stock.purchasePrice}
            name="purchasePrice"
          />
          <input
            type="number"
            placeholder={stock.currentPrice}
            name="currentPrice"
          />
          <input
            type="number"
            placeholder={stock.investedValue}
            name="investedValue"
          />
          <input
            type="number"
            placeholder={stock.priceVariation}
            name="priceVariation"
          />{" "}
          <input type="text" placeholder={stock.sector} name="sector" />
          <input type="number" placeholder={stock.dividends} name="dividends" />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleStockPage;
