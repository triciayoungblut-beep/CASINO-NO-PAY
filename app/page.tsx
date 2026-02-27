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
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Report a Non-Paying Casino</h1>
          <p className="text-gray-600 mb-8">Help the community by flagging platforms that refuse to pay out winnings.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Casino Name</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.casino_name}
                onChange={(e) => setFormData({...formData, casino_name: e.target.value})}
                placeholder="e.g. Scams-A-Lot Casino"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Amount Owed ($)</label>
              <input
                type="number"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.amount_owed}
                onChange={(e) => setFormData({...formData, amount_owed: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Issue Description</label>
              <textarea
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.issue_description}
                onChange={(e) => setFormData({...formData, issue_description: e.target.value})}
                placeholder="Explain what happened (e.g. they closed my account when I tried to withdraw)..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Your Email (Private)</label>
              <input
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="For verification only"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-lg transition-colors uppercase tracking-widest disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Submit Report to Blacklist'}
            </button>
          </form>
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center font-bold ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
          <div className="mt-8 text-center">
            <a href="/wall-of-shame" className="text-blue-600 font-bold hover:underline">View the Wall of Shame →</a>
          </div>
        </div>
      );
    };
    
    export default ReportForm;
