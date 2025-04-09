import { DynamoDB } from 'aws-sdk';
import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

const app = express();
app.use(bodyParser.json());

const dynamo = new DynamoDB.DocumentClient();

app.get('/get-bonus-claim', async (req: Request, res: Response) => {
  const params = {
    TableName: process.env.TABLE_NAME!,
    Key: {
      PK: 'USER#123',
      SK: 'BONUS#456',
    },
  };
  const result = await dynamo.get(params).promise();
  res.json(result.Item);
});

app.listen(3000, () => console.log('admin-service running'));
