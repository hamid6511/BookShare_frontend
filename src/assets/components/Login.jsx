import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate('/user-home');// questo è solo per prova da togliere dopo
        try {
            const response = await fetch('URL_DEL_TUO_BACKEND/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate('/user_Home');
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Errore durante il login:', error);
            setErrorMessage('Errore durante il login. Si prega di riprovare.');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        navigate('/registrazione');
    };

    const handleFacebookLogin = () => {
        // Implementa la logica per l'accesso con Facebook
        console.log('Facebook login clicked');
    };

    return (
        <>
            <div className="container-fluid mt-5" style={{ background: 'linear-gradient(to top right, rgb(250, 252, 253), rgb(192, 197, 196), rgb(150, 210, 193)', maxHeight: '80vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center"><br /> <br />
                            <h1>Accedi a REadCycle!</h1>
                            <br /> <br />
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
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button className="btn btn-link" onClick={handleForgotPassword}>Hai dimenticato la password?</button>
                                <br />
                            </div>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-success btn-lg w-100">Accedi</button><br /><br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-center">
                <div>
                    <span>Non hai un account? </span>
                    <button className="btn btn-link" onClick={handleRegister}>Registrati</button>
                </div>
            </div>
        </>
    );
}

export default Login;
