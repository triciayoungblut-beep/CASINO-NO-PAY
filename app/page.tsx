
    "use client";
    
    import { useState } from 'react';
    import { supabase } from '../supabaseClient';
    
    const Page = () => {
      const [formData, setFormData] = useState({
        casino_name: '',
        amount_owed: '',
        issue_description: '',
        reporter_email: ''
      });
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
    
        const { error } = await supabase
          .from('reports')
          .insert([
            { 
              casino_name: formData.casino_name, 
              amount_owed: parseFloat(formData.amount_owed), 
              issue_description: formData.issue_description,
              reporter_email: formData.reporter_email,
              status: "pending"
            }
          ]);
    
        setLoading(false);
    
        if (error) {
          setMessage('Error submitting report: ' + error.message);
        } else {
          setMessage('Report submitted successfully! It will appear on the Wall of Shame soon.');
          setFormData({ casino_name: '', amount_owed: '', issue_description: '', reporter_email: '' });
        }
      };
    
      return (
        <div className="flex flex-col min-h-screen bg-black text-white p-8 font-sans">
          <header className="w-full text-center py-6">
            <h1 className="text-5xl md:text-7xl font-bold text-red-600 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
              The Blacklist
            </h1>
            <p className="text-white/80 mt-2">Casinos That Don't Pay</p>
          </header>
    
          <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
            <section className="w-full bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-700 mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">Submit a Report</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="casino_name" className="block text-sm font-medium text-white/90 mb-1">Casino Name:</label>
                  <input
                    type="text"
                    name="casino_name"
                    id="casino_name"
                    value={formData.casino_name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="amount_owed" className="block text-sm font-medium text-white/90 mb-1">Amount Owed (USD):</label>
                  <input
                    type="number"
                    name="amount_owed"
                    id="amount_owed"
                    value={formData.amount_owed}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="issue_description" className="block text-sm font-medium text-white/90 mb-1">Issue Description:</label>
                  <textarea
                    name="issue_description"
                    id="issue_description"
                    rows={4}
                    value={formData.issue_description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="reporter_email" className="block text-sm font-medium text-white/90 mb-1">Your Email (Optional, for updates):</label>
                  <input
                    type="email"
                    name="reporter_email"
                    id="reporter_email"
                    value={formData.reporter_email}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
              {message && <p className={`mt-4 text-center ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
            </section>
    
            <section className="w-full text-center mt-auto pt-10">
              <p className="text-[10px] text-white/70">
                Legal Disclaimer: This website is for informational and reporting purposes only. We are not liable for any financial losses or damages. 
                All reports are user-submitted and we do not verify the authenticity of every claim immediately. 
                Engage with online casinos at your own risk.
              </p>
            </section>
          </main>
        </div>
      );
    };
    
    export default Page;
    
