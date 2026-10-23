// Feedall Enterprise Mock Data & State Stores

export const initialProviderStats = {
  hotelName: "The Grand Oberoi Palace & Convention Suites",
  fssaiNumber: "FSSAI-LIC-10020011004523",
  verifiedDate: "Certified June 2024",
  wasteDivertedKg: 14820,
  wasteDivertedTrend: "+18.4% vs last month",
  mealsSaved: 32604,
  mealsSavedTrend: "+2,410 this week",
  co2AvoidedTons: 37.05,
  co2AvoidedTrend: "Equivalent to 84 mature trees",
  taxCreditAccrued: "₹4,18,500",
  foodSafetyScore: "AAA (99.2%)"
};

export const initialActiveListings = [
  {
    id: "LIST-101",
    title: "Executive Dinner Banquet Spread",
    category: "Buffet Surplus",
    quantityKg: 65,
    portions: 140,
    prepTime: "15:30",
    expiryTime: "21:30",
    expiresInMinutes: 42,
    coldStorageRequired: true,
    dietary: ["Vegetarian", "Jain Friendly"],
    items: "Dal Makhani (20kg), Shahi Paneer (15kg), Jeera Rice (15kg), Tandoori Rotis (150 pcs)",
    status: "Pending Match",
    hotelName: "The Grand Oberoi Palace",
    location: "Connaught Place, New Delhi",
    loadingBay: "Gate 4 - Kitchen Cold Dock",
    loggedAt: "10 mins ago",
    assignedNgo: null,
    temperature: "3.4°C"
  },
  {
    id: "LIST-102",
    title: "Artisanal Boulangerie & Viennoiserie",
    category: "Bakery/Pastries",
    quantityKg: 30,
    portions: 95,
    prepTime: "14:00",
    expiryTime: "22:00",
    expiresInMinutes: 75,
    coldStorageRequired: false,
    dietary: ["Vegetarian", "Eggless"],
    items: "Sourdough Loaves, Croissants, Focaccia, Apple Danishes",
    status: "Pending Match",
    hotelName: "The Grand Oberoi Palace",
    location: "Connaught Place, New Delhi",
    loadingBay: "Service Lift #2",
    loggedAt: "25 mins ago",
    assignedNgo: null,
    temperature: "Ambient (19°C)"
  },
  {
    id: "LIST-103",
    title: "Conference Lunch Buffet - North Indian & Continental",
    category: "Cooked Meals",
    quantityKg: 85,
    portions: 190,
    prepTime: "13:00",
    expiryTime: "19:00",
    expiresInMinutes: 30,
    coldStorageRequired: true,
    dietary: ["Mixed (Veg & Halal Non-Veg)"],
    items: "Butter Chicken (25kg), Pulao (25kg), Dal Tadka (20kg), Pasta Alfredo (15kg)",
    status: "Accepted (Awaiting Pickup)",
    hotelName: "The Grand Oberoi Palace",
    location: "Connaught Place, New Delhi",
    loadingBay: "Gate 3 - Cargo Dock",
    loggedAt: "45 mins ago",
    assignedNgo: "Robin Hood Army - Fleet 4",
    driverName: "Suresh Patil (MH-01-AB-4921)",
    driverEta: "11 mins away",
    temperature: "4.1°C"
  },
  {
    id: "LIST-104",
    title: "Breakfast Spread & Fresh Dairy Surplus",
    category: "Packaged Dairy",
    quantityKg: 45,
    portions: 110,
    prepTime: "10:30",
    expiryTime: "16:00",
    expiresInMinutes: 0,
    coldStorageRequired: true,
    dietary: ["Vegetarian"],
    items: "Pasteurized Milk (20L), Greek Yogurt (10kg), Idli & Sambar (15kg)",
    status: "Completed",
    hotelName: "The Grand Oberoi Palace",
    location: "Connaught Place, New Delhi",
    loadingBay: "Gate 4 - Kitchen Cold Dock",
    loggedAt: "4 hours ago",
    assignedNgo: "Feeding India Hub #2",
    driverName: "Manish Kumar",
    completedAt: "13:45 Today",
    temperature: "3.2°C logged at handover"
  }
];

