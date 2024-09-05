// backend/lambda/handleFormSubmission.js
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const params = {
        TableName: '<my-react-app>',
        Item: {
            id: body.id,
            name: body.name,
            value: body.value,
        }
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item inserted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to insert item', error: error.message }),
        };
    }
};
