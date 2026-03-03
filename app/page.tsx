"use client";
    
    import { useState } from "react";
   import { supabase } from '../supabaseClient';

export default async function Home() {
  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans bg-white min-h-screen">
      <header className="text-center py-10 border-b-4 border-black">
        <h1 className="text-5xl font-black mb-4">WWW.CASINO-NO-PAY.COM</h1>
        <p className="text-xl font-bold text-red-600 uppercase tracking-widest">
          Reporting platforms that don't honor wins!
        </p>
        
        {/* BIG RED JUMP BUTTON */}
        <div className="mt-8">
          <a href="#report-form" className="bg-red-600 hover:bg-red-700 text-white text-2xl font-black py-5 px-10 rounded-full shadow-2xl inline-block transform transition hover:scale-105 border-4 border-black no-underline">
            🚩 REPORT A CASINO NOW
          </a>
        </div>
      </header>

      {/* THE BLACKLIST THREADS */}
      <section className="my-12">
        <h2 className="text-3xl font-black mb-6 bg-black text-white inline-block px-4 py-2 uppercase">The Blacklist</h2>
        <div className="space-y-6">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* User Complaint Section */}
                <div className="bg-red-50 p-6 border-b-2 border-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold uppercase">{report.casino_name}</h3>
                    <span className="bg-black text-white font-bold px-3 py-1 text-lg">
                      ${report.amount} OWED
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{report.issue}</p>
                  <div className="mt-3">
                    <span className={`font-black text-sm px-3 py-1 border-2 border-black ${report.is_resolved ? 'bg-green-400 text-black' : 'bg-yellow-400 text-black'}`}>
                      STATUS: {report.is_resolved ? 'RESOLVED' : 'UNRESOLVED'}
                    </span>
                  </div>
                </div>
                
                {/* Casino Response Section */}
                <div className="bg-gray-100 p-6">
                  <h4 className="font-black text-sm uppercase mb-2 tracking-tighter text-gray-500 italic">Official Casino Response:</h4>
                  <p className="text-lg italic text-gray-700">
                    {report.casino_response || "⚠️ This casino has not responded to this claim yet."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-300">
              <p className="text-xl italic text-gray-500">No reports found in the database yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* REPORT FORM WITH ID */}
      <section id="report-form" className="bg-black text-white p-8 my-12">
        <h2 className="text-3xl font-black mb-6 uppercase">Submit a Report</h2>
        {/* Note: Ensure your form component or HTML is placed here */}
        <p className="text-gray-400 text-sm italic">Submitting a report will list the platform on our public database.</p>
      </section>
    </main>
  );
}}
    
