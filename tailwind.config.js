/**
 * @type {import('tailwindcss').Config}
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ff0101",
				secondary: "#020203",
				secondary2: "#282D30",
				tertiary: "#fbfbfb",
				tertiary2: "#74798C",
			},
			boxShadow: {
				header: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
				aside: "4px 0px 4px 0px rgba(0, 0, 0, 0.25)",
			},
			gridTemplateColumns: {
				"auto-1fr": "auto 1fr",
				"3fr-1fr": "3fr 1fr",
			},
			gridTemplateRows: {
				"auto-1fr": "auto 1fr",
			},
		},
	},
	plugins: [],
}
