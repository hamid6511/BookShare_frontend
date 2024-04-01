import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAuth from '../../hooks/userAuth';

function BookCard({ book }) {
    const [contatta, setContatta] = useState(false);
    const { isAuthenticated } = userAuth();

    const handleContatta = () => {
        // Qui puoi implementare la logica per contattare l'utente che ha pubblicato il libro
        // Aggiorna lo stato per indicare che l'utente è stato contattato
        setContatta(true);
    };

    const handleContattaClick = () => {
        if (!isAuthenticated) {
            // Reindirizza l'utente alla pagina di login se non è autenticato
            // Utilizza il componente Link per navigare alla pagina di login
            return <Link to="/login">Login</Link>;
        } else {
            // Implementa la logica per contattare l'utente
            handleContatta();
        }
    };

    return (
        <div className="card mb-3" style={{ background: '#f0f0f0', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
            <img src={book.cover} className="card-img-top mx-auto mt-3 rounded" alt={book.title} style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
            <div className="card-body">
                <h5 className="card-title text-center">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><small className="text-muted">Autore: {book.author}</small></p>
                    <p className="card-text"><small className="text-muted">Pubblicato nel {book.yearPublished}</small></p>
                </div>
            </div>
            <div className="card-footer text-muted d-flex justify-content-between">
                <p className="m-0">Utente: {book.publisher}, Provincia: {book.provincia}</p>
                <button
                    className={`btn ${contatta ? 'btn-success' : 'btn-danger'}`}
                    onClick={handleContattaClick}
                    disabled={contatta}
                >
                    {contatta ? 'Utente Contattato' : 'Contatta'}
                </button>
            </div>
        </div>
    );
}

export default BookCard;
