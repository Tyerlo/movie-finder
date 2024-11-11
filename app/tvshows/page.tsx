"use client";
import { useEffect, useState } from "react";
import TvSection from "../components/TvSection";

interface TvShows {
	id: number;
	poster_path: string;
	name: string;
	first_air_date: string;
	genre_ids: number[];
	vote_average: number;
}

export default function TvShows() {
	const [query, setQuery] = useState("");
	const [tvshows, setTvShows] = useState<TvShows[]>([]);
	useEffect(() => {
		if (query.trim()) {
			fetch(
				`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
					query
				)}&include_adult=false&language=en-US&page=1&api_key=${
					process.env.TMDB_API_KEY
				}`
			)
				.then((response) => response.json())
				.then(({ results }) => {
					const filteredMovies = results
						.map(
							({
								id,
								poster_path,
								name,
								first_air_date,
								genre_ids,
								vote_average
							}: {
								id: number;
								poster_path: string;
								name: string;
								first_air_date: string;
								genre_ids: number[];
								vote_average: number;
							}) => ({
								id,
								poster_path,
								name,
								year: first_air_date?.split("-")[0],
								genre_ids,
								vote_average
							})
						)
						.filter(({ poster_path }: TvShows) => !!poster_path);

					setTvShows(filteredMovies);
				})
				.catch((error) => {
					console.error("Error fetching movies:", error);
					setTvShows([]);
				});
		} else {
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
							placeholder="Search tv shows"
							className="grow w-full"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</label>
				</div>
				{tvshows.length > 0 ? (
					<TvSection sectionTitle="Tv Shows" tvshows={tvshows} />
				) : (
					<p className="py-4 text-2xl">Type in a query to find a tv show</p>
				)}
			</main>
		</div>
	);
}
