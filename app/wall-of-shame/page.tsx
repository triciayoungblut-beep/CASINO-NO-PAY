import { supabase } from '../../supabaseClient';

export default async function WallOfShame() {
  const { data: reports, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <div className="p-10 text-red-600">Error loading reports. Check database connection.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-red-700 mb-2 uppercase tracking-wider">Casino Wall of Shame</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
          A community-driven blacklist of online casinos reported for non-payment, unjust account closures, and fraudulent terms.
        </p>
      </header>
      
      <div className="grid gap-6">
        {reports?.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-inner border border-gray-200">
            <p className="text-gray-500 text-xl font-semibold italic">No reports found yet. The database is currently clean.</p>
          </div>
        ) : (
          reports?.map((report) => (
            <div key={report.id} className="border-l-8 border-red-600 rounded-r-xl p-6 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{report.casino_name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      {report.status || 'UNRESOLVED'}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">ID: {report.id}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-right min-w-[150px]">
                  <p className="text-xs uppercase font-bold text-gray-500">Reported Debt</p>
                  <p className="text-2xl font-black text-red-600">${report.amount_owed?.toLocaleString() || '0'}</p>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm font-bold text-gray-800 uppercase mb-1">Incident Detail:</p>
                <p className="text-gray-700 leading-relaxed italic bg-gray-50 p-3 rounded-md border-l-2 border-gray-300">
                  "{report.issue_description}"
                </p>
              </div>
              <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                <span>Verification Status: <span className="text-orange-600 font-bold uppercase">Pending Community Review</span></span>
                <span>Reported: {new Date(report.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <footer className="mt-16 text-center border-t border-gray-200 pt-8 pb-12">
        <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition-colors">
          ← Back to Report Form
        </a>
        <p className="mt-6 text-xs text-gray-400 max-w-md mx-auto">
          Disclaimer: This list is based on user-submitted reports. CASINO-NO-PAY does not guarantee the absolute accuracy of every claim but provides a platform for player transparency.
        </p>
      </footer>
    </div>
  );
}
