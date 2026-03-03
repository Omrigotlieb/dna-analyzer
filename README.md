# 🧬 DNA Analyzer

> AI-powered DNA analysis — upload your 23andMe file and get personalized health insights powered by Claude AI.

**Built autonomously by [ORCA](https://github.com/Omrigotlieb/infinity-ai)** — the autonomous AI agent pipeline from Infinity AI.

## Live Demo

**https://dna-analyzer-puht7.ondigitalocean.app**

![DNA Analyzer Landing Page](https://github.com/Omrigotlieb/dna-analyzer/blob/main/docs/screenshots/landing.png?raw=true)

## Upload & Analyze

![Upload Page](https://github.com/Omrigotlieb/dna-analyzer/blob/main/docs/screenshots/upload.png?raw=true)

## Features

- **Upload 23andMe data** — drag & drop your raw data file (.txt)
- **SNP Analysis** — parses 700k+ genetic variants
- **AI Insights** — Claude Sonnet 4.6 analyzes your key genetic markers
- **Health Risks** — APOE, MTHFR, TCF7L2, FTO and more with risk badges
- **Traits** — athletic performance, caffeine metabolism, lactose tolerance
- **Ancestry Markers** — ethnicity indicators from your genome
- **Sample Data** — try it instantly with bundled 23andMe sample file

## Quick Start

```bash
git clone https://github.com/Omrigotlieb/dna-analyzer.git
cd dna-analyzer
npm install
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
docker compose up
# App runs at http://localhost:3000
```

## How It Works

1. Upload your 23andMe raw data file (.txt)
2. Parser extracts key SNP variants (rsid, chromosome, genotype) from 700k+ rows
3. Claude Sonnet 4.6 analyzes markers against known health associations
4. Get personalized health insights, trait predictions, and ancestry context

## Tech Stack

- **Next.js 15** + TypeScript
- **Claude Sonnet 4.6** via Anthropic SDK
- **23andMe raw data format** (TSV with `#` comment lines)
- **DigitalOcean App Platform** for deployment

## Built by ORCA

This application was autonomously built by [ORCA](https://github.com/Omrigotlieb/infinity-ai) — Infinity AI's Docker-based agent pipeline. ORCA received a task and autonomously planned, coded, tested, and committed the full application overnight.

View ORCA's commits: https://github.com/Omrigotlieb/dna-analyzer/commits/main
