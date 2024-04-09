import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


function EditProfilePage() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        provincia: '',
        // Altri campi del profilo dell'utente
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5199/api/Users/Get-user-id/${userID}`);

            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            Navigate('/login');
            alert('Si è verificato un errore durante il caricamento del profilo. Ti preghiamo di effettuare nuovamente l\'accesso.');
            Navigate('/login');
            console.log('Redirecting to login page...');
            console.log('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/profile', userData); // Modifica l'URL API in base alla tua configurazione
            console.log('Modifiche al profilo salvate con successo!');
        } catch (error) {
            console.error('Errore durante il salvataggio del profilo:', error);
        }
    };

    if (loading) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Modifica Profilo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Cognome</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="provincia" className="form-label">Provincia di residenza</label>
                    <input type="text" className="form-control" id="provincia" name="provincia" value={userData.provincia} onChange={handleChange} />
                </div>
                {/* Aggiungi altri campi del profilo qui */}
                <button type="submit" className="btn btn-primary">Salva Modifiche</button>
            </form>
        </div>
    );
}

export default EditProfilePage;
