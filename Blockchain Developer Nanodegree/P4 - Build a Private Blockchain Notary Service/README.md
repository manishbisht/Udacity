# Web Services
This project is all about connecting this blockchain to a web service that users can interact with. I have build an API web service using NodeJS that allows you to post new blocks, then retrieve existing blocks of the private blockchain.

This API web service is built using Express.js (https://expressjs.com/) framework.

# How to run this application ?

1. Navigate to the project directory.
2. Run `npm install` on terminal to install all project dependencies.
3. Run `node app.js` so start the server and if it starts sucessfully you will see the message `Private Blockchain API is listening on port 8000!`

# API Endpoints

## POST /requestValidation

http://localhost:8000/requestValidation

POST request with url path http://localhost:8000/requestValidation with address payload option.

### Example
```
curl -X "POST" "http://localhost:8000/requestValidation" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
            "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ"
          }'
```

### Sample Request

POST : http://localhost:8000/requestValidation
Content-Type: application/json
Request body: {"address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ"}

### Sample Response
```
{
    "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
    "requestTimeStamp": "1532793730329",
    "message": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ:1532793730329:starRegistry",
    "validationWindow": 300
}
```

## POST /message-signature/validate

http://localhost:8000/message-signature/validate

POST request with url path http://localhost:8000/message-signature/validate with address and signature payload option.

### Example
```
curl -X "POST" "http://localhost:8000/message-signature/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
            "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
            "signature": "IPfK9h/B6BYc3LUvXUXYEV3FIofgQSI65WUeG+sSRgf3G4uE9jVBxCU5Y4CK7BynhpMjyq3idd2FYS6h2iOzO1o="
          }'
```

### Sample Request

POST : http://localhost:8000/message-signature/validate
Content-Type: application/json
Request body: {"address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ", "signature": "IPfK9h/B6BYc3LUvXUXYEV3FIofgQSI65WUeG+sSRgf3G4uE9jVBxCU5Y4CK7BynhpMjyq3idd2FYS6h2iOzO1o="}

### Sample Response
```
{
    "registerStar": true,
    "status": {
        "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
        "requestTimeStamp": "1532793730329",
        "message": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ:1532793730329:starRegistry",
        "validationWindow": "93.43799999999999",
        "messageSignature": "valid"
    }
}
```

## POST /block

http://localhost:8000/block

POST request with url path http://localhost:8000/block with address and star payload option.

### Example
```
curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
            "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
            "star": {
              "dec": "-26° 29' 24.9",
              "ra": "16h 29m 1.0s",
              "story": "Found star using https://www.google.com/sky/"
            }
          }'
```

### Sample Request

POST : http://localhost:8000/block
Content-Type: application/json
Request body: {"address":"1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ","star":{"dec":"-26° 29' 24.9","ra":"16h 29m 1.0s","story":"Found star using https://www.google.com/sky/"}}

### Sample Response
```
{
    "hash": "cfba0c86977f8455d06076e4dd8610e39e0710d2cf16101f36b022b1deea7550",
    "height": 3,
    "body": {
        "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
        "star": {
            "dec": "-26° 29' 24.9",
            "ra": "16h 29m 1.0s",
            "story": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1532796550106",
    "previousBlockHash": "a784b7a998eb483bb86f1a640681e9394f5f73aedd37887051af7d25571b3902"
}
```

## GET /stars/address:[address]

Get stars endpoint using URL path with block address parameter.

http://localhost:8000/stars/address:[address]

### Example
Open `http://localhost:8000/stars/address:1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ` to get the stars of `1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ` address.

### Sample Output

Connection: keep-alive
Content-Length: 716
Content-Type: application/json; charset=utf-8
Date: Sat, 28 Jul 2018 17:47:12 GMT
ETag: W/"2cc-WLBl1sb7+YBDitKn+YmMLElDyxA"
X-Powered-By: Express

```
[
    {
        "hash": "a784b7a998eb483bb86f1a640681e9394f5f73aedd37887051af7d25571b3902",
        "height": 2,
        "body": {
            "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
            "star": {
                "dec": "-26° 29' 24.9",
                "ra": "16h 29m 1.0s",
                "story": "Rm91bmQgc3RhciB1c2luZyBodHRwczovL3d3dy5nb29nbGUuY29tL3NreS8=",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1532796366000",
        "previousBlockHash": "e7ac377d469b227e04cc70b9ad34ea0bb7448aade2d470ae97f8754a2a8a07b2"
    },
    {
        "hash": "cfba0c86977f8455d06076e4dd8610e39e0710d2cf16101f36b022b1deea7550",
        "height": 3,
        "body": {
            "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
            "star": {
                "dec": "-26° 29' 24.9",
                "ra": "16h 29m 1.0s",
                "story": "Rm91bmQgc3RhciB1c2luZyBodHRwczovL3d3dy5nb29nbGUuY29tL3NreS8=",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1532796550106",
        "previousBlockHash": "a784b7a998eb483bb86f1a640681e9394f5f73aedd37887051af7d25571b3902"
    }
]
```

## GET /stars/hash:[hash]

Get star endpoint using URL path with block hash parameter.

http://localhost:8000/stars/hash:[hash]

### Example
Open `http://localhost:8000/stars/hash:cfba0c86977f8455d06076e4dd8610e39e0710d2cf16101f36b022b1deea7550` to get the stars having `cfba0c86977f8455d06076e4dd8610e39e0710d2cf16101f36b022b1deea7550` as hash.

### Sample Output

Connection: keep-alive
Content-Length: 358
Content-Type: application/json; charset=utf-8
Date: Sat, 28 Jul 2018 17:57:57 GMT
ETag: W/"166-LDCmHuMbT0o6+hjzR1VhgVJV5oI"
X-Powered-By: Express

```
{
    "hash": "cfba0c86977f8455d06076e4dd8610e39e0710d2cf16101f36b022b1deea7550",
    "height": 3,
    "body": {
        "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
        "star": {
            "dec": "-26° 29' 24.9",
            "ra": "16h 29m 1.0s",
            "story": "Rm91bmQgc3RhciB1c2luZyBodHRwczovL3d3dy5nb29nbGUuY29tL3NreS8=",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1532796550106",
    "previousBlockHash": "a784b7a998eb483bb86f1a640681e9394f5f73aedd37887051af7d25571b3902"
}
```

## GET /block/{BLOCK_HEIGHT}

Block endpoint using URL path with block height parameter.

http://localhost:8000/block/{BLOCK_HEIGHT}

### Example
Open `http://localhost:8000/block/2` to get the second block of the private blockchain.

### Sample Output

Connection: keep-alive
Content-Length: 355
Content-Type: application/json; charset=utf-8
Date: Sat, 28 Jul 2018 18:02:37 GMT
ETag: W/"163-R3WxTuBUCp56eZ6DEBKxDiQGTaE"
X-Powered-By: Express

```
{
    "hash": "a784b7a998eb483bb86f1a640681e9394f5f73aedd37887051af7d25571b3902",
    "height": 2,
    "body": {
        "address": "1b6dWRLeDVmeoDteHYgEDrJBDk9by4QNJ",
        "star": {
            "dec": "-26° 29' 24.9",
            "ra": "16h 29m 1.0s",
            "story": "Rm91bmQgc3RhciB1c2luZyBodHRwczovL3d3dy5nb29nbGUuY29tL3NreS8=",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1532796366",
    "previousBlockHash": "e7ac377d469b227e04cc70b9ad34ea0bb7448aade2d470ae97f8754a2a8a07b2"
}
```