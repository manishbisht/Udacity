import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();
const todoTable = process.env.TODOS_TABLE;
const uuidv4 = require('uuid/v4');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item
    console.log("Processing Event ", event);
    const userId = event["requestContext"]["authorizer"]["principalId"];
    const newTodo: CreateTodoRequest = JSON.parse(event.body);

    const params = {
        TableName: todoTable,
        Item: {
            userId: userId,
            todoId: uuidv4(),
            createdAt: new Date().getTime().toString(),
            done: false,
            ...newTodo,
        },
    };

    const result = await docClient.put(params).promise();
    console.log(result);

    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": params.Item
        }),
    }
};
