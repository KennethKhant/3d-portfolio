import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: "#e50914" } } },
  plugins: [],
} satisfies Config;
