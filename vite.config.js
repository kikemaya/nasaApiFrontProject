import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(() => {
	return {
		plugins: [
			ViteImageOptimizer({
				jpg: {
					quality: 40,
				},
				png: {
					quality: 5,
				},
				gif: {
					quality: 5,
				},
			}),
		],
	};
});
