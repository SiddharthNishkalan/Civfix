import { Issue, User, RewardItem, PanchayatRanking, DepartmentMetric, AnomalyAlert } from '../types';

export const INITIAL_USERS: Record<string, User> = {
  citizen: {
    id: 'USR-7821',
    name: 'Selvi Murugan',
    phone: '+91 98401 23456',
    role: 'citizen',
    panchayat: 'Kovilpatti Village Panchayat',
    block: 'Kovilpatti Block',
    district: 'Thoothukudi',
    state: 'Tamil Nadu',
    ward: 'Ward 4 (West Street / Melur)',
    civicPoints: 480,
    level: 'Gram Panchayat Citizen Champion - Tier 3',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    language: 'en',
    badges: [
      {
        id: 'b1',
        name: 'Water Guardian',
        icon: 'water_drop',
        description: 'Reported 5 critical pipeline leaks and saved community drinking water.',
        dateEarned: '12 Aug 2026'
      },
      {
        id: 'b2',
        name: 'Pothole Hunter',
        icon: 'traffic',
        description: 'Identified major monsoon road breaches on link roads repaired within 48 hrs.',
        dateEarned: '24 Jul 2026'
      },
      {
        id: 'b3',
        name: 'Solar Vigilante',
        icon: 'solar_power',
        description: 'Verified village high-mast solar street lights across Ward 2 and Ward 4.',
        dateEarned: '05 May 2026'
      }
    ]
  },
  officer: {
    id: 'OFF-4410',
    name: 'Er. Senthil Kumar',
    phone: '+91 98422 34567',
    role: 'officer',
    panchayat: 'Kovilpatti Cluster (5 Panchayats)',
    block: 'Kovilpatti Block',
    district: 'Thoothukudi',
    state: 'Tamil Nadu',
    ward: 'Block Development Office, Room 12',
    civicPoints: 1250,
    level: 'Assistant Engineer (TWAD & Rural Works)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    language: 'en',
    badges: [
      {
        id: 'ob1',
        name: 'Quick Resolver 2026',
        icon: 'speed',
        description: 'Resolved 96% of critical drinking water complaints within the 24-hour SLA.',
        dateEarned: '15 Aug 2026'
      }
    ]
  },
  admin: {
    id: 'ADM-1001',
    name: 'District Collector Office (Thoothukudi HQ)',
    phone: '+91 461 2320001',
    role: 'admin',
    panchayat: 'District Collectorate Complex, Korampallam',
    block: 'District Headquarters',
    district: 'Thoothukudi',
    state: 'Tamil Nadu',
    ward: 'Command & Control Room',
    civicPoints: 5000,
    level: 'State & District Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    language: 'en',
    badges: []
  },
  sarpanch: {
    id: 'SRP-002',
    name: 'Thiru Arumugam',
    phone: '+91 94431 88990',
    role: 'sarpanch',
    panchayat: 'Kovilpatti Village Panchayat',
    block: 'Kovilpatti Block',
    district: 'Thoothukudi',
    state: 'Tamil Nadu',
    ward: 'Panchayat Council Hall, Kovilpatti',
    civicPoints: 2100,
    level: 'Panchayat Council President / Thalaivar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    language: 'en',
    badges: [
      {
        id: 'sb1',
        name: 'Model Village Leader',
        icon: 'verified',
        description: 'Recognized for achieving 100% solar street lighting and piped drinking water coverage.',
        dateEarned: '26 Jan 2026'
      }
    ]
  }
};

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'CVX-2026-8941',
    title: 'Main Village Well Pump & Pipeline Fractured',
    description: 'The underground riser pipe connecting the community solar pump near West Street has fractured. Water wastage is flooding the pathway and cutting drinking water to 180 families.',
    category: 'water',
    subCategory: 'Solar Handpump / Piped Drinking Water Supply',
    status: 'in_progress',
    priority: 'urgent',
    reportedBy: 'Selvi Murugan',
    reportedByPhone: '+91 98401 23456',
    reportedAt: '28 Aug 2026, 09:30 AM',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 4 (West Street / Melur)',
    landmark: 'Near Primary Health Sub-Centre and Banyan Tree',
    coordinates: [9.1726, 77.8681],
    photoBefore: '/images/handpump_before.jpg',
    photoAfter: '/images/handpump_after.jpg',
    voiceTranscript: 'The drinking water pipeline on West Street in Ward 4 has burst, flooding the street.',
    aiSeverityScore: 92,
    aiDepartment: 'TWAD Board & Rural Development Mission',
    assignedOfficer: {
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
        title: 'Grievance Registered via Voice AI',
        description: 'Citizen Selvi Murugan filed voice grievance. Auto-triaged with Severity 92/100.',
        timestamp: '28 Aug 2026, 09:30 AM',
        by: 'CiviFix AI Engine'
      },
      {
        status: 'verified',
        title: 'Panchayat Council President Verified',
        description: 'Panchayat President Thiru Arumugam verified drinking water shortage on ground.',
        timestamp: '28 Aug 2026, 10:15 AM',
        by: 'Thiru Arumugam'
      },
      {
        status: 'assigned',
        title: 'Work Order #WO-891 Dispatched',
        description: 'Assigned to Assistant Engineer Senthil Kumar. Replacement 2.5-inch GI pipe sanctioned.',
        timestamp: '28 Aug 2026, 11:30 AM',
        by: 'Block Development Officer'
      },
      {
        status: 'in_progress',
        title: 'Plumbing & Excavation Underway',
        description: 'Repair crew on-site. Damaged valve and 15m pipe replaced. Pressure testing underway.',
        timestamp: '29 Aug 2026, 02:45 PM',
        by: 'Er. Senthil Kumar',
        photoUrl: '/images/handpump_after.jpg'
      }
    ],
    upvotes: 42,
    upvotedBy: ['USR-7821', 'USR-1102', 'USR-3390'],
    comments: [
      {
        id: 'c1',
        author: 'Muthu Krishnan',
        role: 'Citizen (Ward 4)',
        text: 'Water supply stopped since yesterday morning. Thank you for dispatching the team quickly.',
        timestamp: '28 Aug 2026, 11:00 AM'
      },
      {
        id: 'c2',
        author: 'Er. Senthil Kumar',
        role: 'Field Officer',
        text: 'Replacement GI materials delivered to site. Pressure testing scheduled for this afternoon.',
        timestamp: '29 Aug 2026, 01:20 PM'
      }
    ],
    estimatedSlaDays: 2,
    costEstimate: '₹4,850',
    materialUsed: ['15m 2.5in GI Pipe', 'Sluice Valve 65mm', 'Teflon Sealing Joint', 'Concrete Reinforcement Pad'],
    verifiedBySarpanch: true
  },
  {
    id: 'CVX-2026-7732',
    title: 'Severe Road Crater & Waterlogging on Bazaar Link Road',
    description: 'Deep 4-foot pothole on asphalt link road between Bazaar Centre and Panchayat Union Middle School. Lorries and tractors getting stuck in monsoon rains.',
    category: 'roads',
    subCategory: 'Rural Asphalt Link Road',
    status: 'assigned',
    priority: 'high',
    reportedBy: 'Karthik Velu',
    reportedByPhone: '+91 97890 12345',
    reportedAt: '27 Aug 2026, 04:15 PM',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 2 (Bazaar Road / Theru)',
    landmark: '50m from Farmers Service Cooperative Society',
    coordinates: [9.1780, 77.8720],
    photoBefore: '/images/handpump_before.jpg',
    photoAfter: '/images/handpump_after.jpg',
    voiceTranscript: 'There is a huge pothole on Bazaar link road near the school, filled with rainwater.',
    aiSeverityScore: 78,
    aiDepartment: 'Highways & Rural Works Department (TN Rural Roads)',
    assignedOfficer: {
      id: 'OFF-4410',
      name: 'Er. Senthil Kumar',
      role: 'Assistant Engineer (Roads)',
      department: 'Highways & Rural Works Division',
      phone: '+91 98422 34567',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      etaHours: 12
    },
    timeline: [
      {
        status: 'reported',
        title: 'Report Filed with GPS Tag',
        description: 'Logged with camera photo and geotag coordinates.',
        timestamp: '27 Aug 2026, 04:15 PM',
        by: 'Karthik Velu'
      },
      {
        status: 'verified',
        title: 'Field Verification Completed',
        description: 'Dimensions surveyed: 3.2m length, 0.45m depth. Bitumen cold-mix patch allocated.',
        timestamp: '28 Aug 2026, 09:00 AM',
        by: 'Highways Field Surveyor'
      },
      {
        status: 'assigned',
        title: 'Contractor Work Order Issued',
        description: 'Gravel base packing and roller compaction scheduled for tomorrow morning.',
        timestamp: '28 Aug 2026, 03:00 PM',
        by: 'Divisional Engineer'
      }
    ],
    upvotes: 68,
    upvotedBy: ['USR-7821', 'USR-5541', 'USR-2210'],
    comments: [
      {
        id: 'c10',
        author: 'Selvi Murugan',
        role: 'Citizen',
        text: 'School bus had to take a detour this morning. Please expedite repair work!',
        timestamp: '28 Aug 2026, 10:00 AM'
      }
    ],
    estimatedSlaDays: 3,
    costEstimate: '₹12,400',
    materialUsed: ['Aggregate 40mm & 20mm', 'Stone Dust', 'Cold Mix Bituminous Emulsion']
  },
  {
    id: 'CVX-2026-6519',
    title: 'High-Mast Solar Streetlight Battery Depleted',
    description: 'The solar streetlight near the Anganwadi Nursery and Girls Middle School has been dark for 4 consecutive nights due to burnt charge controller circuit.',
    category: 'lighting',
    subCategory: 'Solar Street Lighting (TEDA Clean Energy Project)',
    status: 'resolved',
    priority: 'medium',
    reportedBy: 'Anandhi Rajan',
    reportedByPhone: '+91 99440 88776',
    reportedAt: '22 Aug 2026, 07:00 PM',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 1 (School Street)',
    landmark: 'Opposite Anganwadi Nursery Centre No. 3',
    coordinates: [9.1680, 77.8640],
    photoBefore: '/images/handpump_before.jpg',
    photoAfter: '/images/handpump_after.jpg',
    aiSeverityScore: 64,
    aiDepartment: 'Tamil Nadu Energy Development Agency (TEDA)',
    assignedOfficer: {
      id: 'OFF-3399',
      name: 'Vikas Sharma',
      role: 'Solar Maintenance Technician',
      department: 'TEDA Solar Maintenance',
      phone: '+91 98433 11223',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      etaHours: 0
    },
    timeline: [
      {
        status: 'reported',
        title: 'Report Logged',
        description: 'Resident reported dark street intersection.',
        timestamp: '22 Aug 2026, 07:00 PM',
        by: 'Anandhi Rajan'
      },
      {
        status: 'assigned',
        title: 'Technician Assigned',
        description: 'Warranty service ticket sent to solar vendor.',
        timestamp: '23 Aug 2026, 10:00 AM',
        by: 'Panchayat Secretary'
      },
      {
        status: 'in_progress',
        title: 'Component Replaced',
        description: '12V 40Ah LiFePO4 battery pack & MPPT charge controller replaced on pole.',
        timestamp: '24 Aug 2026, 02:00 PM',
        by: 'Vikas Sharma'
      },
      {
        status: 'resolved',
        title: 'Resolution Certified & Tested',
        description: 'Light verified operational at 100% lumen output with dusk-to-dawn sensor.',
        timestamp: '24 Aug 2026, 08:30 PM',
        by: 'Vikas Sharma',
        photoUrl: '/images/handpump_after.jpg'
      }
    ],
    upvotes: 31,
    upvotedBy: ['USR-7821', 'USR-9988'],
    comments: [
      {
        id: 'c20',
        author: 'Anandhi Rajan',
        role: 'Citizen',
        text: 'The street is fully illuminated now. Thank you to the Panchayat team.',
        timestamp: '25 Aug 2026, 08:00 AM'
      }
    ],
    estimatedSlaDays: 2,
    costEstimate: '₹3,200',
    materialUsed: ['MPPT Solar Controller 12V/10A', 'LED Luminaire 30W replacement driver']
  },
  {
    id: 'CVX-2026-5412',
    title: 'Solid Waste Accumulation near Irrigation Canal Bank',
    description: 'Plastic bags, pesticide containers, and agricultural refuse piling up along the irrigation canal bank. Risk of channel choking and cattle toxicity.',
    category: 'waste',
    subCategory: 'Panchayat Solid Waste Management',
    status: 'reported',
    priority: 'medium',
    reportedBy: 'Saravanan Perumal',
    reportedByPhone: '+91 94420 56789',
    reportedAt: '29 Aug 2026, 07:30 AM',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 5 (Canal Bank)',
    landmark: 'Canal Siphon Bridge #2',
    coordinates: [9.1820, 77.8590],
    photoBefore: '/images/handpump_before.jpg',
    photoAfter: '/images/handpump_after.jpg',
    aiSeverityScore: 71,
    aiDepartment: 'Clean Village Mission & Public Works Department (Water Resources)',
    timeline: [
      {
        status: 'reported',
        title: 'New Complaint Logged',
        description: 'Auto-assigned to Village Panchayat sanitation supervisor.',
        timestamp: '29 Aug 2026, 07:30 AM',
        by: 'Saravanan Perumal'
      }
    ],
    upvotes: 19,
    upvotedBy: ['USR-7821'],
    comments: [],
    estimatedSlaDays: 2,
    costEstimate: '₹1,500'
  },
  {
    id: 'CVX-2026-4990',
    title: 'Distribution Transformer Sparking & Low Voltage in Ward',
    description: '25kVA transformer near Main Tank Junction emitting loud buzzing and sparks during peak evening agricultural pumping hours. Voltage dropping to 130V.',
    category: 'electricity',
    subCategory: 'TANGEDCO Rural Power Distribution Grid',
    status: 'verified',
    priority: 'urgent',
    reportedBy: 'Meenakshi Ammal',
    reportedByPhone: '+91 93444 78901',
    reportedAt: '28 Aug 2026, 08:20 PM',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 3 (Main Tank Junction)',
    landmark: 'Near Old Panchayat Office Post Box',
    coordinates: [9.1750, 77.8700],
    photoBefore: '/images/handpump_before.jpg',
    photoAfter: '/images/handpump_after.jpg',
    aiSeverityScore: 95,
    aiDepartment: 'TANGEDCO (Electricity Distribution Corporation)',
    timeline: [
      {
        status: 'reported',
        title: 'Urgent Electrical Hazard Reported',
        description: 'High priority alert triggered for power line technician.',
        timestamp: '28 Aug 2026, 08:20 PM',
        by: 'Meenakshi Ammal'
      },
      {
        status: 'verified',
        title: 'Lineman Inspection Verified Overload',
        description: 'Phase imbalance and loose LT bushing identified. De-energization permit requested.',
        timestamp: '29 Aug 2026, 08:00 AM',
        by: 'TANGEDCO Lineman'
      }
    ],
    upvotes: 55,
    upvotedBy: ['USR-7821', 'USR-4410', 'USR-1102'],
    comments: [],
    estimatedSlaDays: 1,
    costEstimate: '₹6,500'
  }
];

