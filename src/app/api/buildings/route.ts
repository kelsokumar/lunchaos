import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cafes } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    // Get unique buildings
    const buildings = await db.selectDistinct({ building: cafes.building }).from(cafes)
    return NextResponse.json({ buildings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch buildings' }, { status: 500 })
  }
} 