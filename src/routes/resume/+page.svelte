<script>
  import Icon from "@iconify/svelte";

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
</script>

<svelte:head>
  <title>Sam Stelle - Senior Software Engineer</title>
</svelte:head>

<div class="bg-background text-content flex justify-center p-4 md:p-8">
  <!-- Main Content Container -->
  <div class="bg-surface max-w-4xl rounded shadow-xl p-8 md:p-12">
    <!-- Header Section -->
    <header class="border-accent border-b pb-8 mb-8">
      <div class="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <!-- Left: Name, Title, Location -->
        <div class="flex flex-col gap-2">
          <h1 class="text-primary text-4xl font-bold md:text-5xl">
            <span>Summary</span>
          </h1>
          <h2 class="text-secondary mt-1 text-2xl font-semibold md:text-3xl">
            SENIOR SOFTWARE ENGINEER
          </h2>
          <div
            class="mt-2 flex items-center gap-2 text-sm text-gray-600 md:text-base"
          >
            <Icon icon="mdi:map-marker" class="h-5 w-5" />
            Seattle, Washington
          </div>
        </div>

        <!-- Right: Contact (Phone, Email, Socials) -->
        <div
          class="text-content flex flex-col items-end gap-3 text-sm md:items-end md:text-base"
        >
          <div class="flex flex-col justify-end gap-x-6 gap-y-3 md:justify-end">
            <a
              href="tel:206-437-5268"
              class="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              (206) 437-5268
              <Icon icon="mdi:phone" class="h-5 w-5" />
            </a>
          </div>
          <div class="flex flex-col justify-end gap-x-6 gap-y-3 md:justify-end">
            <a
              href="mailto:samuelstelle@gmail.com"
              class="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              samuelstelle@gmail.com
              <Icon icon="mdi:email" class="h-5 w-5" />
            </a>
          </div>
          <div class="flex flex-col justify-end gap-x-6 gap-y-3 md:justify-end">
            <a
              href="https://github.com/stelles"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              @stelles
              <Icon icon="mdi:github" class="h-5 w-5" />
            </a>
          </div>
          <div class="flex flex-col justify-end gap-x-6 gap-y-3 md:justify-end">
            <a
              href="https://linkedin.com/in/samuel-stelle"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              @samuel-stelle
              <Icon icon="mdi:linkedin" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Summary Section -->
      <section class="mb-8">
        <h3
          class="mb-4 border-b-2 border-tertiary pb-2 text-2xl font-bold text-primary"
        >
          Summary
        </h3>
        <p class="text-base leading-relaxed text-content md:text-lg">
          Senior Full-Stack Platform Engineer, with 10+ years experience
          specializing in securing and scaling early B2B SaaS web app platforms
          from Seed to Series B. Track record of full ownership over
          mission-critical features, cloud infrastructure (laC), devops
          automation (CI/CD), and asynchronous computational pipelines.
        </p>
      </section>

      <!-- Skills Section -->
      <section class="mb-8">
        <h3
          class="mb-4 border-b-2 border-muted pb-2 text-2xl font-bold text-content"
        >
          Skills
        </h3>
        <div class="space-y-2">
          {#each Object.entries(skills) as [category, skillList]}
            <div class="flex flex-wrap items-baseline gap-x-2">
              <span
                class="font-semibold text-tertiary text-base whitespace-nowrap"
              >
                {category}:
              </span>
              <span class="text-sm text-content">
                {skillList.join(", ")}
              </span>
            </div>
          {/each}
        </div>
      </section>

      <!-- Work Experience Section -->
      <section class="mb-8">
        <h3
          class="mb-6 border-b-2 border-tertiary pb-2 text-2xl font-bold text-primary"
        >
          Work Experience
        </h3>

        <!-- Job 1: TipHaus -->
        <article class="mb-6">
          <header class="mb-2">
            <div class="flex flex-wrap items-baseline justify-between">
              <h4 class="text-content text-xl font-semibold">
                SOFTWARE ENGINEER IV
              </h4>
              <span class="text-content-500 text-sm font-medium italic"
                >June 2024 - June 2025</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between">
              <h5 class="text-lg font-medium text-gray-700">TipHaus</h5>
              <span class="text-sm font-medium text-gray-500 italic"
                >Seattle, WA</span
              >
            </div>
          </header>
          <ul
            class="ml-5 list-outside list-disc space-y-2 leading-relaxed text-gray-700"
          >
            <li>
              Led and executed a zero-data-loss migration of AWS Aurora MySQL to
              a new CDK (IaC) environment, achieving &lt;2 minutes of production
              downtime and securing stakeholder sign-off on the core platform's
              stability.
            </li>
            <li>
              Architected and shipped a parallelized, high-throughput
              computational pipeline, improving data processing speed by an
              average of 10x and reducing time-to-completion for key clients
              from 6+ hours to under 15 minutes.
            </li>
            <li>
              Lead the effort to add system monitoring via Sentry, and AWS
              Cloudwatch to reduce founding developers involvement in bug fixes
              by 50%.
            </li>
            <li>
              Secured the platform by patching vulnerabilities and defining
              disaster recovery plans, ensuring a successful SOC2 audit.
            </li>
            <li>
              Optimized CI/CD pipeline (parallelized stages, image caching) to
              achieve a 4x reduction in build/deploy time.
            </li>
            <li>
              Streamlined developer onboarding by 50% through CI/CD improvements
              and multi-stage Dockerfiles.
            </li>
          </ul>
        </article>

        <!-- Job 2: CreativeX -->
        <article class="mb-6">
          <header class="mb-2">
            <div class="flex flex-wrap items-baseline justify-between">
              <h4 class="text-content text-xl font-semibold">
                SENIOR SOFTWARE ENGINEER
              </h4>
              <span class="text-sm font-medium text-gray-500 italic"
                >Mar 2021 - Mar 2024</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between">
              <h5 class="text-lg font-medium text-gray-700">CreativeX</h5>
              <span class="text-sm font-medium text-gray-500 italic"
                >Portland, OR</span
              >
            </div>
          </header>
          <ul
            class="ml-5 list-outside list-disc space-y-2 leading-relaxed text-gray-700"
          >
            <li>
              Lead core engineering team which was responsibility for
              infrastructure provisioning, monitoring, devops, performance, bug
              reports, security and stability.
            </li>
            <li>
              Architected and maintained high-availability cloud infrastructure
              (Digital Ocean/AWS) via laC, sustaining SLA uptime and
              collaborating with InfoSec to deliver ISO 27001 compliance.
            </li>
            <li>
              Collaborated with the Information Security Manager to implement
              security monitoring and protocols to achieve ISO 27001 compliance.
            </li>
            <li>
              Deployed a centralized monitoring service (Datadog) to monitor
              infrastructure state, aggregate application/system logs, and
              investigate application and database performance to help keep our
              time-to-resolution within our SLA'S.
            </li>
            <li>
              Succeeded in upgrading servers from Ubuntu 14 to Ubuntu 24 with
              zero downtime to ensure security updates continue, allowing us to
              pass ISO27001 certification.
            </li>
            <li>
              Migrated a single-instance PostgresQL v9.6 to a three replica
              cluster running PostgresQL v14 with under an hour of downtime.
            </li>
            <li>
              Completely rewrote the CircleCI CI/CD pipeline to improve security
              and optimization by cacheing, including caching and
              parallelization, reducing the average pipeline by 5x, increasing
              developer productivity.
            </li>
            <li>
              Added an end-to-end testing framework to the CI/CD using
              Playwright, reducing regressive bugs by 20%.
            </li>
            <li>
              Implemented a seeded database dev environment to reduce cloud
              costs by 15% while improving developer onboarding.
            </li>
          </ul>
        </article>

        <!-- Job 3: Devetry -->
        <article class="mb-6">
          <header class="mb-2">
            <div class="flex flex-wrap items-baseline justify-between">
              <h4 class="text-content text-xl font-semibold">
                SENIOR SOFTWARE ENGINEER
              </h4>
              <span class="text-sm font-medium text-gray-500 italic"
                >Feb 2020 - March 2021</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between">
              <h5 class="text-lg font-medium text-gray-700">Devetry</h5>
              <span class="text-sm font-medium text-gray-500 italic"
                >Denver, CO</span
              >
            </div>
          </header>
          <ul
            class="ml-5 list-outside list-disc space-y-2 leading-relaxed text-gray-700"
          >
            <li>
              Team lead collaborating with the client to build a custom Content
              Management System (CMS) using Wagtail (Django), deployed to Azure
              using Docker images. Collaborated closely with clients to ensure
              alignment with their vision, emphasizing user experience (UX).
            </li>
            <li>
              Individual contributor writing C++ for embedded medical device.
              Helped refactor and redesign the fault recovery system for an
              embedded medical device using the already inplace redis to ensure
              state recovery on failure.
            </li>
            <li>
              Team lead and full-stack developer for a custom analytics platform
              to analyze and predict data center usage.
            </li>
            <li>
              Worked closely with the client's key stakeholders to build an
              analytical platform using React/Redux on a Node.js Express server
              with a PostgreSQL database.
            </li>
            <li>
              Collabarated with many of the client's engineering teams to help
              streamline the deployment process allowing faster interations to
              ensure the product was completed on time.
            </li>
            <li>
              Guided the strategy behind the data integration to ensure data
              accuracy.
            </li>
          </ul>
        </article>

        <!-- Job 4: Stratifyd -->
        <article class="mb-6">
          <header class="mb-2">
            <div class="flex flex-wrap items-baseline justify-between">
              <h4 class="text-content text-xl font-semibold">
                SENIOR SOFTWARE ENGINEER
              </h4>
              <span class="text-sm font-medium text-gray-500 italic"
                >June 2016 - Feb 2020</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between">
              <h5 class="text-lg font-medium text-gray-700">Stratifyd</h5>
              <span class="text-sm font-medium text-gray-500 italic"
                >Charlotte, NC</span
              >
            </div>
            <p class="mt-1 text-sm text-gray-600 italic">
              Initially hired as Software Engineer, promoted to Senior Software
              Engineer.
            </p>
          </header>
          <ul
            class="ml-5 list-outside list-disc space-y-2 leading-relaxed text-gray-700"
          >
            <li>
              Stepped up as a leader when our team lead departed, fostering team
              rapport during the transition.
            </li>
            <li>
              Led the data integration team in normalizing data from similar
              sources using a standard programming aggregation methodology.
            </li>
            <li>
              Dockerized applications to reduce cloud costs, improve scaling
              efficiency, rework development environments, and enhance the CI/CD
              pipeline.
            </li>
            <li>
              Spearheaded creating a CI/CD pipeline in GitLab to build, validate
              and deploy various microservices to streamline our deployment
              process allowing the team to focus on feature development.
            </li>
            <li>
              Led a team on a speech-to-text pipeline project to unlock a new
              vertical for the business. Worked with the research team to tweak
              and integrate the s2t model into the Kafka pipeline and add a
              redaction post-processing service. Deployed auto-scaling ECS
              cluster to meet client throughput demands.
            </li>
            <li>
              Developed a comprehensive integration testing framework for
              testing and validating our computational pipeline to help improve
              stability to our platform to avoid customer churn.
            </li>
            <li>
              Conducted many 1-on-1 teaching sessions to mentor junior
              engineers.
            </li>
          </ul>
        </article>
      </section>

      <!-- Education Section -->
      <section>
        <h3
          class="mb-6 border-b-2 border-tertiary pb-2 text-2xl font-bold text-blue-600"
        >
          Education
        </h3>
        <article>
          <header class="mb-2">
            <div class="flex flex-wrap items-baseline justify-between">
              <h4 class="text-content text-xl font-semibold">
                B.S. IN COMPUTER SCIENCE
              </h4>
              <span class="text-sm font-medium text-gray-500 italic"
                >Sept. 2011 - June 2016</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between">
              <h5 class="text-lg font-medium text-gray-700">
                Western Washington University
              </h5>
              <span class="text-sm font-medium text-gray-500 italic"
                >Bellingham, WA</span
              >
            </div>
          </header>
        </article>
      </section>
    </main>
  </div>
</div>
