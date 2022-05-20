# Docker talk

Just a simple demo project to showcase how to dockerize a `Nodejs` and a `React` application, how to link them and then run all the required containers with `docker-compose`.

## Project structure

### back-end

Basic node application that exposes few `REST` APIs using `fastify`.

### front-end

Basic react application that interacts with the APIs exposed by the `back-end` service.

## How to run

Install `docker` and `docker-compose` installed and your host machine, then launch this command from the root of the project:

```
docker-compose up
```

## Rebuild

To apply the changes to the applications:

```
docker-compose build
```

```
docker-compose up
```