'use client'

import styles from "../../styles/Cart.module.scss";
import { CartItem } from "../CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UIButton } from "@/components/ui/UIButton";
import { InputMask } from "@react-input/mask";
import React, { useState } from "react";
import {clearCart, setPhoneNumber} from "@/store/slices/cartSlice";
import {toast} from "react-toastify";
import {Loader} from "@/components/Loader";
import {submitOrder} from "@/api/submitOrder";

const Cart = () => {
    const { items, phoneNumber } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Обработчик изменения номера телефона
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        dispatch(setPhoneNumber(e.target.value));
    };

    // Функция отправки запроса для оформления заказа
    const handleOrderSubmit = async () => {
        if (!phoneNumber || phoneNumber.length < 18) {
            setError("Пожалуйста, введите правильный номер телефона");
            return;
        }

        if (items.length === 0) {
            toast.error("В корзине нет товаров");
            return;
        }

        setLoading(true);
        setError(null);

        // Формируем тело запроса
        const orderData = {
            phone: phoneNumber.replace(/\D/g, ""),
            cart: items.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
        };

        try {
            const data = await submitOrder(orderData);

            if (data.success === 1) {
                toast.success("Заказ оформлен успешно!");
                dispatch(setPhoneNumber(''));
                dispatch(clearCart());
            } else {
                toast.error(data.error || "Произошла ошибка при оформлении заказа");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Неизвестная ошибка.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Корзина</h2>
            <div className={styles.cart}>
                <p className={styles.title}>Добавленные товары</p>
                {items?.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
                <div className={styles.container}>
                    {error && <p className={styles.error}>{error}</p>}
                    <InputMask
                        name="cart-input"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className={`${styles.numberInput} ${error && styles.errorInput}`}
                        mask="+_ (___) ___-__-__"
                        replacement={{ _: /\d/ }}
                        placeholder="+7 (___) ___-__-__"
                    />
                    <UIButton
                        className={styles.orderBtn}
                        onClick={handleOrderSubmit}
                        disabled={loading}>
                        {loading ? <Loader /> : "Заказать"}
                    </UIButton>
                </div>
            </div>
        </>
    );
};

export default Cart;
