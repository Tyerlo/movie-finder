import React, { useRef } from "react";
import MovieCard from "./MovieCard";

interface TvShow {
	id: number;
	poster_path: string;
	name: string;
	genre_ids: number[];
	vote_average: number;
	first_air_date: string;
}

interface MovieSectionProps {
	sectionTitle: string;
	tvshows: TvShow[]; // Can now accept both movies and TV shows
}

function MovieSection({ sectionTitle, tvshows }: MovieSectionProps) {
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
			<h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>
			<div className="relative">
				<div
					ref={carouselRef}
					className="carousel carousel-center space-x-4 p-4 w-full overflow-x-auto flex"
				>
					{tvshows.map((item) => (
						<div key={item.id} className="carousel-item flex-shrink-0 w-64">
							<MovieCard movie={item} />
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
