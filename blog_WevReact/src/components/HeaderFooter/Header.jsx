import logo from '../../assets/images/Nakiri-Ayame_list_thumb.png'
import React from 'react';
import { Link } from 'react-router-dom';
import "./HeaderFooter.css"
import Navigation from '../Navigation';
const Header = () => {
    return (
        <>
            <header className="py-3 bg-green-500">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4 d-flex align-items-center">
                            <Link to="/">
                                <img src={logo} alt="logo" className="img-fluid me-2" style={{ width: '60px' }} />
                                <span className="fs-5 text-black fw-bold text-decoration-none">Khải Đơn</span>
                            </Link>
                        </div>
                        <div className="col-md-8">
                            <nav>
                                <ul className="nav justify-content-end align-items-center gap-3">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link text-black">
                                            <i className="fa-solid fa-search"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link text-black">
                                            <i className="fa-solid fa-share-nodes"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-info">
                                            Subscribe
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-success">
                                            <Link to="/login" className="text-decoration-none text-black">Sign In</Link>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </header>
            <hr className="my-0 border-top border-dark" />
            <nav className="navbar navbar-expand-lg bg-green-500">
                <div className="container ">
                    <Navigation />
                </div>
            </nav>
        </>
    )
}

export default Header