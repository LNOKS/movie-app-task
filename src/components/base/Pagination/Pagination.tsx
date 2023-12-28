import React from 'react';

import styles from './Pagination.module.scss';

interface PaginationProps {
	total: number;
	current: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	total,
	current,
	onPageChange,
}) => {
	const pages = Array.from({ length: total }, (_, i) => i + 1);

	const handlePrev = () => {
		if (current > 1) {
			onPageChange(current - 1);
		}
	};

	const handleNext = () => {
		if (current < total) {
			onPageChange(current + 1);
		}
	};

	return (
		<div className={styles.pagination}>
			<button className={styles.bodyRegular} onClick={handlePrev}>
				Prev
			</button>
			{pages.map((page) => (
				<button
					key={page}
					className={`${styles.page} ${page === current ? styles.active : ''}`}
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}
			<button className={styles.bodyRegular} onClick={handleNext}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
