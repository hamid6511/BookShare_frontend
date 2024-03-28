import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResetPassword from './ResetPassword'; // Assicurati di importare correttamente il componente ResetPassword

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('URL_DEL_TUO_BACKEND/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setEmailSent(true);
                setMessage('Email di reset della password inviata con successo!');

            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Errore durante la richiesta di reset della password:', error);
            setMessage('Errore durante la richiesta di reset della password. Si prega di riprovare.');
        }
    };
    if (emailSent) {
        return <ResetPassword />;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Recupero Password</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Inserisci il tuo indirizzo email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                        placeholder="Esempio: tuo@email.com"
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-5 py-3">Invia richiesta</button>
                                </div>
                            </form>
                            {message && (
                                <div className="alert alert-success mt-4 text-center" role="alert">
                                    <strong>Email di reset della password inviata con successo!</strong> Controlla la tua casella di posta.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ForgotPassword;
