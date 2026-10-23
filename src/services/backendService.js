import { supabase } from '../lib/supabase';
import {
  initialProviderStats,
  initialActiveListings,
  initialNgoMatches,
  initialPickupTrackers,
  initialVerificationQueue,
  globalAdminStats,
  initialFeedbacks,
  demoAccounts
} from '../data/mockData';

// Helper to convert database row to listing format
const mapListingFromDb = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  quantityKg: Number(row.quantity_kg),
  portions: Number(row.portions),
  prepTime: row.prep_time,
  expiryTime: row.expiry_time,
  expiresInMinutes: row.expires_in_minutes || 45,
  coldStorageRequired: Boolean(row.cold_storage_required),
  dietary: Array.isArray(row.dietary) ? row.dietary : [],
  items: row.items,
  status: row.status,
  hotelName: row.hotel_name,
  location: row.location,
  loadingBay: row.loading_bay,
  loggedAt: row.logged_at,
  assignedNgo: row.assigned_ngo,
  driverName: row.driver_name,
  driverEta: row.driver_eta,
  completedAt: row.completed_at,
  temperature: row.temperature
});

// Helper to convert database row to match format
const mapMatchFromDb = (row) => ({
  id: row.id,
  hotelName: row.hotel_name,
  hotelRating: row.hotel_rating || '5.0 ★ Luxury Partner',
  fssaiVerified: Boolean(row.fssai_verified),
  distanceKm: row.distance_km || '2.5 km',
  driveTime: row.drive_time || '10 mins',
  category: row.category,
  title: row.title,
  quantityKg: Number(row.quantity_kg),
  portions: Number(row.portions),
  prepTime: row.prep_time,
  bestBefore: row.best_before,
  initialSeconds: row.initial_seconds || 2700,
  coldStorageRequired: Boolean(row.cold_storage_required),
  dietary: Array.isArray(row.dietary) ? row.dietary : [],
  itemsSummary: row.items_summary,
  pickupLocation: row.pickup_location,
  urgencyLevel: row.urgency_level || 'MEDIUM',
  allergens: row.allergens,
  contactPerson: row.contact_person,
  status: row.status
});

// Helper to convert database row to tracker format
const mapTrackerFromDb = (row) => ({
  id: row.id,
  matchId: row.match_id,
  hotelName: row.hotel_name,
  quantityKg: Number(row.quantity_kg),
  portions: Number(row.portions),
  category: row.category,
  currentStep: row.current_step,
  steps: row.steps || []
});

// Helper to convert database row to NGO verification format
const mapVerificationFromDb = (row) => ({
  id: row.id,
  name: row.name,
  registrationNo: row.registration_no,
  fssaiLicense: row.fssai_license,
  fssaiExpiry: row.fssai_expiry,
  fleetCapacityKg: row.fleet_capacity_kg,
  operatingZone: row.operating_zone,
  trustScore: row.trust_score,
  status: row.status,
  submittedDate: row.submitted_date,
  contactPerson: row.contact_person,
  email: row.email,
  phone: row.phone,
  documents: row.documents || []
});

// Helper to convert database row to feedback format
const mapFeedbackFromDb = (row) => ({
  id: row.id,
  authorName: row.author_name,
  authorRole: row.author_role,
  authorBadge: row.author_badge,
  targetEntity: row.target_entity,
  rating: row.rating,
  category: row.category,
  tempVerified: row.temp_verified,
  mealsDelivered: Number(row.meals_delivered),
  impactNote: row.impact_note,
  feedbackText: row.feedback_text,
  date: row.date_str,
  gratitudeCount: row.gratitude_count || 0,
  hasLiked: Boolean(row.has_liked),
  verifiedHandover: Boolean(row.verified_handover)
});

