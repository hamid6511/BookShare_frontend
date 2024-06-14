import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Menu from './Menu';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function EditProfilePage() {
    const [UserName, setUserName] = useState('');
    const [userId, setuserId] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            if (userIdFromToken) {
                setuserId(userIdFromToken);
            }
        }
    }, []);
    useEffect(() => {
        // console.log("userId", userId); // Sposta qui il log di userId
        fetchUserProfile();
    }, [userId]);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        confirmPassword: '',
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5199/api/Users/Get-user-id/` + userId);
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            Navigate('/login');
            alert('Si è verificato un errore durante il caricamento del profilo. Ti preghiamo di effettuare nuovamente l\'accesso.');
            Navigate('/login');
            console.log('Redirecting to login page...');
            console.log('Error:', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Le password non corrispondono");
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Indirizzo email non valido');
            setShowError(true);
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage("La password deve contenere almeno 8 caratteri, di cui almeno un carattere minuscolo, uno maiuscolo, un numero e un carattere speciale.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5199/api/Users/update-user-by-id/` + userId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to save profile changes');
            }

            console.log('Modifiche al profilo salvate con successo!');
        } catch (error) {
            console.error('Errore durante il salvataggio del profilo:', error);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    return (
        <>
            <Menu userName={userData.name} isUser={true} />
            <div className="container mt-5">
                <h1>Modifica il tuo Profilo</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nome e Cognome</label>
                                <input type="text" className="form-control" id="username" name="username" value={userData.name} onChange={(event) => setUserName(event.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={(event) => setEmail(event.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comune" className="form-label">Comune di Residenza</label>
                                <input type="text" className="form-control" id="comune" name="comune" value={userData.city} onChange={(event) => setCity(event.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="provincia" className="form-label">Provincia di Residenza</label>
                                <input type="text" className="form-control" id="provincia" name="provincia" value={userData.state} onChange={(event) => setState(event.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                                    <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                                <div className="input-group">
                                    <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                                    <button className="btn btn-outline-secondary" type="button" onClick={toggleConfirmPasswordVisibility}>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <button type="submit" className="btn btn-primary">Salva Modifiche</button>
                        </form>
                    </div>
                </div>
            </div>
        </>


    );
}

export default EditProfilePage;