export const REWARDS_CATALOG: RewardItem[] = [
  {
    id: 'rew-1',
    title: 'Solar Emergency Lantern (Govt Subsidized)',
    description: 'High-efficiency 10W solar LED lantern with mobile charging port. Pickup from Uzhavar Sevai Maiyam.',
    costPoints: 300,
    category: 'energy',
    icon: 'solar_power',
    sponsor: 'TEDA Clean Energy Mission',
    code: 'SOLAR-CIVI-984'
  },
  {
    id: 'rew-2',
    title: 'Bio-Fertilizer & Organic Seed Kit (10kg)',
    description: 'Neem-coated urea voucher, vermicompost, and vegetable seed packet for organic kitchen garden.',
    costPoints: 200,
    category: 'farming',
    icon: 'agriculture',
    sponsor: 'Agricultural Extension Centre (Krishi Vigyan Kendra)',
    code: 'FARM-SEED-2026'
  },
  {
    id: 'rew-3',
    title: 'Monthly Rural Bus Pass (TNSTC)',
    description: '100% discount pass for 30 days travel across TNSTC buses linking Kovilpatti Block to District Collectorate.',
    costPoints: 400,
    category: 'transport',
    icon: 'directions_bus',
    sponsor: 'State Transport Corporation (TNSTC)',
    code: 'TNSTC-PASS-551'
  },
  {
    id: 'rew-4',
    title: 'Priority Gram Sabha Motion Fast-Track',
    description: 'Guaranteed priority agenda slot during the formal Gram Sabha session with Panchayat President and BDO.',
    costPoints: 150,
    category: 'civic',
    icon: 'gavel',
    sponsor: 'Rural Development & Panchayat Raj Department',
    code: 'SABHA-PRIO-012'
  },
  {
    id: 'rew-5',
    title: 'Family Health & Water Purification Kit',
    description: 'Chlorine purification tablets, ORS packets, digital thermometer, and antiseptic first aid kit.',
    costPoints: 180,
    category: 'health',
    icon: 'medical_services',
    sponsor: 'National Health Mission - Tamil Nadu',
    code: 'NHM-TN-772'
  }
];

