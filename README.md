# Cujo

> A Dockerised CV/Portfolio/Blog built using React using Wordpress for blog posts and CDN.

- [Cujo](#cujo)
  - [// Todo](#-todo)
  - [Build](#build)
  - [Deploy](#deploy)
  - [Wordpress plugins](#wordpress-plugins)
  - [Urls](#urls)
  - [Setup and Resources](#setup-and-resources)

---

![](./portfolio/src/assets/p2.gif)

## // Todo

- [ ] Setup SSL correctly..
- [ ] Write tests
- [ ] Get own logo and assets from designer
- [ ] Fix predator/prey image asset
- [ ] Finish contact page
- [ ] Proof read profile
- [x] Add asset citations (now using my own images or free stock images only)
- [x] Produce production build for deployment
- [x] Move sharing bar to bottom on mobile devices
- [x] Add jenkins machine to deployment to CI/CD

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

- Simple Website Redirect - <https://wordpress.org/plugins/simple-website-redirect/>
- Disable Comments - <https://wordpress.org/plugins/disable-comments/>
- Syntax-highlighting Code Block (with Server-side Rendering) - <https://en-gb.wordpress.org/plugins/syntax-highlighting-code-block/>

## Urls

- danielclarke.tech - Portfolio
- blog.danielclarke.tech/... - Wordpress - [Homepage redirects to Portfolio]
- jenkins.danielclarke.tech - Jenkins

## Setup and Resources

- <https://blog.harveydelaney.com/hosting-websites-using-docker-nginx/>
- <https://blog.harveydelaney.com/setting-up-jenkins-on-docker/>
- <https://blog.harveydelaney.com/jenkins-build-test-deploy-node-app/>
- <https://stackoverflow.com/questions/22345483/jenkins-publish-over-ssh-authentification-failed-with-private-key>
- <https://nozaki.me/roller/kyle/entry/articles-jenkins-sshdeploy>
- <https://stackoverflow.com/questions/48330402/secret-text-git-credentials-not-showing-up-in-jenkins-project-source-code-mana/49571986>
- <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>
