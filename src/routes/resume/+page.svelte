<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import Highlight from "../../snippets/highlight/highlight.svelte";
  import Icon from "@iconify/svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import type { Snippet } from "svelte";

  interface JobEntry {
    title: string;
    dateRange: string;
    company: string;
    location: string;
    description?: string;
    responsibilities: string[];
  }

  let skills = {
    "Primary/Mastery": [
      "React",
      "Typescript",
      "Node",
      "Python",
      "AWS (S3, ECS, CDK)",
      "Redis (Valkey)",
      "Docker",
      "PostgresQL",
      "MySQL (MariaDB)",
      "nginx",
    ],
    "Secondary/Proficiency": [
      "Bash",
      "PHP",
      "Ruby",
      "Playwright",
      "Kafka",
      "AWS (EC2, CW, SQS, RDS)",
      "Memcached",
      "MongoDB",
      "Datadog",
      "Sentry",
      "CircleCI",
      "GitHub Actions",
      "GitLab",
    ],
    "Tertiary/Familiarity": [
      "Rust",
      "Go",
      "Java",
      "C++",
      "DigitalOcean",
      "Grafana",
      "Opentelemetry",
      "RabbitMQ",
      "Elastic Stack",
      "Zipkin",
      "Ansible",
      "AWS (CodeBuild, DMS)",
      "Jenkins",
      "Terraform/Open Tofu",
      "Suricata",
    ],
  };

  let jobs: JobEntry[] = [
    {
      title: "SOFTWARE ENGINEER IV",
      dateRange: "June 2024 - June 2025",
      company: "TipHaus",
      location: "Seattle, WA",
      responsibilities: [
        "Led and executed a zero-data-loss migration of AWS Aurora MySQL to a new CDK (IaC) environment, achieving <2 minutes of production downtime and securing stakeholder sign-off on the core platform's stability.",
        "Architected and shipped a parallelized, high-throughput computational pipeline, improving data processing speed by an average of 10x and reducing time-to-completion for key clients from 6+ hours to under 15 minutes.",
        "Lead the effort to add system monitoring via Sentry, and AWS Cloudwatch to reduce founding developers involvement in bug fixes by 50%.",
        "Secured the platform by patching vulnerabilities and defining disaster recovery plans, ensuring a successful SOC2 audit.",
        "Optimized CI/CD pipeline (parallelized stages, image caching) to achieve a 4x reduction in build/deploy time.",
        "Streamlined developer onboarding by 50% through CI/CD improvements and multi-stage Dockerfiles.",
      ],
    },
    {
      title: "SENIOR SOFTWARE ENGINEER",
      dateRange: "Mar 2021 - Mar 2024",
      company: "CreativeX",
      location: "Portland, OR",
      responsibilities: [
        "Lead core engineering team which was responsibility for infrastructure provisioning, monitoring, devops, performance, bug reports, security and stability.",
        "Architected and maintained high-availability cloud infrastructure (Digital Ocean/AWS) via laC, sustaining SLA uptime and collaborating with InfoSec to deliver ISO 27001 compliance.",
        "Collaborated with the Information Security Manager to implement security monitoring and protocols to achieve ISO 27001 compliance.",
        "Deployed a centralized monitoring service (Datadog) to monitor infrastructure state, aggregate application/system logs, and investigate application and database performance to help keep our time-to-resolution within our SLA'S.",
        "Succeeded in upgrading servers from Ubuntu 14 to Ubuntu 24 with zero downtime to ensure security updates continue, allowing us to pass ISO27001 certification.",
        "Migrated a single-instance PostgresQL v9.6 to a three replica cluster running PostgresQL v14 with under an hour of downtime.",
        "Completely rewrote the CircleCI CI/CD pipeline to improve security and optimization by cacheing, including caching and parallelization, reducing the average pipeline by 5x, increasing developer productivity.",
        "Added an end-to-end testing framework to the CI/CD using Playwright, reducing regressive bugs by 20%.",
        "Implemented a seeded database dev environment to reduce cloud costs by 15% while improving developer onboarding.",
      ],
    },
    {
      title: "SENIOR SOFTWARE ENGINEER",
      dateRange: "Feb 2020 - March 2021",
      company: "Devetry",
      location: "Denver, CO",
      responsibilities: [
        "Team lead collaborating with the client to build a custom Content Management System (CMS) using Wagtail (Django), deployed to Azure using Docker images. Collaborated closely with clients to ensure alignment with their vision, emphasizing user experience (UX).",
        "Individual contributor writing C++ for embedded medical device. Helped refactor and redesign the fault recovery system for an embedded medical device using the already inplace redis to ensure state recovery on failure.",
        "Team lead and full-stack developer for a custom analytics platform to analyze and predict data center usage.",
        "Worked closely with the client's key stakeholders to build an analytical platform using React/Redux on a Node.js Express server with a PostgreSQL database.",
        "Collabarated with many of the client's engineering teams to help streamline the deployment process allowing faster interations to ensure the product was completed on time.",
        "Guided the strategy behind the data integration to ensure data accuracy.",
      ],
    },
    {
      title: "SOFTWARE ENGINEER",
      dateRange: "June 2016 - Feb 2020",
      company: "Stratifyd",
      location: "Charlotte, NC",
      responsibilities: [
        "Stepped up as a leader when our team lead departed, fostering team rapport during the transition.",
        "Led the data integration team in normalizing data from similar sources using a standard programming aggregation methodology.",
        "Dockerized applications to reduce cloud costs, improve scaling efficiency, rework development environments, and enhance the CI/CD pipeline.",
        "Spearheaded creating a CI/CD pipeline in GitLab to build, validate and deploy various microservices to streamline our deployment process allowing the team to focus on feature development.",
        "Led a team on a speech-to-text pipeline project to unlock a new vertical for the business. Worked with the research team to tweak and integrate the s2t model into the Kafka pipeline and add a redaction post-processing service. Deployed auto-scaling ECS cluster to meet client throughput demands.",
        "Developed a comprehensive integration testing framework for testing and validating our computational pipeline to help improve stability to our platform to avoid customer churn.",
        "Conducted many 1-on-1 teaching sessions to mentor junior engineers.",
      ],
    },
  ];
