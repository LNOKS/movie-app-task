import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import MoviesList from '@/components/Movie/MovieList/MovieList';

export default async function Home() {
	const session = await getServerSession();

	if (!session || !session.user) {
		redirect('/signin');
	}
	return (
		<main style={{ height: '100vh' }}>
			<MoviesList />
		</main>
	);
}