export const PANCHAYAT_LEADERBOARD: PanchayatRanking[] = [
  {
    rank: 1,
    name: 'Kovilpatti Village Panchayat',
    block: 'Kovilpatti Block',
    district: 'Thoothukudi',
    cleanlinessScore: 98.4,
    resolutionRate: 96.8,
    totalResolved: 248,
    topBadge: 'Model Clean Village'
  },
  {
    rank: 2,
    name: 'Inam Maniyachi Panchayat',
    block: 'Kayathar Block',
    district: 'Thoothukudi',
    cleanlinessScore: 95.1,
    resolutionRate: 94.2,
    totalResolved: 215,
    topBadge: '100% Solar Powered'
  },
  {
    rank: 3,
    name: 'Ilambuvanam Panchayat',
    block: 'Vilathikulam Block',
    district: 'Thoothukudi',
    cleanlinessScore: 93.8,
    resolutionRate: 91.5,
    totalResolved: 184,
    topBadge: 'Piped Water Certified'
  },
  {
    rank: 4,
    name: 'Kadalaiyur Gram Panchayat',
    block: 'Ottapidaram Block',
    district: 'Thoothukudi',
    cleanlinessScore: 89.2,
    resolutionRate: 88.0,
    totalResolved: 162,
    topBadge: 'Green Waste Champion'
  },
  {
    rank: 5,
    name: 'Pandavarmangalam Panchayat',
    block: 'Sattur Block',
    district: 'Virudhunagar',
    cleanlinessScore: 86.4,
    resolutionRate: 85.3,
    totalResolved: 140,
    topBadge: 'Active Youth Forum'
  }
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  {
    department: 'TWAD Board & Rural Water Mission',
    totalReported: 342,
    resolved: 320,
    inProgress: 18,
    avgResolutionHours: 28,
    slaComplianceRate: 93.5,
    budgetUtilized: '₹14.2 Lakhs',
    color: '#00452d'
  },
  {
    department: 'Highways & Rural Works (TN Roads)',
    totalReported: 218,
    resolved: 198,
    inProgress: 16,
    avgResolutionHours: 46,
    slaComplianceRate: 90.8,
    budgetUtilized: '₹38.5 Lakhs',
    color: '#3c6938'
  },
  {
    department: 'TANGEDCO & TEDA Solar Grid',
    totalReported: 184,
    resolved: 176,
    inProgress: 6,
    avgResolutionHours: 18,
    slaComplianceRate: 95.6,
    budgetUtilized: '₹8.9 Lakhs',
    color: '#efc052'
  },
  {
    department: 'Clean Village & Panchayat Sanitation',
    totalReported: 165,
    resolved: 154,
    inProgress: 9,
    avgResolutionHours: 24,
    slaComplianceRate: 93.3,
    budgetUtilized: '₹6.1 Lakhs',
    color: '#1f5d42'
  },
  {
    department: 'Health & Anganwadi Infrastructure',
    totalReported: 95,
    resolved: 89,
    inProgress: 5,
    avgResolutionHours: 36,
    slaComplianceRate: 93.6,
    budgetUtilized: '₹9.4 Lakhs',
    color: '#6a4e00'
  }
];

