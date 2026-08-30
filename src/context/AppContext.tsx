import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Issue, RewardItem, UserRole, IssueStatus, IssueCategory, IssuePriority } from '../types';
import { INITIAL_USERS, INITIAL_ISSUES, REWARDS_CATALOG, TRANSLATIONS } from '../data/mockData';
import { api } from '../services/api';

export type PageView = 
  | 'welcome'
  | 'citizen_dashboard'
  | 'report_issue'
  | 'report_success'
  | 'track_issue'
  | 'rewards'
  | 'officer_dashboard'
  | 'admin_analytics'
  | 'login'
  | 'register';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  currentView: PageView;
  selectedIssueId: string | null;
  recentlySubmittedIssue: Issue | null;
  issues: Issue[];
  rewards: RewardItem[];
  language: string;
  isOffline: boolean;
  notifications: ToastNotification[];
  switchRole: (role: UserRole) => void;
  setCurrentView: (view: PageView, issueId?: string) => void;
  setLanguage: (lang: string) => void;
  toggleOffline: () => void;
  addIssue: (newIssue: Partial<Issue>) => Issue;
  updateIssueStatus: (
    issueId: string, 
    newStatus: IssueStatus, 
    notes?: string, 
    photoAfter?: string,
    materialList?: string[]
  ) => void;
  upvoteIssue: (issueId: string) => void;
  addComment: (issueId: string, text: string) => void;
  claimReward: (rewardId: string) => boolean;
  showNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ISSUES_STORAGE_KEY = 'civifix_issues_db_v6';
