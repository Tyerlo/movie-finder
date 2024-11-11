"use client";
import { useEffect, useState } from "react";
import TvSection from "../components/TvSection";
import MovieSection from "../components/MovieSection";

interface Movies {
	id: number;
	poster_path: string;
	title: string;
	year: string;
	genre_ids: number[];
	vote_average: number;
}

interface TvShows {
	id: number;
	poster_path: string;
	name: string;
	first_air_date: string;
	genre_ids: number[];
	vote_average: number;
}

// Add MediaItem interface that includes all possible properties
interface MediaItem {
	id: number;
	poster_path: string;
	title?: string; // Optional for TV shows
	name?: string; // Optional for movies
	release_date?: string; // For movies
	first_air_date?: string; // For TV shows
	genre_ids: number[];
	vote_average: number;
	media_type: "movie" | "tv";
}

interface Actor {
	id: number;
	name: string;
	known_for: MediaItem[];
}

export default function TvShows() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<Movies[]>([]);
	const [tvShows, setTvShows] = useState<TvShows[]>([]);

	useEffect(() => {
		if (query.trim()) {
			fetch(
				`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
					query
				)}&include_adult=false&language=en-US&page=1&api_key=${
					process.env.TMDB_API_KEY
				}`
			)
				.then((response) => response.json())
				.then(({ results }) => {
					const moviesList: Movies[] = [];
					const tvShowsList: TvShows[] = [];

					results.forEach((actor: Actor) => {
						actor.known_for.forEach((item: MediaItem) => {
							if (item.media_type === "movie" && item.poster_path) {
								moviesList.push({
									id: item.id,
									poster_path: item.poster_path,
									title: item.title || "",
									year: item.release_date?.split("-")[0] || "N/A",
									genre_ids: item.genre_ids,
									vote_average: item.vote_average
								});
							} else if (item.media_type === "tv" && item.poster_path) {
								tvShowsList.push({
									id: item.id,
									poster_path: item.poster_path,
									name: item.name || "",
									genre_ids: item.genre_ids,
									vote_average: item.vote_average,
									first_air_date: item.first_air_date?.split("-")[0] || ""
								});
							}
						});
					});

					setMovies(moviesList);
					setTvShows(tvShowsList);
				})
				.catch((error) => {
					console.error("Error fetching movies and TV shows:", error);
					setMovies([]);
					setTvShows([]);
				});
		} else {
			setMovies([]);
			setTvShows([]);
		}
	}, [query]);

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
							placeholder="Search actor"
							className="grow w-full"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</label>
				</div>
				{movies.length > 0 || tvShows.length > 0 ? (
					<>
						{movies.length > 0 && (
							<MovieSection sectionTitle="Movies" movies={movies} />
						)}
						{tvShows.length > 0 && (
							<TvSection sectionTitle="TV Shows" tvshows={tvShows} />
						)}
					</>
				) : (
					<p className="py-4 text-2xl">Type in a query to find an actor</p>
				)}
			</main>
		</div>
	);
}
