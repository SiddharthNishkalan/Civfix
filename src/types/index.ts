export type UserRole = 'citizen' | 'officer' | 'admin' | 'sarpanch';

export type IssueCategory = 
  | 'water' 
  | 'roads' 
  | 'lighting' 
  | 'waste' 
  | 'electricity' 
  | 'health' 
  | 'education';

export type IssueStatus = 
  | 'reported' 
  | 'verified' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'closed';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface AssignedOfficer {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  avatar: string;
  etaHours: number;
}

export interface TimelineEvent {
  status: IssueStatus;
  title: string;
  description: string;
  timestamp: string;
  by: string;
  photoUrl?: string;
}

export interface IssueComment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  subCategory: string;
  status: IssueStatus;
  priority: IssuePriority;
  reportedBy: string;
  reportedByPhone: string;
  reportedAt: string;
  state: string;
  district: string;
  block: string;
  panchayat: string;
  ward: string;
  landmark: string;
  coordinates: [number, number];
  photoBefore: string;
  photoAfter?: string;
  voiceTranscript?: string;
  aiSeverityScore: number;
  aiDepartment: string;
  assignedOfficer?: AssignedOfficer;
  timeline: TimelineEvent[];
  upvotes: number;
  upvotedBy: string[];
  comments: IssueComment[];
  estimatedSlaDays: number;
  costEstimate?: string;
  materialUsed?: string[];
  verifiedBySarpanch?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  panchayat: string;
  block: string;
  district: string;
  state: string;
  ward: string;
  civicPoints: number;
  level: string;
  avatar: string;
  badges: Badge[];
  language: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  costPoints: number;
  category: 'energy' | 'farming' | 'transport' | 'civic' | 'health';
  icon: string;
  sponsor: string;
  code?: string;
  claimed?: boolean;
}

export interface PanchayatRanking {
  rank: number;
  name: string;
  block: string;
  district: string;
  cleanlinessScore: number;
  resolutionRate: number;
  totalResolved: number;
  topBadge: string;
}

export interface DepartmentMetric {
  department: string;
  totalReported: number;
  resolved: number;
  inProgress: number;
  avgResolutionHours: number;
  slaComplianceRate: number;
  budgetUtilized: string;
  color: string;
}

export interface AnomalyAlert {
  id: string;
  type: 'outbreak_risk' | 'sla_breach' | 'infrastructure_failure' | 'budget_anomaly';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  location: string;
  reportedCount: number;
  timestamp: string;
}
