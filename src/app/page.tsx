"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', text: '' });
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedbackStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackForm),
      });
      if (res.ok) {
        setFeedbackStatus('success');
        setFeedbackForm({ name: '', email: '', text: '' });
        setTimeout(() => setFeedbackStatus('idle'), 2000);
      } else {
        setFeedbackStatus('error');
      }
    } catch {
      setFeedbackStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Admin Login Button */}
      <div className="absolute top-6 right-8 z-50">
        <Link href="/admin" className="bg-primary-600 text-white px-5 py-2 rounded-lg shadow hover:bg-primary-700 font-semibold transition-colors">
          Admin Login
        </Link>
      </div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                Discover Your Perfect Meal
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-100">
                Rate, share, and explore the best dining spots in your building
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setRateModalOpen(true)}
                  className="btn-primary bg-white text-primary-600 hover:bg-primary-50"
                >
                  Rate Today's Meals
                </button>
                <Link href="/crowd" className="btn-secondary bg-primary-500/20 backdrop-blur-sm text-white hover:bg-primary-500/30">
                  Check Crowd Levels
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-[500px]">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 animate-float shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-400/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-pulse">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-3xl">Today's Special</h3>
                      <p className="text-primary-100 text-lg">Chef's Recommendation</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    {/* Left side - Image */}
                    <div className="w-1/2 flex flex-col justify-between">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden">
                        <Image
                          src="/images/ramen.jpg"
                          alt="Ramen Deluxe"
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center justify-end">
                            <span className="text-base font-medium bg-black/40 px-3 py-1.5 rounded-full">⭐ 4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content, perfectly aligned */}
                    <div className="w-1/2 h-64 flex flex-col">
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="bg-white/10 rounded-t-xl p-4 backdrop-blur-sm border border-b-0 border-white/20 flex-1 flex flex-col justify-center">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-3xl">🍜</span>
                            <div>
                              <h4 className="font-medium text-2xl mb-1">Ramen Deluxe</h4>
                              <p className="text-base text-primary-100">Rich tonkotsu broth, chashu pork, soft-boiled egg</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Spicy</span>
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Popular</span>
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Chef's Pick</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-base">
                            <p className="text-primary-100">Award-winning recipe with 48-hour simmered broth</p>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-b-xl p-4 backdrop-blur-sm border border-t-0 border-white/20 flex-1 flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl">⏱️</span>
                              <div>
                                <span className="text-base text-primary-100 block">Current Wait Time</span>
                                <span className="text-3xl font-medium">5 min</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl">🕒</span>
                              <div className="text-right">
                                <span className="text-base text-primary-100 block">Available Until</span>
                                <span className="text-3xl font-medium">2:00 PM</span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-base text-primary-100">Last 30 min:</span>
                                <span className="text-base font-medium">12 orders</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-primary-200 text-xl">🔥</span>
                                <span className="text-base font-medium text-primary-200">Hot Item</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Modal */}
      {rateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs flex flex-col gap-4 items-center">
            <h2 className="text-xl font-bold mb-2 text-primary-700">Rate Today's Meal</h2>
            <Link
              href="/rate/breakfast"
              className="w-full text-center bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-2"
              onClick={() => setRateModalOpen(false)}
            >
              Rate Breakfast
            </Link>
            <Link
              href="/rate/lunch"
              className="w-full text-center bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              onClick={() => setRateModalOpen(false)}
            >
              Rate Lunch
            </Link>
            <button
              className="mt-2 text-primary-600 hover:underline text-sm"
              onClick={() => setRateModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
          Explore Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Breakfast Rating Card */}
          <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🌅
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Breakfast Rating</h3>
                <p className="text-gray-600 mb-4">Start your day right with the best breakfast options</p>
                <Link href="/rate/breakfast" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1">
                  Rate Breakfast <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Lunch Rating Card */}
          <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🌞
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Lunch Rating</h3>
                <p className="text-gray-600 mb-4">Share your experience and help others make better choices</p>
                <Link href="/rate/lunch" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1">
                  Rate Lunch <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          <Link href="/feedback" className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 p-6 pb-2">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              💬
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Feedback</h3>
              <p className="text-gray-600 mb-4">Share your thoughts or suggestions with us!</p>
              <span className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Leave Feedback →
              </span>
            </div>
          </Link>

          {/* Crowd Insights Card */}
          <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Crowd Insights</h3>
                <p className="text-gray-600 mb-4">Find the perfect spot with real-time occupancy data</p>
                <Link href="/crowd" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1">
                  View Map <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📈
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Analytics & Rankings</h3>
                <p className="text-gray-600 mb-4">Explore trends, insights, and top contributors</p>
                <Link href="/analytics" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1">
                  View Analytics <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 