export const ANOMALY_ALERTS: AnomalyAlert[] = [
  {
    id: 'an-1',
    type: 'outbreak_risk',
    severity: 'critical',
    title: 'Drinking Water Quality Anomaly Detected (Ward 4)',
    description: 'AI detected 7 correlated complaints of muddy water and pipeline seepage in a 300m radius within 6 hours. High risk of waterborne illness.',
    location: 'West Street, Kovilpatti Village Panchayat',
    reportedCount: 7,
    timestamp: 'Today, 08:15 AM'
  },
  {
    id: 'an-2',
    type: 'sla_breach',
    severity: 'warning',
    title: 'Monsoon Road Erosion SLA Approaching Limit',
    description: '3 road breach tickets on Bazaar link road are at 80% SLA timer. Heavy rains forecast in next 24 hours.',
    location: 'Bazaar Link Road, Ward 2',
    reportedCount: 3,
    timestamp: 'Today, 06:45 AM'
  },
  {
    id: 'an-3',
    type: 'infrastructure_failure',
    severity: 'info',
    title: 'TANGEDCO Transformer Thermal Overload Alert',
    description: 'Repeated power tripping reported across 42 households in Ward 3 during agricultural irrigation pumping hours.',
    location: 'Main Tank Junction Transformer T-4',
    reportedCount: 5,
    timestamp: 'Yesterday, 10:20 PM'
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appTitle: 'CiviFix',
    tagline: 'Rural Civic Infrastructure & Village Action Portal',
    reportIssue: 'Report a Rural Issue',
    trackIssue: 'Track Grievance',
    dashboard: 'Dashboard',
    officerPortal: 'Field Officer Portal',
    adminIntelligence: 'Admin Intelligence',
    rewards: 'Rewards & Impact',
    login: 'Login',
    register: 'Sign Up',
    logout: 'Switch / Logout',
    welcomeHeroTitle: 'Empowering Village Panchayats with AI-Enabled Governance',
    welcomeHeroSubtitle: 'Report village issues in 30 seconds via voice or camera. Real-time GPS dispatch, automated fund tracking, and community rewards for active citizens.',
    activeRole: 'Active Role',
    switchRole: 'Switch Role',
    citizen: 'Citizen',
    officer: 'Field Officer',
    admin: 'District Collector Office',
    sarpanch: 'Panchayat President (Thalaivar)',
    quickReport: 'Quick Issue Report',
    voiceAssistant: 'Voice AI Assistant',
    communityForum: 'Gram Sabha Forum',
    liveTicker: 'Live Village Resolutions',
    filterAll: 'All Issues',
    filterWater: 'Water Supply',
    filterRoads: 'Roads & Bridges',
    filterLighting: 'Street Lights',
    filterWaste: 'Sanitation',
    filterPower: 'Electricity',
    statusReported: 'Reported',
    statusVerified: 'Verified',
    statusAssigned: 'Assigned',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusClosed: 'Closed',
    urgent: 'Urgent',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    pointsEarned: 'Civic Points',
    redeemVoucher: 'Redeem Voucher',
    villageRank: 'Village Cleanliness Rank',
    beforePhoto: 'Before Repair',
    afterPhoto: 'After Repair',
    dragSliderToCompare: 'Drag slider to verify completed work',
    officerInCharge: 'Officer in Charge',
    callOfficer: 'Call Officer',
    submitReport: 'Submit Rural Grievance',
    stepCategory: '1. Select Issue Type',
    stepLocation: '2. Pin Location & Ward',
    stepEvidence: '3. Photo & Voice Evidence',
    stepAIReview: '4. AI Severity & Routing',
    stepConfirm: '5. Review & Submit',
    speakNow: 'Tap microphone and speak...',
    gpsDetect: 'Auto-Detect My GPS Location',
    offlineAlert: 'Offline mode active: Reports will auto-sync when internet is restored.'
  }
};
