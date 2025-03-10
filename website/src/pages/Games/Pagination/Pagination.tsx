import React from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    shouldBeDisabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, shouldBeDisabled }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1 || shouldBeDisabled} className={styles.pageButton}>
                Previous
            </button>
            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages || shouldBeDisabled} className={styles.pageButton}>
                Next
            </button>
        </div>
    );
};
