import Link from "next/link";
import React from "react";

function Header() {
	return (
		<div className="navbar">
			{/* Title moves to start/left */}
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">The Movie Finder</a>
			</div>

			{/* Empty middle section */}
			<div className="navbar-center"></div>

			{/* Menu moves to end/right */}
			<div className="navbar-end">
				{/* Desktop menu */}
				<div className="hidden lg:flex">
					<Link href="/movies" className="btn btn-ghost">
						Movies
					</Link>
					<a className="btn btn-ghost">Tv shows</a>
					<a className="btn btn-ghost">Actors</a>

					<a className="btn btn-secondary">Sign in</a>
				</div>

				{/* Mobile menu dropdown */}
				<div className="dropdown dropdown-end lg:hidden">
					<div tabIndex={0} role="button" className="btn btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-menu"
						>
							<line x1="4" x2="20" y1="12" y2="12" />
							<line x1="4" x2="20" y1="6" y2="6" />
							<line x1="4" x2="20" y1="18" y2="18" />
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li className="py-2">
							<Link href="/movies" className="btn btn-ghost">
								Movies
							</Link>
						</li>
						<li className="py-2">
							<a className="btn btn-ghost">Tv shows</a>
						</li>
						<li className="py-2">
							<a className="btn btn-ghost">Actors</a>
						</li>

						<li className="py-2">
							<a className="btn btn-secondary">Sign in</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;
