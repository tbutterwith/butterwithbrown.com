import { Handler } from '@netlify/functions';
const AWS = require('aws-sdk');
import cookie from 'cookie';
import { checkAndGetPermissions } from '../jwt';

const handler: Handler = async (event, context) => {
  if (event.httpMethod != 'GET') {
    return { statusCode: 405 };
  }

  const cookies: { token: string } = cookie.parse(event.headers.cookie);
  const { token } = cookies;

  if (!token) {
    console.log('No token');
    return { statusCode: 401 };
  }

  const guestPermissions = checkAndGetPermissions(token);

  if (!guestPermissions) {
    return { statusCode: 401 };
  }

  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.WD_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.WD_AWS_SECRET_ACCESS_KEY,
  });

  const table = process.env.DB_TABLE_NAME;

  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    const { Item } = await docClient
      .get({ TableName: table, Key: { guest_type: 'directions' } })
      .promise();

    if (!Item) {
      return { statusCode: 401 };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(Item.info),
      headers: {
        'Content-type': 'application/JSON',
        'Cache-control': 'public, max-age=300',
      },
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
    };
  }
};

export { handler };
