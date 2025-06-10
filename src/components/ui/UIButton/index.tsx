import React from "react";
import styles from "../../../styles/UI.module.scss";

interface UIButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({children, onClick, className, disabled}) => {
    return (
        <button
            onClick={onClick}
            className={`
                ${styles.button} 
                ${className && className}
                ${disabled && styles.disabled}
            `}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
