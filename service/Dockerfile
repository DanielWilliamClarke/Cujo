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
FROM alpine:latest

WORKDIR /cujo

COPY --from=build /cujo/target/release/cujo .
COPY --from=build /cujo/.env .

run ls /cujo

# RUN adduser -D user && \
#   chown -R user /cujo
# USER user

EXPOSE 8000

ENTRYPOINT ./cujo