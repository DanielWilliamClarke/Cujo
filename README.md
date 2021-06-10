# Cujo

> A Dockerised CV/Portfolio/Blog built using React using Wordpress for blog posts and CDN.

- [Cujo](#cujo)
  - [// Todo](#-todo)
    - [Visualisations](#visualisations)
  - [Build](#build)
  - [Deploy](#deploy)
  - [Redeploy](#redeploy)
  - [Teardown](#teardown)
  - [Wordpress plugins](#wordpress-plugins)
  - [Urls](#urls)
  - [Setup and Resources](#setup-and-resources)

---

![](./portfolio/src/assets/p2_2.gif)

## // Todo

- [ ] Get own logo and assets from designer
- [ ] Restyle experience and education so they resemble a timeline
- [ ] Write the blog
- [x] Maybe swap backstretch with a 2d/3d webgl canvas visualistion?
- [ ] Optimize images (sizes, file encodings - <https://developers.google.com/speed/pagespeed/insights/>)
- [ ] Write tests (maybe)
- [x] Formalise colour palette
- [x] Setup SSL correctly.. (ssl-companion is running, it will assign certificates when the window opens again)
- [x] Fix predator/prey image asset
- [x] Finish contact page
- [x] Add site footer
- [x] Proof read profile
- [x] Add asset citations (now using my own images or free stock images only)
- [x] Produce production build for deployment
- [x] Move sharing bar to bottom on mobile devices
- [x] Add jenkins machine to deployment to CI/CD

### Visualisations

- [x] 3D Box wave
- [x] Waves
- [x] Hexagons
- [x] Phylotaxis
- [x] 4D tesseract projection?

## Build

```bash
# With script
./scripts/build-portfolio.sh <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest

# OR

# Build: Dev
docker build -f portfolio/Dockerfile -t <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest ./portfolio

# Build: Prod
docker build -f portfolio/Dockerfile -t <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest --build-arg BUILD_MODE=":prod" ./portfolio

# Push image
docker push <DOCKER_HUB_USER_REGISTRY>/cujo-portfolio:latest
```

## Deploy

```bash
# Run with sudo where necessary

# With script
./script/deploy.sh dev(or prod)

# Or ...

# Deploy: Dev
docker-compose -f dev.compose.yaml up

# Deploy: Prod
docker-compose --env-file <SECRET ENV FILE> -f prod.compose.yaml up
```

## Redeploy

```bash
# Run with sudo where necessary

# With script
./scripts/redeploy.sh <DOCKER IMAGE NAME> <CONTAINER NAME> <dev or prod>
```

## Teardown

```bash
# Run with sudo where necessary

# With script
./scripts/teardown dev(or prod) (-v) # to delete volumes

# Or ...

# Teardown: Dev
docker-compose -f dev.compose.yaml down (-v)

# Teardown: Prod
docker-compose --env-file <SECRET ENV FILE> -f prod.compose.yaml down (-v)
```

## Wordpress plugins

- Simple Website Redirect - <https://wordpress.org/plugins/simple-website-redirect/>
- Disable Comments - <https://wordpress.org/plugins/disable-comments/>
- Syntax-highlighting Code Block (with Server-side Rendering) - <https://en-gb.wordpress.org/plugins/syntax-highlighting-code-block/>

## Urls

- <https://danielclarke.tech> - Portfolio
- <https://blog.danielclarke.tech>/... - Wordpress - [Homepage redirects to Portfolio]

## Setup and Resources

- <https://blog.harveydelaney.com/hosting-websites-using-docker-nginx/>
- <https://blog.harveydelaney.com/setting-up-jenkins-on-docker/>
- <https://blog.harveydelaney.com/jenkins-build-test-deploy-node-app/>
- <https://stackoverflow.com/questions/22345483/jenkins-publish-over-ssh-authentification-failed-with-private-key>
- <https://nozaki.me/roller/kyle/entry/articles-jenkins-sshdeploy>
- <https://stackoverflow.com/questions/48330402/secret-text-git-credentials-not-showing-up-in-jenkins-project-source-code-mana/49571986>
- <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>
