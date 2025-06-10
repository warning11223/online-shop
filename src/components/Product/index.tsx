import styles from "../../styles/Products.module.scss";
import React, {FC, useState} from "react";
import {UIButton} from "@/components/ui/UIButton";
import {useDispatch} from "react-redux";
import {addToCart, updateCartItemQuantity} from "@/store/slices/cartSlice";
import {IProduct} from "@/api/getProducts";

type Props = {
    product: IProduct;
};

export const Product: FC<Props> = ({product}) => {
    const [showAddBtns, setShowAddBtns] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const dispatch = useDispatch();

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(updateCartItemQuantity({ id: product.id, quantity: newQuantity }));
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            dispatch(updateCartItemQuantity({ id: product.id, quantity: newQuantity }));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Проверяем, что введены только цифры
        if (/^\d*$/.test(value)) {
            const newQuantity = value === '' ? 1 : Math.max(1, parseInt(value, 10));
            setQuantity(newQuantity);
            // Обновляем количество товара в Redux
            dispatch(updateCartItemQuantity({ id: product.id, quantity: newQuantity }));
        }
    };
    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                quantity: quantity,
                price: product.price,
            })
        );
    };

    const handleBuyClick = () => {
        setShowAddBtns(true);
        handleAddToCart();
    }

    return (
        <div className={styles.product}>
            {/* Убрал <Image />, так как он не отображает .svg */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image_url} alt={product.title}/>

            <p className={styles.title}>
                {product.title}
            </p>
            <p className={styles.desc}>
                {product.description}
            </p>
            <p className={styles.price}>
                Цена: {product.price} ₽
            </p>

            {/* Кнопки + и - для изменения количества */}
            {showAddBtns && (
                <div className={styles.quantityControl}>
                    <UIButton
                        className={styles.quantityDecreaseBtn}
                        onClick={handleDecrease}
                    >
                        -
                    </UIButton>
                    <input
                        name={`${product.id}-quantity-input`}
                        type="text"
                        value={quantity}
                        onChange={handleChange}
                        className={styles.quantityInput}
                    />
                    <UIButton
                        className={styles.quantityIncreaseBtn}
                        onClick={handleIncrease}
                    >
                        +
                    </UIButton>
                </div>
            )}

            {/* Кнопка для добавления в корзину */}
            {!showAddBtns && (
                <UIButton onClick={handleBuyClick}>
                    Купить
                </UIButton>
            )}
        </div>
    );
};
