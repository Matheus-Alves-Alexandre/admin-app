import { updateProduct } from "@/app/lib/actions";
import { updateCrypto } from "@/app/lib/actions/crypto.action";
import { updateStock } from "@/app/lib/actions/stocks.action";
import { fetchProduct } from "@/app/lib/data";
import { fetchCrypto } from "@/app/lib/data/crypto.data";
import { fetchStock } from "@/app/lib/data/stocks.data";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleCryptoPage = async ({ params }) => {
  const { id } = params;
  const crypto = await fetchCrypto(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{crypto.title}</div>
      <div className={styles.formContainer}>
        <form action={updateCrypto} className={styles.form}>
          <input type="hidden" name="id" value={crypto.id} />
          <input type="text" name="title" placeholder={crypto.title} />
          <input type="number" name="quantity" placeholder={crypto.quantity} />
          <input
            type="number"
            placeholder={crypto.purchasePrice}
            name="purchasePrice"
          />
          <input
            type="number"
            placeholder={crypto.currentPrice}
            name="currentPrice"
          />
          <input type="number" placeholder={crypto.code} name="investedValue" />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCryptoPage;
