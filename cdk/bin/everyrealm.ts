import { App } from 'aws-cdk-lib';
import { DynamoDBStack } from '../lib/dynamodb-stack';
import { EcsStack } from '../lib/ecs-stack';
import { VpcStack } from '../lib/vpc-stack';

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION,
};

const app = new App();

const dynamoStack = new DynamoDBStack(app, 'Everyrealm-DynamoDB', { env });

const vpcStack = new VpcStack(app, 'Everyrealm-VPC', { env });

new EcsStack(app, 'Everyrealm-ECS', {
  env,
  vpc: vpcStack.vpc,
  cluster: vpcStack.cluster,
  table: dynamoStack.bonusTable,
});
