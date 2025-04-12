import img1 from '../../assets/images/Nakiri-Ayame_list_thumb.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import authService from '../../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
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
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate password requirements
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z]).{8,100}$/;
        if (!passwordRegex.test(formData.password)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character');
            return;
        }
        
        try {
            // Only send email and password to the backend
            const response = await authService.register({
                email: formData.email,
                password: formData.password
            });
            
            if (response.status === 200) {
                alert('Registration successful!');
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data.message || 'Registration failed!');
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container container-fluid container">
            <div className="row min-vh-100 align-items-center">
                <div className="col-md-6 text-center d-none d-md-block">
                    <img src={img1} alt="Sample" className="img-fluid login-image" />
                </div>

                <div className="col-md-6 px-5">
                    <h2 className="mb-4 text-center">Create Account ✨</h2>

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

                        <div className="text-center mb-3">— or register with email —</div>

                        <div className="form-group mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="agreeToTerms">
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff' }}>
                                Register
                            </button>
                        </div>

                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
