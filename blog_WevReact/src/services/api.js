import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Using Vite proxy instead of hardcoded URL

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Example API calls
export const authAPI = {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData)
};

export const blogAPI = {
    getAllBlogs: () => api.get('/api/blog'),
    getBlogById: (id) => api.get(`/api/blog/${id}`),
    getBlogsByCategory: (categoryId) => api.get(`/api/blog/category/${categoryId}`)
};

export const categoryAPI = {
    getAllCategories: () => api.get('/api/category'),
    getCategoryById: (id) => api.get(`/api/category/${id}`),
    createCategory: (data) => api.post('/api/category', data),
    updateCategory: (id, data) => api.put(`/api/category/${id}`, data),
    deleteCategory: (id) => api.delete(`/api/category/${id}`)
};

export default api;