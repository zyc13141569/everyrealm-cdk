import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';

export class VpcStack extends Stack {
  public readonly vpc: ec2.Vpc;
  public readonly cluster: ecs.Cluster;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'EveryrealmVPC', {
      maxAzs: 2,
      natGateways: 1,
    });

    this.cluster = new ecs.Cluster(this, 'EveryrealmCluster', {
      vpc: this.vpc,
    });
  }
}
