# KP Science Circle — AWS Implementation Plan

## Project context
- Institute: **KP Science Circle** — Science & Maths coaching, classes 8-12 + competitive exam foundations (India-based, real institute).
- Current state: static marketing site only ([index.html](index.html), [script.js](script.js), [styles.css](styles.css)) — home, about, courses, testimonials, contact.
- Goal: expand into a full production-grade web app — AI chatbot, login/signup, role-based views for student vs teacher, 24/7 availability across India/world, deployed on **AWS**, kept at low/free cost.
- This is a practice project, but scoped and built with real production concerns in mind.
- Two other stack options were also discussed (Vercel+Supabase, Azure Static Web Apps) but **AWS was the direction being pursued when this doc was written**.

## Architecture path chosen: AWS Amplify (managed/serverless)

Chosen over a fully manual AWS setup (raw S3+CloudFront+API Gateway+CDK) because it's faster to stand up and still uses real underlying AWS services (Amplify just orchestrates them). The manual path remains an option later for deeper AWS learning.

| Layer | AWS Service | Notes |
|---|---|---|
| Frontend hosting + CDN | **AWS Amplify Hosting** | Auto build/deploy from GitHub, provisions CloudFront + S3 underneath, solves global 24/7 availability |
| Backend/API | **Lambda + API Gateway (HTTP API)** | Serverless, scales to zero, no idle cost |
| Auth | **Amazon Cognito** (User Pool) | Custom attribute `custom:role` = student/teacher/admin; 50,000 MAUs free forever |
| Database | **DynamoDB** (preferred) or **RDS Postgres** (alt) | DynamoDB: 25GB + 25 WCU/RCU free forever. RDS: free only for 12 months, then ~$12-15/mo |
| File storage | **S3** | Study material, assignment uploads, profile photos — pre-signed URLs for access |
| AI chatbot | **Amazon Bedrock** (Claude Haiku or similar cheap model) | Lambda function: query → Bedrock → response. Skip full RAG initially — use a system prompt with institute FAQ/course info |
| Email | **SES** | Signup verification, password reset, notifications (or let Cognito handle natively) |
| Domain/HTTPS | **Route 53 + ACM** | ACM certs are free, auto-attached via Amplify/CloudFront |
| CI/CD | **Amplify Hosting (built-in)** | Auto-deploy on push, no separate pipeline needed |
| Monitoring | **CloudWatch** | Alarms, logs, basic dashboards |
| Secrets | **Secrets Manager / Parameter Store** | API keys (e.g. Bedrock, third-party), never hardcoded |
| IaC (optional, recommended) | **AWS CDK** (TypeScript) | Reproducible infra-as-code instead of manual console clicking |

## Step-by-step phases

