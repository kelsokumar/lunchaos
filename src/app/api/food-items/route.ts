import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { foodItems } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cafeId = searchParams.get('cafeId')
  if (!cafeId) {
    return NextResponse.json({ error: 'Missing cafeId parameter' }, { status: 400 })
  }
  try {
    const items = await db.select().from(foodItems).where(eq(foodItems.cafeId, cafeId))
    return NextResponse.json({ foodItems: items })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch food items' }, { status: 500 })
  }
} 