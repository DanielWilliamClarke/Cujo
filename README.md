<p align="center">
  <img src="https://see.fontimg.com/api/renderfont4/owgBd/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRjEwODciLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/Q3Vqbw/roadrage.png"/>
</p>

<p align="center">
  <img src="https://img.shields.io/website?down_color=red&label=danclarke.dev&url=https%3A%2F%2Fdanclarke.dev"/>
  <img src="https://img.shields.io/circleci/build/github/DanielWilliamClarke/Cujo?label=circleci"/>
  <img src="https://img.shields.io/mozilla-observatory/grade/danclarke.dev?publish"/>
  <img src="https://img.shields.io/github/commit-activity/w/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/github/last-commit/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/github/license/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/github/languages/count/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/docker/image-size/dclarkious/cujo-rust?label=Rust%20Image%20Size"/>
  <img src="https://img.shields.io/docker/image-size/dclarkious/cujo-portfolio?label=Portfolio%20Image%20Size"/>
</p>

<p align="center">
  A CV/Portfolio/Blog built in <b>TypeScript</b> using <b>React</b>, <b>React PDF</b> and <b>P5JS</b>. with a Rest / GraphQL backend written in <b>Rust</b> using <b>Contentful</b> for portfolio and blog content.
</p>

---

- [Dependencies](#dependencies)
- [Build Service Locally](#build-service-locally)
- [Build Portfolio Locally](#build-portfolio-locally)
- [Build Portfolio Image](#build-portfolio-image)
- [Build Service Image](#build-service-image)
- [Prod Environment](#prod-environment)
- [Add Contentful API IPs to /etc/hosts](#add-contentful-api-ips-to-etchosts)
- [Deploy](#deploy)
- [Redeploy](#redeploy)
- [Teardown](#teardown)
- [// Todo](#-todo)
- [// Done](#-done)
  - [Visualisations](#visualisations)
- [Urls](#urls)
- [Third Parties](#third-parties)
- [Resources](#resources)

---

## Dependencies

- Node
- NPM
- Rust [`Rustup`, `Rustc`, `Cargo`]
- Docker

## Build Service Locally

```bash
# Service
cd service

# Once only
rustup default nightly

# Build Service
cargo build [--release]

# Run Service locally
ACCESS_TOKEN=token SPACE_ID=id ENVIRONMENT=env cargo run [--release]

# Test Service
cargo test [--release]
```

## Build Portfolio Locally

```bash
# Run in WSL or linux
wsl

# Portfolio
cd portfolio

# Install Dependencies
npm install

# Build portfolio
npm run build

# Run Locally
npm run start # Requires service to be up!
```

## Build Portfolio Image

```bash
export DOCKER_HUB_USER_REGISTRY=xyz

# With script
./scripts/build-portfolio.sh $DOCKER_HUB_USER_REGISTRY cujo-portfolio

# OR

# Build with Docker: Dev
docker build -f portfolio/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest ./portfolio
# Build with Docker: Prod
docker build -f portfolio/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest --build-arg BUILD_MODE=":prod" ./portfolio
# Push image
docker push $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest
```

## Build Service Image

```bash
export DOCKER_HUB_USER_REGISTRY=xyz

# With script
./scripts/build-service.sh $DOCKER_HUB_USER_REGISTRY cujo-rust

# OR

# Build with Docker
docker build -f service/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-rust:latest ./service
# Push image
docker push $DOCKER_HUB_USER_REGISTRY/cujo-rust:latest
```

## // Todo

- [ ] Convert all pngs and jpgs to Avifs
- [ ] Switch all gifs to WebMs
- [ ] Add Rust code coverage
- [ ] Write front end tests

## // Done

- [x] Display a reading list
- [x] Remove Auth0 and redirecting with a Message broker queue subscription (Pubnub)
- [x] Remove Prenderer caching
- [x] Implement server side rendering and incremental static regeneration with NextJS
- [x] Swap NGINX and client side rendering for NextJS
- [x] Find out why all images are loading twice
- [x] Fixed huge react bundle sizes - it was `react-icons` the whole time
- [x] Swap React class components for React functional components
- [x] Use GraphQL client to frontend
- [x] Add a GraphQL API to backend
- [x] Trigger recache on contentful update
- [x] Get SEO and social media previews to work
- [x] Implement async system design
  - [x] Cujo service now maintains a cache of contentful content
  - [x] Requests from the website now read the cache only
  - [x] Contentful webhooks now call the cujo service on content publish / unpublish
  - [x] We authenticate the webhook POST request agaisnt Auth0
  - [x] Redirect and validate the token so only authenticated clients can trigger a can regenerate the cache
- [x] Generate CV PDF from contentful content
- [x] Add new section to showcase and allow users to download an up to date copy of my CV PDF  
- [x] Write blog
- [x] Add competency levels to skills and visualise
- [x] Move CV fully to Contentful and have backend collect CV data
- [x] Update color scheme to be less dark
- [x] Replace WordPress with Contentful to reduce need to host own content and infrastructure
- [x] Responsive and styled Nav
- [x] Restyle experience and education so they resemble a timeline
- [x] Add auto redeployment of new images pushed for prod
- [x] Create Circle CI build pipeline
- [x] Optimize images (sizes, file encodings - <https://developers.google.com/speed/pagespeed/insights/>)
- [x] Add authentication to wordpress rest api
- [x] Write backend tests
- [x] Get backend service working in prod
- [x] Document backend build and deployment
- [x] Put Blog data access and collation in backend service
- [x] Swap backstretch with a 2d/3d WEBGL canvas visualisation?
- [x] Swap out static file with Rust backend service?
- [x] Formalise colour palette
- [x] Setup SSL correctly.. (ssl-companion is running, it will assign certificates when the window opens again)
- [x] Fix predator/prey image asset
- [x] Finish contact page
- [x] Add site footer
- [x] Proof read profile
- [x] Add asset citations (now using my own images or free stock images only)
- [x] Produce production build for deployment
- [x] Move sharing bar to bottom on mobile devices

### Visualisations

- [x] 3D Box wave
- [x] Waves
- [x] Hexagons
- [x] Phylotaxis
- [x] 4D tesseract projection?
- [x] Conway's game of life

## Urls

- <https://danclarke.dev> - Portfolio
- <https://danclarke.dev/blog> - Blog
- <https://danclarke.dev/cv> - Generate, Show and Download Resume
- <https://api.danclarke.dev/graphql> - GraphQL API
- <https://api.danclarke.dev/graphiql> - GraphQL Playground

## Third Parties

- <https://www.contentful.com/> - Contentful
- <https://www.pubnub.com/> - Pubnub

## Resources

- Coding Train - `P5JS` <https://thecodingtrain.com/>
- Lets Get Rusty - `Rust` <https://www.youtube.com/channel/UCSp-OaMpsO8K0KkOqyBl7_w>
- Rust Rest API - `Rust` <https://cloudmaker.dev/how-to-create-a-rest-api-in-rust/>
- Fix Reqwest in Linux - `Rust` <https://stackoverflow.com/questions/52238397/why-does-reqwest-require-an-openssl-installation#52238675>
- Hosting websites using Nginx - `Nginx` <https://blog.harveydelaney.com/hosting-websites-using-docker-nginx/>
- Add Sudoers - `Linux` <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>
- Auto image redeploy with Watchtower - `Docker` <https://alexgallacher.com/setting-up-watchtower-to-update-docker-containers/>
- CircleCI Path filtering - `CircleCI` <https://circleci.com/docs/2.0/using-dynamic-configuration#execute-specific-workflows-or-steps-based-on-which-files-are-modified>
- React scroll spy - `React` <https://makotot.github.io/react-scrollspy/>
- React icons - `React` <https://react-icons.github.io/react-icons/icons?name=io5>
- DevIcons - `React` <https://devicon.dev/>
- Contentful - `CMS` <https://www.contentful.com/>
- Rich Text Renderer - `React` <https://www.npmjs.com/package/@contentful/rich-text-react-renderer>
- Import SCSS variables in Typescript - `SCSS` <https://medium.com/@christian.tonye_16869/scss-variables-in-react-typescript-components-de19d7f96245>
- Circular Progress Bar - `React` <https://github.com/kevinsqi/react-circular-progressbar>
- Generating PDF with React - `React PDF` <https://react-pdf.org/>
  - Rendering a PDF in Canvas - `React PDF`  <https://mozilla.github.io/pdf.js/examples/>
  - How to actually render to a Canvas - `PDFJS` <https://stackoverflow.com/questions/59867174/why-getcontext-function-cannot-be-called-on-react-jsx-canvas-object>
  - Fixing build with PDFJS - `PDFJS` <https://github.com/mozilla/pdf.js/issues/13200>
  - Material Icons png - <https://github.com/material-icons/material-icons-png>
- Auth0 Client Credentials Flow - `Rust` <https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-client-credentials-flow>
- Securing Actix Service with Auth0 - `Rust` <https://auth0.com/blog/build-an-api-in-rust-with-jwt-authentication-using-actix-web/#Securing-the-API>
- Generate Prerendered pages with Prerender - <https://github.com/prerender/prerender-nginx>
- Triggering a reache with Prerender - <https://docs.prerender.io/v1/docs/en/6-api>
- Ubuntu does not cache DNS records - <https://www.cloudns.net/blog/dns-cache-explained/>
- Async GraphQL Crate - `Rust` <https://github.com/async-graphql/async-graphql>
  - Async GraphQL tutorial - `Rust` <https://romankudryashov.com/blog/2020/12/graphql-rust/>
  - Async GraphQL book - `Rust` <https://async-graphql.github.io/async-graphql/en/introduction.html>
- GraphQL Client load GQL files - `GraphQL` <https://github.com/apollographql/graphql-tag/issues/42>
  - Craco Plugin - `GraphQL`  <https://www.npmjs.com/package/craco-graphql-loader>
- GraphQL Request - `GraphQL`  <https://github.com/prisma-labs/graphql-request>
- GZipping bundles to load page faster - `GZip` <https://stackoverflow.com/questions/55704772/how-to-compress-build-with-without-ejecting-create-react-app-also-include-compr>
- React Icons Tree shaking doesn't work - `React` <https://github.com/react-icons/react-icons/issues/289>
  - Styled Icons to the rescue <https://github.com/styled-icons/styled-icons>
- Carousel <https://www.npmjs.com/package/tiny-slider-react>
- Compiling canvas from source for M1 mac - <https://github.com/Automattic/node-canvas#compiling>
  - for alpine - <https://github.com/Automattic/node-canvas/issues/866>  
- Nextjs docker file - <https://github.com/vercel/next.js/tree/canary/examples/with-docker>
- Fix react-pdf issue in nextjs prod build - <https://stackoverflow.com/questions/72081585/created-pdf-doesnt-display-in-production-build-and-dev-build-page-but-locally>
- Pubnub rust crate - <https://docs.rs/pubnub-hyper/latest/pubnub_hyper/>
