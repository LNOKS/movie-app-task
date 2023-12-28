'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/base/Button/Button';
import { Input } from '@/components/base/Input/Input';
import { AddMovie, Movie } from '@/interface/domain/movie/movie';
import { addMovie } from '@/services/movies';

import fileUploadIcon from '../../../../public/arrow.svg';
import styles from './MoviesNew.module.scss';

enum NewMovieFields {
	title = 'title',
	publishYear = 'publishYear',
}

const newMovieValidationSchema = z.object({
	[NewMovieFields.title]: z.string().min(1, { message: 'Title is required' }),
	[NewMovieFields.publishYear]: z
		.string()
		.min(1, { message: 'Publish year is required' }),
});

type NewMovieFormValues = z.infer<typeof newMovieValidationSchema>;

export default function NewMovie() {
	const router = useRouter();
	const newMovieForm = useForm<NewMovieFormValues>({
		resolver: zodResolver(newMovieValidationSchema),
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

	const onSubmit = async (formData: NewMovieFormValues) => {
		if (!file) {
			return;
		}

		const movie: AddMovie = {
			title: formData.title,
			publishedAt: formData.publishYear,
			image: file,
		};
		const createdMovie: Movie = await addMovie(movie);
		if (createdMovie) {
			router.push(`/`);
		}
	};

	const onCancel = () => {
		router.push('/');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>Create a new movie</div>
				<div className={styles.body}>
					<div {...getRootProps()} className={styles.fileUpload}>
						<input {...getInputProps()} />
						{preview ? (
							<Image src={preview} alt="preview" width={200} height={200} />
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
								newMovieForm.handleSubmit(onSubmit)();
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
									control={newMovieForm.control}
									name={NewMovieFields.title}
								/>
								<Controller
									render={({ field: { value, onChange }, fieldState: { error } }) => (
										<div style={{ width: 216 }}>
											<Input
												value={value}
												onChange={onChange}
												errorMessage={error?.message}
												placeholder="Publishing year"
												type="text"
											/>
										</div>
									)}
									control={newMovieForm.control}
									name={NewMovieFields.publishYear}
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
