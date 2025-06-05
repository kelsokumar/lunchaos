"use client"

import React, { useState, useEffect } from 'react';

const mockMostLiked = {
  week: { name: 'Ramen Deluxe', likes: 42 },
  month: { name: 'Vegan Buddha Bowl', likes: 120 },
};
const mockDietary = ['Vegan', 'Gluten-Free', 'Low Sodium'];
const mockSuggestions = [
  { dish: 'Stir Fry', suggestion: 'Try adding more veggies!' },
  { dish: 'Ramen Deluxe', suggestion: 'Offer a spicy version.' },
];

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function AdminDashboard() {
  const [special, setSpecial] = useState('Ramen Deluxe');
  const [menu, setMenu] = useState(['Ramen Deluxe', 'Vegan Buddha Bowl', 'Stir Fry']);
  const [newMenuItem, setNewMenuItem] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem('admin_logged_in') === 'true');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      setError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_logged_in', 'true');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_logged_in');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow p-8 w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Admin Login</h2>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 font-semibold">Login</button>
          <div className="text-xs text-gray-400 text-center">Demo: admin / admin123</div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Logout</button>
        </div>
        {/* Most Liked Dish */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Most Liked Dishes</h2>
          <div className="flex gap-8">
            <div>
              <div className="text-gray-500 text-sm">This Week</div>
              <div className="font-bold text-lg">{mockMostLiked.week.name}</div>
              <div className="text-primary-600">{mockMostLiked.week.likes} likes</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">This Month</div>
              <div className="font-bold text-lg">{mockMostLiked.month.name}</div>
              <div className="text-primary-600">{mockMostLiked.month.likes} likes</div>
            </div>
          </div>
        </div>
        {/* Dietary Concerns */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Top Dietary Concerns</h2>
          <ul className="flex gap-3 flex-wrap">
            {mockDietary.map((d, i) => (
              <li key={i} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">{d}</li>
            ))}
          </ul>
        </div>
        {/* User Recommendations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">User Recommendations</h2>
          <ul className="space-y-2">
            {mockSuggestions.map((s, i) => (
              <li key={i} className="border-l-4 border-primary-400 pl-3 text-gray-700">
                <b>{s.dish}:</b> {s.suggestion}
              </li>
            ))}
          </ul>
        </div>
        {/* Admin Controls */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Menu Editor (Admin Only)</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Today's Special</label>
            <input
              className="border rounded px-3 py-2 w-full mb-2"
              value={special}
              onChange={e => setSpecial(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Menu Items</label>
            <ul className="mb-2">
              {menu.map((item, i) => (
                <li key={i} className="flex items-center gap-2 mb-1">
                  <span>{item}</span>
                  <button
                    className="text-red-500 hover:underline text-xs"
                    onClick={() => setMenu(menu.filter((_, idx) => idx !== i))}
                  >Remove</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                className="border rounded px-2 py-1 flex-1"
                placeholder="Add new item"
                value={newMenuItem}
                onChange={e => setNewMenuItem(e.target.value)}
              />
              <button
                className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700"
                onClick={() => {
                  if (newMenuItem.trim()) {
                    setMenu([...menu, newMenuItem.trim()]);
                    setNewMenuItem('');
                  }
                }}
              >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 