export const BackendService = {
  // ==========================================
  // 1. SUPABASE AUTH & PROFILES
  // ==========================================
  async signIn({ email, password }) {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials or register a new account.');
      }
      if (error.code === 'email_not_confirmed' || error.message.includes('Email not confirmed')) {
        throw new Error('Email not confirmed yet. Please verify your email address to continue.');
      }
      throw new Error(error.message);
    }

    if (!data?.user) {
      throw new Error('No user returned from Supabase authentication.');
    }

    // Fetch user profile from public.profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        fssai: profile.fssai,
        location: profile.location,
        contactPerson: profile.contact_person,
        avatar: profile.avatar
      };
    }

    // If profile doesn't exist yet, create it from user metadata
    const userMeta = data.user.user_metadata || {};
    const newProfile = {
      id: data.user.id,
      email: cleanEmail,
      name: userMeta.name || cleanEmail.split('@')[0],
      role: userMeta.role || 'provider',
      fssai: userMeta.fssai || 'FSSAI-LIC-10020011004523',
      location: userMeta.location || 'New Delhi',
      contact_person: userMeta.contactPerson || 'Authorized Officer',
      avatar: userMeta.avatar || (userMeta.role === 'ngo' ? '🤝' : userMeta.role === 'admin' ? '🛡️' : '🏨')
    };

    await supabase.from('profiles').upsert([newProfile]);

    return {
      id: newProfile.id,
      name: newProfile.name,
      email: newProfile.email,
      role: newProfile.role,
      fssai: newProfile.fssai,
      location: newProfile.location,
      contactPerson: newProfile.contact_person,
      avatar: newProfile.avatar
    };
  },

  async signUp({ email, password, role, name, fssai, location, contactPerson, avatar }) {
    const cleanEmail = email.toLowerCase().trim();
    const chosenRole = role || 'provider';
    const chosenName = name || (chosenRole === 'provider' ? 'The Grand Oberoi Palace' : chosenRole === 'ngo' ? 'Robin Hood Army Fleet' : 'Feedall Compliance Admin');
    const chosenFssai = fssai || (chosenRole === 'provider' ? 'FSSAI-10020011004523' : 'FSSAI-21419550000312');
    const chosenLocation = location || 'New Delhi';
    const chosenContact = contactPerson || 'Authorized Officer';
    const chosenAvatar = avatar || (chosenRole === 'provider' ? '🏨' : chosenRole === 'ngo' ? '🤝' : '🛡️');

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          name: chosenName,
          role: chosenRole,
          fssai: chosenFssai,
          location: chosenLocation,
          contactPerson: chosenContact,
          avatar: chosenAvatar
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        throw new Error('This email is already registered. Please switch to "Sign In".');
      }
      throw new Error(error.message);
    }

    const userId = data.user?.id || `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

    // Create or update profile in public.profiles
    const newProfile = {
      id: userId,
      email: cleanEmail,
      name: chosenName,
      role: chosenRole,
      fssai: chosenFssai,
      location: chosenLocation,
      contact_person: chosenContact,
      avatar: chosenAvatar
    };

    try {
      await supabase.from('profiles').upsert([newProfile]);

      // If registered as an NGO, also add an application to ngo_verifications
      if (chosenRole === 'ngo') {
        const ngoAppId = `NGO-REG-${Math.floor(400 + Math.random() * 599)}`;
        const verificationRow = {
          id: ngoAppId,
          name: newProfile.name,
          registration_no: `REG-DL-${Math.floor(1000 + Math.random() * 9000)}`,
          fssai_license: newProfile.fssai,
          fssai_expiry: '2028-12-31',
          fleet_capacity_kg: '1,000 kg (2 Vans)',
          operating_zone: newProfile.location,
          trust_score: 95,
          status: 'Pending Approval',
          submitted_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          contact_person: newProfile.contact_person,
          email: newProfile.email,
          phone: '+91 98000 00000',
          documents: [
            { name: "FSSAI Registration Certificate.pdf", size: "1.2 MB", verified: true },
            { name: "Insulated Fleet Inspection Log.pdf", size: "850 KB", verified: true }
          ]
        };
        await supabase.from('ngo_verifications').insert([verificationRow]);
      }
    } catch (insertErr) {
      console.warn('Profile sync warning:', insertErr);
    }

    // Check if session was returned or if email confirmation is pending
    if (!data.session) {
      // Try immediate sign-in in case auto-confirm is active
      try {
        const signInRes = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });
        if (signInRes.data?.session && signInRes.data.user) {
          return {
            id: signInRes.data.user.id,
            name: newProfile.name,
            email: newProfile.email,
            role: newProfile.role,
            fssai: newProfile.fssai,
            location: newProfile.location,
            contactPerson: newProfile.contact_person,
            avatar: newProfile.avatar
          };
        }
      } catch (e) {
        // Fall through
      }

      return {
        requiresEmailConfirmation: true,
        message: 'Account created in Supabase! If email confirmation is enabled, please check your inbox and verify your email.',
        email: cleanEmail,
        name: newProfile.name,
        role: newProfile.role
      };
    }

    return {
      id: data.user.id,
      name: newProfile.name,
      email: newProfile.email,
      role: newProfile.role,
      fssai: newProfile.fssai,
      location: newProfile.location,
      contactPerson: newProfile.contact_person,
      avatar: newProfile.avatar
    };
  },

  async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session || !session.user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle();

      if (profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          fssai: profile.fssai,
          location: profile.location,
          contactPerson: profile.contact_person,
          avatar: profile.avatar
        };
      }

      const meta = session.user.user_metadata || {};
      return {
        id: session.user.id,
        email: session.user.email,
        name: meta.name || session.user.email.split('@')[0],
        role: meta.role || 'provider',
        fssai: meta.fssai || 'FSSAI-LIC-10020011004523',
        location: meta.location || 'New Delhi',
        contactPerson: meta.contactPerson || 'Authorized Officer',
        avatar: meta.avatar || (meta.role === 'ngo' ? '🤝' : meta.role === 'admin' ? '🛡️' : '🏨')
      };
    } catch (err) {
      console.error('Error fetching current user:', err);
      return null;
    }
  },

  async signOut() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  },

  // Backward compatibility helper
  async loginOrRegisterUser(params) {
    if (params.activeTab === 'signup') {
      return this.signUp(params);
    }
    return this.signIn(params);
  },

  // ==========================================
  // 2. PRODUCER / HOTEL DATA (Listings & Stats)
  // ==========================================
  async fetchFoodListings() {
    try {
      const { data, error } = await supabase
        .from('food_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialActiveListings;
      }
      return data.map(mapListingFromDb);
    } catch (err) {
      console.error('Error fetching food listings:', err);
      return initialActiveListings;
    }
  },

  async createFoodListing(listing) {
    try {
      const id = listing.id || `LIST-${Math.floor(100 + Math.random() * 900)}`;
      const row = {
        id,
        title: listing.title,
        category: listing.category,
        quantity_kg: listing.quantityKg,
        portions: listing.portions,
        prep_time: listing.prepTime,
        expiry_time: listing.expiryTime,
        expires_in_minutes: listing.expiresInMinutes || 45,
        cold_storage_required: listing.coldStorageRequired,
        dietary: listing.dietary,
        items: listing.items,
        status: listing.status || 'Pending Match',
        hotel_name: listing.hotelName,
        location: listing.location,
        loading_bay: listing.loadingBay,
        logged_at: 'Just now',
        assigned_ngo: null,
        driver_name: null,
        driver_eta: null,
        completed_at: null,
        temperature: listing.coldStorageRequired ? '3.5°C' : 'Ambient'
      };

      const { data, error } = await supabase
        .from('food_listings')
        .insert([row])
        .select()
        .single();

      // Also create an available NGO match so NGOs can immediately rescue it!
      const matchRow = {
        id: `MATCH-${Math.floor(800 + Math.random() * 199)}`,
        hotel_name: listing.hotelName,
        hotel_rating: '5.0 ★ Luxury Partner',
        fssai_verified: true,
        distance_km: '1.5 km',
        drive_time: '7 mins',
        category: listing.category,
        title: listing.title,
        quantity_kg: listing.quantityKg,
        portions: listing.portions,
        prep_time: listing.prepTime,
        best_before: listing.expiryTime,
        initial_seconds: (listing.expiresInMinutes || 45) * 60,
        cold_storage_required: listing.coldStorageRequired,
        dietary: listing.dietary,
        items_summary: listing.items,
        pickup_location: `${listing.hotelName}, ${listing.loadingBay}`,
        urgency_level: listing.expiresInMinutes < 30 ? 'URGENT' : 'HIGH',
        allergens: 'Standard safety segregation verified',
        contact_person: 'Kitchen Dispatch Lead',
        status: 'available'
      };

      await supabase.from('ngo_matches').insert([matchRow]);

      return data ? mapListingFromDb(data) : { ...listing, id };
    } catch (err) {
      console.error('Error creating food listing:', err);
      return listing;
    }
  },

  async updateListingStatus(listingId, updates) {
    try {
      const dbUpdates = {};
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.assignedNgo !== undefined) dbUpdates.assigned_ngo = updates.assignedNgo;
      if (updates.driverName !== undefined) dbUpdates.driver_name = updates.driverName;
      if (updates.driverEta !== undefined) dbUpdates.driver_eta = updates.driverEta;
      if (updates.completedAt !== undefined) dbUpdates.completed_at = updates.completedAt;
      if (updates.temperature !== undefined) dbUpdates.temperature = updates.temperature;

      const { data, error } = await supabase
        .from('food_listings')
        .update(dbUpdates)
        .eq('id', listingId)
        .select();

      return !error;
    } catch (err) {
      console.error('Error updating listing status in Supabase:', err);
      return false;
    }
  },

  async fetchProviderStats() {
    try {
      const { data, error } = await supabase
        .from('provider_stats')
        .select('*')
        .maybeSingle();

      if (error || !data) {
        return initialProviderStats;
      }

      return {
        hotelName: data.hotel_name,
        fssaiNumber: data.fssai_number,
        verifiedDate: data.verified_date,
        wasteDivertedKg: Number(data.waste_diverted_kg),
        wasteDivertedTrend: data.waste_diverted_trend,
        mealsSaved: Number(data.meals_saved),
        mealsSavedTrend: data.meals_saved_trend,
        co2AvoidedTons: Number(data.co2_avoided_tons),
        co2AvoidedTrend: data.co2_avoided_trend,
        taxCreditAccrued: data.tax_credit_accrued,
        foodSafetyScore: data.food_safety_score
      };
    } catch (err) {
      console.error('Error fetching provider stats:', err);
      return initialProviderStats;
    }
  },

  // ==========================================
  // 3. NGO DATA (Matches, Claims & Pickups)
  // ==========================================
  async fetchNgoMatches() {
    try {
      const { data, error } = await supabase
        .from('ngo_matches')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialNgoMatches;
      }
      return data.map(mapMatchFromDb);
    } catch (err) {
      console.error('Error fetching NGO matches:', err);
      return initialNgoMatches;
    }
  },

  async claimAndDispatchMatch(match, vehicleInfo = {}) {
    try {
      // 1. Update match status in database
      await supabase
        .from('ngo_matches')
        .update({ status: 'claimed' })
        .eq('id', match.id);

      // 2. Update food listings status
      await supabase
        .from('food_listings')
        .update({
          status: 'Accepted (Awaiting Pickup)',
          assigned_ngo: 'Robin Hood Army - Fleet 4',
          driver_name: vehicleInfo.driver || 'Rajesh Kumar (DL-1V-8902)',
          driver_eta: '8 mins away'
        })
        .ilike('title', `%${match.title}%`);

      // 3. Insert new pickup tracker
      const trackerId = `TRK-${Math.floor(900 + Math.random() * 99)}`;
      const newTrackerRow = {
        id: trackerId,
        match_id: match.id,
        hotel_name: match.hotelName,
        quantity_kg: match.quantityKg,
        portions: match.portions,
        category: match.category,
        current_step: 0,
        steps: [
          {
            title: "Van Dispatched",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            description: `Insulated Van dispatched to ${match.pickupLocation}`,
            driver: vehicleInfo.driver || "Rajesh Kumar (DL-1V-8902)",
            driverPhone: "+91 98101 22345",
            status: "active"
          },
          {
            title: "Arrived at Loading Bay",
            time: "Pending",
            description: `Arrival at ${match.hotelName}. Digital cold-chain probe check.`,
            tempRecorded: "Target < 4.0°C",
            status: "pending"
          },
          {
            title: "Collected & En Route to Shelter",
            time: "Pending",
            description: "Digital handover OTP verification, departing to verified community kitchen",
            destination: "Nirmal Seva Child Nutrition Center (160 Portions)",
            status: "pending"
          }
        ]
      };

      const { data: trackerData } = await supabase
        .from('pickup_trackers')
        .insert([newTrackerRow])
        .select()
        .single();

      return trackerData ? mapTrackerFromDb(trackerData) : {
        id: trackerId,
        matchId: match.id,
        hotelName: match.hotelName,
        quantityKg: match.quantityKg,
        portions: match.portions,
        category: match.category,
        currentStep: 0,
        steps: newTrackerRow.steps
      };
    } catch (err) {
      console.error('Error claiming and dispatching match:', err);
      return null;
    }
  },

  async fetchPickupTrackers() {
    try {
      const { data, error } = await supabase
        .from('pickup_trackers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialPickupTrackers;
      }
      return data.map(mapTrackerFromDb);
    } catch (err) {
      console.error('Error fetching pickup trackers:', err);
      return initialPickupTrackers;
    }
  },

  async updatePickupTrackerStep(trackerId, currentStep, steps) {
    try {
      await supabase
        .from('pickup_trackers')
        .update({
          current_step: currentStep,
          steps: steps
        })
        .eq('id', trackerId);
      return true;
    } catch (err) {
      console.error('Error updating pickup tracker step:', err);
      return false;
    }
  },

  // ==========================================
  // 4. ADMIN OVERSIGHT & NGO VERIFICATION
  // ==========================================
  async fetchNgoVerifications() {
    try {
      const { data, error } = await supabase
        .from('ngo_verifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialVerificationQueue;
      }
      return data.map(mapVerificationFromDb);
    } catch (err) {
      console.error('Error fetching NGO verification queue:', err);
      return initialVerificationQueue;
    }
  },

  async updateNgoVerificationStatus(id, status) {
    try {
      await supabase
        .from('ngo_verifications')
        .update({ status })
        .eq('id', id);
      return true;
    } catch (err) {
      console.error('Error updating NGO verification status:', err);
      return false;
    }
  },

  async fetchAdminStats() {
    try {
      const { data, error } = await supabase
        .from('admin_stats')
        .select('*')
        .maybeSingle();

      if (error || !data) {
        return globalAdminStats;
      }

      return {
        totalWasteSavedKg: Number(data.total_waste_saved_kg),
        totalWasteMonthlyGrowth: data.total_waste_monthly_growth,
        totalMealsDistributed: Number(data.total_meals_distributed),
        activeHotels: data.active_hotels,
        activeNgos: data.active_ngos,
        safetyComplianceRate: data.safety_compliance_rate,
        totalCo2eAvoidedTons: Number(data.total_co2e_avoided_tons),
        citiesActive: data.cities_active,
        averagePickupMins: Number(data.average_pickup_mins)
      };
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      return globalAdminStats;
    }
  },

  // ==========================================
  // 5. FEEDBACKS & REVIEWS
  // ==========================================
  async fetchFeedbacks() {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialFeedbacks;
      }
      return data.map(mapFeedbackFromDb);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      return initialFeedbacks;
    }
  },

  async createFeedback(feedback) {
    try {
      const id = feedback.id || `FB-${Math.floor(500 + Math.random() * 499)}`;
      const row = {
        id,
        author_name: feedback.authorName,
        author_role: feedback.authorRole,
        author_badge: feedback.authorBadge || 'Verified Partner',
        target_entity: feedback.targetEntity,
        rating: feedback.rating || 5,
        category: feedback.category,
        temp_verified: feedback.tempVerified,
        meals_delivered: Number(feedback.mealsDelivered) || 0,
        impact_note: feedback.impactNote,
        feedback_text: feedback.feedbackText,
        date_str: feedback.date || 'Just now',
        gratitude_count: 0,
        has_liked: false,
        verified_handover: true
      };

      const { data, error } = await supabase
        .from('feedbacks')
        .insert([row])
        .select()
        .single();

      return data ? mapFeedbackFromDb(data) : { ...feedback, id };
    } catch (err) {
      console.error('Error creating feedback:', err);
      return feedback;
    }
  },

  async toggleGratitude(id, hasLiked, newCount) {
    try {
      await supabase
        .from('feedbacks')
        .update({
          has_liked: hasLiked,
          gratitude_count: newCount
        })
        .eq('id', id);
      return true;
    } catch (err) {
      console.error('Error toggling gratitude:', err);
      return false;
    }
  }
};
