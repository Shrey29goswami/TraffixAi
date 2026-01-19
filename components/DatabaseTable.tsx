
import React, { useState } from 'react';
import { MOCK_DATABASE } from '../constants';
import { VehicleRecord } from '../types';

const DatabaseTable: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [search, setSearch] = useState('');

  const filtered = MOCK_DATABASE.filter(v => v.plateNumber.toLowerCase().includes(search.toLowerCase()) || v.ownerName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="font-black text-2xl text-slate-900 tracking-tight">Vehicle Registry</h2>
            <p className="text-slate-400 text-sm">Unified database for all registered municipal vehicles.</p>
          </div>
          <div className="relative w-full md:w-72">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search by plate or owner..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Vehicle Identification</th>
                <th className="px-8 py-4">Owner Profile</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Total Fines</th>
                <th className="px-8 py-4 text-right">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((v, idx) => (
                <tr key={idx} className="hover:bg-yellow-50/30 transition-all cursor-pointer group" onClick={() => setSelectedVehicle(v)}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-900 px-3 py-1.5 rounded-lg text-white font-mono font-bold text-sm border-2 border-slate-700">
                        {v.plateNumber}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.vehicleType}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-800 text-sm">{v.ownerName}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{v.email}</p>
                  </td>
                  <td className="px-8 py-5">
                    {v.history.length === 0 ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase">Clean Record</span>
                    ) : (
                      <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase">{v.history.length} Violations</span>
                    )}
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-600">
                    ${v.history.reduce((acc, f) => acc + f.amount, 0)}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 group-hover:text-yellow-600 transition-colors">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4" onClick={() => setSelectedVehicle(null)}>
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slide-in" onClick={e => e.stopPropagation()}>
            <div className="bg-slate-900 p-8 text-white relative">
              <button onClick={() => setSelectedVehicle(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="flex items-end gap-6">
                <div className="bg-yellow-400 p-4 rounded-3xl text-black font-mono text-3xl font-black">
                  {selectedVehicle.plateNumber}
                </div>
                <div>
                  <h3 className="text-2xl font-black">{selectedVehicle.ownerName}</h3>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Registered {selectedVehicle.registrationDate}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Violation Forensic History</h4>
              
              {selectedVehicle.history.length === 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 p-12 rounded-3xl text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i className="fas fa-shield-check"></i>
                  </div>
                  <p className="text-emerald-800 font-bold">Absolute Clear Record</p>
                  <p className="text-emerald-600 text-sm">This vehicle has no pending or past citations on the Traffix network.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedVehicle.history.map((fine) => (
                    <div key={fine.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                          <i className="fas fa-file-invoice"></i>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{fine.type}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{fine.date} • {fine.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-900">${fine.amount}</p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${fine.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {fine.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between">
                 <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
                   Contact Owner
                 </button>
                 <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 hover:text-black transition-all">
                   Generate Full PDF Report
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseTable;
