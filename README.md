# Everyrealm CDK Take-Home Task

This project defines and deploys an AWS infrastructure using the AWS Cloud Development Kit (CDK) in TypeScript. It includes fully automated deployment using GitHub Actions CI/CD.

---

## ✅ Stack Overview

The CDK project provisions the following:

- **Amazon VPC** – Default VPC with public subnets for Fargate tasks
- **Amazon ECS Cluster** – Fargate-compatible ECS cluster
- **Amazon DynamoDB Table** – Stores bonus claims
- **Two Fargate Services** behind an **Application Load Balancer**:
  - `user-service` – Exposes `/create-bonus-claim` (POST)
  - `admin-service` – Exposes `/get-bonus-claim` (GET)

---

## 🚀 Deployment

This project uses GitHub Actions to deploy automatically on push to `main`.

### CI/CD Steps:
- Installs CDK and dependencies
- Configures AWS credentials
- Synthesizes and deploys CDK stacks (`cdk deploy --all`)

---

## 🌐 Endpoints

After deployment, access your services via the Application Load Balancer DNS (found in AWS → EC2 → Load Balancers).

| Method | Path                  | Service       | Description               |
|--------|-----------------------|----------------|---------------------------|
| POST   | `/create-bonus-claim` | `user-service` | Creates a bonus entry     |
| GET    | `/get-bonus-claim`    | `admin-service`| Retrieves a bonus entry   |

> **Note:** Make sure to use the correct ALB DNS in place of `<your-alb-dns>`.

---

## 🛠 Technologies

- AWS CDK v2 (TypeScript)
- Amazon ECS + Fargate
- Amazon DynamoDB
- Application Load Balancer
- GitHub Actions

---

## 📁 Structure

