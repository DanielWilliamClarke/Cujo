# Cujo

A Dockerised CV/Portfolio/Blog built using React using Wordpress for blog posts and CDN.

![](./portfolio/src/assets/p2.gif)

## // Todo

- [x] Add asset citations (now using my own images or free stock images only)
- [ ] Fix grammar
- [x] Produce production build for deployment
- [ ] Finish contact page
- [x] Move sharing bar to bottom on mobile devices
- [ ] Get own logo and assets from designer
- [ ] Fix predator/prey image asset

## Build

```bash
# Build: Dev
docker build -f portfolio/Dockerfile -t cujo-portfolio ./portfolio

# Build: Prod
docker build -f portfolio/Dockerfile -t cujo-portfolio --build-arg BUILD_MODE=":prod" ./portfolio

# Tag image
docker tag cujo-portfolio:latest <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest

# Push image
docker push <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest
```

## Deploy

```bash
# Deploy: Dev
docker-compose -f dev.compose.yaml up --build

# Deploy: Prod
docker-compose -f prod.compose.yaml up

# Trash
docker-compose down -v
```

## Wordpress plugins

- Simple Website Redirect - https://wordpress.org/plugins/simple-website-redirect/
- Disable Comments - https://wordpress.org/plugins/disable-comments/
- Syntax-highlighting Code Block (with Server-side Rendering) - https://en-gb.wordpress.org/plugins/syntax-highlighting-code-block/

## Urls

- danielclarke.tech - Portfolio
- blog.danielclarke.tech - Wordpress
