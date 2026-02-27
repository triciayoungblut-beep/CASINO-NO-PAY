import React, { useState } from 'react';
    import { supabase } from '../supabaseClient';
    
    const ReportForm = () => {
      const [report, setReport] = useState({ name: '', amount: '', issue: 'Non-payment' });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
          .from('reports')
          .insert([
            { 
              casino_name: report.name, 
              amount_owed: report.amount, 
              issue_description: report.issue 
            },
          ]);
    
        if (error) {
          alert('Error submitting report: ' + error.message);
        } else {
          alert('Report for ' + report.name + ' has been recorded!');
        }
      };
    
      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200 mt-10">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Report a Scam Casino</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Casino Name / URL</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="e.g. MegaScamCasino.com"
                onChange={(e) => setReport({...report, name: e.target.value})}
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount Owed (USD)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md" 
                placeholder="500"
                onChange={(e) => setReport({...report, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Issue Category</label>
              <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => setReport({...report, issue: e.target.value})}
              >
                <option>Non-payment</option>
                <option>Account Unjustly Closed</option>
                <option>Bonus Terms Fraud</option>
                <option>Identity Theft/Doxing</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700">
              Submit Report
            </button>
          </form>
        </div>
      );
    };
    
    export default ReportForm;
