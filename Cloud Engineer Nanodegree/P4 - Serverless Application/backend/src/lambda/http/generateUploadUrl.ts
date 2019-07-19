import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import * as AWS from 'aws-sdk';
const s3Client = new AWS.S3({
    signatureVersion: 'v4',
});
const s3BucketName = process.env.S3_BUCKET_NAME;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const todoId = event.pathParameters.todoId;
    const url = s3Client.getSignedUrl('putObject', {
        Bucket: s3BucketName,
        Key: todoId,
        Expires: 1000,
    });
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            uploadUrl: url,
        })
    };
};
