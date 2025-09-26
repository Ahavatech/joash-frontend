const API_BASE_URL = 'https://joash-backend.onrender.com/api';

// Types for API responses
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutData {
  title: string;
  description: string;
  profileImage: string;
  skills: string[];
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Social {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// API functions
export const api = {
  // Hero section
  getHero: async (): Promise<HeroData> => {
    const response = await fetch(`${API_BASE_URL}/hero`);
    if (!response.ok) throw new Error('Failed to fetch hero data');
    return response.json();
  },

  updateHero: async (data: HeroData, token: string): Promise<HeroData> => {
    const response = await fetch(`${API_BASE_URL}/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update hero data');
    return response.json();
  },

  // About section
  getAbout: async (): Promise<AboutData> => {
    const response = await fetch(`${API_BASE_URL}/about`);
    if (!response.ok) throw new Error('Failed to fetch about data');
    return response.json();
  },

  updateAbout: async (data: AboutData, token: string): Promise<AboutData> => {
    const response = await fetch(`${API_BASE_URL}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update about data');
    return response.json();
  },

  // Technologies
  getTechnologies: async (): Promise<Technology[]> => {
    const response = await fetch(`${API_BASE_URL}/technologies`);
    if (!response.ok) throw new Error('Failed to fetch technologies');
    return response.json();
  },

  updateTechnologies: async (data: Technology[], token: string): Promise<Technology[]> => {
    const response = await fetch(`${API_BASE_URL}/technologies`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update technologies');
    return response.json();
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  createProject: async (data: Omit<Project, 'id'>, token: string, imageFile?: File): Promise<Project> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'technologies' && Array.isArray(value)) {
        formData.append(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  updateProject: async (id: string, data: Partial<Project>, token: string, imageFile?: File): Promise<Project> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'technologies' && Array.isArray(value)) {
        formData.append(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  deleteProject: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete project');
  },

  // Social links
  getSocials: async (): Promise<Social[]> => {
    const response = await fetch(`${API_BASE_URL}/socials`);
    if (!response.ok) throw new Error('Failed to fetch social links');
    return response.json();
  },

  updateSocials: async (data: Social[], token: string): Promise<Social[]> => {
    const response = await fetch(`${API_BASE_URL}/socials`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update social links');
    return response.json();
  },

  // Contact
  submitContact: async (data: ContactMessage): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit contact message');
  },

  // Authentication
  login: async (username: string, password: string): Promise<{ token: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  logout: async (token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to logout');
  },
};