**Phase 0 — Account setup & cost guardrails**
- Create AWS account, enable MFA on root, create a separate IAM admin user for daily work
- Set up **AWS Budgets with email alerts** (e.g. $5 / $10 / $20 thresholds) — do this before provisioning anything else
- Region: **ap-south-1 (Mumbai)** as origin (CloudFront's edge network still serves globally regardless of origin region)

**Phase 1 — Frontend**
- Migrate existing static site content into a Next.js project (reuse current HTML/CSS/JS as the design source)
- Push to GitHub, connect **AWS Amplify Hosting** → auto build/deploy on push

**Phase 2 — Auth**
- Create Cognito User Pool, add `custom:role` attribute
- Integrate via AWS Amplify Auth library (or NextAuth's Cognito provider)
- Middleware/route guards for `/student/*` and `/teacher/*`

**Phase 3 — Database**
- Decide DynamoDB vs RDS (open decision — see below)
- If DynamoDB: design access patterns for users/courses/attendance/assignments/results up front (schema design matters more than in SQL)
- If RDS: provision in private subnet, connect via Lambda (VPC-enabled) or RDS Proxy

**Phase 4 — Backend APIs**
- Lambda functions per feature area: attendance, assignments, results/tests, chatbot proxy, fee status
- Expose via API Gateway HTTP API (cheaper than REST API type)
- Least-privilege IAM role per Lambda

**Phase 5 — File storage**
- S3 bucket, private by default, pre-signed URLs or CloudFront signed cookies for secure access

**Phase 6 — AI chatbot**
- Enable Bedrock, request access to Claude Haiku (or similarly cheap model)
- Lambda proxy function, system prompt seeded with institute FAQ/course/fee/batch info
- Rate-limit this endpoint specifically (protects both cost and abuse)

**Phase 7 — Email**
- SES setup, verify sending domain, request production access (exit sandbox) once sending to real unverified addresses

**Phase 8 — Domain & HTTPS**
- Route 53 hosted zone (or point existing registrar's nameservers to Route 53)
- ACM certificate, auto-attached via Amplify/CloudFront

**Phase 9 — CI/CD**
- Already handled by Amplify Hosting (Phase 1)

**Phase 10 — Monitoring & security hardening**
- CloudWatch alarms/dashboard
- API Gateway throttling
- Secrets Manager/Parameter Store for all keys
- IAM least-privilege review

**Phase 11 — Cutover**
- If parallel-running an existing deployment (e.g. Vercel/Supabase prototype), test AWS version thoroughly before repointing DNS

## Feature scope (recap, unchanged by hosting choice)

**Public:** home/about/courses/results/contact (existing) + AI FAQ chatbot
**Student:** dashboard, attendance %, study material downloads, assignments + grades, test/quiz module with progress tracking, fee status, announcements, AI doubt-solving assistant
**Teacher:** assigned batches/students, mark attendance, upload material, create assignments/quizzes, grade submissions, post announcements, basic batch analytics
**Admin (optional):** manage teachers/students/batches/courses, fee tracking overview

## Costing (realistic, small-institute scale — a few hundred users)

| Service | Free tier | Cost after free tier |
|---|---|---|
| Amplify Hosting | 1000 build-min/mo, 15GB served, 5GB stored — always free | ~$0-3/mo beyond |
| Cognito | 50,000 MAUs free forever | $0 at this scale |
| Lambda | 1M requests + 400,000 GB-s compute/mo — always free | $0 at this scale |
| API Gateway (HTTP API) | 1M calls/mo free for 12 months | ~$1/million calls after — negligible |
| DynamoDB | 25GB + 25 WCU/RCU — always free | $0 at this scale |
| *(alt)* RDS Postgres | 750 hrs micro instance + 20GB, 12 months only | ~$12-15/mo after |
| S3 | 5GB free, 12 months | ~$0.023/GB/mo after (20GB ≈ $0.46/mo) |
| CloudFront | 1TB transfer + 10M requests, 12 months | Negligible at low traffic after |
| SES | 3,000 emails/mo free (from Lambda) — always free | $0.10/1,000 emails beyond |
| Route 53 | Not free | $0.50/mo per hosted zone + ~$12-15/yr domain |
| Bedrock (chatbot) | No free tier | Claude Haiku ≈ $0.25/M input + $1.25/M output tokens — a few $/month for FAQ-bot-level use |
| CloudWatch | 10 metrics, 5GB logs, 10 alarms free | Pennies beyond |

**Bottom line:**
- First 12 months (new AWS account): roughly **$0-5/month**
- After 12 months, with DynamoDB: roughly **$3-8/month**
- After 12 months, with RDS instead: roughly **$15-25/month** (RDS instance dominates)

Note: AWS free-tier terms and any signup promo credits change periodically — verify current terms on the AWS Free Tier page at signup.

## Open decisions to resume with
1. DynamoDB vs RDS Postgres for the database
2. Whether to migrate the existing static site into Next.js first, or scaffold auth/Cognito first
3. Final choice among AWS vs Vercel+Supabase vs Azure (all three were evaluated; AWS is the one this doc covers in depth)
