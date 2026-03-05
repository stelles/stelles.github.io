import type { ContactLink, JobEntry } from "./types";

export const Sam = {
  firstName: "Sam",
  lastName: "Stelle",
  title: "Senior Software Engineer",
  summary:
    "Senior Full-Stack Platform Engineer with 10+ years specializing in securing and scaling B2B SaaS platforms from Seed to Series B. Proven ownership of mission-critical features, cloud infrastructure (IaC), DevOps automation (CI/CD), and high-throughput computational pipelines.",
  telephone: "(206) 437-5268",
  email: "samuelstelle@gmail.com",
  location: "Seattle, WA",
  github: "https://github.com/stelles",
  linkedin: "https://www.linkedin.com/in/samuel-stelle/",
};
export const contactLinks: ContactLink[] = [
  { href: `tel:${Sam.telephone}`, icon: "mdi:phone", text: Sam.telephone },
  { href: `mailto:${Sam.email}`, icon: "mdi:email", text: Sam.email },
  { href: Sam.github, icon: "mdi:github", text: "stelles", external: true },
  {
    href: Sam.linkedin,
    icon: "mdi:linkedin",
    text: "samuel-stelle",
    external: true,
  },
];

export const Skills: Record<string, string[]> = {
  Languages: [
    "TypeScript/JavaScript",
    "Python",
    "Bash",
    "PHP",
    "Ruby",
    "Rust",
    "Go",
    "Java",
    "C++",
  ],
  "Frontend & UI": [
    "React",
    "Svelte",
    "TailwindCSS",
    "Vite",
    "Laravel",
    "Webpack",
    "Ruby on Rails",
    "Vue",
  ],
  "CloudOps & Infra": [
    "AWS (EC2, ECS, S3, RDS, CDK, DMS)",
    "Terraform/OpenTofu",
    "Ansible",
    "DigitalOcean",
  ],
  "Backend & Runtime": [
    "Distributed Systems (RabbitMQ, Kafka, SQS)",
    "PostgreSQL",
    "MySQL/MariaDB",
    "Redis/Valkey",
    "MongoDB",
  ],
  "DevOps & Observability": [
    "Docker",
    "CI/CD (GitLab CI, CircleCI, CodeBuild)",
    "Datadog",
    "AWS Cloudwatch",
    "Sentry",
    "Playwright",
  ],
};

export type SkillCategory = keyof typeof Skills;

export const Experience: JobEntry[] = [
  {
    title: "SOFTWARE ENGINEER IV",
    dateRange: "June 2024 - June 2025",
    company: "TipHaus",
    location: "Seattle, WA",
    responsibilities: [
      "Led a zero-data-loss migration of AWS Aurora MySQL to a new CDK (IaC) environment, achieving <2 minutes of production downtime and securing stakeholder sign-off on platform stability.",
      "Architected and shipped a parallelized, high-throughput computational pipeline, improving data processing speed by 10x and reducing time-to-completion for key clients from 6+ hours to under 15 minutes.",
      "Introduced system monitoring via Sentry and AWS CloudWatch, reducing founding engineer involvement in bug triage by 50%.",
      "Secured the platform by patching vulnerabilities and defining disaster recovery plans, ensuring a successful SOC2 audit.",
      "Optimized CI/CD pipeline via stage parallelization and image caching, achieving a 4x reduction in build/deploy time.",
      "Streamlined developer onboarding by 50% through CI/CD improvements and multi-stage Dockerfiles.",
    ],
  },
  {
    title: "SENIOR SOFTWARE ENGINEER",
    dateRange: "Mar 2021 - Mar 2024",
    company: "CreativeX",
    location: "Portland, OR",
    responsibilities: [
      "Led the core platform engineering team, owning infrastructure provisioning, monitoring, DevOps, performance, security, and stability.",
      "Architected and maintained high-availability cloud infrastructure (DigitalOcean/AWS) via IaC, sustaining SLA uptime and achieving ISO 27001 compliance in collaboration with InfoSec.",
      "Deployed centralized monitoring (Datadog) to track infrastructure state, aggregate logs, and investigate application and database performance, keeping time-to-resolution within SLA targets.",
      "Upgraded servers from Ubuntu 14 to Ubuntu 24 with zero downtime, unblocking continued security updates and satisfying ISO 27001 requirements.",
      "Migrated a single-instance PostgreSQL v9.6 to a three-replica PostgreSQL v14 cluster with under one hour of downtime.",
      "Rewrote the CircleCI CI/CD pipeline with caching and parallelization, achieving a 5x reduction in average pipeline duration.",
      "Integrated an end-to-end testing framework (Playwright) into CI/CD, reducing regressions by 20%.",
      "Implemented a seeded local database environment, reducing cloud costs by 15% and improving developer onboarding.",
    ],
  },
  {
    title: "SENIOR SOFTWARE ENGINEER",
    dateRange: "Feb 2020 - Mar 2021",
    company: "Devetry",
    location: "Denver, CO",
    responsibilities: [
      "Led development of a custom CMS using Wagtail (Django), containerized with Docker and deployed to Azure, delivering UX-focused features aligned with client vision.",
      "Refactored and redesigned the fault recovery system for an embedded medical device in C++, leveraging Redis for reliable state recovery on failure.",
      "Built a full-stack analytics platform (React/Redux, Node.js/Express, PostgreSQL) to analyze and forecast data center usage for a Fortune 500 client.",
      "Collaborated with client engineering teams to streamline deployment processes, enabling faster iteration and on-time delivery.",
      "Defined data integration strategy to ensure accuracy and consistency across analytics pipelines.",
    ],
  },
  {
    title: "SOFTWARE ENGINEER → SOFTWARE ENGINEER II",
    dateRange: "June 2016 - Feb 2020",
    company: "Stratifyd",
    location: "Charlotte, NC",
    responsibilities: [
      "Assumed team lead responsibilities upon manager departure, maintaining team cohesion and delivery continuity.",
      "Led the data integration team in building a standardized aggregation methodology to normalize data across disparate sources.",
      "Dockerized core applications to reduce cloud costs, improve scaling, modernize dev environments, and enhance CI/CD.",
      "Built a GitLab CI/CD pipeline to build, validate, and deploy microservices, freeing the team to focus on feature development.",
      "Led a speech-to-text pipeline project to unlock a new business vertical — integrated an S2T model into the Kafka pipeline, added a redaction post-processing service, and deployed an auto-scaling ECS cluster to meet throughput demands.",
      "Built a comprehensive integration testing framework for the computational pipeline, improving platform stability and reducing customer churn.",
      "Mentored junior engineers through regular 1-on-1 sessions.",
    ],
  },
];
