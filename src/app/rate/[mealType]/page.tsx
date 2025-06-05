'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

// Define the meal items
const mealItems = {
  breakfast: [
    { value: 'eggs', label: 'Eggs & Toast' },
    { value: 'pancakes', label: 'Pancakes' },
    { value: 'waffles', label: 'Waffles' },
    { value: 'oatmeal', label: 'Oatmeal' },
    { value: 'yogurt', label: 'Yogurt & Granola' },
    { value: 'sandwich', label: 'Breakfast Sandwich' },
    { value: 'other', label: 'Other' }
  ],
  lunch: [
    { value: 'salad', label: 'Salad' },
    { value: 'sandwich', label: 'Sandwich' },
    { value: 'soup', label: 'Soup' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'rice', label: 'Rice Bowl' },
    { value: 'other', label: 'Other' }
  ]
}

export default function RateMeal({ params }: { params: { mealType: string } }) {
  const router = useRouter()
  const mealType = params.mealType as 'breakfast' | 'lunch'
  const [formData, setFormData] = useState({
    building: '',
    cafe: '',
    food: '',
    rating: 5,
    comment: '',
    username: '',
    image: null as File | null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dropdown data
  const [buildings, setBuildings] = useState<{ building: string }[]>([])
  const [cafes, setCafes] = useState<any[]>([])
  const [foodItems, setFoodItems] = useState<any[]>([])

  // Fetch buildings on mount
  useEffect(() => {
    fetch('/api/buildings')
      .then(res => res.json())
      .then(data => setBuildings(data.buildings || []))
  }, [])

  // Fetch cafes when building changes
  useEffect(() => {
    if (formData.building) {
      setCafes([])
      setFormData(f => ({ ...f, cafe: '', food: '' }))
      fetch(`/api/cafes?building=${encodeURIComponent(formData.building)}`)
        .then(res => res.json())
        .then(data => setCafes(data.cafes || []))
    }
  }, [formData.building])

  // Fetch food items when cafe changes
  useEffect(() => {
    if (formData.cafe) {
      setFoodItems([])
      setFormData(f => ({ ...f, food: '' }))
      fetch(`/api/food-items?cafeId=${encodeURIComponent(formData.cafe)}`)
        .then(res => res.json())
        .then(data => setFoodItems(data.foodItems || []))
    }
  }, [formData.cafe])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      // Create data URL for preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      setImagePreview(null)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.food) {
        toast.error('Please select a food item')
        setIsSubmitting(false)
        return
      }
      const formDataToSend = new FormData()
      formDataToSend.append('foodItemId', formData.food)
      formDataToSend.append('rating', formData.rating.toString())
      formDataToSend.append('username', formData.username)
      if (formData.comment) {
        formDataToSend.append('comment', formData.comment)
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch('/api/ratings', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit rating')
      }

      toast.success('Rating submitted successfully!')
      router.push('/')
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit rating')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
              Rate Today's {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            </h1>
            <p className="text-lg md:text-xl text-primary-100">
              Share your experience and help others make better choices
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Building Selection */}
            <div>
              <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-2">
                Building
              </label>
              <select
                id="building"
                name="building"
                value={formData.building}
                onChange={e => setFormData(f => ({ ...f, building: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                required
              >
                <option value="">Select a building</option>
                {buildings.map(b => (
                  <option key={b.building} value={b.building}>{b.building}</option>
                ))}
              </select>
            </div>
            {/* Cafe Selection */}
            <div>
              <label htmlFor="cafe" className="block text-sm font-medium text-gray-700 mb-2">
                Cafe
              </label>
              <select
                id="cafe"
                name="cafe"
                value={formData.cafe}
                onChange={e => setFormData(f => ({ ...f, cafe: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                required
                disabled={!formData.building}
              >
                <option value="">Select a cafe</option>
                {cafes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {/* Food Item Selection */}
            <div>
              <label htmlFor="food" className="block text-sm font-medium text-gray-700 mb-2">
                Food Item
              </label>
              <select
                id="food"
                name="food"
                value={formData.food}
                onChange={e => setFormData(f => ({ ...f, food: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                required
                disabled={!formData.cafe}
              >
                <option value="">Select a food item</option>
                {foodItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload a photo of your {mealType}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors">
                <div className="space-y-1 text-center">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-2"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt={`${mealType} preview`}
                        className="w-32 h-32 object-contain rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData(f => ({ ...f, image: null }))
                          const fileInput = document.getElementById('image') as HTMLInputElement
                          if (fileInput) {
                            fileInput.value = ''
                          }
                        }}
                        className="mt-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={e => setFormData(f => ({ ...f, username: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your name"
                required
                minLength={2}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your {mealType}?
              </label>
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-200
                      ${formData.rating === rating 
                        ? 'bg-primary-500 text-white shadow-lg scale-110' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'}`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                placeholder={`Share your thoughts about today's ${mealType}...`}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 