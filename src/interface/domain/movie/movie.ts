export interface Movie {
	id: string;
	title: string;
	publishedAt: Date;
	poster: string;
}

export interface AddMovie {
	title: string;
	publishedAt: string;
	image: File;
}

export interface EditMovie {
	id: string;
	title: string;
	publishedAt: string;
	image: File | string | null;
}
