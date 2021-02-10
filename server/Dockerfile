#DEPENDENCIES -----------------------------------
FROM golang:1.16-rc-alpine as builder

LABEL maintainer="Daniel Clarke (clarkit@gmail.com)"

COPY /src /cujo_svc
WORKDIR /cujo_svc

RUN go mod tidy && go build

#RELEASE -----------------------------------
FROM alpine:3.11.6

RUN mkdir ./cujo_svc
WORKDIR /cujo_svc

COPY --from=builder /cujo_svc/cujo_server cujo_server

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# Create user
RUN adduser -D user && \
  chown -R user /cujo_svc
USER user

# Set ports
ENV PORT 5000
EXPOSE 5000

ENTRYPOINT /wait && ./cujo_server