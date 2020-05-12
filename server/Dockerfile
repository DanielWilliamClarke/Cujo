#DEPENDENCIES -----------------------------------
FROM golang:1.13-alpine as builder

LABEL maintainer="Daniel Clarke (clarkit@gmail.com)"

COPY /src /cv_svc
WORKDIR /cv_svc

RUN go mod tidy && go build

#RELEASE -----------------------------------
FROM alpine:3.11.6

RUN mkdir ./cv_svc
WORKDIR /cv_svc

COPY --from=builder /cv_svc/cv_server cv_server

# Create user
RUN adduser -D user && \
  chown -R user /cv_svc
USER user

# Set ports
ENV PORT 5000
EXPOSE 5000

ENTRYPOINT ./cv_server