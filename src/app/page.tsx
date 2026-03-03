import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Hero */}
      <div
        style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 60px' }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* DNA icon */}
          <div style={{ fontSize: 72, marginBottom: 24 }}>🧬</div>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(99,102,241,0.2)',
              border: '1px solid rgba(99,102,241,0.4)',
              borderRadius: 20,
              padding: '6px 16px',
              fontSize: 13,
              color: '#a78bfa',
              marginBottom: 24,
            }}
          >
            Powered by Claude AI · Built by ORCA
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: '0 0 24px',
              background:
                'linear-gradient(135deg, #e0e7ff, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Decode Your Genome
            <br />
            with AI
          </h1>
          <p
            style={{
              fontSize: 20,
              color: '#94a3b8',
              maxWidth: 560,
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            Upload your 23andMe raw data and get personalized health insights,
            trait predictions, and ancestry markers — powered by Claude AI.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/analyze"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                padding: '16px 36px',
                borderRadius: 12,
                fontSize: 17,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
              }}
            >
              Analyze My DNA →
            </Link>
            <a
              href="/sample-dna.txt"
              download
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#e2e8f0',
                padding: '16px 36px',
                borderRadius: 12,
                fontSize: 17,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ↓ Sample Data
            </a>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 80,
          }}
        >
          {[
            {
              icon: '🔬',
              title: '700K+ SNPs Analyzed',
              desc: 'Parses your complete 23andMe raw data file and identifies key genetic variants.',
            },
            {
              icon: '🤖',
              title: 'AI-Powered Insights',
              desc: 'Claude AI analyzes APOE, MTHFR, TCF7L2, FTO and other health-critical genes.',
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              desc: 'Your DNA is processed locally. We never store your genetic data.',
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '28px 24px',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#e2e8f0',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: '#64748b',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 80,
            color: '#334155',
            fontSize: 13,
          }}
        >
          Built autonomously by{' '}
          <a
            href="https://github.com/Omrigotlieb/infinity-ai"
            style={{ color: '#6366f1', textDecoration: 'none' }}
          >
            ORCA
          </a>{' '}
          · Infinity AI
        </div>
      </div>
    </main>
  );
}
