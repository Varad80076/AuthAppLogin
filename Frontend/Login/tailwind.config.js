// @type {import('tailwindcss').Config} 
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {animation: {
      "fade-in": "fadeIn 1s ease-in-out",
      "slide-up": "slideUp 0.5s ease-out",
      "floating": "floating 6s ease-in-out infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideUp: {
        "0%": { transform: "translateY(20px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
      floating: {
        "0%, 100%": { transform: "translateY(-10px)" },
        "50%": { transform: "translateY(10px)" },
      },
    },
  },
  },
  plugins: [("@tailwindcss/forms")],
}

