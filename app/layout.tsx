import type { Metadata } from "next";

import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export const metadata: Metadata = {
	title: "Movie finder",
	description: "Movie finder, the app to find your favorite movies and series"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
