import Link from 'next/link';

export default function CrowdPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Table on the left */}
            <div>
              <div className="bg-white/80 rounded-2xl shadow p-6 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Cafe</th>
                      <th className="py-2 px-4 border-b">Line Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">Cafe A</td>
                      <td className="py-2 px-4 border-b text-center">-</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Cafe B</td>
                      <td className="py-2 px-4 border-b text-center">-</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Cafe C</td>
                      <td className="py-2 px-4 border-b text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Hero Box on the right */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Crowd Insights</h1>
                <p className="text-lg mb-4">See real-time crowd levels and plan your visit with confidence.</p>
                <Link href="/" className="btn-primary bg-primary-600 text-white hover:bg-primary-700 inline-block mt-2">← Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
