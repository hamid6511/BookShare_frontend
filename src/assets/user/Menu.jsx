import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Esegui una chiamata API per ottenere il nome utente dal backend
        fetch('api/user')
            .then(response => response.json())
            .then(data => setUsername(data.username))
            .catch(error => console.error('Error fetching username:', error));
    }, []); // Assicurati di fornire un array vuoto come secondo argomento per eseguire l'effetto solo una volta al caricamento del componente

    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="logo-container me-2">
                        <img src="/logo.png" alt="Logo" style={{ height: '30px', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', border: '2px solid white' }} />
                    </div>
                    REadCycle
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleProfile}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-end ${isProfileOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" onClick={toggleProfile}>
                                {username || 'User'}
                            </button>
                            <div className={`dropdown-menu ${isProfileOpen ? 'show' : ''}`}>
                                <Link to="/profilo" className="dropdown-item" onClick={toggleProfile}>Gestisci il Profilo</Link>
                                <Link to="/impostazioni" className="dropdown-item" onClick={toggleProfile}>Impostazioni</Link>
                                <Link to="/altro" className="dropdown-item" onClick={toggleProfile}>Altro</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
