import daisyui from "daisyui";
module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],

	plugins: [daisyui],
	daisyui: {
		themes: ["emerald"]
	}
};
