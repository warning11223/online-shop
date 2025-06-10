import styles from "../../styles/UI.module.scss";

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};
