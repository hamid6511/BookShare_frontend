import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="logo-container me-2">
                        <img src="/logo.png" alt="Logo" style={{ height: '30px', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', border: '2px solid white' }} />
                    </div>
                    REadCycle
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <div className="d-flex">
                        <Link className="btn btn-outline-success me-2" to="/login">Sign In</Link>
                        <Link className="btn btn-success" to="/registrazione">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

