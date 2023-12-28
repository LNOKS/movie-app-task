import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const page = Number(req.nextUrl.searchParams.get('page')) || 1;
		const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
		const skip = (page - 1) * limit;

		const movies = await prisma.movie.findMany({
			skip,
			take: limit,
			orderBy: {
				publishedAt: 'desc',
			},
		});

		const total = await prisma.movie.count();

		return new NextResponse(
			JSON.stringify({
				status: 'success',
				data: movies,
				total,
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

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const title = formData.get('title') as string;
		const releaseDate = formData.get('publishedAt') as string;
		const image = formData.get('image') as File;
		const imageBase64 = Buffer.from(await image.arrayBuffer()).toString('base64');

		const session = await getServerSession();

		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email || '',
			},
		});

		const movie = await prisma.movie.create({
			data: {
				title,
				publishedAt: new Date(releaseDate),
				poster: imageBase64,
				userId: user?.id,
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
