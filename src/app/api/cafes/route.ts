import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cafes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const building = searchParams.get('building')
  if (!building) {
    return NextResponse.json({ error: 'Missing building parameter' }, { status: 400 })
  }
  try {
    const cafeList = await db.select().from(cafes).where(eq(cafes.building, building))
    return NextResponse.json({ cafes: cafeList })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cafes' }, { status: 500 })
  }
} 