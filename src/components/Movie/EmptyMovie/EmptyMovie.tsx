'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/base/Button/Button';

import styles from './EmptyMovie.module.scss';
export const EmptyMovie = () => {
	const router = useRouter();
	const handleAddNewMovie = () => {
		router.push('/movies/new');
	};
	return (
		<div className={styles.container}>
			<p className={styles.listEmptyText}>Your movie list is empty</p>
			<Button
				className={styles.addNewMovie}
				variant="submit"
				onClick={handleAddNewMovie}
			>
				Add a new movie
			</Button>
		</div>
	);
};
