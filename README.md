# Cujo

A Dockerised CV/Portfolio/Blog application built using a React using Wordpress for blog posts and CDN.

![](./portfolio/src/assets/p2.gif)

## // Todo

- [ ] Add asset citations
- [ ] Fix grammar
- [ ] Produce production build for deployment
- [ ] Finish contact page
- [ ] Move sharing bar to bottom on mobile devices
- [ ] Get own logo and assets from designer
- [ ] Fix predator/prey image asset

## Build

```bash
# build image
docker build -f portfolio/Dockerfile -t cujo-portfolio ./portfolio

# Tag image
docker tag cujo-portfolio:latest <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest

# Push image
docker push <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest
```

## Deploy

```bash
# Dev
docker-compose -f dev.compose.yaml up

# Prod
docker-compose -f prod.compose.yaml up

# Trash
docker-compose down -v
```

## Wordpress plugins

- Simple Website Redirect - https://wordpress.org/plugins/simple-website-redirect/
- Disable Comments - https://wordpress.org/plugins/disable-comments/

## Urls

- danielclarke.tech - Portfolio
- blog.danielclarke.tech - Wordpress
