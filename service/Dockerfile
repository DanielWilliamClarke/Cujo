#BUILD -----------------------------------
FROM rust:1.59 as build

WORKDIR ./cujo

COPY . .
RUN rustup default nightly && \
  cargo install --path .

#RELEASE -----------------------------------
FROM debian:buster-slim

RUN apt-get update -y && apt-get install -y ca-certificates libssl-dev

WORKDIR /cujo

COPY --from=build /usr/local/cargo/bin/cujo /usr/local/bin/cujo
COPY --from=build /cujo/.env .
COPY --from=build /cujo/data.json .

RUN adduser user && \
  chown -R user /cujo
USER user

EXPOSE 5001

CMD ["cujo"]