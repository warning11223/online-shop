import sanitizeHtml from "sanitize-html";
import {FC} from "react";

import styles from "../../styles/Reviews.module.scss"
import {IReview} from "@/api/getReviews";

const sanitizeOptions = {
    allowedTags: ['h1', 'p'],
    allowedAttributes: {}
};

type Props = {
    review: IReview
}

export const Index: FC<Props> = ({ review }) => {
    return (
        <article className={styles.review}>
            <h3>{review.name}</h3>
            <div
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(review.text, sanitizeOptions)
                }}
            />
        </article>
    );
};