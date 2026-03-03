"use client";

import { supabase } from '../supabaseClient';

export default async function Home() {
  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans bg-white min-h-screen text-black">
      <header className="text-center py-10 border-b-4 border-black mb-8">
        <div className="flex justify-center gap-4 mb-6">
           <img src="/1.png" alt="Blacklist" className="h-24 w-auto border-2 border-black shadow-md" />
           <img src="/2.png" alt="Warning" className="h-24 w-auto border-2 border-black shadow-md" />
        </div>
        
        <h1 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">WWW.CASINO-NO-PAY.COM</h1>
        <p className="text-xl font-bold text-red-600 uppercase tracking-widest border-y-2 border-red-600 py-2 inline-block">
          Exposing platforms that refuse to pay!
        </p>
        
        <div className="mt-10">
          <a href="#report-form" className="bg-red-600 hover:bg-red-700 text-white text-3xl font-black py-6 px-12 rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] inline-block transform transition hover:scale-105 border-4 border-black no-underline uppercase italic">
            🚩 REPORT A CASINO NOW
          </a>
        </div>
      </header>

      <section className="my-16 text-left">
        <div className="flex items-center gap-4 mb-8">
          <img src="/3.png" alt="Alert" className="h-12 w-auto" />
          <h2 className="text-4xl font-black bg-black text-white px-6 py-2 uppercase transform -rotate-1">The Blacklist</h2>
        </div>

        <div className="space-y-8">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="border-4 border-black rounded-none shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
                <div className="bg-white p-6 border-b-4 border-black">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-black uppercase underline decoration-red-600">{report.casino_name}</h3>
                    <div className="bg-red-600 text-white font-black px-4 py-2 text-xl border-2 border-black">
                      ${report.amount} OWED
                    </div>
                  </div>
                  <p className="text-xl font-bold leading-tight mb-4 italic text-gray-900">"{report.issue_description || report.issue}"</p>
                  <div>
                    <span className={`font-black text-sm px-4 py-2 border-2 border-black uppercase tracking-tighter ${report.is_resolved ? 'bg-green-400' : 'bg-yellow-400'}`}>
                      Status: {report.is_resolved ? 'RESOLVED' : 'UNRESOLVED'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 flex gap-4 items-start">
                   <div className="bg-white text-black font-black text-xs px-2 py-1 uppercase rotate-90 mt-4">REPLY</div>
                   <div>
                      <h4 className="font-black text-red-500 uppercase mb-2 tracking-widest">Official Casino Response:</h4>
                      <p className="text-lg font-bold text-gray-300 italic">
                        {report.casino_response || "PENDING INVESTIGATION: No response received from operator yet."}
                      </p>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border-4 border-dashed border-gray-400">
              <p className="text-2xl font-black text-gray-400 uppercase">Searching database for reports...</p>
            </div>
          )}
        </div>
      </section>

      <section id="report-form" className="bg-red-600 text-white p-10 my-20 border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-5xl font-black uppercase italic underline">Submit Report</h2>
           <img src="/4.png" alt="Submit" className="h-20 w-auto invert" />
        </div>
        <p className="text-xl font-bold mb-8 uppercase bg-black text-white inline-block px-4">Help the community by identifying non-paying sites.</p>
        {/* Your form stays active below this */}
      </section>

      <footer className="text-center py-10 opacity-70">
         <img src="/5.png" alt="Footer Logo" className="h-16 w-auto mx-auto mb-4 grayscale" />
         <p className="font-bold uppercase tracking-widest">© 2024 CASINO-NO-PAY WATCHDOG GROUP</p>
      </footer>
    </main>
  );
}          )}
        </div>
      </section>

      <section id="report-form" className="bg-red-600 text-white p-10 my-20 border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-5xl font-black uppercase italic underline">Submit Report</h2>
           <img src="/4.png" alt="Submit" className="h-20 w-auto invert" />
        </div>
        <p className="text-xl font-bold mb-8 uppercase bg-black text-white inline-block px-4">Help the community by identifying non-paying sites.</p>
        {/* Form will go here */}
      </section>

      <footer className="text-center py-10 opacity-70">
         <img src="/5.png" alt="Footer Logo" className="h-16 w-auto mx-auto mb-4 grayscale" />
         <p className="font-bold uppercase tracking-widest">© 2024 CASINO-NO-PAY WATCHDOG GROUP</p>
      </footer>
    </main>
  );
}
