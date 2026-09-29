import { useState } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('AUDIT');
  const [format, setFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('CURRENT_TERM');
  const [generating, setGenerating] = useState(false);
  const [reportsList, setReportsList] = useState([
    {
      id: 'REP-2026-0901',
      name: 'End-Semester Attendance Compliance Certification',
      type: 'Compliance Audit',
      format: 'PDF',
      date: '2026-09-28',
      size: '2.4 MB',
      status: 'READY',
      downloadUrl: '#',
    },
    {
      id: 'REP-2026-0902',
      name: 'At-Risk Exam Barred Candidate Register (<75%)',
      type: 'Early Warning',
      format: 'CSV',
      date: '2026-09-25',
      size: '480 KB',
      status: 'READY',
      downloadUrl: '#',
    },
    {
      id: 'REP-2026-0899',
      name: 'Faculty Roll Call Completion Monthly Audit',
      type: 'Faculty Audit',
      format: 'PDF',
      date: '2026-09-20',
      size: '1.8 MB',
      status: 'READY',
      downloadUrl: '#',
    },
  ]);

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);

    setTimeout(() => {
      const typeNames = {
        AUDIT: 'Institutional Attendance Compliance Audit',
        AT_RISK: 'At-Risk Student Disqualification Register',
        FACULTY: 'Faculty Roll Call Punctuality & Finalization',
        TRENDS: 'Cross-Department Statistical Digest',
      };

      const newRep = {
        id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        name: typeNames[reportType],
        type: reportType === 'AT_RISK' ? 'Early Warning' : 'Compliance Audit',
        format,
        date: new Date().toISOString().split('T')[0],
        size: format === 'PDF' ? '2.1 MB' : '320 KB',
        status: 'READY',
        downloadUrl: '#',
      };

      setReportsList([newRep, ...reportsList]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar title="Compliance & Reports" />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Institutional Reports & Analytics Engine
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Asynchronous PDF compilation triggered via AWS Lambda and EventBridge pipelines
                </p>
              </div>
            </div>

            {/* Generator Form Card */}
            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-md)' }}>
                <span className="material-symbols-outlined text-primary">cloud_download</span>
                <h3 className="text-headline-sm">Generate New Compliance Document</h3>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', alignItems: 'end' }}>
                <div className="form-group">
                  <label className="form-label">Report Category</label>
                  <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="AUDIT">Institutional Attendance Compliance Audit</option>
                    <option value="AT_RISK">At-Risk Student Disqualification Register (&lt;75%)</option>
                    <option value="FACULTY">Faculty Roll Call Completion Audit</option>
                    <option value="TRENDS">Cross-Department Statistical Digest</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Academic Scope</label>
                  <select className="form-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value="CURRENT_TERM">Current Semester (Spring 2024-25)</option>
                    <option value="PAST_MONTH">Last 30 Days</option>
                    <option value="FULL_YEAR">Full Academic Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Export Format</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className={`btn ${format === 'PDF' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                      onClick={() => setFormat('PDF')}
                    >
                      PDF Document
                    </button>
                    <button
                      type="button"
                      className={`btn ${format === 'CSV' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                      onClick={() => setFormat('CSV')}
                    >
                      CSV Dataset
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={generating}
                    style={{ height: '40px' }}
                  >
                    {generating ? (
                      <span className="spinner" style={{ width: '18px', height: '18px', borderColor: '#ffffff', borderTopColor: 'transparent' }} />
                    ) : (
                      <>
                        <span className="material-symbols-outlined">bolt</span>
                        <span>Dispatch to AWS Lambda</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Generated Reports List */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--color-outline-variant)' }}>
                <h3 className="text-headline-sm" style={{ fontSize: '16px' }}>Generated Audit Documents</h3>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Document ID</th>
                      <th>Report Name</th>
                      <th>Category</th>
                      <th>Format</th>
                      <th>Date Compiled</th>
                      <th>File Size</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsList.map((r) => (
                      <tr key={r.id}>
                        <td className="td-mono">{r.id}</td>
                        <td className="td-name">{r.name}</td>
                        <td>{r.type}</td>
                        <td>
                          <span className="class-card__batch-chip text-label-caps" style={{ backgroundColor: r.format === 'PDF' ? '#fee2e2' : '#e0e7ff', color: r.format === 'PDF' ? '#991b1b' : '#3730a3' }}>
                            {r.format}
                          </span>
                        </td>
                        <td className="td-mono">{r.date}</td>
                        <td className="td-mono">{r.size}</td>
                        <td>
                          <span className="badge badge--present">READY</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Downloading ${r.name} (${r.format})...`)}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>download</span>
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
