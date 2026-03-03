'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface HealthInsight {
  gene: string;
  rsid: string;
  finding: string;
  riskLevel: string;
  genotype: string;
}

interface Trait {
  name: string;
  finding: string;
  genotype: string;
}

interface Analysis {
  id: string;
  summary: string;
  healthInsights: HealthInsight[];
  traits: Trait[];
  ancestry: string;
  snpsAnalyzed: number;
  totalSNPs: number;
}

const riskColor = (level: string) =>
  level === 'high'
    ? '#f87171'
    : level === 'medium'
      ? '#fb923c'
      : '#4ade80';

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(`dna-result-${id}`);
    if (stored) {
      setAnalysis(JSON.parse(stored));
    } else {
      setError('Results not found. Please re-upload your file.');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a78bfa',
          fontFamily: 'system-ui',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171' }}>{error}</p>
          <Link href="/analyze" style={{ color: '#6366f1' }}>
            ← Upload again
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Link
          href="/analyze"
          style={{ color: '#6366f1', textDecoration: 'none', fontSize: 14 }}
        >
          ← Analyze Another
        </Link>
        <div style={{ marginTop: 24, marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: '0 0 8px',
              background: 'linear-gradient(135deg, #e0e7ff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🧬 Your DNA Analysis
          </h1>
          <p style={{ color: '#475569' }}>
            {analysis.snpsAnalyzed} key variants analyzed from{' '}
            {analysis.totalSNPs?.toLocaleString()} total SNPs
          </p>
        </div>

        {/* Summary */}
        <div
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#c7d2fe',
              lineHeight: 1.7,
              fontSize: 16,
            }}
          >
            {analysis.summary}
          </p>
        </div>

        {/* Health Insights */}
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          Health Insights
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {analysis.healthInsights?.map((h, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#e2e8f0',
                    marginBottom: 4,
                  }}
                >
                  {h.gene}{' '}
                  <span
                    style={{
                      color: '#475569',
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    ({h.rsid})
                  </span>
                </div>
                <div
                  style={{
                    color: '#94a3b8',
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {h.finding}
                </div>
              </div>
              <div
                style={{
                  background: `${riskColor(h.riskLevel)}22`,
                  color: riskColor(h.riskLevel),
                  border: `1px solid ${riskColor(h.riskLevel)}44`,
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {h.riskLevel}
              </div>
            </div>
          ))}
        </div>

        {/* Traits */}
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          Traits
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
            marginBottom: 32,
          }}
        >
          {analysis.traits?.map((t, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: '#e2e8f0',
                  marginBottom: 6,
                  fontSize: 15,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  color: '#64748b',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {t.finding}
              </div>
            </div>
          ))}
        </div>

        {/* Ancestry */}
        {analysis.ancestry && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Ancestry Context
            </h2>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 20,
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.6 }}>
                {analysis.ancestry}
              </p>
            </div>
          </>
        )}

        <p
          style={{
            textAlign: 'center',
            color: '#1e293b',
            fontSize: 12,
          }}
        >
          This analysis is for educational purposes only. Consult a healthcare
          professional for medical advice.
        </p>
      </div>
    </main>
  );
}
