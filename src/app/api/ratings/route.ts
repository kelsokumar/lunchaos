import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ratings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const foodItemId = formData.get('foodItemId')
    const rating = formData.get('rating')
    const comment = formData.get('comment')
    const image = formData.get('image') as File | null

    // Validate required fields
    if (!foodItemId || !rating) {
      return NextResponse.json(
        { error: 'Food item and rating are required' },
        { status: 400 }
      )
    }

    // Handle image upload if present
    let imageUrl = null
    if (image) {
      // TODO: Implement image upload to your preferred storage service
      // For now, we'll just store the image name
      imageUrl = image.name
    }

    // Insert the rating
    const result = await db.insert(ratings).values({
      foodItemId: Number(foodItemId),
      rating: Number(rating),
      comment: comment as string || null,
      imageUrl
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Rating submitted successfully',
      ratingId: result.lastInsertRowid
    })
  } catch (error) {
    console.error('Error submitting rating:', error)
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    )
  }
} 