const USER_STORAGE_KEY = 'civifix_user_data_v6';
const REWARDS_STORAGE_KEY = 'civifix_rewards_v6';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS.citizen);
  const [currentView, setCurrentViewInternal] = useState<PageView>('login');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>('CVX-2026-8941');
  const [recentlySubmittedIssue, setRecentlySubmittedIssue] = useState<Issue | null>(null);
  const [language, setLanguageState] = useState<string>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Load issues from LocalStorage or mockData
  const [issues, setIssues] = useState<Issue[]>(() => {
    try {
      const saved = localStorage.getItem(ISSUES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse local storage issues', e);
    }
    return INITIAL_ISSUES;
  });

  // Load rewards
  const [rewards, setRewards] = useState<RewardItem[]>(() => {
    try {
      const saved = localStorage.getItem(REWARDS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse local storage rewards', e);
    }
    return REWARDS_CATALOG;
  });

  // Fetch live issues and rewards from backend API on mount
  useEffect(() => {
    let isMounted = true;
    api.getIssues()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setIssues(res.data);
        }
      })
      .catch((err) => {
        console.log('Backend API syncing in background / offline mode active:', err.message);
      });

    api.getRewards()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setRewards(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error(e);
    }
  }, [issues]);

  useEffect(() => {
    try {
      localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(rewards));
    } catch (e) {
      console.error(e);
    }
  }, [rewards]);

  const showNotification = (
    title: string, 
    message: string, 
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast: ToastNotification = { id, title, message, type, timestamp: new Date() };
    setNotifications((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const user = INITIAL_USERS[role] || INITIAL_USERS.citizen;
    setCurrentUser(user);
    showNotification('Role Switched', `Logged in as ${user.name} (${user.level})`, 'info');

    // Auto navigate to role primary view if on generic dashboard
    if (role === 'officer') {
      setCurrentViewInternal('officer_dashboard');
    } else if (role === 'admin') {
      setCurrentViewInternal('admin_analytics');
    } else if (role === 'citizen' || role === 'sarpanch') {
      setCurrentViewInternal('citizen_dashboard');
    }
  };

  const setCurrentView = (view: PageView, issueId?: string) => {
    if (issueId) {
      setSelectedIssueId(issueId);
    }
    setCurrentViewInternal(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    setCurrentUser((prev) => ({ ...prev, language: lang }));
  };

  const toggleOffline = () => {
    setIsOffline((prev) => {
      const next = !prev;
      if (next) {
        showNotification('Offline Mode Active', 'You can continue reporting. Reports will sync automatically when online.', 'warning');
      } else {
        showNotification('Internet Restored', 'Syncing queued reports with Block Gram Panchayat Server...', 'success');
      }
      return next;
    });
  };

  const addIssue = (newIssueData: Partial<Issue>): Issue => {
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CVX-2026-${idNum}`;
    
    const newIssue: Issue = {
      id: newId,
      title: newIssueData.title || 'Reported Village Infrastructure Issue',
      description: newIssueData.description || 'Details recorded via CiviFix portal.',
      category: newIssueData.category || 'water',
      subCategory: newIssueData.subCategory || 'General Maintenance',
      status: 'reported',
      priority: newIssueData.priority || 'high',
      reportedBy: currentUser.name,
      reportedByPhone: currentUser.phone,
      reportedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      state: newIssueData.state || currentUser.state,
      district: newIssueData.district || currentUser.district,
      block: newIssueData.block || currentUser.block,
      panchayat: newIssueData.panchayat || currentUser.panchayat,
      ward: newIssueData.ward || currentUser.ward,
      landmark: newIssueData.landmark || 'Near Panchayat Center',
      coordinates: newIssueData.coordinates || [9.1726, 77.8681],
      photoBefore: newIssueData.photoBefore || '/images/handpump_before.jpg',
      voiceTranscript: newIssueData.voiceTranscript,
      aiSeverityScore: newIssueData.aiSeverityScore || 82,
      aiDepartment: newIssueData.aiDepartment || 'TWAD Board & Rural Development Mission',
      timeline: [
        {
          status: 'reported',
          title: 'Grievance Successfully Registered',
          description: `Filed by ${currentUser.name} via CiviFix Platform. AI Severity rating ${newIssueData.aiSeverityScore || 82}/100.`,
          timestamp: 'Just now',
          by: currentUser.name
        }
      ],
      upvotes: 1,
      upvotedBy: [currentUser.id],
      comments: [],
      estimatedSlaDays: 2,
      costEstimate: '₹3,500',
      ...newIssueData
    };

    setIssues((prev) => [newIssue, ...prev]);
    setRecentlySubmittedIssue(newIssue);
    setSelectedIssueId(newId);

    // Sync with backend API
    api.createIssue(newIssue).catch((err) => {
      console.log('Issue cached locally (offline mode / backend sync deferred):', err.message);
    });

    // Award civic points
    setCurrentUser((prev) => ({
      ...prev,
      civicPoints: prev.civicPoints + 50
    }));

    showNotification(
      'Issue Registered!', 
      `Ticket ${newId} generated. +50 Civic Points awarded to your profile.`,
      'success'
    );

    return newIssue;
  };

  const updateIssueStatus = (
    issueId: string, 
    newStatus: IssueStatus, 
    notes?: string, 
    photoAfter?: string,
    materialList?: string[]
  ) => {
    setIssues((prev) => 
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;

        const statusTitles: Record<IssueStatus, string> = {
          reported: 'Grievance Logged',
          verified: 'Verified by Sarpanch & Field Scout',
          assigned: 'Work Order & Field Officer Dispatched',
          in_progress: 'Repair Work In-Progress on Ground',
          resolved: 'Repair Completed & Certified',
          closed: 'Citizen Verified & Closed'
        };

        const newTimelineEvent = {
          status: newStatus,
          title: statusTitles[newStatus],
          description: notes || `Status changed to ${newStatus} by ${currentUser.name}.`,
          timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
          by: currentUser.name,
          photoUrl: photoAfter
        };

        return {
          ...issue,
          status: newStatus,
          photoAfter: photoAfter || issue.photoAfter,
          materialUsed: materialList || issue.materialUsed,
          timeline: [...issue.timeline, newTimelineEvent]
        };
      })
    );

    // Sync with backend API
    api.updateIssueStatus(issueId, newStatus, notes, photoAfter, materialList).catch((err) => {
      console.log('Status update cached locally:', err.message);
    });

    showNotification(
      'Status Updated', 
      `Ticket ${issueId} is now ${newStatus.toUpperCase()}.`, 
      'success'
    );
  };

  const upvoteIssue = (issueId: string) => {
    setIssues((prev) => 
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;
        const alreadyUpvoted = issue.upvotedBy.includes(currentUser.id);
        if (alreadyUpvoted) {
          return {
            ...issue,
            upvotes: Math.max(0, issue.upvotes - 1),
            upvotedBy: issue.upvotedBy.filter((id) => id !== currentUser.id)
          };
        } else {
          return {
            ...issue,
            upvotes: issue.upvotes + 1,
            upvotedBy: [...issue.upvotedBy, currentUser.id]
          };
        }
      })
    );

    api.upvoteIssue(issueId, currentUser.id).catch(() => {});
  };

  const addComment = (issueId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'comm-' + Date.now(),
      author: currentUser.name,
      role: currentUser.role === 'citizen' ? 'Citizen' : currentUser.role === 'officer' ? 'Field Officer' : 'Sarpanch / Admin',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setIssues((prev) => 
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;
        return {
          ...issue,
          comments: [...issue.comments, newComment]
        };
      })
    );

    api.addComment(issueId, currentUser.name, currentUser.role, text.trim()).catch(() => {});

    showNotification('Comment Posted', 'Your community feedback has been recorded.', 'info');
  };

  const claimReward = (rewardId: string): boolean => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return false;

    if (currentUser.civicPoints < reward.costPoints) {
      showNotification('Insufficient Points', `You need ${reward.costPoints} points to claim this reward.`, 'error');
      return false;
    }

    // Deduct points
    setCurrentUser((prev) => ({
      ...prev,
      civicPoints: prev.civicPoints - reward.costPoints
    }));

    setRewards((prev) => 
      prev.map((r) => r.id === rewardId ? { ...r, claimed: true } : r)
    );

    api.redeemReward(rewardId, currentUser.role).catch(() => {});

    showNotification(
      'Voucher Claimed! 🎉', 
      `Successfully redeemed: ${reward.title}. Voucher code: ${reward.code}`, 
      'success'
    );
    return true;
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        selectedIssueId,
        recentlySubmittedIssue,
        issues,
        rewards,
        language,
        isOffline,
        notifications,
        switchRole,
        setCurrentView,
        setLanguage,
        toggleOffline,
        addIssue,
        updateIssueStatus,
        upvoteIssue,
        addComment,
        claimReward,
        showNotification,
        removeNotification,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
