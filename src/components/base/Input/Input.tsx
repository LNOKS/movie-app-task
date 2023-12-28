import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string;
}

export const Input: React.FC<InputProps> = (props) => {
	const inputStyle = [
		props.errorMessage && styles.inputError,
		styles.input,
	].join(' ');

	return (
		<div className={styles.container}>
			<input className={inputStyle} {...props} />
			{props.errorMessage && (
				<p className={styles.errorMessage}>{props.errorMessage}</p>
			)}
		</div>
	);
};
