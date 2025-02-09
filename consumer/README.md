## purpose
This service is used as a kafka consumer in this project.

## environment variables
You must provide a few environment variables for this service to run correctly.

`CLIENT_ID` a unique identifier for an instance in the consumer group
`BROKER` the host:port of the broker
`GROUP_ID` a unique identifier of a group of consumers
`TOPIC` the topic you wish to consume

## usage
To build this project using nest:
```sh
npm run build
```

## development
Set the needed environment variables and then run:
```sh
CLIENT_ID=client1  \
BROKER=localhost:9092 \
GROUP_ID=group1  \
TOPIC=my-topic \
npm run start:dev
```

## docker build
Within the consumer directory:

```sh
npm run build && docker build -t consumer:v1 .
```

## docker run
```sh
npm run build &&
docker build -t consumer:v1 . &&
docker run -d \
-e CLIENT_ID=client1  \
-e BROKER=localhost:9092 \
-e GROUP_ID=group1  \
-e TOPIC=my-topic \
-p 3000:3000 \
consumer:v1
```
