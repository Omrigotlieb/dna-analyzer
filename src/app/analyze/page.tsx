'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AnalyzePage() {
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'error'>('idle');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function analyze(file: File) {
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
      setError('Please upload a .txt or .csv file from 23andMe');
      setStatus('error');
      return;
    }
    setStatus('analyzing');
    setProgress('Parsing SNP variants...');
    try {
      const form = new FormData();
      form.append('file', file);
      setProgress('Analyzing with Claude AI...');
      const res = await fetch('/api/analyze', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      // Store result in sessionStorage so the results page can access it
      sessionStorage.setItem(`dna-result-${data.id}`, JSON.stringify(data));
      setProgress('Done!');
      router.push(`/results/${data.id}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Analysis failed';
      setError(message);
      setStatus('error');
    }
  }

  async function useSample() {
    setStatus('analyzing');
    setProgress('Loading sample data...');
    try {
      const res = await fetch('/sample-dna.txt');
      const text = await res.text();
      const file = new File([text], 'sample-23andme.txt', {
        type: 'text/plain',
      });
      await analyze(file);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load sample';
      setError(message);
      setStatus('error');
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 560, width: '100%' }}>
        <Link
          href="/"
          style={{ color: '#6366f1', textDecoration: 'none', fontSize: 14 }}
        >
          ← Back
        </Link>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: '16px 0 8px',
            background: 'linear-gradient(135deg, #e0e7ff, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Upload Your DNA
        </h1>
        <p style={{ color: '#64748b', marginBottom: 32 }}>
          Upload your 23andMe raw data file (.txt) to get AI-powered insights.
        </p>

        {status === 'analyzing' ? (
          <div
            style={{
              textAlign: 'center',
              padding: 48,
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 16,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🧬</div>
            <p
              style={{ color: '#a78bfa', fontSize: 18, fontWeight: 600 }}
            >
              {progress}
            </p>
            <p style={{ color: '#475569', fontSize: 14 }}>
              Analyzing your genetic variants with Claude AI...
            </p>
          </div>
        ) : (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files[0];
                if (f) analyze(f);
              }}
              onClick={() => inputRef.current?.click()}
              style={{
                border: `2px dashed ${dragging ? '#6366f1' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: 16,
                padding: 48,
                textAlign: 'center',
                cursor: 'pointer',
                background: dragging
                  ? 'rgba(99,102,241,0.1)'
                  : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
              <p
                style={{
                  color: '#e2e8f0',
                  fontSize: 16,
                  fontWeight: 600,
                  margin: '0 0 8px',
                }}
              >
                Drop your 23andMe file here
              </p>
              <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>
                or click to browse · .txt files only · max 50MB
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".txt,.csv"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) analyze(f);
                }}
              />
            </div>
            <button
              onClick={useSample}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
                padding: '14px',
                borderRadius: 12,
                fontSize: 15,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try with sample data
            </button>
            {status === 'error' && (
              <p
                style={{
                  color: '#f87171',
                  marginTop: 16,
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}
            <p
              style={{
                textAlign: 'center',
                color: '#334155',
                fontSize: 12,
                marginTop: 20,
              }}
            >
              Your data is processed privately. We never store your DNA.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
