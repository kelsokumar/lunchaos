import Link from 'next/link';

export default function CrowdPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-block mb-6">
          <button className="bg-primary-600 text-white px-4 py-2 rounded">← Back to Home</button>
        </Link>
      </div>
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Table on the left */}
            <div>
              <div className="bg-white/80 rounded-2xl shadow p-6 overflow-x-auto max-w-md mx-auto flex flex-col justify-center" style={{ height: '500px' }}>
                <table className="w-full bg-white border border-gray-200 h-full text-gray-900">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b font-bold text-lg bg-white">Cafe</th>
                      <th className="py-2 px-4 border-b font-bold text-lg bg-white">Line Length</th>
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
              <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 mb-6 flex flex-col justify-center items-center" style={{ height: '500px' }}>
                <h1 className="text-xl font-semibold mb-4 w-full text-left">Crowd Insights</h1>
                <div className="w-full flex justify-center mb-6">
                  <div className="w-96 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-5xl">
                    <span>map</span>
                  </div>
                </div>
                <p className="text-lg mb-4">See real-time crowd levels and plan your visit with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
