import moment from 'moment';
import Image from 'next/image';
import React from 'react';

import { Movie } from '@/interface/domain/movie/movie';

import styles from './MovieCard.module.scss';

export const MovieCard: React.FC<Movie> = ({ poster, title, publishedAt }) => {
	const releaseYear = moment(publishedAt).get('year');
	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<Image src={`data:image/jpeg;base64,${poster}`} alt={title} fill={true} />
			</div>
			<div>
				<figcaption className={styles.title}>{title}</figcaption>
				<p className={styles.date}>{releaseYear}</p>
			</div>
		</div>
	);
};
