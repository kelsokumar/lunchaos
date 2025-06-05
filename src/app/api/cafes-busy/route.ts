import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Read cafes.csv from the root directory
  const cafesPath = path.join(process.cwd(), 'cafes.csv');
  let cafes: string[] = [];
  try {
    const data = fs.readFileSync(cafesPath, 'utf-8');
    // Assume first line is header, rest are cafes
    cafes = data.split('\n').slice(1).filter(Boolean).map(line => line.split(',')[1] || line.split(',')[0]);
  } catch (e) {
    return NextResponse.json({ error: 'Could not read cafes.csv' }, { status: 500 });
  }

  // Generate random busy-ness for each cafe
  const cafesWithBusy = cafes.map(name => ({
    name,
    busy: Math.floor(Math.random() * (110 - 50 + 1)) + 50
  }));

  return NextResponse.json({ cafes: cafesWithBusy });
}
