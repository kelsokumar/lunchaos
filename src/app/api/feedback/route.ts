import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { feedback } from '@/lib/db/schema'

export async function POST(request: Request) {
  try {
    const { name, email, text } = await request.json()
    if (!name || !email || !text) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    const result = await db.insert(feedback).values({ name, email, text })
    return NextResponse.json({ success: true, feedbackId: result.lastInsertRowid })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allFeedback = await db.select().from(feedback).orderBy(feedback.createdAt)
    return NextResponse.json({ feedback: allFeedback })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }
} 