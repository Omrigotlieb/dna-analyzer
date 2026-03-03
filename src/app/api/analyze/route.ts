import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { parseDNAFile, filterKeyVariants, KEY_SNPS } from '@/lib/dna-parser';
import crypto from 'crypto';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resultsCache = new Map<string, object>();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const content = await file.text();
    const id = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);

    if (resultsCache.has(id)) {
      return NextResponse.json({ id, ...resultsCache.get(id) });
    }

    const allVariants = parseDNAFile(content);
    const keyVariants = filterKeyVariants(allVariants);
    const totalSNPs = allVariants.length;

    const snpSummary = keyVariants
      .map((v) => {
        const info = KEY_SNPS[v.rsid];
        return `- ${v.rsid} (${info?.gene || 'Unknown'}): genotype ${v.genotype} — ${info?.description || ''}`;
      })
      .join('\n');

    const prompt = `You are a genetic counselor AI analyzing 23andMe genetic variants. Analyze these key SNPs and provide personalized insights:

${snpSummary}

Total SNPs in file: ${totalSNPs}

Return a JSON object (no markdown, just raw JSON) with this structure:
{
  "summary": "2-3 sentence overall summary",
  "healthInsights": [
    { "gene": "GENE_NAME", "rsid": "rsXXX", "finding": "what this means", "riskLevel": "low|medium|high", "genotype": "XX" }
  ],
  "traits": [
    { "name": "Trait Name", "finding": "description", "genotype": "XX" }
  ],
  "ancestry": "Brief ancestry context from these variants"
}

Be informative, positive, and emphasize this is educational not medical advice. Include 3-5 health insights and 3-4 traits.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : { summary: responseText, healthInsights: [], traits: [], ancestry: '' };

    const result = { ...analysis, snpsAnalyzed: keyVariants.length, totalSNPs };
    resultsCache.set(id, result);

    return NextResponse.json({ id, ...result });
  } catch (err) {
    console.error('Analysis error:', err);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
