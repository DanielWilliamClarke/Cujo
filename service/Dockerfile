#BUILD -----------------------------------
FROM rust:1.52.1 as build

RUN USER=root cargo new --bin cujo
WORKDIR ./cujo

COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release
RUN rm src/*.rs

COPY . /cujo

RUN rm ./target/release/deps/cujo*
RUN cargo build --release

#RELEASE -----------------------------------
FROM ubuntu:20.04

WORKDIR /cujo

COPY --from=build /cujo/target/release/cujo .
COPY --from=build /cujo/.env .

RUN adduser user && \
  chown -R user /cujo
USER user

EXPOSE 5001

CMD ["./cujo"]