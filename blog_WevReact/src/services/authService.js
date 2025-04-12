import axios from 'axios';

// Create axios instance with default config
const API_URL = import.meta.env.VITE_API_URL; // Using Vite proxy instead of hardcoded URL
const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Initialize user from localStorage
let user = JSON.parse(localStorage.getItem('user'));
if (user?.token) {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}

const login = async (userData) => {
    try {
        const response = await authAxios.post('/api/auth/login', userData);
        const { data } = response;
        
        if (data.errCode === 0) {
            const userInfo = {
                id: data.data.id,
                email: data.data.email,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                token: data.token
            };
            
            // Update local state
            user = userInfo;
            localStorage.setItem('user', JSON.stringify(userInfo));
            authAxios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            return { success: true, data: userInfo };
        } else {
            return { success: false, error: data.message || 'Login failed' };
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'An error occurred during login'
        };
    }
}

const register = async (userData) => {
    try {
        const response = await authAxios.post('/api/auth/register', userData);
        const { data } = response;
        
        if (data.errCode === 0) {
            return { success: true, data: data.data };
        } else {
            return { success: false, error: data.message || 'Registration failed' };
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'An error occurred during registration'
        };
    }
}

const logout = () => {
    // Clear user data
    user = null;
    localStorage.removeItem('user');
    
    // Clear authorization header
    delete authAxios.defaults.headers.common['Authorization'];
}

const getCurrentUser = () => {
    return user;
}

const authService = {
    login,
    register,
    logout,
    getCurrentUser
};

export default authService;
