# DEPS --------------------------------///
FROM node:18.4.0-alpine AS deps

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

WORKDIR /cujo

COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps

# BUILD --------------------------------///
FROM node:18.4.0-alpine AS build

WORKDIR /cujo

COPY --from=deps /cujo/node_modules ./node_modules

COPY . .

ENV CUJO_SERVICE_URL https://danielclarke.tech/api

RUN npm run build

# RUNTIME --------------------------------///
FROM node:18.4.0-alpine AS runtime

WORKDIR /cujo

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /cujo/public ./public

COPY --from=build --chown=nextjs:nodejs /cujo/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /cujo/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV CUJO_SERVICE_URL https://danielclarke.tech/api

CMD ["node", "server.js"]