# DEPS --------------------------------///
FROM node:18.4.0 AS deps


# RUN apk update && apk add python3 make gcc g++ .gyp

WORKDIR /cujo

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm ci --legacy-peer-deps --verbose

# BUILD --------------------------------///
FROM node:18.4.0-alpine AS build

ARG CUJO_SERVICE_URL 
ENV CUJO_SERVICE_URL $CUJO_SERVICE_URL

ARG NEXT_PUBLIC_GA_MEASUREMENT_ID 
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID $NEXT_PUBLIC_GA_MEASUREMENT_ID

ENV NEXT_SHARP_PATH /cujo/node_modules/sharp

WORKDIR /cujo

COPY --from=deps /cujo/node_modules ./node_modules
COPY . .

RUN npm run build

# RUNTIME --------------------------------///
FROM node:18.4.0-alpine AS runtime

ARG CUJO_SERVICE_URL 
ENV CUJO_SERVICE_URL $CUJO_SERVICE_URL

ARG NEXT_PUBLIC_GA_MEASUREMENT_ID 
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID $NEXT_PUBLIC_GA_MEASUREMENT_ID

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /cujo

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /cujo/public ./public
COPY --from=build --chown=nextjs:nodejs /cujo/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /cujo/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]