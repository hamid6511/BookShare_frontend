import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa il componente Link

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica che le password corrispondano
        if (password !== confirmPassword) {
            setErrorMessage("Le password non corrispondono");
            return;
        }

        try {
            // Invia la richiesta al backend per reimpostare la password
            const response = await axios.post('URL_DEL_TUO_BACKEND/reset-password', { password });

            if (response.status === 200) {
                setSuccessMessage('Password reimpostata con successo!');
            }
        } catch (error) {
            console.error('Errore durante il reset della password:', error);
            setErrorMessage('Si è verificato un errore durante il reset della password. Si prega di riprovare.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Reimposta Password</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Nuova Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <p className="text-muted">La password deve contenere almeno 8 caratteri, includere almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale.</p>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-5 py-3">Reimposta Password</button>
                                    {successMessage && (
                                        <p className="mt-3">Password reimpostata con successo! <Link to="/successful-reset">Accedi</Link></p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
