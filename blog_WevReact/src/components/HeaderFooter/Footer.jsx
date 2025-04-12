import "./HeaderFooter.css" 
let Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <span>© 2025 Blog. All rights reserved.</span>
                <div className="social-icons d-flex justify-content-center gap-3">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
