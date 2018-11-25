# Web Services
This project is all about connecting this blockchain to a web service that users can interact with. I have build an API web service using NodeJS that allows you to post new blocks, then retrieve existing blocks of the private blockchain.

This API web service is built using Express.js (https://expressjs.com/) framework.

# How to run this application ?

1. Navigate to the project directory.
2. Run `npm install` on terminal to install all project dependencies.
3. Run `node app.js` so start the server and if it starts sucessfully you will see the message `Private Blockchain API is listening on port 8000!`

# API Endpoints

## POST /block

POST Block endpoint with body payload option.

http://localhost:8000/block

POST request with url path http://localhost:8000/block with body payload option.

### Example
`curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body":"block body contents"}'`

### Sample Request

POST : http://localhost:8000/block
Content-Type: application/json
Request body: {"body":"block body contents"}

### Sample Response

{"hash":"23a68f869c94c910a1a002ba50d0efd3ab4b322e09e8b244ab319d25a2d619ea","height":1,"body":"block body contents","time":"1532111867","previousBlockHash":"71224ea8998e65297bb8d0bee1d60a4555d6e20644ee9c92024d9de1c039343c"}

## GET /block/{BLOCK_HEIGHT}

Block endpoint using URL path with block height parameter.

http://localhost:8000/block/{BLOCK_HEIGHT}

### Example
Open `http://localhost:8000/block/0` to get the first block of the private blockchain.

### Sample Output

Connection: keep-alive
Content-Length: 179
Content-Type: application/json; charset=utf-8
Date: Fri, 20 Jul 2018 18:40:55 GMT
ETag: W/"b3-ZMFqRMslSS3eQLB6lzSvzsU2McY"
X-Powered-By: Express

{"hash":"71224ea8998e65297bb8d0bee1d60a4555d6e20644ee9c92024d9de1c039343c","height":0,"body":"First block in the chain - Genesis block","time":"1532111867","previousBlockHash":""}
