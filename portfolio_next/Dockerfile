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

ARG CUJO_SERVICE_URL 
ENV CUJO_SERVICE_URL $CUJO_SERVICE_URL

WORKDIR /cujo

COPY --from=deps /cujo/node_modules ./node_modules
COPY . .

RUN npm run build

# RUNTIME --------------------------------///
FROM node:18.4.0-alpine AS runtime

ARG CUJO_SERVICE_URL 
ENV CUJO_SERVICE_URL $CUJO_SERVICE_URL
ENV PORT 3000

WORKDIR /cujo

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /cujo/public ./public
COPY --from=build --chown=nextjs:nodejs /cujo/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /cujo/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]