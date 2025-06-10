import {Index} from "@/components/Review";
import {FC} from "react";

import styles from "../../styles/Reviews.module.scss"
import {IReview} from "@/api/getReviews";

type Props = {
    reviews: IReview[]
}

export const Reviews: FC<Props> = ({ reviews }) => {
    return (
        <>
            <h2>Отзывы</h2>
            <div className={styles.reviews}>
                {reviews.map((review) => (
                    <Index key={review.id} review={review} />
                ))}
            </div>
        </>
    );
};