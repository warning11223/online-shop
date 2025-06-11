

export async function submitOrder(orderData: { phone: string, cart: Array<{ id: number, quantity: number }> }) {
    try {
        const response = await fetch("api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Не удалось отправить запрос. Ошибка: ${error.message}`);
        } else {
            throw new Error("Не удалось отправить запрос. Попробуйте позже.");
        }
    }
}