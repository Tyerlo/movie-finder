"use client";
import { useEffect, useState } from "react";
import MovieSection from "./components/MovieSection";

type Movie = {
	id: number;
	poster_path: string;
	title: string;
	year: string;
	genre_ids: number[];
	vote_average: number;
};

type Genre = {
	id: number;
	name: string;
};

export default function Home() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);

	// Fetch genres on mount
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
				);
				const data = await response.json();
				setGenres(data.genres);
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};
		fetchGenres();
	}, []);

	// Fetch movies when query changes
	useEffect(() => {
		if (query.trim()) {
			fetch(
				`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
					query
				)}&include_adult=false&language=en-US&page=1&api_key=${
					process.env.TMDB_API_KEY
				}`
			)
				.then((response) => response.json())
				.then(({ results }) => {
					console.log(results);
					const filteredMovies = results
						.map(
							({
								id,
								poster_path,
								title,
								release_date,
								genre_ids,
								vote_average
							}: {
								id: number;
								poster_path: string;
								title: string;
								release_date: string;
								genre_ids: number[];
								vote_average: number;
							}) => ({
								id,
								poster_path,
								title,
								year: release_date?.split("-")[0],
								genre_ids,
								vote_average
							})
						)
						.filter(({ poster_path }: Movie) => !!poster_path);

					setMovies(filteredMovies);
				})
				.catch((error) => {
					console.error("Error fetching movies:", error);
					setMovies([]);
				});
		} else {
			setMovies([]);
		}
	}, [query]);

	// Helper function to get genre name by ID
	const getGenreNameById = (id: number) =>
		genres.find((genre) => genre.id === id)?.name || "";

	// Filter movies by genre name (example for Comedy and Drama)
	const comedyMovies = movies.filter((movie) =>
		movie.genre_ids.some((id) => getGenreNameById(id) === "Comedy")
	);
	const dramaMovies = movies.filter((movie) =>
		movie.genre_ids.some((id) => getGenreNameById(id) === "Drama")
	);

	return (
		<div className="min-h-screen">
			<main className="container mx-auto px-4 py-6">
				<div className="form-control">
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-6 w-6"
						>
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
						<input
							type="text"
							placeholder="Search movie, TV shows or actors"
							className="grow w-full"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</label>
				</div>
				{movies.length > 0 ? (
					<>
						{comedyMovies.length > 0 && (
							<MovieSection sectionTitle="Comedy" movies={comedyMovies} />
						)}
						{dramaMovies.length > 0 && (
							<MovieSection sectionTitle="Drama" movies={dramaMovies} />
						)}
					</>
				) : (
					<p className="text-2xl">Type in a query to find movies</p>
				)}
			</main>
		</div>
	);
}
