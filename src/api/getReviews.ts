export interface IReview {
    id: number;
    name: string;
    text: string;
    rating: number;
}

// Функция для получения отзывов
export async function getReviews(): Promise<IReview[]> {
    try {
        const response = await fetch("http://o-complex.com:1337/reviews");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
    }
}