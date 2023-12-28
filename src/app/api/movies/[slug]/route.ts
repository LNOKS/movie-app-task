import { Movie } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const id = req.nextUrl.pathname.split('/').pop() || '';

		const movie: Movie | null = await prisma.movie.findUnique({
			where: {
				id: id || '',
			},
		});

		return new NextResponse(
			JSON.stringify({
				status: 'success',
				data: movie,
			}),
			{ status: 200 },
		);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'unknown error',
			}),
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData();
		const id = req.nextUrl.pathname.split('/').pop() || '';
		const title = formData.get('title') as string;
		const releaseDate = formData.get('publishedAt') as string;
		const image = formData.get('image') as File | string | null;
		let imageBase64 = null;
		if (image !== null && image instanceof File) {
			imageBase64 = Buffer.from(await image.arrayBuffer()).toString('base64');
		}

		const poster = imageBase64 ? imageBase64 : (image as string);

		const movie = await prisma.movie.update({
			where: {
				id,
			},
			data: {
				title,
				publishedAt: new Date(releaseDate),
				poster,
			},
		});

		return new NextResponse(
			JSON.stringify({
				status: 'success',
				data: movie,
			}),
			{ status: 200 },
		);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'unknown error',
			}),
			{ status: 500 },
		);
	}
}
