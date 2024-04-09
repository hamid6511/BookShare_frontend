import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isUser }) {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const closeProfileMenu = (event) => {
        if (!profileRef.current.contains(event.target)) {
            setProfileOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeProfileMenu);

        return () => {
            document.removeEventListener('mousedown', closeProfileMenu);
        };
    }, []);

    const handleLogout = async () => {
        navigate('/');
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Errore durante il logout');
            }
        } catch (error) {
            console.error('Errore durante la chiamata API per il logout:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5d787d' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="logo-container me-2">
                        <img src="/logo.png" alt="Logo" style={{ height: '30px', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', border: '2px solid white' }} />
                    </div>
                    REadCycle
                </Link>
                <button className="navbar-toggler" type="button" onClick={() => setProfileOpen(!isProfileOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-end ${isProfileOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav">
                        {isUser && (
                            <li className="nav-item me-3">
                                <Link to="/chat" className="nav-link">Chat</Link>
                            </li>
                        )}
                        <li className="nav-item dropdown" ref={profileRef}>
                            <button className="nav-link dropdown-toggle" onClick={() => setProfileOpen(!isProfileOpen)}>
                                User
                            </button>
                            <div className={`dropdown-menu ${isProfileOpen ? 'show' : ''}`}>
                                {isUser ? (
                                    <>
                                        <Link to="/profilo" className="dropdown-item" onClick={() => setProfileOpen(false)}>Gestisci il Profilo</Link>
                                        <hr className="dropdown-divider" />
                                        <Link to="/userBooks" className="dropdown-item" onClick={() => setProfileOpen(false)}>I miei libri</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/admin/books" className="dropdown-item" onClick={() => setProfileOpen(false)}>Gestisci Libri</Link>
                                        <hr className="dropdown-divider" />
                                        <Link to="/admin/users" className="dropdown-item" onClick={() => setProfileOpen(false)}>Gestisci Utenti</Link>
                                    </>
                                )}
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
