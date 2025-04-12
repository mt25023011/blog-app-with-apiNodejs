import React from 'react';
import img1 from '../assets/images/Nakiri-Ayame_list_thumb.png'
const Home = () => {
    return (
        <>
            <hr className="my-0 border-top border-dark" />
            <div className="container py-4">
                <div className="row g-4">
                    {/* Left Sidebar */}
                    <div className="col-lg-3">
                        {[1, 2].map((item, idx) => (
                            <div className="card mb-4 shadow-sm" key={idx}>
                                <img src={img1} alt="Card" className="card-img-top img-thumbnail" />
                                <div className="card-body">
                                    <h5 className="card-title">Quá trình của thất bại</h5>
                                    <p className="card-text">Vậy lúc nào tôi có thể thể hiện sự thất bại củ...</p>
                                    <p className="text-muted mb-2">Mar 30 • Khải Đơn</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-light">
                                            <i className="fas fa-heart me-1"></i> <span>100</span>
                                        </button>
                                        <button className="btn btn-light">
                                            <i className="fas fa-comment me-1"></i> <span>100</span>
                                        </button>
                                        <button className="btn btn-light">
                                            <i className="fa-solid fa-rotate"></i>
                                        </button>
                                        <button className="btn btn-light">
                                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-6">
                        <div className="card shadow mb-4">
                            <img src={img1} alt="Card" className="card-img-top img-thumbnail" />
                            <div className="card-body">
                                <h5 className="card-title">Quá trình của thất bại</h5>
                                <p className="card-text">Vậy lúc nào tôi có thể thể hiện sự thất bại củ...</p>
                                <p className="text-muted mb-2">Mar 30 • Khải Đơn</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-light">
                                        <i className="fas fa-heart me-1"></i> <span>100</span>
                                    </button>
                                    <button className="btn btn-light">
                                        <i className="fas fa-comment me-1"></i> <span>100</span>
                                    </button>
                                    <button className="btn btn-light">
                                        <i className="fa-solid fa-rotate"></i>
                                    </button>
                                    <button className="btn btn-light">
                                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Most Popular */}
                    <div className="col-lg-3">
                        <div className="bg-white p-3 border rounded shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="fw-bold">Most Popular</span>
                                <a href="#" className="text-decoration-none small text-primary">View All</a>
                            </div>

                            <div className="d-flex border-bottom pb-3 mb-3">
                                <div className="me-3">
                                    <img src={img1} alt="Thumb" className="img-thumbnail" style={{ width: "80px" }} />
                                </div>
                                <div>
                                    <h6 className="mb-1">Quá trình của thất bại</h6>
                                    <p className="mb-0 small text-muted">Vậy lúc nào tôi có thể thể hiện...</p>
                                    <small className="text-muted">Mar 30 • Khải Đơn</small>
                                </div>
                            </div>

                            <div className="d-flex border-bottom pb-3 mb-3">
                                <div className="me-3">
                                    <img src={img1} alt="Thumb" className="img-thumbnail" style={{ width: "80px" }} />
                                </div>
                                <div>
                                    <h6 className="mb-1">Quá trình của thất bại</h6>
                                    <p className="mb-0 small text-muted">Vậy lúc nào tôi có thể thể hiện...</p>
                                    <small className="text-muted">Mar 30 • Khải Đơn</small>
                                </div>
                            </div>

                            <div className="d-flex pb-3">
                                <div className="me-3">
                                    <img src={img1} alt="Thumb" className="img-thumbnail" style={{ width: "80px" }} />
                                </div>
                                <div>
                                    <h6 className="mb-1">Quá trình của thất bại</h6>
                                    <p className="mb-0 small text-muted">Vậy lúc nào tôi có thể thể hiện...</p>
                                    <small className="text-muted">Mar 30 • Khải Đơn</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home; 