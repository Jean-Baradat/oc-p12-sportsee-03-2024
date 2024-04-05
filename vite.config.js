import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		// If you add an alias, also add it to jsconfig.json
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
			"@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
			"@components": fileURLToPath(
				new URL("./src/components", import.meta.url),
			),
		},
	},
})