export const initialNgoMatches = [
  {
    id: "MATCH-801",
    hotelName: "The Grand Oberoi Palace",
    hotelRating: "5.0 ★ Luxury Partner",
    fssaiVerified: true,
    distanceKm: "1.8 km",
    driveTime: "8 mins",
    category: "Buffet Surplus",
    title: "Executive Dinner Banquet Spread",
    quantityKg: 65,
    portions: 140,
    prepTime: "15:30",
    bestBefore: "21:30",
    initialSeconds: 42 * 60 + 15,
    coldStorageRequired: true,
    dietary: ["Vegetarian", "Jain Friendly"],
    itemsSummary: "Dal Makhani (20kg), Shahi Paneer (15kg), Jeera Rice (15kg), Rotis (150 pcs)",
    pickupLocation: "Barakhamba Road, Connaught Place, Gate 4",
    urgencyLevel: "HIGH",
    allergens: "Contains Dairy (Paneer, Butter), Gluten Free Rice Available",
    contactPerson: "Chef Hemant (Executive Sous Chef - 98112-XXXXX)"
  },
  {
    id: "MATCH-802",
    hotelName: "ITC Maurya Luxury Suites",
    hotelRating: "5.0 ★ Luxury Partner",
    fssaiVerified: true,
    distanceKm: "3.4 km",
    driveTime: "14 mins",
    category: "Cooked Meals",
    title: "Diplomatic Gala Dinner Surplus",
    quantityKg: 95,
    portions: 220,
    prepTime: "16:00",
    bestBefore: "22:00",
    initialSeconds: 58 * 60 + 40,
    coldStorageRequired: true,
    dietary: ["Halal Certified", "Vegetarian Segregated"],
    itemsSummary: "Dum Biryani (40kg), Paneer Lababdar (25kg), Yellow Dal (20kg), Assorted Bread (200 pcs)",
    pickupLocation: "Diplomatic Enclave, Chanakyapuri, Service Bay 1",
    urgencyLevel: "MEDIUM",
    allergens: "Contains Nuts & Dairy",
    contactPerson: "F&B Manager Rajiv (98730-XXXXX)"
  },
  {
    id: "MATCH-803",
    hotelName: "Taj Palace Convention Center",
    hotelRating: "5.0 ★ Luxury Partner",
    fssaiVerified: true,
    distanceKm: "4.2 km",
    driveTime: "18 mins",
    category: "Bakery & Desserts",
    title: "Gourmet Patisserie & Breakfast Loaves",
    quantityKg: 40,
    portions: 120,
    prepTime: "14:30",
    bestBefore: "23:00",
    initialSeconds: 24 * 60 + 10,
    coldStorageRequired: false,
    dietary: ["Vegetarian", "Eggless Options"],
    itemsSummary: "Multigrain Boules (20 pcs), Croissants (40 pcs), Fruit Tarts (30 pcs), Muffins (50 pcs)",
    pickupLocation: "Sardar Patel Marg, Kitchen Loading Bay B",
    urgencyLevel: "URGENT",
    allergens: "Contains Gluten, Dairy",
    contactPerson: "Head Baker Sophie (98200-XXXXX)"
  }
];

export const initialPickupTrackers = [
  {
    id: "TRK-901",
    matchId: "MATCH-799",
    hotelName: "Le Méridien New Delhi",
    quantityKg: 55,
    portions: 125,
    category: "Cooked Buffet",
    currentStep: 1,
    steps: [
      {
        title: "Dispatched",
        time: "16:15",
        description: "Refrigerated Van #2 dispatched from Okhla Hub",
        driver: "Rajesh Kumar (DL-1V-8902)",
        driverPhone: "+91 98101 22345",
        status: "completed"
      },
      {
        title: "Arrived at Loading Bay",
        time: "16:32",
        description: "Arrived at Le Méridien Service Bay 2. Cold-chain audit underway.",
        tempRecorded: "3.6°C (FSSAI Compliant < 4°C)",
        status: "active"
      },
      {
        title: "Collected & En Route to Shelter",
        time: "Est. 16:50",
        description: "Digital handover OTP verification, signed manifest, dispatched to Bal Sahyog Children Home",
        destination: "Bal Sahyog Shelter, Connaught Circus (140 Children)",
        status: "pending"
      }
    ]
  }
];

