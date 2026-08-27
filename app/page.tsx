"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseclient';

export default function Home() {
  const [reports, setReports] = useState([]);
  const [verifiedCasinos, setVerifiedCasinos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch approved reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('reports')
        .select('*')
        .eq('post_approvals', true)
        .order('created_at', { ascending: false });

      if (reportsData && !reportsError) setReports(reportsData);

      // Fetch verified registered casinos
      const { data: casinosData, error: casinosError } = await supabase
        .from('registered_casinos')
        .select('*')
        .eq('is_verified', true);

      if (casinosData && !casinosError) setVerifiedCasinos(casinosData);
    }
    fetchData();
  }, []);

  // Split reports into Blacklist (Unresolved) vs Wall of Pay (Resolved)
  const blacklistReports = reports.filter((r) => r.status !== 'resolved');
  const paidReports = reports.filter((r) => r.status === 'resolved');

  // Multi-platform viral share generator
  const getShareLink = (report, platform) => {
    const text = `⚠️ DISPUTE: Casino ${report.casino_name} refuses to pay $${report.amount_owed}! View the proof and help expose them on Casino-No-Pay:`;
    const url = `https://www.casino-no-pay.com/#dispute-${report.id}`;

    switch (platform) {
      case 'x':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      case 'reddit':
        return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
      default:
        return '#';
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(`https://www.casino-no-pay.com/#dispute-${id}`);
    alert("🔗 Direct link copied! Share this link anywhere to blast them.");
  };

  return (
    <main className="relative max-w-4xl mx-auto p-4 md:p-6 font-sans bg-zinc-950 min-h-screen text-white text-left">
      
      {/* TOP HAZARD WARNING STRIP */}
      <div className="h-6 w-full bg-[linear-gradient(45deg,#facc15_25%,#000_25%,#000_50%,#facc15_50%,#facc15_75%,#000_75%,#000)] bg-[length:40px_40px] border-b-4 border-black mb-6"></div>

      {/* LIVE FEED STATUS TICKER */}
      <div className="flex justify-between items-center mb-8 bg-zinc-900 border-2 border-red-600 px-4 py-2 text-xs md:text-sm font-black uppercase tracking-widest text-red-500">
        <span className="flex items-center">
          <span className="animate-ping h-2.5 w-2.5 rounded-full bg-red-600 inline-block mr-2"></span>
          LIVE DATABASE FEED
        </span>
        <span className="text-zinc-400">STATUS: ACTIVE & TRACKING</span>
      </div>

      <header className="text-center py-6 mb-8">
        <div className="flex justify-center gap-4 mb-6">
          <img src="/1.png" alt="Blacklist Logo" className="h-24 w-auto border-4 border-red-600 shadow-lg" />
          <img src="/2.png" alt="Warning Icon" className="h-24 w-auto border-4 border-yellow-400 shadow-lg" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter text-yellow-400 drop-shadow-[0_4px_12px_rgba(250,204,21,0.3)]">
          WWW.CASINO-NO-PAY.COM
        </h1>
        <p className="text-lg md:text-xl font-bold text-red-500 uppercase tracking-widest border-y-2 border-red-600 py-2 inline-block">
          Exposing platforms that refuse to pay & crediting those that do!
        </p>
        <div className="mt-6">
          <a href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-4 border-4 border-white uppercase italic text-sm tracking-wider transform hover:scale-105 transition-all shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]">
            🏛️ Casino Registration Portal
          </a>
        </div>
      </header>

      {/* REPORT FORM SECTION */}
      <section id="report-form" className="relative z-10 bg-red-600 p-6 md:p-8 border-4 border-white shadow-[12px_12px_0px_0px_rgba(250,204,21,1)] mb-16 text-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic underline decoration-black decoration-4">Submit Report</h2>
          <img src="/4.png" alt="Submit Badge" className="h-20 w-auto invert" />
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
            alert("Report Submitted! It will appear on the site once reviewed.");
            window.location.reload();
          }
        }} className="space-y-6">
          <div>
            <label className="block font-black uppercase text-lg mb-2 text-yellow-300">Casino Name / URL</label>
            <input name="casino_name" required className="w-full p-4 border-4 border-black text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" placeholder="e.g. scamcasino.com" />
          </div>
          <div>
            <label className="block font-black uppercase text-lg mb-2 text-yellow-300">Amount Owed ($)</label>
            <input name="amount" type="number" step="0.01" required className="w-full p-4 border-4 border-black text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" placeholder="0.00" />
          </div>
          <div>
            <label className="block font-black uppercase text-lg mb-2 text-yellow-300">Describe the Issue</label>
            <textarea name="issue" required className="w-full p-4 border-4 border-black text-black font-bold text-lg h-32 focus:outline-none focus:ring-4 focus:ring-yellow-400" placeholder="Describe the failure to pay..."></textarea>
          </div>
          <div>
            <label className="block font-black uppercase text-lg mb-2 text-yellow-300">Link to Evidence (Proof)</label>
            <input name="evidence" className="w-full p-4 border-4 border-black text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" placeholder="e.g. imgur.com/your-screenshot-link" />
          </div>
          <button type="submit" className="w-full bg-black hover:bg-zinc-900 text-yellow-400 font-black text-2xl md:text-3xl py-6 border-4 border-yellow-400 uppercase italic transform transition hover:scale-[1.02] shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            FLAG & SUBMIT TO BLACKLIST 🚩
          </button>
        </form>
      </section>

      {/* SECTION 1: THE BLACKLIST */}
      <section className="relative my-20 min-h-[400px]">
        {/* GRAPHICS LAYER (Behind reports) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-start pt-10 opacity-10 pointer-events-none">
          <div className="flex items-center gap-4 mb-4">
            <img src="/3.png" alt="Alert Graphic" className="h-24 w-auto" />
            <h2 className="text-8xl font-black bg-white text-black px-10 py-4 uppercase transform -rotate-2">
              The Blacklist
            </h2>
          </div>
          <p className="text-5xl font-black text-zinc-600 uppercase italic tracking-widest">Wall of Shame</p>
        </div>

        {/* FOREGROUND REPORTS */}
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-black uppercase italic bg-red-600 text-white p-4 border-4 border-white inline-block transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            🚩 UNRESOLVED DISPUTES
          </h2>
          
          {blacklistReports.length > 0 ? (
            blacklistReports.map((report) => {
              // Check if casino has locked in their rules
              const isCasinoRegistered = verifiedCasinos.some(
                (c) => c.casino_name.toLowerCase().trim() === report.casino_name.toLowerCase().trim()
              );

              return (
                <div id={`dispute-${report.id}`} key={report.id} className="border-4 border-red-600 bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
                  <div className="p-6 border-b-4 border-red-600">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <h3 className="text-3xl font-black uppercase text-yellow-400 underline decoration-red-600 decoration-4">{report.casino_name}</h3>
                      <div className="bg-red-600 text-white font-black px-4 py-2 text-xl border-2 border-white w-fit">
                        ${report.amount_owed} OWED
                      </div>
                    </div>
                    
                    {/* AUDIT SYSTEM STATUS BADGE */}
                    <div className="mb-4">
                      {isCasinoRegistered ? (
                        <span className="font-black text-xs px-3 py-1.5 border-2 border-green-500 bg-green-950 text-green-400 uppercase tracking-wider inline-block">
                          🏛️ REGISTERED PARTNER: Terms Locked & Audited
                        </span>
                      ) : (
                        <span className="font-black text-xs px-3 py-1.5 border-2 border-yellow-500 bg-yellow-950 text-yellow-500 uppercase tracking-wider inline-block animate-pulse">
                          ⚠️ UNREGISTERED OPERATOR: Playing with fire
                        </span>
                      )}
                    </div>

                    <p className="text-xl font-bold italic text-zinc-100 leading-tight mb-4">"{report.issue_description}"</p>
                    
                    {/* DISPUTE ACTIONS (EVIDENCE & VIRAL SHARING) */}
                    <div className="flex flex-wrap gap-4 items-center mt-6 p-4 bg-zinc-950 border-2 border-zinc-800">
                      {report.evidence_url && (
                        <a href={report.evidence_url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-black px-4 py-2 border-2 border-white hover:bg-blue-700 uppercase italic text-xs">
                          View Proof 📄
                        </a>
                      )}
                      
                      {/* SHARING TRAY */}
                      <span className="text-xs font-black uppercase text-zinc-400 mr-2">Blast Dispute:</span>
                      <div className="flex gap-2">
                        <a href={getShareLink(report, 'x')} target="_blank" rel="noreferrer" className="bg-black border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">X</a>
                        <a href={getShareLink(report, 'reddit')} target="_blank" rel="noreferrer" className="bg-orange-600 border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">Reddit</a>
                        <a href={getShareLink(report, 'facebook')} target="_blank" rel="noreferrer" className="bg-blue-800 border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">FB</a>
                        <a href={getShareLink(report, 'whatsapp')} target="_blank" rel="noreferrer" className="bg-green-600 border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">WhatsApp</a>
                        <button onClick={() => copyToClipboard(report.id)} className="bg-zinc-800 border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">Copy Link</button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="font-black text-xs px-3 py-1.5 border-2 border-yellow-400 uppercase bg-zinc-950 text-yellow-400">
                        STATUS: {report.status || 'UNRESOLVED'}
                      </span>
                    </div>
                  </div>
                  
                  {/* CASINO RESPONSE BOX */}
                  <div className="bg-zinc-950 p-6 flex gap-4 border-t-2 border-red-900">
                    <div className="bg-red-600 text-white font-black text-xs px-2 py-1 uppercase rotate-90 h-fit mt-2">REPLY</div>
                    <div>
                      <h4 className="font-black text-red-500 uppercase mb-2 text-sm tracking-wider">Official Operator Response:</h4>
                      <p className="text-lg font-bold text-zinc-300 italic leading-snug">
                        {report.casino_response || "PENDING RESPONSE: Operator has not contested this report."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-zinc-700 bg-zinc-900/50">
              <p className="text-2xl font-black text-zinc-500 uppercase">No active blacklisted reports.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: THE WALL OF PAY */}
      <section className="relative my-24 min-h-[400px]">
        <div className="relative z-10 space-y-8">
          <div className="bg-green-600 text-white p-4 border-4 border-white shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] inline-block transform rotate-1">
            <h2 className="text-4xl font-black uppercase italic text-yellow-300">
              ✅ THE WALL OF PAY (HONOR ROLL)
            </h2>
            <p className="font-bold text-sm uppercase tracking-wider text-green-100">
              Casinos that honored payouts after disputes were raised
            </p>
          </div>

          {paidReports.length > 0 ? (
            paidReports.map((report) => (
              <div key={report.id} className="border-4 border-green-600 bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] overflow-hidden">
                <div className="p-6 border-b-4 border-green-600 bg-zinc-900/80">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <h3 className="text-3xl font-black uppercase text-green-400 underline decoration-white decoration-4">{report.casino_name}</h3>
                    <div className="bg-green-600 text-white font-black px-4 py-2 text-xl border-2 border-white w-fit">
                      ${report.amount_owed} PAID OUT
                    </div>
                  </div>
                  <p className="text-xl font-bold italic text-zinc-100 leading-tight mb-4">"{report.issue_description}"</p>
                  
                  {/* RESOLVED CASE SHARING */}
                  <div className="flex flex-wrap gap-4 items-center mt-6 p-4 bg-zinc-950 border-2 border-zinc-800">
                    <span className="text-xs font-black uppercase text-zinc-400">Share Resolution:</span>
                    <div className="flex gap-2">
                      <a href={getShareLink(report, 'x')} target="_blank" rel="noreferrer" className="bg-black border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">X</a>
                      <a href={getShareLink(report, 'reddit')} target="_blank" rel="noreferrer" className="bg-orange-600 border-2 border-zinc-700 px-2 py-1 text-xs font-bold hover:border-white">Reddit</a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-black text-xs px-3 py-1.5 border-2 border-green-400 uppercase bg-zinc-950 text-green-400">
                      STATUS: RESOLVED & PAID
                    </span>
                  </div>
                </div>

                {/* RESOLUTION PROOF BOX */}
                <div className="bg-zinc-950 p-6 flex gap-4 border-t-2 border-green-900">
                  <div className="bg-green-600 text-white font-black text-xs px-2 py-1 uppercase rotate-90 h-fit mt-2">PROOF</div>
                  <div>
                    <h4 className="font-black text-green-400 uppercase mb-2 text-sm tracking-wider">Resolution Details & Proof:</h4>
                    <p className="text-lg font-bold text-zinc-300 italic leading-snug">
                      {report.casino_response || "Operator verified payout and resolved player complaint."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-zinc-700 bg-zinc-900/50">
              <p className="text-2xl font-black text-zinc-500 uppercase">No resolved payout records yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER HAZARD STRIP */}
      <div className="h-6 w-full bg-[linear-gradient(45deg,#facc15_25%,#000_25%,#000_50%,#facc15_50%,#facc15_75%,#000_75%,#000)] bg-[length:40px_40px] border-t-4 border-black mt-16 mb-4"></div>

      <footer className="text-center py-8 opacity-70">
        <img src="/5.png" alt="Footer Logo" className="h-16 w-auto mx-auto mb-4 grayscale invert" />
        <p className="font-bold uppercase tracking-widest text-zinc-400 text-xs">© 2024 CASINO-NO-PAY WATCHDOG GROUP</p>
      </footer>
    </main>
  );
}

