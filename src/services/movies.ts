import { AddMovie, EditMovie } from '@/interface/domain/movie/movie';
import { PaginationDto } from '@/interface/pagination';

export const getMovies = async (pagination: PaginationDto) => {
	const res = await fetch(
		`/api/movies?page=${pagination.page}&limit=${pagination.limit}`,
	);
	return await res.json();
};

export const getMovie = async (id: string) => {
	const res = await fetch(`/api/movies/${id}`);
	const body = await res.json();
	return body.data;
};

export const addMovie = async (movie: AddMovie) => {
	const formData = new FormData();
	formData.append('title', movie.title);
	formData.append('publishedAt', movie.publishedAt);
	formData.append('image', movie.image);

	const res = await fetch(`/api/movies`, {
		method: 'POST',
		body: formData,
	});
	const body = await res.json();
	return body.data;
};

export const updateMovie = async (movie: EditMovie) => {
	const formData = new FormData();
	formData.append('title', movie.title);
	formData.append('publishedAt', movie.publishedAt);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	formData.append('image', movie.image);

	const res = await fetch(`/api/movies/${movie.id}`, {
		method: 'PUT',
		body: formData,
	});
	const body = await res.json();
	return body.data;
};
