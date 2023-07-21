####################################################################################################
## Builder
####################################################################################################
FROM rust:latest AS builder

RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev
RUN update-ca-certificates

# Create appuser
ENV USER=smms
ENV UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"


WORKDIR /smms

COPY ./ .

RUN cargo build --target x86_64-unknown-linux-musl --release


####################################################################################################
## Builder front-end
####################################################################################################
FROM node:latest AS front-end-builder
WORKDIR /web
COPY ./web .
RUN yarn install
RUN yarn build
RUN mkdir web
RUN cp ./*.html ./web
RUN cp -r ./assets ./web

####################################################################################################
## Final image
####################################################################################################
FROM scratch

# Import from builder.
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /smms

# Copy our build
COPY --from=builder /smms/target/x86_64-unknown-linux-musl/release/smms-webp-upload ./
# Copy our front-end
COPY --from=front-end-builder /web/web ./web

# Use an unprivileged user.
USER smms:smms

CMD ["/smms/smms-webp-upload"]