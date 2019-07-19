import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient();
const todoTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    console.log("Processing Event ", event);
    const userId = event["requestContext"]["authorizer"]["principalId"];
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    const params = {
        TableName: todoTable,
        Key: {
            "userId": userId,
            "todoId": todoId
        },
        UpdateExpression: "set #a = :a, #b = :b, #c = :c",
        ExpressionAttributeNames: {
            "#a": "name",
            "#b": "dueDate",
            "#c": "done"
        },
        ExpressionAttributeValues: {
            ":a": updatedTodo['name'],
            ":b": updatedTodo['dueDate'],
            ":c": updatedTodo['done']
        },
        ReturnValues: "ALL_NEW"
    };

    const result = await docClient.update(params).promise();
    console.log(result);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": result.Attributes
        }),
    }
};
