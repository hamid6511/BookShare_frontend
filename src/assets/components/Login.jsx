import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import RegistrationForm from '../components/Registrazione'; // Importa la componente della form di registrazione

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5199/api/Authentication/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const token = await response.text(); // Ottieni il token come testo dalla risposta
                localStorage.setItem('token', token);

                navigate('/user-home');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Errore durante il login');
            }
        } catch (error) {
            alert('Errore durante la richiesta di login.');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        setShowRegistrationModal(true);
    };


    const handleFacebookLogin = () => {
        console.log('Facebook login clicked');
    };

    return (
        <>
            <div className="container-fluid " style={{ background: 'linear-gradient(to top right, rgb(250, 252, 253), rgb(192, 197, 196), rgb(150, 210, 193)', maxHeight: errorMessage ? '100vh' : '80vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center"><br /> <br />
                            <h1>Accedi a REadCycle!</h1>
                            <br />
                            <button className="btn btn-primary btn-lg w-100" onClick={handleFacebookLogin}>
                                <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Accedi con Facebook
                            </button>
                            <br /> <br />
                            <p className="lead">Oppure<br /></p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Email </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>


                            <div className="mb-3">
                                <label>Password </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                <button className="btn btn-link" onClick={handleForgotPassword}>Hai dimenticato la password?</button>
                                <br />
                            </div>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <div className="text-center" style={{ marginTop: errorMessage ? "40px" : "0" }}>
                                <button type="submit" className="btn btn-success btn-lg w-100">Accedi</button>
                                <br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-center">
                <div style={{ marginTop: errorMessage ? "40px" : "0" }}>
                    <span>Non hai un account? </span>
                    <button className="btn btn-link" onClick={handleRegister}>Registrati</button>
                </div>
            </div>
            <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)} className="modal-xl">
                <Modal.Header closeButton>
                    <h3 >Registrati</h3>
                </Modal.Header>
                <Modal.Body >
                    <RegistrationForm />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
