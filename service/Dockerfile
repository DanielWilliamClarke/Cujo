#BUILD -----------------------------------
FROM rust:1.52.1 as build

RUN rustup default nightly && \
    USER=root cargo new --bin cujo

WORKDIR ./cujo

COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release
RUN rm src/*.rs

COPY . /cujo

RUN rm ./target/release/deps/cujo*
RUN cargo test --release 
RUN cargo install --path .

#RELEASE -----------------------------------
FROM debian:buster-slim

RUN apt-get update -y && apt-get install -y libssl-dev

WORKDIR /cujo

COPY --from=build /usr/local/cargo/bin/cujo /usr/local/bin/cujo
COPY --from=build /cujo/.env .
COPY --from=build /cujo/data.json .

RUN adduser user && \
  chown -R user /cujo
USER user

EXPOSE 5001

CMD ["cujo"]