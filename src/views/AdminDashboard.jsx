import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Leaf, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Eye, 
  Check, 
  X, 
  Search, 
  TrendingUp, 
  Building2, 
  HeartHandshake, 
  Download,
  AlertCircle,
  ExternalLink,
  Award,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BackendService } from '../services/backendService';

export default function AdminDashboard({ 
  currentUser,
  adminStats, 
  verificationQueue, 
  setVerificationQueue, 
  showNotification 
}) {
  const [selectedNgoForAudit, setSelectedNgoForAudit] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const handleApprove = async (ngoId, ngoName) => {
    setVerificationQueue(prev => prev.map(item => {
      if (item.id === ngoId) {
        return { ...item, status: 'Approved' };
      }
      return item;
    }));

    // Persist status change to Supabase database
    await BackendService.updateNgoVerificationStatus(ngoId, 'Approved');

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    showNotification(`FSSAI license verified for ${ngoName}! Status updated.`, 'success');
  };

  const handleReject = async (ngoId, ngoName) => {
    setVerificationQueue(prev => prev.map(item => {
      if (item.id === ngoId) {
        return { ...item, status: 'Rejected' };
      }
      return item;
    }));

    // Persist status change to Supabase database
    await BackendService.updateNgoVerificationStatus(ngoId, 'Rejected');

    showNotification(`Registration rejected for ${ngoName}. Document discrepancy logged.`, 'error');
  };

  const filteredQueue = verificationQueue.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.fssaiLicense.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.operatingZone.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. ADMIN HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-md">
            <ShieldCheck className="w-8 h-8 text-brand-orange" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Statutory Regulatory Oversight
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active FSSAI Live Bridge
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-heading mt-1">
              Platform Oversight & Compliance Administration
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring surplus redistribution protocols, cold-chain safety integrity, and NGO statutory credentials.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 font-medium">Compliance Rate</div>
            <div className="text-xl font-black text-emerald-600 font-heading">{adminStats.safetyComplianceRate}</div>
          </div>
        </div>
      </div>

      {/* 2. GLOBAL PLATFORM METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Platform Waste Saved */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-forest-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Waste Saved
            </span>
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800">
              <Leaf className="w-5 h-5 text-forest-800" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-heading text-forest-900">
              {(adminStats.totalWasteSavedKg).toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{adminStats.totalWasteMonthlyGrowth} month-over-month</span>
          </div>
        </div>

        {/* Total Meals Distributed */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-orange transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Meals Served
            </span>
            <div className="p-2.5 rounded-xl bg-orange-50 text-brand-orange">
              <Award className="w-5 h-5 text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-heading text-forest-900">
              {(adminStats.totalMealsDistributed).toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500">meals</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-brand-orange">
            Across 14 Tier-1 Shelters
          </div>
        </div>

        {/* Active Hotels & NGOs (Active Users) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-800 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Network Users
            </span>
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-heading text-forest-900">
              {adminStats.activeHotels + adminStats.activeNgos}
            </span>
            <span className="text-xs text-slate-500 font-medium">Entities</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-forest-800" /> {adminStats.activeHotels} Hotels
            </span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-brand-orange" /> {adminStats.activeNgos} NGOs
            </span>
          </div>
        </div>

        {/* Total Carbon Abatement */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Carbon Offset (CO₂e)
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-heading text-forest-900">
              {adminStats.totalCo2eAvoidedTons}
            </span>
            <span className="text-sm font-bold text-slate-500">Tons</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-emerald-700">
            BRSR Core Certified Metric
          </div>
        </div>

      </div>

      {/* 3. VERIFICATION QUEUE: DATA TABLE OF PENDING NGO REGISTRATIONS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        {/* Table Header & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-orange" /> Statutory Compliance Pipeline
            </div>
            <h2 className="text-xl font-extrabold font-heading text-forest-900 mt-0.5">
              NGO FSSAI Verification Queue
            </h2>
            <p className="text-xs text-slate-500">
              Mandatory dual-check verification before granting food rescue dispatch authorization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search NGO or FSSAI #..."
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900 w-56 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">NGO Name & Details</th>
                <th className="p-4">FSSAI License #</th>
                <th className="p-4">Fleet Capacity</th>
                <th className="p-4">Operating Zone</th>
                <th className="p-4">Trust Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Verification Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredQueue.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Name & ID */}
                  <td className="p-4">
                    <div className="font-bold text-forest-900 text-sm">{item.name}</div>
                    <div className="text-[11px] text-slate-400">Reg: {item.registrationNo} • Submitted {item.submittedDate}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Contact: {item.contactPerson} ({item.phone})</div>
                  </td>

                  {/* FSSAI */}
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                      {item.fssaiLicense}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Exp: {item.fssaiExpiry}</div>
                  </td>

                  {/* Fleet */}
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{item.fleetCapacityKg}</div>
                    <span className="text-[10px] text-emerald-700 font-medium">Cold-chain certified</span>
                  </td>

                  {/* Operating Zone */}
                  <td className="p-4">
                    <div className="font-medium text-slate-700">{item.operatingZone}</div>
                  </td>

                  {/* Trust Score */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full" 
                          style={{ width: `${item.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-forest-900">{item.trustScore}%</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    {item.status === 'Approved' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Approved
                      </span>
                    ) : item.status === 'Rejected' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                        <XCircle className="w-3 h-3 text-rose-600" /> Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                        Pending FSSAI Audit
                      </span>
                    )}
                  </td>

                  {/* Actions: Approve & Reject */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Document Preview Button */}
                      <button
                        onClick={() => setSelectedNgoForAudit(item)}
                        className="p-2 rounded-xl text-slate-600 hover:text-forest-900 hover:bg-slate-100 transition-colors"
                        title="View FSSAI & Vehicle Audit Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {item.status === 'Pending Approval' ? (
                        <>
                          <button
                            onClick={() => handleApprove(item.id, item.name)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            <Check className="w-3.5 h-3.5 text-brand-orange" />
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => handleReject(item.id, item.name)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            // Reset for testing
                            setVerificationQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'Pending Approval' } : q));
                          }}
                          className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. AUDIT DOSSIER MODAL */}
      {selectedNgoForAudit && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-fadeIn">
            <div className="bg-forest-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h3 className="text-sm font-bold font-heading">FSSAI Accreditation Dossier</h3>
              </div>
              <button
                onClick={() => setSelectedNgoForAudit(null)}
                className="p-1 rounded-lg hover:bg-forest-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-base font-bold text-forest-900">{selectedNgoForAudit.name}</h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">License: {selectedNgoForAudit.fssaiLicense}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Uploaded Verification Files:</span>
                {selectedNgoForAudit.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-forest-800" />
                      <span className="font-medium text-slate-800">{doc.name}</span>
                      <span className="text-slate-400">({doc.size})</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Digitally Signed
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedNgoForAudit(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close Dossier
                </button>
                {selectedNgoForAudit.status === 'Pending Approval' && (
                  <button
                    onClick={() => {
                      handleApprove(selectedNgoForAudit.id, selectedNgoForAudit.name);
                      setSelectedNgoForAudit(null);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-forest-900 text-white hover:bg-forest-950 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-brand-orange" />
                    Approve FSSAI Accreditation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
