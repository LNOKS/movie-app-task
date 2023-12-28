'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/base/Button/Button';
import { Input } from '@/components/base/Input/Input';
import { EditMovie, Movie } from '@/interface/domain/movie/movie';
import { getMovie, updateMovie } from '@/services/movies';

import fileUploadIcon from '../../../../../public/arrow.svg';
import styles from './MoviesEdit.module.scss';

enum EditMovieFields {
	title = 'title',
	publishYear = 'publishYear',
}

const editMovieValidationSchema = z.object({
	[EditMovieFields.title]: z.string().min(1, { message: 'Title is required' }),
	[EditMovieFields.publishYear]: z
		.string()
		.min(1, { message: 'Publish year is required' }),
});

type EditMovieFormValues = z.infer<typeof editMovieValidationSchema>;

export default function EditMovie({ params }: { params: { slug: string } }) {
	const id = params.slug;
	const router = useRouter();
	const editMovieForm = useForm<EditMovieFormValues>({
		resolver: zodResolver(editMovieValidationSchema),
	});

	const [file, setFile] = React.useState<File | null>(null);
	const [preview, setPreview] = React.useState<string | null>(null);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setFile(acceptedFiles[0]);

			const url = URL.createObjectURL(acceptedFiles[0]);
			setPreview(url);
		},
	});

	useEffect(() => {
		const fetchMovie = async () => {
			const movie: Movie = await getMovie(id as string);
			editMovieForm.setValue(EditMovieFields.title, movie.title);
			editMovieForm.setValue(
				EditMovieFields.publishYear,
				movie.publishedAt.toString(),
			);
			setPreview(movie.poster);
		};
		fetchMovie();
	}, [id]);

	const onSubmit = async (formData: EditMovieFormValues) => {
		const movie: EditMovie = {
			id: id as string,
			title: formData.title,
			publishedAt: formData.publishYear,
			image: file || preview,
		};
		const updatedMovie: Movie = await updateMovie(movie);
		if (updatedMovie) {
			router.push(`/`);
		}
	};

	const onCancel = () => {
		router.push('/');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>Edit movie</div>
				<div className={styles.body}>
					<div {...getRootProps()} className={styles.fileUpload}>
						<input {...getInputProps()} />
						{preview ? (
							<Image
								src={
									preview.includes('http')
										? preview
										: `data:image/jpeg;base64,${preview}`
								}
								alt="preview"
								width={200}
								height={200}
							/>
						) : (
							<>
								<Image src={fileUploadIcon} alt="file upload" />
								<p>Drag and drop your file here</p>
							</>
						)}
					</div>
					<div className={styles.form}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								editMovieForm.handleSubmit(onSubmit)();
							}}
							className={styles.form}
						>
							<div className={styles.fields}>
								<Controller
									render={({ field: { value, onChange }, fieldState: { error } }) => (
										<Input
											value={value}
											onChange={onChange}
											errorMessage={error?.message}
											placeholder="Title"
											type="text"
										/>
									)}
									control={editMovieForm.control}
									name={EditMovieFields.title}
								/>
								<Controller
									render={({ field: { value, onChange }, fieldState: { error } }) => (
										<div style={{ width: 216 }}>
											<Input
												value={moment(value).format('YYYY-MM-DD')}
												onChange={onChange}
												errorMessage={error?.message}
												placeholder="Publishing year"
												type="text"
											/>
										</div>
									)}
									control={editMovieForm.control}
									name={EditMovieFields.publishYear}
								/>
							</div>
							<div className={styles.buttons}>
								<div style={{ width: 167 }}>
									<Button type="button" onClick={onCancel}>
										Cancel
									</Button>
								</div>
								<div style={{ width: 167 }}>
									<Button variant="submit">Submit</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
