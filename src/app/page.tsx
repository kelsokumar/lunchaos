import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">LunchAOS</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Lunch Rating Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">🍽️ Lunch Rating</h2>
            <p className="text-gray-600 mb-4">Rate your lunch experience and share your feedback</p>
            <Link href="/rate" className="btn-primary inline-block">
              Rate Today's Lunch
            </Link>
          </div>

          {/* Crowd Insights Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">🧭 Crowd Insights</h2>
            <p className="text-gray-600 mb-4">Check building occupancy and find the best spots</p>
            <Link href="/crowd" className="btn-primary inline-block">
              View Crowd Map
            </Link>
          </div>

          {/* Food Voting Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">🍰 Food Voting</h2>
            <p className="text-gray-600 mb-4">Vote for your favorite dishes and desserts</p>
            <Link href="/vote" className="btn-primary inline-block">
              Vote Now
            </Link>
          </div>

          {/* Analytics Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">📊 Analytics</h2>
            <p className="text-gray-600 mb-4">View trends and insights about lunch preferences</p>
            <Link href="/analytics" className="btn-primary inline-block">
              View Analytics
            </Link>
          </div>

          {/* Leaderboard Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">🏆 Leaderboard</h2>
            <p className="text-gray-600 mb-4">See who's leading in lunch participation</p>
            <Link href="/leaderboard" className="btn-primary inline-block">
              View Leaderboard
            </Link>
          </div>

          {/* Admin Panel Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">👨‍🍳 Admin Panel</h2>
            <p className="text-gray-600 mb-4">Manage and moderate lunch feedback</p>
            <Link href="/admin" className="btn-primary inline-block">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 