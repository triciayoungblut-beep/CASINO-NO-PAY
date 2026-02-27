"use client";
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    casino_name: '',
    amount_owed: '',
    issue_description: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('reports').insert([
      {
        casino_name: formData.casino_name,
        amount_owed: parseFloat(formData.amount_owed),
        issue_description: formData.issue_description,
        reporter_email: formData.email,
        status: 'pending'
      }
    ]);

    if (error) {
      setMessage('Error submitting report: ' + error.message);
    } else {
      setMessage('Report submitted successfully! It will appear on the Wall of Shame soon.');
      setFormData({ casino_name: '', amount_owed: '', issue_description: '', email: '' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      {/* WARNING BANNER */}
      <div className="max-w-2xl mx-auto bg-red-600 text-white text-center py-2 font-black uppercase tracking-widest rounded-t-2xl shadow-lg">
        ⚠️ Warning: Verified Non-Paying Platforms ⚠️
      </div>

      <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-b-2xl border-x-4 border-b-4 border-red-600">
        
        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="relative group">
            <img src="/slot1.jpg" alt="Scam 1" className="rounded-lg border-2 border-gray-200 hover:border-red-500 transition-all shadow-md" />
          </div>
          <div className="relative group">
            <img src="/slot2.jpg" alt="Scam 2" className="rounded-lg border-2 border-gray-200 hover:border-red-500 transition-all shadow-md" />
          </div>
          <div className="relative group">
            <img src="/slot3.jpg" alt="Scam 3" className="rounded-lg border-2 border-gray-200 hover:border-red-500 transition-all shadow-md" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-2 text-center uppercase">Casino Blacklist</h1>
        <p className="text-gray-600 mb-8 text-center font-medium">Have you been cheated? Report the platform below to warn the community.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-red-600 uppercase mb-1">Target Casino Name</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none font-bold"
              value={formData.casino_name}
              onChange={(e) => setFormData({...formData, casino_name: e.target.value})}
              placeholder="Enter the scam site name..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-red-600 uppercase mb-1">Amount Stolen ($)</label>
              <input
                type="number"
                required
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none font-bold"
                value={formData.amount_owed}
                onChange={(e) => setFormData({...formData, amount_owed: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-red-600 uppercase mb-1">Your Email</label>
              <input
                type="email"
                required
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none font-bold"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="For verification"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-red-600 uppercase mb-1">Evidence / Description</label>
            <textarea
              required
              rows={4}
              className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none font-bold"
              value={formData.issue_description}
              onChange={(e) => setFormData({...formData, issue_description: e.target.value})}
              placeholder="Explain what happened..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-black text-white font-black py-5 rounded-xl transition-all uppercase tracking-tighter text-xl shadow-xl active:scale-95 disabled:bg-gray-400"
          >
            {loading ? 'SUBMITTING TO DATABASE...' : '🚀 BLACKLIST THIS CASINO'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-black uppercase ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <a href="/wall-of-shame" className="text-red-600 font-black hover:underline uppercase tracking-widest text-sm">
            View Current Wall of Shame →
          </a>
        </div>
      </div>
    </div>
  );
};
