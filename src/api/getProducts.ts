export interface IProduct {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

// Функция для получения продуктов
export async function getProducts(): Promise<IProduct[]> {
    try {
        const response = await fetch("http://o-complex.com:1337/products");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.items;  // Вернем только массив продуктов
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}