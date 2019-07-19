import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();
const todoTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("Processing Event ", event);
    const userId = event["requestContext"]["authorizer"]["principalId"];
    const todoId = event.pathParameters.todoId;
    const params = {
        TableName: todoTable,
        Key: {
            "userId": userId,
            "todoId": todoId
        },
    };
    const result = await docClient.delete(params).promise();
    console.log(result);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: "",
    }
};
