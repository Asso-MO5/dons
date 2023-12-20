export default {
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Redirige les requêtes de /api vers le serveur Hapi
    },
  },
  public: "../back/public",
}
