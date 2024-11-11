import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
	id: number;
	poster_path: string;
	title: string;
	genre_ids: number[];
	vote_average: number;
	year: string;
}

interface TvShow extends Omit<Movie, "title" | "year"> {
	first_air_date: string;
	name: string;
}

type Media = Movie | TvShow;

interface Genre {
	id: number;
	name: string;
}

function MovieCard({ movie }: { movie: Media }) {
	const [genres, setGenres] = useState<Genre[]>([]);
	const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
				);
				const data = await response.json();
				setGenres(data.genres);
			} catch (error) {
				console.error("Failed to fetch genres:", error);
			}
		};
		fetchGenres();
	}, []);

	// Map genre IDs to genre names
	const genreNames = movie.genre_ids
		.map((id) => genres.find((genre) => genre.id === id)?.name)
		.filter((name) => name);

	// Get the correct title and year based on whether it's a Movie or TvShow
	const title = "title" in movie ? movie.title : movie.name;
	const year = "year" in movie ? movie.year : movie.first_air_date?.slice(0, 4);

	const rating = movie.vote_average.toFixed(1);

	return (
		<div className="w-72 aspect-square">
			<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-[400px]">
				<figure className="h-[300px] relative">
					<Image src={posterUrl} alt={title} fill className="object-cover" />
				</figure>
				<div className="absolute top-2 right-2">
					<div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
						<svg
							className="w-4 h-4 text-[#FF8F3B]"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<span className="text-sm font-semibold">{rating}</span>
					</div>
				</div>
				<div className="card-body p-4 h-[100px]">
					<h3 className="card-title text-base font-bold line-clamp-2">
						{title}
					</h3>
					<p className="text-sm text-base-content/70 line-clamp-1">
						{year} • {genreNames.join(", ")}
					</p>
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
