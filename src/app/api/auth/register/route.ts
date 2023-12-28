import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
	try {
		const { email, password } = (await req.json()) as {
			email: string;
			password: string;
		};
		const hashed_password = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: hashed_password,
			},
		});

		return NextResponse.json({
			user: {
				email: user.email,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			return new NextResponse(
				JSON.stringify({
					status: 'error',
					message: error.message,
				}),
				{ status: 500 },
			);
		}
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'unknown error',
			}),
			{ status: 500 },
		);
	}
}
