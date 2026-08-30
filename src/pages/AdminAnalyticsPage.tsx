import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENT_METRICS, ANOMALY_ALERTS } from '../data/mockData';
import { MapView } from '../components/common/MapView';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Download, 
  Filter, 
  FileText, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const AdminAnalyticsPage: React.FC = () => {
  const { issues, showNotification } = useApp();
  const [selectedBlock, setSelectedBlock] = useState<string>('all');

  const barData = {
    labels: DEPARTMENT_METRICS.map((d) => d.department.split(' ')[0]),
    datasets: [
      {
        label: 'Resolved Issues',
        data: DEPARTMENT_METRICS.map((d) => d.resolved),
        backgroundColor: '#00452d',
        borderRadius: 8,
      },
      {
        label: 'In-Progress Work',
        data: DEPARTMENT_METRICS.map((d) => d.inProgress),
        backgroundColor: '#efc052',
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Water (JJM)', 'Roads (PWD)', 'Power (Discom)', 'Sanitation', 'Health'],
    datasets: [
      {
        data: [342, 218, 184, 165, 95],
        backgroundColor: ['#00452d', '#3c6938', '#efc052', '#1f5d42', '#6a4e00'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "TicketID,Title,Category,Ward,Status,Priority,ReportedBy,SeverityScore\n"
      + issues.map(i => `"${i.id}","${i.title}","${i.category}","${i.ward}","${i.status}","${i.priority}","${i.reportedBy}",${i.aiSeverityScore}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `civifix_district_grievances_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Export Ready', 'District Grievance CSV downloaded successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic-float border border-[#ddece3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-primary text-white">
                District Collector Command Center
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                Thoothukudi District Civic Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              District Civic Analytics & Intelligence
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Live monitoring across 48 Village Panchayats, 5 Blocks, and Line Departments
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-civic hover:bg-[#1f5d42] flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#95d4b1]" />
              <span>Export CSV Report</span>
            </button>
          </div>
        </div>

        {/* High-Level KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Grievances Filed', value: '1,004', icon: Layers, sub: '+12% vs last month', color: 'text-primary' },
            { label: 'Overall Resolution Rate', value: '94.2%', icon: CheckCircle2, sub: 'State Top Quartile', color: 'text-emerald-700' },
            { label: 'Average Resolution SLA', value: '38.4 Hrs', icon: Clock, sub: 'SLA target: 48h', color: 'text-blue-800' },
            { label: 'Gram Fund Disbursed', value: '₹68.2 L', icon: TrendingUp, sub: '98% Audit Approved', color: 'text-amber-800' },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant font-bold">{kpi.label}</span>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-primary">{kpi.value}</div>
                <div className="text-[11px] font-semibold text-emerald-700">{kpi.sub}</div>
              </div>
            );
          })}
        </div>

        {/* AI Anomaly & Early Warning Outbreak Alerts */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#efc052]" />
              <h2 className="text-lg font-bold text-primary">AI Anomaly & Early Outbreak Detection</h2>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
              {ANOMALY_ALERTS.length} Alerts Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ANOMALY_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border-2 space-y-2 ${
                  alert.severity === 'critical'
                    ? 'bg-red-50/70 border-red-200 text-red-900'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white">
                    {alert.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-bold">{alert.timestamp}</span>
                </div>
                <h4 className="text-xs font-bold leading-tight">{alert.title}</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{alert.description}</p>
                <div className="text-[10px] font-semibold text-primary pt-1">
                  📍 {alert.location} ({alert.reportedCount} correlated reports)
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2-Column: Department Scorecard + Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Charts (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#ddece3] shadow-civic space-y-6">
            <div>
              <h3 className="text-base font-bold text-primary">Line Department Resolution vs Backlog</h3>
              <p className="text-xs text-on-surface-variant">Live volume by department</p>
            </div>
            <div className="h-64">
              <Bar 
                data={barData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }} 
              />
            </div>

            <div className="pt-4 border-t border-[#ddece3]">
              <h4 className="text-xs font-bold text-primary mb-3">District Issue Categories</h4>
              <div className="h-52">
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'right' } }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Department Performance Table (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#ddece3] shadow-civic space-y-4">
            <h3 className="text-base font-bold text-primary">Department SLA Scorecards</h3>
            <div className="space-y-3">
              {DEPARTMENT_METRICS.map((dept, idx) => (
                <div key={idx} className="p-3.5 bg-surface-container-low rounded-2xl border border-[#ddece3] space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-primary">{dept.department}</span>
                    <span className="text-xs font-extrabold text-emerald-800 bg-[#bcf0b2] px-2 py-0.5 rounded-full">
                      {dept.slaComplianceRate}% SLA
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-on-surface-variant">
                    <div>Resolved: <b className="text-primary">{dept.resolved}</b></div>
                    <div>Active: <b className="text-amber-800">{dept.inProgress}</b></div>
                    <div>Fund: <b className="text-primary">{dept.budgetUtilized}</b></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* District GIS Heatmap */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3c6938]" />
                District GIS Issue Density & Incident Map
              </h3>
              <p className="text-xs text-on-surface-variant">Spatial distribution of all active field tickets across blocks</p>
            </div>
          </div>
          <MapView
            issues={issues}
            height="340px"
          />
        </section>

      </div>
    </div>
  );
};
