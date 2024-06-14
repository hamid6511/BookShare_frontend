import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/Registrazione';
import useAuth from '../user/UserAuth';

function Navbar() {
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const navigate = useNavigate();


    const handleSignInClick = () => {
        if (isAuthenticated) {
            navigate('/user-home');
        } else {
            setShowLoginModal(true);
        }
    };

    const handleSignUpClick = () => {
        setShowRegistrationModal(true);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
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
                        <Button variant="outline-success" className="me-2" onClick={handleSignInClick}>Sign In</Button>
                        <Button variant="success" onClick={handleSignUpClick}>Sign Up</Button>
                    </div>
                </div>
            </div>


            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className="modal-xl">
                <Modal.Header closeButton>
                    <h3 >Effettua l'accesso</h3>
                </Modal.Header>
                <Modal.Body >
                    <LoginForm />
                </Modal.Body>
            </Modal>

            <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)} className="modal-xl">
                <Modal.Header closeButton>
                    <h3 >Registrati</h3>
                </Modal.Header>
                <Modal.Body >
                    <RegistrationForm />
                </Modal.Body>
            </Modal>
        </nav>
    );
}

export default Navbar;
