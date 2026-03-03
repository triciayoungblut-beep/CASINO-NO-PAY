"use client";
    
    import { useState } from "react";
    import { supabase } from "../supabaseClient";
    
    export default function Home() {
      const [formData, setFormData] = useState({
        casinoName: "",
        issue: "",
        amount: "",
      });
      const [status, setStatus] = useState("");
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Submitting...");
        
        const { error } = await supabase
          .from("reports")
          .insert([{
            casino_name: formData.casinoName,
            issue_description: formData.issue,
            amount_owed: parseFloat(formData.amount),
            status: "pending"
          }]);
    
        if (error) {
          setStatus("Error: " + error.message);
        } else {
          setStatus("Report submitted successfully to THE BLACKLIST.");
          setFormData({ casinoName: "", issue: "", amount: "" });"use client";
    
    import { useState } from "react";
    import { supabase } from "../supabaseClient";
    
    export default function Home() {
      const [formData, setFormData] = useState({
        casinoName: "",
        issue: "",
        amount: "",
      });
      const [status, setStatus] = useState("");
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Submitting...");
        
        const { error } = await supabase
          .from("reports")
          .insert([{
            casino_name: formData.casinoName,
            issue_description: formData.issue,
            amount_owed: parseFloat(formData.amount),
            status: "pending"
          }]);
    
        if (error) {
          setStatus("Error: " + error.message);
        } else {
          setStatus("Report submitted successfully to THE BLACKLIST.");
          setFormData({ casinoName: "", issue: "", amount: "" });
        }
      };
    
      return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white pb-20">
          {/* Hero Section */}
          <div className="bg-red-700 py-12 border-b-8 border-black text-center px-4">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-2xl italic">
              WWW.CASINO-NO-PAY.COM
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-tight">
              THIS IS A WEBSITE FOR REPORTING GAME PLATFORMS THAT MAKE PROMISES THEY DONT KEEP AND DONT HONOR WINS!
            </p>
          </div>
    
          {/* Canva Graphics Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-12 px-4 max-w-6xl mx-auto">
            <div className="border-4 border-red-600 shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] overflow-hidden bg-zinc-900">
              <img src="/1.png" alt="Blacklist Info" className="w-full max-w-sm h-auto block grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="border-4 border-red-600 shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] overflow-hidden bg-zinc-900">
              <img src="/2.png" alt="Blacklist Info" className="w-full max-w-sm h-auto block grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
    
          {/* The Blacklist Header */}
          <div className="text-center mb-12">
            <h2 className="text-7xl md:text-9xl font-black text-red-600 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
              THE BLACKLIST
            </h2>
          </div>
          
          {/* The Form */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-zinc-900 border-4 border-red-600 p-8 rounded-none shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] text-left">
              <h3 className="text-2xl font-bold mb-6 text-white uppercase border-b-2 border-red-600 pb-2 inline-block">
                Submit a Report
              </h3>
              <form onSubmit={handleSubmit} className="space-x-0 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Casino/Platform Name</label>
                  <input
                    required
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.casinoName}
                    onChange={(e) => setFormData({...formData, casinoName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Total Amount Owed ($)</label>
                  <input
                    required
                    type="number"
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Describe the Issue</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                >
                  Add to Blacklist
                </button>
                {status && <p className="text-center font-bold text-red-500 mt-4 animate-pulse">{status}</p>}
              </form>
            </div>
          </div>
    
          {/* Legal Footer */}
          <footer className="bg-zinc-950 py-12 px-6 border-t border-zinc-800 mt-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] uppercase leading-relaxed text-zinc-500 text-center md:text-left">
              <p>"The information on this website is provided for general informational and educational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding accuracy, adequacy, validity, reliability, availability, or completeness."</p>
              <p>"This platform displays reports submitted by third-party users. WWW.CASINO-NO-PAY.COM does not verify the truthfulness of individual reports and is not responsible for the content, opinions, or claims expressed by users. Platforms are generally not liable for content posted by users."</p>
              <p>"Reviews and reports on this site represent the opinions of the reporters and constitute fair comment and protected speech."</p>
            </div>
            <div className="text-center mt-8 text-[12px] font-bold text-zinc-700">
              © {new Date().getFullYear()} WWW.CASINO-NO-PAY.COM | ALL RIGHTS RESERVED
            </div>
          </footer>
        </main>
      );
    }
    
        }
      };
    
      return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
          {/* Hero Section */}
          <div className="bg-red-700 py-12 border-b-8 border-black text-center px-4">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-2xl italic">
              WWW.CASINO-NO-PAY.COM
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-tight">
              THIS IS A WEBSITE FOR REPORTING GAME PLATFORMS THAT MAKE PROMISES THEY DONT KEEP AND DONT HONOR WINS!
            </p>
          </div>
    
          {/* The Blacklist Section */}
          <div className="py-16 px-4 max-w-4xl mx-auto text-center">
            <h2 className="text-7xl md:text-9xl font-black text-red-600 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] mb-8">
              THE BLACKLIST
            </h2>
            
            {/* The Form */}
            <div className="bg-zinc-900 border-4 border-red-600 p-8 rounded-none shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] text-left">
              <h3 className="text-2xl font-bold mb-6 text-white uppercase border-b-2 border-red-600 pb-2 inline-block">
                Submit a Report
              </h3>
              <form onSubmit={handleSubmit} className="space-x-0 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Casino/Platform Name</label>
                  <input
                    required
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.casinoName}
                    onChange={(e) => setFormData({...formData, casinoName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Total Amount Owed ($)</label>
                  <input
                    required
                    type="number"
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Describe the Issue</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-black border-2 border-zinc-700 p-3 focus:border-red-600 outline-none text-white transition-colors"
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                >
                  Add to Blacklist
                </button>
                {status && <p className="text-center font-bold text-red-500 mt-4 animate-pulse">{status}</p>}
              </form>
            </div>
          </div>
    
          {/* Legal Footer */}
          <footer className="bg-zinc-950 py-12 px-6 border-t border-zinc-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] uppercase leading-relaxed text-zinc-500 text-center md:text-left">
              <p>"The information on this website is provided for general informational and educational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding accuracy, adequacy, validity, reliability, availability, or completeness."</p>
              <p>"This platform displays reports submitted by third-party users. WWW.CASINO-NO-PAY.COM does not verify the truthfulness of individual reports and is not responsible for the content, opinions, or claims expressed by users. Platforms are generally not liable for content posted by users."</p>
              <p>"Reviews and reports on this site represent the opinions of the reporters and constitute fair comment and protected speech."</p>
            </div>
            <div className="text-center mt-8 text-[12px] font-bold text-zinc-700">
              © {new Date().getFullYear()} WWW.CASINO-NO-PAY.COM | ALL RIGHTS RESERVED
            </div>
          </footer>
        </main>
      );
    }
    
