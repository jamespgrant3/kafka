# start docker
colima start --cpu 4 --memory 24

# start k8s
start minikube:
```
minikube start
```

make local docker images accessible to minikube:
```
eval $(minikube docker-env)
```

# build producer image
from the root of the repo:
```
cd producer
npm i
npm run build && docker build -t producer:v1 .
```

# build consumer image
from the root of the repo:
```
cd consumer
npm i
npm run build && docker build -t consumer:v1 .
```

# deploy kafka objects
from the root of the repo:
```
kubectl apply -f ./infra.yml
```

# apply producer and consumer services
from the root of the repo:
```
kubectl apply -f ./services.yml
```

# create topic
from within k9, shell into the broker and run this to create the topic:
```
kafka-topics --create --topic my-topic -partitions 3 --replication-factor 1 --bootstrap-server kafka-broker:9092
```

# expose kafka-ui
```
minikube service -n kafka kafka-ui --url
```

# expose producer
```
minikube service -n kafka producer --url
```

# push data to the producer
publish messages. run individually if you like to follow along in kafka-ui:
```
curl -d '{"topic":"my-topic","messages": [{ "key": "payment",  "value": "a payment of $500 was made" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "address_change",  "value": "the address was changed to 123 Main St." }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "charge",  "value": "a purchase was made for $35" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "credit_line_increase",  "value": "credit line increased to $5000" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>

curl -d '{"topic":"my-topic","messages": [{ "key": "payment",  "value": "a payment of $35 was made" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "address_change",  "value": "the address was changed to 456 Some Other St." }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "charge",  "value": "a purchase was made for $550" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
curl -d '{"topic":"my-topic","messages": [{ "key": "dispute",  "value": "a transaction was disputed for $4500" }]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:<port-from-producer-service>
```
