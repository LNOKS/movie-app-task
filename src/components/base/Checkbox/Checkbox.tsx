import React from 'react';

import styles from './Checkbox.module.scss';
export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props,
) => {
	return (
		<div className={styles.checkboxContainer}>
			<input
				type="checkbox"
				id="rememberMe"
				className={styles.checkbox}
				{...props}
			/>
		</div>
	);
};
