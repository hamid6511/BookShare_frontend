import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoginForm from '../components/Login';
import { Button, Modal } from 'react-bootstrap';


function Registrazione() {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [UserName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleLogin = () => {
        setShowLoginModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Le password non corrispondono");
            return;
        }

        // Implementa la logica di registrazione qui
        console.log('Registrazione avviata...');
    };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            setErrorMessage('Indirizzo email non valido');
            setShowError(true);
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage("La password deve contenere almeno 8 caratteri, di cui almeno un carattere minuscolo, uno maiuscolo, un numero e un carattere speciale.");
            return;
        }
        const fullName = `${Name} ${lastName}`;
        try {
            const response = await fetch('http://localhost:5199/api/Authentication/Registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Name: fullName, City, State, email, password })
            });

            if (response.ok) {
                alert('Registrazione riuscita. Si sprega di effettuare il Login');
                navigate('/');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            setErrorMessage('Errore durante la registrazione. Si prega di riprovare.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 position-relative" style={{ backgroundImage: `url('registratiIMG.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="text-center text-white ">
                            <h1>Inizia la tua avventura con REadCycle!</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ background: 'linear-gradient(to top right, rgb(250, 252, 253), rgb(192, 197, 196), rgb(150, 210, 193))' }}>
                    <div className="container">
                        <br /> <div className="text-center mb-2">
                            <span>Hai già un account? </span>
                            <button className="btn btn-link" onClick={handleLogin}>Accedi</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="Name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="Name" value={Name} onChange={(event) => setFirstName(event.target.value)} required
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="lastName" className="form-label">Cognome</label>
                                <input type="text" className="form-control" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="City" className="form-label">Comune di residenza</label>
                                <input type="text" className="form-control" id="City" value={City} onChange={(event) => setCity(event.target.value)} required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="State" className="form-label">Provincia di residenza</label>
                                <input type="text" className="form-control" id="State" value={State} onChange={(event) => setState(event.target.value)} required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                                <div className="input-group">
                                    <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg" onClick={handleRegister} >Registrati</button><br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className="modal-xl">
                <Modal.Header closeButton>
                    <h3 >Registrati</h3>
                </Modal.Header>
                <Modal.Body >
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Registrazione;
