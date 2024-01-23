# Krato Strength

An app for tracking strength workouts.

## TODOs

- Use OpenApiGenerator to generate TS models and services from open api spec
- Use Angular Material Components
- Change Api to suit intended use case
- Create UI

## Swagger

Swagger docs are at `http://localhost:8080/v3/api-docs`. They're also available to users with `ROLE_ADMIN` from the UI.

## Roadmap

### Exercise

- variants
- complimentary to exercises

### Workout

- weight
- resistance (band)
- base weight of bodyweight factor. User has a bodyweight, say a push up is ~80% then that's the base weight of the exercise, add a plate/plate carrier etc.
- A negative can be a variant? Kipping pull ups or knee press ups.

## Dependencies

- Node v18
- Java v17
- Angular CLI v17

## Dev

Spring backend, Angular frontend built with Maven and npm.

```
./mvnw
npm start
```

## Docker

Start Postgres;

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

```
docker-compose -f src/main/docker/postgresql.yml down
```

docker npm script;

```
npm run java:docker
```

For Apple Silicon;

```
npm run java:docker:arm64
```

Then run:

```
docker-compose -f src/main/docker/app.yml up
```

to stop;

```
docker-compose -f src/main/docker/app.yml down
```
