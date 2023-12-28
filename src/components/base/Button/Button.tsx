import React from 'react';

import styles from './Button.module.scss';

type ButtonTypes = 'common' | 'submit';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonTypes;
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'common',
	className,
	...props
}) => {
	const buttonStyles = [className, styles.button, styles[variant]].join(' ');
	return <button className={buttonStyles} {...props} />;
};
