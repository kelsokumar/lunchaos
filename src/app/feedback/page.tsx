"use client"
import { useState } from 'react'

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', text: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', text: '' })
        setTimeout(() => setStatus('idle'), 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="card max-w-md w-full p-8 rounded-2xl shadow-xl bg-white">
        <h1 className="text-2xl font-bold mb-4 text-primary-700">Feedback</h1>
        <p className="mb-6 text-gray-600">We value your feedback! Please let us know your thoughts or suggestions below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Your Feedback"
            value={form.text}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            required
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded font-semibold hover:bg-primary-700 transition-colors w-full"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : status === 'success' ? 'Thank you!' : 'Submit Feedback'}
          </button>
          {status === 'error' && (
            <div className="text-red-500 text-sm mt-1">Failed to submit feedback. Please try again.</div>
          )}
        </form>
      </div>
    </div>
  )
} 