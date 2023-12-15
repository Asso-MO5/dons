# Swift List 🛒

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V46KBQ9)

**Swift List** est une application de gestion de listes de courses intuitive et pratique. Simplifiez votre expérience de magasinage en créant et en organisant facilement vos listes de courses. L'IA intégrée recherche les rayons correspondants pour chaque produit, ce qui vous permet de trouver rapidement les articles dont vous avez besoin.

![Swift List](https://www.swiftlist.ovh/logo.svg)

## Fonctionnalités

- 📝 Créez et organisez vos listes de courses en quelques clics.
- 🛍️ Trouvez rapidement les produits grâce à la recherche automatisée des rayons.
- ✅ Cochez les articles achetés et suivez votre progression.
- 🔗 Partagez vos listes avec d'autres personnes pour les courses en famille ou en colocation grâce au QR code. (pas encore disponible)
- 🔄 Les listes sont générées dynamiquement et ne sont pas enregistrées en base, garantissant ainsi la confidentialité de vos données.

## Installation

1. Clonez le dépôt : `git clone https://github.com/kazerlelutin/swift-list.git`
2. Installez les dépendances : `pnpm install`
3. Installez les dépendances : `pnpm install -g vercel`
4. Lancez l'application en mode développement : `vercel dev`
5. Accédez à l'application dans votre navigateur à l'adresse : `http://localhost:3000`

## Déploiement

L'application est prévue pour être déployée sur [Vercel](https://vercel.com), une plateforme de déploiement cloud. Vous pouvez facilement déployer votre application Swift List sur Vercel en utilisant les options de déploiement proposées par la plateforme.

## Technologies utilisées

### front

- [Vite](https://vitejs.dev/) - Un outil de construction front-end extrêmement rapide, optimisé pour les projets modernes et les frameworks de développement web.
- [\_hyperscript](https://hyperscript.org/) - Un langage de script innovant pour manipuler dynamiquement le DOM, offrant une interactivité accrue et une meilleure expérience utilisateur.
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS utilitaire pour des designs personnalisables et réactifs.

### back

- [Vercel](https://vercel.com/docs/functions/serverless-functions) - Plateforme pour les fonctions serverless, permettant un déploiement rapide et une intégration aisée avec d'autres services.
- [ChatGPT](https://openai.com/) - API d'intelligence artificielle d'OpenAI utilisée pour l'analyse et le traitement des requêtes liées aux listes de courses.
- [Mongoose](https://mongoosejs.com/) - Bibliothèque de modélisation pour MongoDB, utilisée pour stocker et gérer les données des rayons trouvés par l'IA, optimisant ainsi les recherches futures.

## Auteur

- [Kazerlelutin](https://ko-fi.com/kazerlelutin)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.
