import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Funzione per verificare se l'utente è autenticato
        const checkAuthentication = () => {
            // Controlla se il token è presente nel localStorage
            const token = localStorage.getItem('token');
            if (token) {
                // Se il token è presente, imposta isAuthenticated a true
                setIsAuthenticated(true);
            } else {
                // Altrimenti, imposta isAuthenticated a false
                setIsAuthenticated(false);
            }
        };

        // Chiama la funzione di verifica dell'autenticazione al caricamento della pagina
        checkAuthentication();
    }, []);

    // Funzione per eseguire il logout
    const logout = () => {
        // Rimuovi il token dal localStorage
        localStorage.removeItem('token');
        // Imposta isAuthenticated a false
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout };
}

export default useAuth;
