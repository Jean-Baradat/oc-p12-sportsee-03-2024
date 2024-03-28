import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		// If you add an alias, also add it to jsconfig.json
		alias: {
			"@": "/src",
			"@page": "/src/page",
			"@layouts": "/src/layouts",
		},
	},
})
