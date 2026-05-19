import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        headers: {
            "Content-Security-Policy": [
                "default-src 'self'",
                "connect-src 'self'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com https://images.unsplash.com",
                "font-src 'self'",
                "script-src 'self' 'unsafe-inline'",
                "frame-src https://www.google.com",
            ].join("; "),
        },
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