export const initialVerificationQueue = [
  {
    id: "NGO-REG-401",
    name: "Akshaya Seva Food Foundation",
    registrationNo: "MH-MUM-2021-00892",
    fssaiLicense: "FSSAI-21522019000841",
    fssaiExpiry: "18-Nov-2027",
    fleetCapacityKg: "1,200 kg (3 Insulated Vans)",
    operatingZone: "South & Central Mumbai",
    trustScore: 98,
    status: "Pending Approval",
    submittedDate: "22 Oct 2026",
    contactPerson: "Dr. Arvind Mehta",
    email: "contact@akshayaseva.org",
    phone: "+91 98201 11223",
    documents: [
      { name: "FSSAI Central State License.pdf", size: "1.4 MB", verified: true },
      { name: "12A & 80G Tax Exemption Certificate.pdf", size: "890 KB", verified: true },
      { name: "Insulated Fleet Vehicle Inspection Log.pdf", size: "2.1 MB", verified: true }
    ]
  },
  {
    id: "NGO-REG-402",
    name: "Surplus Angels Welfare Society",
    registrationNo: "DL-DEL-2023-01452",
    fssaiLicense: "FSSAI-10023011000318",
    fssaiExpiry: "04-Mar-2028",
    fleetCapacityKg: "850 kg (2 Temperature-Controlled Vans)",
    operatingZone: "South Delhi & Gurugram Border",
    trustScore: 94,
    status: "Pending Approval",
    submittedDate: "23 Oct 2026",
    contactPerson: "Ms. Priyanka Sen",
    email: "priyanka@surplusangels.org",
    phone: "+91 99100 44556",
    documents: [
      { name: "FSSAI Food Safety Registration.pdf", size: "950 KB", verified: true },
      { name: "Vehicle RC & GPS Tracker Certification.pdf", size: "1.8 MB", verified: true }
    ]
  },
  {
    id: "NGO-REG-403",
    name: "Bangalore Annapoorna Collective",
    registrationNo: "KA-BLR-2020-00341",
    fssaiLicense: "FSSAI-11220302000109",
    fssaiExpiry: "12-Dec-2026",
    fleetCapacityKg: "1,800 kg (4 Cold-Chain Vans)",
    operatingZone: "Bengaluru Tech Corridor & Whitefield",
    trustScore: 99,
    status: "Pending Approval",
    submittedDate: "21 Oct 2026",
    contactPerson: "Venkatesh Rao",
    email: "rescue@annapoorna-blr.org",
    phone: "+91 98450 77889",
    documents: [
      { name: "FSSAI Food Handler Health Audits.pdf", size: "3.2 MB", verified: true },
      { name: "Cold-chain Telematics Calibration Report.pdf", size: "1.1 MB", verified: true }
    ]
  }
];

export const globalAdminStats = {
  totalWasteSavedKg: 142850,
  totalWasteMonthlyGrowth: "+14.8%",
  totalMealsDistributed: 314270,
  activeHotels: 48,
  activeNgos: 92,
  safetyComplianceRate: "99.8%",
  totalCo2eAvoidedTons: 357.1,
  citiesActive: 8,
  averagePickupMins: 22.4
};

