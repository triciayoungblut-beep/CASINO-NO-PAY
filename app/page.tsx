"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseclient';

export default function Home() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const { data } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReports(data);
    }
    fetchReports();
  }, []);

  return (
    <main className="relative max-w-4xl mx-auto p-6 font-sans bg-white min-h-screen text-black text-left">
      <header className="text-center py-10 border-b-4 border-black mb-8">
        <div className="flex justify-center gap-4 mb-6">
          <img src="/1.png" alt="Blacklist" className="h-24 w-auto border-2 border-black shadow-md" />
          <img src="/2.png" alt="Warning" className="h-24 w-auto border-2 border-black shadow-md" />
        </div>
        <h1 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">WWW.CASINO-NO-PAY.COM</h1>
        <p className="text-xl font-bold text-red-600 uppercase tracking-widest border-y-2 border-red-600 py-2 inline-block">
          Exposing platforms that refuse to pay!
        </p>
      </header>

      {/* REPORT FORM SECTION */}
      <section id="report-form" className="relative z-10 bg-red-600 p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12 text-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl font-black uppercase italic underline">Submit Report</h2>
          <img src="/4.png" alt="Submit" className="h-20 w-auto invert" />
        </div>
        
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const { error } = await supabase
            .from('reports')
            .insert([{
              casino_name: formData.get('casino_name'),
              amount_owed: parseFloat(formData.get('amount') as string),
              issue_description: formData.get('issue'),
              status: 'pending'
            }]);

          if (error) {
            alert("Error: " + error.message);
          } else {
            alert("Report Submitted Successfully!");
            window.location.reload();
          }
        }} className="space-y-6">
          <div>
            <label className="block font-black uppercase text-xl mb-2">Casino Name / URL</label>
            <input name="casino_name" required className="w-full p-4 border-4 border-black text-black font-bold text-lg" placeholder="e.g. scamcasino.com" />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2">Amount Owed ($)</label>
            <input name="amount" type="number" required className="w-full p-4 border-4 border-black text-black font-bold text-lg" placeholder="0.00" />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2">Describe the Issue</label>
            <textarea name="issue" required className="w-full p-4 border-4 border-black text-black font-bold text-lg h-32" placeholder="Tell us what happened..."></textarea>
          </div>
          <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-black text-3xl py-6 border-4 border-white uppercase italic transform transition hover:scale-105">
            SUBMIT TO BLACKLIST 🚩
          </button>
        </form>
      </section>

      {/* THE BLACKLIST SECTION WITH BACKGROUND GRAPHICS */}
      <section className="relative my-16 min-h-[600px]">
        {/* GRAPHICS LAYER (Sits behind the reports) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-start pt-10 opacity-20 pointer-events-none">
          <div className="flex items-center gap-4 mb-4">
            <img src="/3.png" alt="Alert" className="h-24 w-auto" />
            <h2 className="text-8xl font-black bg-black text-white px-10 py-4 uppercase transform -rotate-2 shadow-2xl">
              The Blacklist
            </h2>
          </div>
          <p className="text-5xl font-black text-gray-400 uppercase italic tracking-widest">Wall of Shame</p>
        </div>

        {/* REPORTS LAYER (Sits on top) */}
        <div className="relative z-10 space-y-8">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
                <div className="p-6 border-b-4 border-black">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-black uppercase underline decoration-red-600">{report.casino_name}</h3>
                    <div className="bg-red-600 text-white font-black px-4 py-2 text-xl border-2 border-black">
                      ${report.amount_owed} OWED
                    </div>
                  </div>
                  <p className="text-xl font-bold italic text-gray-900 leading-tight">"{report.issue_description}"</p>
                  <div className="mt-4">
                    <span className={`font-black text-sm px-4 py-2 border-2 border-black uppercase ${report.status === 'resolved' ? 'bg-green-400' : 'bg-yellow-400'}`}>
                      Status: {report.status || 'UNRESOLVED'}
                    </span>
                  </div>
                </div>
                <div className="bg-black text-white p-6 flex gap-4">
                  <div className="bg-white text-black font-black text-xs px-2 py-1 uppercase rotate-90 h-fit mt-2">REPLY</div>
                  <div>
                    <h4 className="font-black text-red-500 uppercase mb-2">Official Casino Response:</h4>
                    <p className="text-lg font-bold text-gray-300 italic leading-snug">
                      {report.casino_response || "PENDING INVESTIGATION: No response received from operator yet."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border-4 border-dashed border-gray-400 bg-white/80">
              <p className="text-2xl font-black text-gray-400 uppercase">Searching database for reports...</p>
            </div>
          )}
        </div>
      </section>

      <footer className="text-center py-10 opacity-70">
        <img src="/5.png" alt="Footer Logo" className="h-16 w-auto mx-auto mb-4 grayscale" />
        <p className="font-bold uppercase tracking-widest text-black">© 2024 CASINO-NO-PAY WATCHDOG GROUP</p>
      </footer>
    </main>
  );
