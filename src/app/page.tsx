import styles from "./page.module.css";
import { Reviews } from "@/components/Reviews";
import { Products } from "@/components/Products";
import Cart from "@/components/Cart";
import {getReviews} from "@/api/getReviews";
import {getProducts} from "@/api/getProducts";

export default async function Home() {
    const reviews = await getReviews();
    const products = await getProducts();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>
                тестовое задание
            </h1>
            <main className={styles.main}>
                <Reviews reviews={reviews} />
                <Cart />
                <Products initialProducts={products} />
            </main>
        </div>
    );
}
