## purpose
This service is used as a kafka producer in this project.

## environment variables
You must provide a few environment variables for this service to run correctly.

`BROKER` the host:port of the broker

## usage
To build this project using nest:
```sh
npm run build
```

## development
Set the needed environment variables and then run:
```sh
BROKER=localhost:9092 \
npm run start:dev
```

## docker build
Within the producer directory:

```sh
npm run build && docker build -t producer:v1 .
```

## docker run
```sh
npm run build &&
docker build -t producer:v1 . &&
docker run -d \
-e BROKER=localhost:9092 \
-p 3000:3000 \
producer:v1
```
