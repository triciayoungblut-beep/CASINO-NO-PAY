"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseclient';

export default function Home() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('post_approvals', true)
        .order('created_at', { ascending: false });

      if (data && !error) setReports(data);
    }
    fetchReports();
  }, []);

  const blacklistReports = reports.filter((r) => r.status !== 'resolved');
  const paidReports = reports.filter((r) => r.status === 'resolved');

  return (
    <main className="relative max-w-4xl mx-auto p-6 font-sans bg-black min-h-screen text-white text-left overflow-hidden">
      
      {/* Background Neon Glow Effects (No missing image dependency) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
        <div className="w-[600px] h-[600px] bg-red-600 rounded-full blur-[150px]"></div>
      </div>

      <header className="relative z-10 text-center py-10 border-b-4 border-red-800 mb-8">
        <div className="flex justify-center gap-4 mb-6">
          <img src="/1.png" alt="Blacklist Logo" className="h-24 w-auto border-2 border-red-900 shadow-lg" />
          <img src="/2.png" alt="Warning Icon" className="h-24 w-auto border-2 border-red-900 shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
        </div>
        <h1 className="text-5xl font-black mb-4 uppercase italic tracking-tighter text-red-600">WWW.CASINO-NO-PAY.COM</h1>
        <p className="text-xl font-bold text-gray-300 uppercase tracking-widest border-y-2 border-red-900 py-2 inline-block">
          Exposing platforms that refuse to pay & crediting those that do!
        </p>
      </header>

      {/* REPORT FORM SECTION */}
      <section id="report-form" className="relative z-10 bg-zinc-950 p-8 border-4 border-red-900 shadow-[12px_12px_0px_0px_rgba(220,38,38,0.5)] mb-12 text-white rounded-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-red-500">Submit Report</h2>
          <img src="/4.png" alt="Submit Badge" className="h-16 w-auto" />
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
              evidence_url: formData.get('evidence'),
              status: 'pending',
              post_approvals: false
            }]);

          if (error) {
            alert("Submission error: " + error.message);
          } else {
            alert("Report Submitted! It will appear once reviewed.");
            window.location.reload();
          }
        }} className="space-y-6">
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-gray-200">Casino Name / URL *</label>
            <input name="casino_name" required className="w-full p-4 border-2 border-gray-800 bg-black text-white font-bold text-lg rounded focus:border-red-600 focus:outline-none" placeholder="e.g. scamcasino.com" />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-gray-200">Amount Owed ($) *</label>
            <input name="amount" type="number" step="0.01" required className="w-full p-4 border-2 border-gray-800 bg-black text-white font-bold text-lg rounded focus:border-red-600 focus:outline-none" placeholder="0.00" />
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-gray-200">Describe the Issue *</label>
            <textarea name="issue" required className="w-full p-4 border-2 border-gray-800 bg-black text-white font-bold text-lg h-32 rounded focus:border-red-600 focus:outline-none" placeholder="Tell us what happened..."></textarea>
          </div>
          <div>
            <label className="block font-black uppercase text-xl mb-2 text-gray-200">Link to Evidence (Screenshots/Proof)</label>
            <input name="evidence" className="w-full p-4 border-2 border-gray-800 bg-black text-white font-bold text-lg rounded focus:border-red-600 focus:outline-none" placeholder="e.g. imgur.com/your-proof" />
          </div>
          <button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white font-black text-2xl md:text-3xl py-5 border-2 border-red-600 uppercase italic transition shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            SUBMIT TO BLACKLIST 🚩
          </button>
        </form>
      </section>

      {/* SECTION 1: THE BLACKLIST */}
      <section className="relative z-10 my-16">
        <div className="space-y-8">
          <div className="bg-red-950 text-white p-4 border-4 border-red-900 inline-block transform -rotate-1 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-red-500">
              🚩 UNRESOLVED DISPUTES (THE BLACKLIST)
            </h2>
          </div>

          {blacklistReports.length > 0 ? (
            blacklistReports.map((report) => (
              <div key={report.id} className="border-4 border-red-900 bg-zinc-950 shadow-[10px_10px_0px_0px_rgba(220,38,38,0.3)] overflow-hidden rounded-xl">
                <div className="p-6 border-b-2 border-gray-900">
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h3 className="text-3xl font-black uppercase underline decoration-red-600 text-white">{report.casino_name}</h3>
                    <div className="bg-red-600 text-white font-black px-4 py-2 text-xl border border-red-500 rounded">
                      ${report.amount_owed} OWED
                    </div>
                  </div>
                  <p className="text-xl font-bold italic text-gray-300 leading-tight">"{report.issue_description}"</p>
                  
                  {report.evidence_url && (
                    <div className="mt-4">
                      <a 
                        href={report.evidence_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block bg-blue-600 text-white font-black px-4 py-2 border border-blue-400 hover:bg-blue-700 uppercase italic text-sm rounded shadow"
                      >
                        View Evidence / Proof 📄
                      </a>
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="font-black text-xs px-3 py-1 border border-yellow-600 uppercase bg-yellow-950 text-yellow-300 rounded">
                      Status: {report.status || 'UNRESOLVED'}
                    </span>
                  </div>
                </div>
                <div className="bg-black text-white p-6 flex gap-4">
                  <div className="bg-zinc-800 text-gray-300 font-black text-xs px-2 py-1 uppercase rotate-90 h-fit mt-2 rounded">REPLY</div>
                  <div>
                    <h4 className="font-black text-red-500 uppercase mb-2">Official Casino Response:</h4>
                    <p className="text-lg font-bold text-gray-400 italic leading-snug">
                      {report.casino_response || "PENDING INVESTIGATION: No response received yet."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-zinc-800 bg-zinc-950/50 rounded-xl">
              <p className="text-xl font-black text-gray-500 uppercase">No active blacklisted reports.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: THE WALL OF PAY */}
      <section className="relative z-10 my-20">
        <div className="space-y-8">
          <div className="bg-emerald-950 text-white p-4 border-4 border-emerald-900 inline-block transform rotate-1 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-emerald-400">
              ✅ THE WALL OF PAY (HONOR ROLL)
            </h2>
            <p className="font-bold text-sm uppercase tracking-wider text-emerald-200">
              Casinos that honored payouts after disputes were raised
            </p>
          </div>

          {paidReports.length > 0 ? (
            paidReports.map((report) => (
              <div key={report.id} className="border-4 border-emerald-900 bg-zinc-950 shadow-[10px_10px_0px_0px_rgba(16,185,129,0.3)] overflow-hidden rounded-xl">
                <div className="p-6 border-b-2 border-gray-900 bg-emerald-950/20">
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h3 className="text-3xl font-black uppercase underline decoration-emerald-500 text-white">{report.casino_name}</h3>
                    <div className="bg-emerald-600 text-white font-black px-4 py-2 text-xl border border-emerald-500 rounded">
                      ${report.amount_owed} PAID OUT
                    </div>
                  </div>
                  <p className="text-xl font-bold italic text-gray-300 leading-tight">"{report.issue_description}"</p>
                  
                  {report.evidence_url && (
                    <div className="mt-4">
                      <a 
                        href={report.evidence_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block bg-blue-600 text-white font-black px-4 py-2 border border-blue-400 hover:bg-blue-700 uppercase italic text-sm rounded shadow"
                      >
                        View Evidence / Proof 📄
                      </a>
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="font-black text-xs px-3 py-1 border border-emerald-600 uppercase bg-emerald-900 text-emerald-200 rounded">
                      Status: RESOLVED & PAID
                    </span>
                  </div>
                </div>
                <div className="bg-black text-white p-6 flex gap-4">
                  <div className="bg-zinc-800 text-gray-300 font-black text-xs px-2 py-1 uppercase rotate-90 h-fit mt-2 rounded">PROOF</div>
                  <div>
                    <h4 className="font-black text-emerald-400 uppercase mb-2">Resolution Details:</h4>
                    <p className="text-lg font-bold text-gray-400 italic leading-snug">
                      {report.casino_response || "Operator verified payout and resolved player complaint."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-zinc-800 bg-zinc-950/50 rounded-xl">
              <p className="text-xl font-black text-emerald-600/70 uppercase">No resolved payout records yet.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 text-center py-10 opacity-70 border-t border-gray-900 mt-16">
        <img src="/5.png" alt="Footer Logo" className="h-16 w-auto mx-auto mb-4 grayscale opacity-40" />
        <p className="font-bold uppercase tracking-widest text-gray-400 text-sm">© 2024 CASINO-NO-PAY WATCHDOG GROUP</p>
      </footer>
    </main>
  );
}
