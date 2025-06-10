'use client'

import { FC } from "react";
import { Product } from "@/components/Product";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import styles from "../../styles/Products.module.scss";
import {IProduct} from "@/api/getProducts";
import {Loader} from "@/components/Loader";

type Props = {
    initialProducts: IProduct[];
};

export const Products: FC<Props> = ({ initialProducts }) => {
    const { products, loading, hasMore } = useInfiniteScroll({
        initialProducts,
        fetchUrl: "http://o-complex.com:1337/products",
    });

    return (
        <>
            <h2>Товары</h2>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            {loading && <Loader />}

            {hasMore && !loading && <div id="load-more"></div>}
        </>
    );
};
