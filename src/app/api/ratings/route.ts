import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ratings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

// Validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const MAX_IMAGE_DIMENSION = 2000 // 2000px

async function validateImage(file: File): Promise<{ isValid: boolean; error?: string }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    }
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Only ${ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ')} images are allowed`
    }
  }

  // Check image dimensions
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const metadata = await sharp(buffer).metadata()
    
    if (metadata.width && metadata.width > MAX_IMAGE_DIMENSION || 
        metadata.height && metadata.height > MAX_IMAGE_DIMENSION) {
      return {
        isValid: false,
        error: `Image dimensions must be less than ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION} pixels`
      }
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Failed to process image'
    }
  }

  return { isValid: true }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const foodItemId = formData.get('foodItemId')
    const rating = formData.get('rating')
    const comment = formData.get('comment')
    const username = formData.get('username')
    const image = formData.get('image') as File | null

    // Validate required fields
    if (!foodItemId || !rating || !username) {
      return NextResponse.json(
        { error: 'Food item, rating, and username are required' },
        { status: 400 }
      )
    }

    // Validate username
    if (typeof username !== 'string' || username.trim().length < 2) {
      return NextResponse.json(
        { error: 'Username must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Handle image upload if present
    let imageUrl = null
    if (image) {
      // Validate image
      const validation = await validateImage(image)
      if (!validation.isValid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        )
      }

      try {
        // Generate unique filename
        const fileExtension = image.name.split('.').pop()
        const uniqueFilename = `${uuidv4()}.${fileExtension}`
        
        // Convert File to Buffer
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Optimize image if needed
        const optimizedBuffer = await sharp(buffer)
          .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 80 })
          .toBuffer()
        
        // Save file to public/uploads directory
        const uploadDir = join(process.cwd(), 'public', 'uploads')
        const filePath = join(uploadDir, uniqueFilename)
        await writeFile(filePath, optimizedBuffer)
        
        // Store the relative path in the database
        imageUrl = `/uploads/${uniqueFilename}`
      } catch (error) {
        console.error('Error saving image:', error)
        return NextResponse.json(
          { error: 'Failed to save image' },
          { status: 500 }
        )
      }
    }

    // Insert the rating
    const result = await db.insert(ratings).values({
      foodItemId: Number(foodItemId),
      rating: Number(rating),
      comment: comment as string || null,
      imageUrl,
      username: username.trim()
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