</script>

{#snippet jobEntry(job: JobEntry)}
  <article>
    <header class="">
      <div class="flex flex-wrap items-baseline justify-between gap-x-2">
        <h3 class="text-content text-sm font-semibold">
          {job.title}
        </h3>
        <span class="text-xs font-light italic text-muted-foreground">
          {job.dateRange}
        </span>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-x-2">
        <h4 class="text-sm font-medium">{job.company}</h4>
        <span class="text-xs font-medium italic text-muted-foreground">
          {job.location}
        </span>
      </div>
      {#if job.description}
        <p class="text-xs italic text-muted-foreground">
          {job.description}
        </p>
      {/if}
    </header>
    <ul
      class="ml-4 list-outside list-disc space-y-0.5 text-xs leading-normal text-content"
    >
      {#each job.responsibilities as responsibility}
        <li>{responsibility}</li>
      {/each}
    </ul>
  </article>
{/snippet}

<svelte:head>
  <title>Sam Stelle - Senior Software Engineer</title>
</svelte:head>

<div class="bg-background text-content flex justify-center p-4">
  <!-- Main Content Container -->
  <div class="bg-surface max-w-4xl rounded shadow-sm border p-6">
    <Card.Root>
      <Card.Header class="grid grid-cols-2 gap-4 pb-4">
        <Card.Title class="text-foreground font-bold">
          <h1><Highlight>Samuel Stelle</Highlight></h1>
        </Card.Title>
        <Card.Description class="flex flex-col gap-1 text-muted-foreground">
          <div class="font-semibold text-xs tracking-wide">
            SENIOR SOFTWARE ENGINEER
          </div>
          <div class="flex items-center text-xs">
            <Icon icon="mdi:map-marker" class="h-4 w-4" />
            Seattle, Washington
          </div>
        </Card.Description>
        <Card.Action>
          <!-- Right: Contact (Phone, Email, Socials) -->
          <div class="flex flex-col items-end gap-0.5 text-right text-xs">
            <a
              href="tel:206-437-5268"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              (206) 437-5268
              <Icon icon="mdi:phone" class="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:samuelstelle@gmail.com"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              samuelstelle@gmail.com
              <Icon icon="mdi:email" class="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/stelles"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              @stelles
              <Icon icon="mdi:github" class="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/samuel-stelle"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              @samuel-stelle
              <Icon icon="mdi:linkedin" class="h-3.5 w-3.5" />
            </a>
          </div>
        </Card.Action>
      </Card.Header>
    </Card.Root>
    <Separator />

    <!-- Main Content -->
    <main>
      <!-- Summary Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Summary</Highlight>
        </h2>
        <Separator class="" />
        <p class="text-sm leading-normal text-content">
          Senior Full-Stack Platform Engineer, with 10+ years experience
          specializing in securing and scaling early B2B SaaS web app platforms
          from Seed to Series B. Track record of full ownership over
          mission-critical features, cloud infrastructure (laC), devops
          automation (CI/CD), and asynchronous computational pipelines.
        </p>
      </section>

      <!-- Skills Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Skills</Highlight>
        </h2>
        <Separator class="" />
        <div class="space-y-1">
          {#each Object.entries(skills) as [category, skillList]}
            <div class="flex flex-wrap items-baseline gap-x-1.5">
              <span class="font-semibold text-tertiary text-xs">
                {category}:
              </span>
              <span class="text-xs text-content">
                {skillList.join(", ")}
              </span>
            </div>
          {/each}
        </div>
      </section>

      <!-- Work Experience Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Work Experience</Highlight>
        </h2>
        <Separator class="" />

        <div class="space-y-1">
          {#each jobs as job}
            {@render jobEntry(job)}
          {/each}
        </div>
      </section>

      <!-- Education Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Education</Highlight>
        </h2>
        <Separator class="" />
        <article>
          <header>
            <div class="flex flex-wrap items-baseline justify-between gap-x-2">
              <div class="text-content text-sm font-semibold">
                B.S. IN COMPUTER SCIENCE
              </div>
              <span class="text-xs font-medium italic text-muted-foreground"
                >Sept. 2011 - June 2016</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-x-2">
              <div class="text-sm font-medium">
                Western Washington University
              </div>
              <span class="text-xs font-medium italic text-muted-foreground"
                >Bellingham, WA</span
              >
            </div>
          </header>
        </article>
      </section>
    </main>
  </div>
</div>
