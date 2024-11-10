"use client";
import { useState } from "react";
// import MovieSection from "../components/MovieSection";

export default function Movies() {
	const [query, setQuery] = useState("");

	const searchMovies = async (query: string) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
				query
			)}&include_adult=false&language=en-US&page=1&api_key=${
				process.env.TMDB_API_KEY
			}`
		);
		const { results } = await response.json();
		console.log(results);
		return results
			.map(
				({
					id,
					poster_path,
					title
				}: {
					id: string;
					poster_path: string;
					title: string;
				}) => ({
					id,
					poster_path,
					title
				})
			)
			.filter(({ poster_path }: { poster_path: string }) => !!poster_path);
	};

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
							placeholder="Search movies"
							className="grow w-full"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							onClick={() => searchMovies(query)}
							className="btn btn-primary"
						>
							Search
						</button>
					</label>
				</div>
			</main>
		</div>
	);
}
