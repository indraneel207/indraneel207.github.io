import {defineConfig} from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://indraneel.dev",
  output: "static",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  devToolbar: {enabled: false}
});
