/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        sl: {
          // Couleurs de base
          bg: "#F2F2F2",
          primary: "#4088cf",
          secondary: "#5bc0de",
          tertiary: "#70cbe6",
          text: "#000",
          accent: "#d9534f",
          valid: "#4CAF50",
          brain: "#d433a9",
          // Couleurs d'état
          "status-error": "#ad2626", // Rouge pour les erreurs
          "status-success": "#00FF00", // Vert pour le succès
          "status-info": "#17A2B8", // Bleu pour l'information
          "status-warning": "#FFC107", // Jaune pour les avertissements
        },
      },
      fontFamily: {
        openSans: ["OpenSans-Regular", "sans-serif"],
        FjallaOne: ["FjallaOne", "serif"],
      },
    },
  },
  plugins: [],
}
