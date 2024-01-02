'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Pagination from '@/components/base/Pagination/Pagination';
import { EmptyMovie } from '@/components/Movie/EmptyMovie/EmptyMovie';
import { MovieCard } from '@/components/Movie/MovieCard/MovieCard';
import { Movie } from '@/interface/domain/movie/movie';
import { PaginationDto } from '@/interface/pagination';
import { getMovies } from '@/services/movies';

import logoutIcon from '../../../../public/arrow.svg';
import addIcon from './../../../../public/add_circle.svg';
import styles from './MovieList.module.scss';

export default function MoviesList() {
	const router = useRouter();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const limit = 8;

	const handleAddMovie = () => {
		router.push('/movies/new');
	};

	const handleLogout = async () => {
		await signOut();
		router.push('/');
	};

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	useEffect(() => {
		const fetchMovies = async () => {
			const response = await getMovies({ page, limit } as PaginationDto);
			const totalMovies = response.total;
			setMovies(response.data);
			const totalPages = Math.ceil(totalMovies / limit);
			if (totalPages > 0) {
				setTotalPages(totalPages);
			}
			setIsLoading(false);
		};
		fetchMovies();
	}, [page]);

	if (movies && movies.length === 0 && page <= totalPages) {
		return (
			<div className={styles.emptyList}>
				<EmptyMovie />
			</div>
		);
	}

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div className={styles.container}>
						<div className={styles.header}>
							<div className={styles.heading}>
								My Movies
								<Image
									src={addIcon}
									width={32}
									height={32}
									onClick={handleAddMovie}
									alt="Add Movie"
								/>
							</div>
							<div className={styles.logout}>
								<p className={styles.bodyRegular}>Logout</p>
								<Image
									src={logoutIcon}
									width={32}
									height={32}
									onClick={handleLogout}
									alt="Logout"
								/>
							</div>
						</div>
						<div className={styles.moviesList}>
							{movies.map((movie) => (
								<button
									key={movie.id}
									onClick={() => router.push(`/movies/edit/${movie.id}`)}
								>
									<MovieCard
										id={movie.id}
										title={movie.title}
										publishedAt={movie.publishedAt}
										poster={movie.poster}
									/>
								</button>
							))}
						</div>
						<Pagination
							total={totalPages}
							current={page}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</>
	);
}
