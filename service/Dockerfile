#BUILD -----------------------------------
FROM rustlang/rust:nightly as build

WORKDIR /cujo

COPY . .
RUN cargo install --path .

#RELEASE -----------------------------------
FROM gcr.io/distroless/cc-debian11

WORKDIR /cujo

COPY --from=build /usr/local/cargo/bin/cujo /usr/local/bin/cujo
COPY --from=build /cujo/.env .

EXPOSE 5001

CMD ["cujo"]