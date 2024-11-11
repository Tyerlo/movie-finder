import React, { useRef } from "react";
import MovieCard from "./MovieCard";

interface Movie {
	id: number;
	poster_path: string;
	title: string;
	genre_ids: number[];
	vote_average: number;
	year: string;
}

interface MovieSectionProps {
	sectionTitle: string;
	movies: Movie[];
}

function MovieSection({ sectionTitle, movies }: MovieSectionProps) {
	const carouselRef = useRef<HTMLDivElement>(null);

	const scrollCarousel = (direction: "left" | "right") => {
		const carousel = carouselRef.current;
		if (carousel) {
			const scrollAmount = 300;
			carousel.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth"
			});
		}
	};

	return (
		<div className="py-6">
			<h2 className="text-base font-semibold mb-4">{sectionTitle}</h2>
			<div className="relative">
				<div
					ref={carouselRef}
					className="carousel carousel-center space-x-4 p-4 w-full overflow-x-auto flex"
				>
					{movies.map((movie) => (
						<div key={movie.id} className="carousel-item flex-shrink-0 w-64">
							<MovieCard movie={movie} />
						</div>
					))}
				</div>

				{/* Navigation buttons */}
				<div className="absolute top-1/2 left-2 transform -translate-y-1/2">
					<button className="btn" onClick={() => scrollCarousel("left")}>
						❮
					</button>
				</div>
				<div className="absolute top-1/2 right-2 transform -translate-y-1/2">
					<button className="btn" onClick={() => scrollCarousel("right")}>
						❯
					</button>
				</div>
			</div>
		</div>
	);
}

export default MovieSection;
