/**
 * DNA file parser for 23andMe tab-separated format.
 * Parses SNP variant data and provides metadata for key genetic markers.
 */

/** Represents a single nucleotide polymorphism variant from a DNA data file. */
export interface SNPVariant {
  rsid: string;
  chromosome: string;
  position: number;
  genotype: string;
}

/**
 * Parses a 23andMe-format DNA file into an array of SNP variants.
 * Lines starting with '#' are treated as comments and skipped.
 * Blank or whitespace-only lines are skipped.
 *
 * @param content - Raw text content of the DNA data file
 * @returns Array of parsed SNP variants
 */
export function parseDNAFile(content: string): SNPVariant[] {
  if (!content || !content.trim()) {
    return [];
  }

  const lines = content.split('\n');
  const variants: SNPVariant[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comment lines
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const parts = trimmed.split('\t');
    if (parts.length < 4) {
      continue;
    }

    const [rsid, chromosome, positionStr, genotype] = parts;
    const position = Number(positionStr);

    if (!rsid || !chromosome || isNaN(position) || !genotype) {
      continue;
    }

    variants.push({ rsid, chromosome, position, genotype });
  }

  return variants;
}

/**
 * Filters an array of SNP variants to return only those present in KEY_SNPS.
 *
 * @param variants - All parsed SNP variants
 * @returns Only the variants matching known key SNP rsids
 */
export function filterKeyVariants(variants: SNPVariant[]): SNPVariant[] {
  return variants.filter((v) => v.rsid in KEY_SNPS);
}

/** Metadata for clinically relevant SNP markers. */
export const KEY_SNPS: Record<string, { gene: string; description: string; risk?: string }> = {
  "rs7903146": { gene: "TCF7L2", description: "Type 2 diabetes risk factor" },
  "rs1801133": { gene: "MTHFR C677T", description: "Folate metabolism & cardiovascular" },
  "rs429358": { gene: "APOE", description: "Alzheimer's & cardiovascular risk" },
  "rs7412": { gene: "APOE", description: "Alzheimer's & cardiovascular risk" },
  "rs9939609": { gene: "FTO", description: "Obesity and weight regulation" },
  "rs1815739": { gene: "ACTN3", description: "Athletic performance (power vs endurance)" },
  "rs4680": { gene: "COMT", description: "Dopamine metabolism (stress response)" },
  "rs6265": { gene: "BDNF", description: "Memory, learning, and mood" },
  "rs4988235": { gene: "LCT", description: "Lactose tolerance" },
  "rs12913832": { gene: "HERC2/OCA2", description: "Eye color determination" },
  "rs1800497": { gene: "DRD2/ANKK1", description: "Dopamine receptor & reward response" },
  "rs53576": { gene: "OXTR", description: "Empathy and social behavior" },
  "rs334": { gene: "HBB", description: "Sickle cell trait" },
  "rs1800562": { gene: "HFE", description: "Hereditary hemochromatosis (iron overload)" },
};
