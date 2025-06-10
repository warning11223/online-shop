import { useState, useEffect, useRef } from "react";

interface IProduct {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

type UseInfiniteScrollProps = {
    initialProducts: IProduct[];
    fetchUrl: string;
};

export const useInfiniteScroll = ({ initialProducts, fetchUrl }: UseInfiniteScrollProps) => {
    const [products, setProducts] = useState<IProduct[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchProducts = async (newPage: number) => {
        try {
            const response = await fetch(`${fetchUrl}?page=${newPage}&page_size=20`);
            const data = await response.json();

            setProducts((prevProducts) => [...prevProducts, ...data.items]);
            setPage(newPage);
            setHasMore(data.items.length > 0);
            setLoading(false);
        } catch (error) {
            console.error("Ошибка при загрузке данных", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadMoreProducts = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                setLoading(true);
                fetchProducts(page + 1);
            }
        };

        observer.current = new IntersectionObserver(loadMoreProducts, {
            rootMargin: "100px",
        });

        const element = document.getElementById("load-more");
        if (element && observer.current) {
            observer.current.observe(element);
        }

        return () => {
            if (observer.current && element) {
                observer.current.unobserve(element);
            }
        };
    }, [loading, hasMore, page]);

    return { products, loading, hasMore };
};
