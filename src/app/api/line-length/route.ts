// This is a Next.js API route for getting the line length for a cafe by cafe_id
import { NextRequest, NextResponse } from 'next/server';

// Dummy data or replace with your DB logic
const cafeLines: Record<string, number> = {
  '1': 5,
  '2': 12,
  '3': 0,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cafe_id = searchParams.get('cafe_id');

  if (!cafe_id) {
    return NextResponse.json({ error: 'Missing cafe_id' }, { status: 400 });
  }

  // Replace this with your actual logic to get the line length
  const lineLength = cafeLines[cafe_id] ?? null;

  if (lineLength === null) {
    return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
  }

  return NextResponse.json({ cafe_id, line_length: lineLength });
}
