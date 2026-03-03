import { NextRequest, NextResponse } from 'next/server';

// Results are cached in-memory in the analyze route.
// This endpoint is a stub for future persistence.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(`Result lookup requested for id: ${id}`);
  return NextResponse.json(
    {
      error:
        'Result not found or expired. Please re-upload your file.',
    },
    { status: 404 }
  );
}
