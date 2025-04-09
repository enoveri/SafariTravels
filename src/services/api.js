// API service for fetching data from the endpoints

const BASE_URL = 'http://54.210.95.246:3005/api/v1';
const AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjU0LCJpYXQiOjE3MjQxMzc2NzgsImV4cCI6MTcyOTMyMTY3OCwiaXNzIjoidXJuOmlzc3VlciJ9.ktWmxeC4NqHv1_W0qKt0avlCaDPBNivvDStv6BwHu9K5Geq9TegxH-S1cPfiRhcGdH30YUg1iDShFNOW7mBSwoKsVMMzWJfaqlN0aG1ELh3m9EL-GepR6gxQ5YkZQ9WfBGeoRDNHyYtq02ajgbRLrueuovCf5Nz9iu-ig0onh9XnZJ7J1kEQF3C6gjB0jLqJ8UcWY72S_O0_6tfq8lFuAXQjYbonMCAsx_hG-wJkmE8hlfcgN6BlcemZq-cTghJVNswBmzSoqgTEW1UnBYVoVOyptFQfVFOjdpRUaAlE4R0JHoRfFLR9vsxxvO5Y_x3Z8Eqfcq7O2CPGGPG_5yxt7w';

// Helper function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken') || AUTH_TOKEN;

const getHeaders = () => {
  return {
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  };
};

// Authentication APIs
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Login failed' 
      };
    }
    
    return {
      success: true,
      token: data.token,
      user: data.user
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error during login' 
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Registration failed' 
      };
    }
    
    return {
      success: true,
      message: data.message || 'Registration successful'
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error during registration' 
    };
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      headers: getHeaders()
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Failed to fetch user profile' 
      };
    }
    
    return {
      success: true,
      user: data.user || data.data
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { 
      success: false, 
      error: error.message || 'Network error fetching profile' 
    };
  }
};

export const logoutUser = async () => {
  try {
    // Optional: Call logout endpoint if server-side logout is required
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: true }; // Return success anyway as we'll clear local storage
  }
};

// Events APIs
export const fetchAllEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/all-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch all events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all events:', error);
    console.error('Error fetching summer events:', error);
    throw error;
  }
};

// Add missing API functions that are being imported
export const fetchHighlightedEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/highlighted-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch highlighted events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching highlighted events:', error);
    throw error;
  }
};

export const fetchSnowTreksEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/snow-treks-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch snow treks events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching snow treks events:', error);
    throw error;
  }
};

export const fetchSummerEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/summer-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch summer events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching summer events:', error);
    throw error;
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${BASE_URL}/testimonials`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const fetchMonsoonEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/monsoon-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch monsoon events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching monsoon events:', error);
    throw error;
  }
};

export const fetchEpicAdventureEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/epic-adventure-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch epic adventure events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching epic adventure events:', error);
    throw error;
  }
};

export const fetchSpecialEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events/special-events`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch special events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching special events:', error);
    throw error;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, { headers: getHeaders() });
    if (!response.ok) throw new Error(`Failed to fetch event with ID: ${eventId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

// Team API
export const fetchTeamMembers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/team`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch team members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Info APIs
export const fetchAboutUsInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/info/about-us`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch about us information');
    return await response.json();
  } catch (error) {
    console.error('Error fetching about us information:', error);
    throw error;
  }
};

export const fetchPrivacyPolicy = async () => {
  try {
    const response = await fetch(`${BASE_URL}/info/privacy-policy`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch privacy policy');
    return await response.json();
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    throw error;
  }
};

export const fetchTermsCondition = async () => {
  try {
    const response = await fetch(`${BASE_URL}/info/terms-condition`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch terms and conditions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    throw error;
  }
};

// Contact API
export const fetchContactInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch contact information');
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact information:', error);
    throw error;
  }
}; 