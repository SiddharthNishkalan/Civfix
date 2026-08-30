import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Issue, User, RewardItem, PanchayatRanking, DepartmentMetric, AnomalyAlert, IssueStatus, IssueCategory, IssuePriority } from '../../src/types/index';
import { INITIAL_USERS, INITIAL_ISSUES, REWARDS_CATALOG, PANCHAYAT_LEADERBOARD, DEPARTMENT_METRICS, ANOMALY_ALERTS } from '../../src/data/mockData';

export interface DatabaseSchema {
  users: Record<string, User>;
  issues: Issue[];
  rewards: RewardItem[];
  leaderboard: PanchayatRanking[];
  departmentMetrics: DepartmentMetric[];
  anomalies: AnomalyAlert[];
}

class PersistentStore {
  private data: DatabaseSchema;
  private filePath: string | null = null;

  constructor() {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      this.filePath = path.join(__dirname, 'data.json');
    } catch {
      this.filePath = null;
    }

    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    if (this.filePath && fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.warn('Could not read existing data.json, initializing with default dataset', err);
      }
    }

    return {
      users: { ...INITIAL_USERS },
      issues: [...INITIAL_ISSUES],
      rewards: [...REWARDS_CATALOG],
      leaderboard: [...PANCHAYAT_LEADERBOARD],
      departmentMetrics: [...DEPARTMENT_METRICS],
      anomalies: [...ANOMALY_ALERTS]
    };
  }

  private save(): void {
    if (!this.filePath) return;
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      // In serverless / read-only filesystem environments, file writes might fail silently,
      // and in-memory state will be preserved for the request lifecycle.
      console.warn('Notice: Store writing to disk skipped (read-only filesystem):', (err as Error).message);
    }
  }

  // --- ISSUES METHODS ---
  public getIssues(filters?: { status?: string; category?: string; priority?: string; ward?: string; search?: string }): Issue[] {
    let result = [...this.data.issues];

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(i => i.status === filters.status);
      }
      if (filters.category && filters.category !== 'all') {
        result = result.filter(i => i.category === filters.category);
      }
      if (filters.priority && filters.priority !== 'all') {
        result = result.filter(i => i.priority === filters.priority);
      }
      if (filters.ward && filters.ward !== 'all') {
        result = result.filter(i => i.ward.toLowerCase().includes(filters.ward!.toLowerCase()));
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(i => 
          i.title.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.id.toLowerCase().includes(query) ||
          i.landmark.toLowerCase().includes(query)
        );
      }
    }

    return result;
  }

  public getIssueById(id: string): Issue | undefined {
    return this.data.issues.find(i => i.id.toUpperCase() === id.toUpperCase());
  }

  public createIssue(payload: Partial<Issue>): Issue {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CVX-2026-${randomNum}`;

    const newIssue: Issue = {
      id: newId,
      title: payload.title || 'Reported Village Infrastructure Issue',
      description: payload.description || 'Community reported issue requiring inspection.',
      category: payload.category || 'water',
      subCategory: payload.subCategory || 'General Maintenance',
      status: 'reported',
      priority: payload.priority || 'medium',
      reportedBy: payload.reportedBy || 'Selvi Murugan',
      reportedByPhone: payload.reportedByPhone || '+91 98401 23456',
      reportedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      state: payload.state || 'Tamil Nadu',
      district: payload.district || 'Thoothukudi',
      block: payload.block || 'Kovilpatti Block',
      panchayat: payload.panchayat || 'Kovilpatti Village Panchayat',
      ward: payload.ward || 'Ward 4 (West Street / Melur)',
      landmark: payload.landmark || 'Near Panchayat Office',
      coordinates: payload.coordinates || [9.1726, 77.8681],
      photoBefore: payload.photoBefore || '/images/handpump_before.jpg',
      photoAfter: payload.photoAfter,
      voiceTranscript: payload.voiceTranscript,
      aiSeverityScore: payload.aiSeverityScore || 85,
      aiDepartment: payload.aiDepartment || 'TWAD Board & Rural Development Mission',
      assignedOfficer: payload.assignedOfficer || {
        id: 'OFF-4410',
        name: 'Er. Senthil Kumar',
        role: 'Assistant Engineer (Rural Water)',
        department: 'TWAD Board Division',
        phone: '+91 98422 34567',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        etaHours: 4
      },
      timeline: [
        {
          status: 'reported',
          title: 'Grievance Registered',
          description: payload.voiceTranscript 
            ? `Voice grievance processed: "${payload.voiceTranscript}"`
            : 'Issue logged with camera evidence and geotag.',
          timestamp: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          by: payload.reportedBy || 'CiviFix Citizen'
        }
      ],
      upvotes: 1,
      upvotedBy: ['USR-7821'],
      comments: [],
      estimatedSlaDays: payload.estimatedSlaDays || 2,
      costEstimate: payload.costEstimate || '₹4,500'
    };

    this.data.issues.unshift(newIssue);
    this.save();
    return newIssue;
  }

  public updateIssueStatus(
    id: string, 
    status: IssueStatus, 
    notes?: string, 
    photoAfterUrl?: string, 
    materialsUsed?: string[]
  ): Issue | undefined {
    const issue = this.getIssueById(id);
    if (!issue) return undefined;

    issue.status = status;
    if (photoAfterUrl) issue.photoAfter = photoAfterUrl;
    if (materialsUsed) issue.materialUsed = materialsUsed;

    const titles: Record<IssueStatus, string> = {
      reported: 'Grievance Registered',
      verified: 'Panchayat Verification Completed',
      assigned: 'Taskforce Dispatched',
      in_progress: 'Ground Resolution Underway',
      resolved: 'Work Completed & Certified',
      closed: 'Grievance Verified & Closed'
    };

    issue.timeline.push({
      status,
      title: titles[status] || 'Status Updated',
      description: notes || `Field progress updated to ${status}.`,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      by: 'Er. Senthil Kumar (Assistant Engineer)',
      photoUrl: photoAfterUrl
    });

    this.save();
    return issue;
  }

  public upvoteIssue(id: string, userId: string = 'USR-7821'): { issue?: Issue; upvoted: boolean } {
    const issue = this.getIssueById(id);
    if (!issue) return { upvoted: false };

    if (!issue.upvotedBy) issue.upvotedBy = [];

    const hasUpvoted = issue.upvotedBy.includes(userId);
    if (hasUpvoted) {
      issue.upvotedBy = issue.upvotedBy.filter(uid => uid !== userId);
      issue.upvotes = Math.max(0, issue.upvotes - 1);
      this.save();
      return { issue, upvoted: false };
    } else {
      issue.upvotedBy.push(userId);
      issue.upvotes += 1;
      this.save();
      return { issue, upvoted: true };
    }
  }

  public addComment(id: string, author: string, role: string, text: string): Issue | undefined {
    const issue = this.getIssueById(id);
    if (!issue) return undefined;

    const newComment = {
      id: 'c-' + Date.now(),
      author,
      role,
      text,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    if (!issue.comments) issue.comments = [];
    issue.comments.push(newComment);
    this.save();
    return issue;
  }

  // --- USER & AUTH METHODS ---
  public getUsers(): Record<string, User> {
    return this.data.users;
  }

  public getUser(role: string): User | undefined {
    return this.data.users[role];
  }

  public registerUser(payload: Partial<User>): User {
    const id = 'USR-' + Math.floor(1000 + Math.random() * 9000);
    const newUser: User = {
      id,
      name: payload.name || 'New Citizen',
      phone: payload.phone || '+91 98401 00000',
      role: 'citizen',
      panchayat: payload.panchayat || 'Kovilpatti Village Panchayat',
      block: payload.block || 'Kovilpatti Block',
      district: payload.district || 'Thoothukudi',
      state: payload.state || 'Tamil Nadu',
      ward: payload.ward || 'Ward 4',
      civicPoints: 100,
      level: 'Gram Panchayat Citizen Champion - Tier 1',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      language: payload.language || 'en',
      badges: []
    };

    this.data.users[newUser.id] = newUser;
    this.save();
    return newUser;
  }

  public updateUserPoints(role: string, delta: number): User | undefined {
    const user = this.data.users[role];
    if (!user) return undefined;

    user.civicPoints = Math.max(0, user.civicPoints + delta);
    this.save();
    return user;
  }

  // --- REWARDS METHODS ---
  public getRewards(): RewardItem[] {
    return this.data.rewards;
  }

  public redeemReward(rewardId: string, role: string = 'citizen'): { success: boolean; reward?: RewardItem; user?: User; error?: string } {
    const reward = this.data.rewards.find(r => r.id === rewardId);
    const user = this.data.users[role];

    if (!reward) return { success: false, error: 'Reward not found' };
    if (!user) return { success: false, error: 'User not found' };

    if (user.civicPoints < reward.costPoints) {
      return { success: false, error: `Insufficient civic points. Required: ${reward.costPoints}, Available: ${user.civicPoints}` };
    }

    user.civicPoints -= reward.costPoints;
    this.save();
    return { success: true, reward, user };
  }

  // --- ANALYTICS METHODS ---
  public getAnalytics() {
    const totalIssues = this.data.issues.length;
    const resolvedIssues = this.data.issues.filter(i => i.status === 'resolved' || i.status === 'closed').length;
    const inProgressIssues = this.data.issues.filter(i => i.status === 'in_progress').length;
    const pendingIssues = this.data.issues.filter(i => i.status === 'reported' || i.status === 'verified').length;
    const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

    return {
      overview: {
        totalReported: totalIssues,
        resolvedCount: resolvedIssues,
        inProgressCount: inProgressIssues,
        pendingCount: pendingIssues,
        resolutionRate: `${resolutionRate}%`,
        avgResolutionHours: '26.4h',
        slaComplianceRate: '94.2%',
        totalBudgetSanctioned: '₹77.1 Lakhs'
      },
      departmentMetrics: this.data.departmentMetrics,
      leaderboard: this.data.leaderboard,
      anomalies: this.data.anomalies
    };
  }
}

export const db = new PersistentStore();