// Initial Mock Feedback & Trust Reviews Store
export const initialFeedbacks = [
  {
    id: "FB-501",
    authorName: "Robin Hood Army - Delhi North Fleet",
    authorRole: "ngo",
    authorBadge: "Verified NGO Dispatcher",
    targetEntity: "The Grand Oberoi Palace",
    rating: 5,
    category: "Culinary Safety & Temperature",
    tempVerified: "3.4°C Chilled (Cold-Dock)",
    mealsDelivered: 140,
    impactNote: "Fed 140 underprivileged kids at Bal Sahyog shelter",
    feedbackText: "The Oberoi culinary team packed the Dal Makhani and Pulao in spotless insulated Cambro containers. Core temperature probe verified at 3.4°C upon arrival. Zero leakage, perfect hygiene.",
    date: "Today at 14:30",
    gratitudeCount: 48,
    hasLiked: false,
    verifiedHandover: true
  },
  {
    id: "FB-502",
    authorName: "Chef Hemant Sharma (Exec Sous Chef)",
    authorRole: "provider",
    authorBadge: "The Grand Oberoi Palace",
    targetEntity: "Feeding India - Fleet #2",
    rating: 5,
    category: "Punctuality & Telematics",
    tempVerified: "Cold-Chain Insulated Van",
    mealsDelivered: 220,
    impactNote: "Zero food waste from Global Tech Summit Gala",
    feedbackText: "Driver reached Service Bay 4 in just 11 minutes after the banquet finished. Driver carried clean temperature probes and verified the digital OTP in 30 seconds. Seamless professional operation.",
    date: "Yesterday",
    gratitudeCount: 36,
    hasLiked: false,
    verifiedHandover: true
  },
  {
    id: "FB-503",
    authorName: "Sister Mary (Care In-Charge)",
    authorRole: "shelter",
    authorBadge: "Nirmal Seva Child Shelter",
    targetEntity: "ITC Maurya & Akshaya Fleet",
    rating: 5,
    category: "Direct Beneficiary Impact",
    tempVerified: "Fresh & Warm",
    mealsDelivered: 180,
    impactNote: "180 children received restaurant-grade nutrition",
    feedbackText: "The gourmet bakery items and vegetarian meals brought immense joy to all 180 children at our shelter home. Knowing it was prepared safely under 5-star standards gave our staff complete peace of mind.",
    date: "2 days ago",
    gratitudeCount: 62,
    hasLiked: true,
    verifiedHandover: true
  },
  {
    id: "FB-504",
    authorName: "Dr. Arvind Mehta (Chief Trustee)",
    authorRole: "ngo",
    authorBadge: "Akshaya Seva Food Foundation",
    targetEntity: "Taj Palace Convention Center",
    rating: 5,
    category: "Dietary Segregation",
    tempVerified: "3.8°C Monitored",
    mealsDelivered: 95,
    impactNote: "Safe distribution across senior living homes",
    feedbackText: "Clear segregation between vegetarian and non-vegetarian containers with explicit allergen and prep time labels. Feedall's verification standard is transforming surplus food redistribution.",
    date: "3 days ago",
    gratitudeCount: 29,
    hasLiked: false,
    verifiedHandover: true
  }
];

// Demo accounts for quick login
export const demoAccounts = {
  provider: {
    email: "chef@oberoipalace.com",
    name: "The Grand Oberoi Palace",
    role: "provider",
    fssai: "FSSAI-LIC-10020011004523",
    location: "Connaught Place, New Delhi",
    contactPerson: "Chef Hemant Sharma",
    avatar: "🏨"
  },
  ngo: {
    email: "dispatch@robinhoodarmy.com",
    name: "Robin Hood Army - Fleet Command",
    role: "ngo",
    fssai: "FSSAI-LIC-21419550000312",
    location: "Central Delhi Hub",
    contactPerson: "Mohit Verma (Fleet Lead)",
    avatar: "🤝"
  },
  admin: {
    email: "compliance@feedall.org",
    name: "Feedall Central Oversight",
    role: "admin",
    fssai: "FSSAI-REGULATORY-PORTAL",
    location: "National Headquarters",
    contactPerson: "Dr. Sunita Varma (Chief Auditor)",
    avatar: "🛡️"
  }
};
