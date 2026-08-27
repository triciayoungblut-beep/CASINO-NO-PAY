"use client";
import React from 'react';
import { supabase } from '../supabaseclient';

export default function CasinoRegister() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans bg-zinc-950 min-h-screen text-white">
      {/* HAZARD HEADER BAR */}
      <div className="h-4 w-full bg-[linear-gradient(45deg,#2563eb_25%,#000_25%,#000_50%,#2563eb_50%,#2563eb_75%,#000_75%,#000)] bg-[length:40px_40px] border-b-4 border-black mb-6"></div>

      <header className="text-center py-10 border-b-4 border-zinc-800 mb-8">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-blue-500">
          🏛️ Casino Registration
        </h1>
        <p className="text-lg font-bold uppercase mt-2 border-y-2 border-zinc-800 py-2 inline-block">
          Lock in your Terms of Service to prove transparency during player disputes
        </p>
      </header>

      <section className="bg-zinc-900 p-8 border-4 border-blue-600 shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] mb-12">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const { error } = await supabase
            .from('registered_casinos')
            .insert([{
              casino_name: formData.get('name'),
              official_url: formData.get('url'),
              terms_and_rules: formData.get('rules'),
              is_verified: false
            }]);

          if (error) {
            alert("Registration Error: " + error.message);
          } else {
            alert("Registration Submitted! Your terms are now officially timestamped and locked in for review.");
            window.location.href = "/";
          }
        }} className="space-y-6 text-left">
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-blue-400">Official Casino Name</label>
            <input name="name" required className="w-full p-4 border-4 border-zinc-700 bg-black text-white font-bold text-lg focus:outline-none focus:border-blue-500" placeholder="e.g. Royal Payout Casino" />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-blue-400">Official Website URL</label>
            <input name="url" type="url" required className="w-full p-4 border-4 border-zinc-700 bg-black text-white font-bold text-lg focus:outline-none focus:border-blue-500" placeholder="https://..." />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-blue-400">Official Terms & Payout Rules</label>
            <textarea name="rules" required className="w-full p-4 border-4 border-zinc-700 bg-black text-white font-bold text-lg h-64 focus:outline-none focus:border-blue-500" placeholder="Paste your full payout timelines, terms, and rules here..."></textarea>
            <p className="text-sm font-bold text-red-500 mt-2 uppercase">
              ⚠️ Note: This submission creates an archived record with a permanent cryptographic timestamp. Any future terms changes must be updated here first for them to be considered valid during player investigations.
            </p>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-3xl py-6 border-4 border-white uppercase italic transform transition hover:scale-105 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            SUBMIT & TIMESTAMP RULES ✅
          </button>
        </form>
      </section>
      
      <div className="text-center">
        <a href="/" className="font-bold uppercase text-sm underline hover:text-red-500">
          ⬅️ Back to Main Blacklist
        </a>
      </div>
    </main>
  );
}
