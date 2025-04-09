import { DynamoDB } from 'aws-sdk';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

const dynamo = new DynamoDB.DocumentClient();

app.post('/add-bonus-claim', async (req, res) => {
  const params = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      PK: 'USER#123',
      SK: 'BONUS#456',
      timestamp: new Date().toISOString(),
      status: 'CLAIMED',
    },
  };
  await dynamo.put(params).promise();
  res.json({ message: 'Bonus claim added' });
});

app.listen(3000, () => console.log('user-service running'));
