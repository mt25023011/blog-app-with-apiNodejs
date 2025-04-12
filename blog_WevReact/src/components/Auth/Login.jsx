import img1 from '../../assets/images/Nakiri-Ayame_list_thumb.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import authService from '../../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(formData);
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        // This effect runs when the component mounts
        console.log('Login component mounted');
        
        // Cleanup function
        return () => {
            console.log('Login component unmounted');
        };
    }, []); // Empty dependency array since we don't use any variables from the component

    return (
        <div className="login-container container-fluid container">
            <div className="row min-vh-100 align-items-center">
                <div className="col-md-6 text-center d-none d-md-block">
                    <img src={img1} alt="Sample" className="img-fluid login-image" />
                </div>

                <div className="col-md-6 px-5">
                    <h2 className="mb-4 text-center">Welcome Back 👋</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center gap-3 mb-4">
                            <button type="button" className="btn btn-outline-primary">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button type="button" className="btn btn-outline-info">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button type="button" className="btn btn-outline-primary">
                                <i className="fab fa-linkedin-in"></i>
                            </button>
                        </div>

                        <div className="text-center mb-3">— or login with email —</div>

                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff' }}>
                                Login
                            </button>
                        </div>

                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/register" className="text-danger">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
