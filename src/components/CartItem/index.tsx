import styles from "../../styles/Cart.module.scss"
import {ICartItem} from "@/store/slices/cartSlice";
import {FC} from "react";

type Props = {
    item: ICartItem
}

export const CartItem:FC<Props> = ({ item }) => {
    return (
        <div className={styles.cartItem}>
            <p className={styles.title}>
                {item.title}
            </p>
            <div className={styles.wrapper}>
                <p className={styles.quantity}>
                    x{item.quantity}
                </p>
                <p className={styles.price}>
                    {item.price} ₽
                </p>
            </div>
        </div>
    );
};