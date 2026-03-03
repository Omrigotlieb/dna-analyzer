# DNA Analyzer

> AI-powered DNA analysis — upload your 23andMe file and get personalized health insights powered by Claude AI.

**Built by [ORCA](https://github.com/Omrigotlieb/infinity-ai)** — the autonomous AI agent pipeline from Infinity AI.

## Live Demo

*Deployment URL will be added after DigitalOcean deployment*

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
docker compose up
```

## Features

- **Upload 23andMe data** — drag & drop your raw data file
- **SNP Analysis** — parses 700k+ genetic variants
- **AI Insights** — Claude AI analyzes your key genetic markers
- **Health Risks** — APOE, MTHFR, TCF7L2 and more
- **Traits** — athletic performance, caffeine metabolism, lactose tolerance
- **Ancestry Markers** — ethnicity indicators from your genome

## How It Works

1. Upload your 23andMe raw data file (.txt)
2. Our parser extracts key SNP variants (rsid, chromosome, genotype)
3. Claude AI analyzes the genetic markers against known health associations
4. Get personalized, AI-generated health insights

## Built by ORCA

This application was autonomously built by [ORCA](https://github.com/Omrigotlieb/infinity-ai) — Infinity AI's Docker-based agent pipeline. ORCA received a task description and autonomously planned, coded, tested, and deployed this app.

View ORCA's PRs: https://github.com/Omrigotlieb/dna-analyzer/pulls
