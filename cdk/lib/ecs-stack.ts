import { Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

interface EcsStackProps extends StackProps {
  vpc: ec2.Vpc;
  cluster: ecs.Cluster;
  table: dynamodb.ITable;
}

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props: EcsStackProps) {
    super(scope, id, props);

    // User Service
    const userImage = new ecrAssets.DockerImageAsset(this, 'UserImage', {
      directory: 'services/user-service',
    });

    const userService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'UserService', {
      cluster: props.cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(userImage),
        environment: {
          TABLE_NAME: props.table.tableName,
        },
      },
      publicLoadBalancer: true,
    });

    // Admin Service
    const adminImage = new ecrAssets.DockerImageAsset(this, 'AdminImage', {
      directory: 'services/admin-service',
    });

    const adminService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'AdminService', {
      cluster: props.cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(adminImage),
        environment: {
          TABLE_NAME: props.table.tableName,
        },
      },
      publicLoadBalancer: true,
    });

    // Grant DynamoDB access to both task roles
    props.table.grantReadWriteData(userService.taskDefinition.taskRole);
    props.table.grantReadWriteData(adminService.taskDefinition.taskRole);
  }
}
