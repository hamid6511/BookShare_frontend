import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAuth from '../../hooks/userAuth';

function BookCard({ book, showContact, onDelete, isUser }) {
    const [contatta, setContatta] = useState(false);
    const { isAuthenticated } = userAuth();

    const handleContatta = () => {
        setContatta(true);
    };

    const handleContattaClick = () => {
        if (!isAuthenticated) {
            return <Link to="/login"></Link>;
        } else {
            return <Link to="/chat"></Link>;
        }
    };

    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    // Funzione per abbreviare la descrizione se è troppo lunga
    const abbreviaDescrizione = (descrizione, lunghezzaMassima) => {
        if (descrizione.length > lunghezzaMassima) {
            return descrizione.substring(0, lunghezzaMassima) + '...';
        } else {
            return descrizione;
        }
    };

    return (
        <Link to={`/book/${book.id}`} className="card mb-3" style={{ textDecoration: 'none', background: '#f0f0f0', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', color: '#000' }}>
            <img src={book.cover} className="card-img-top mx-auto mt-3 rounded" alt={book.title} style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
            <div className="card-body">
                <h5 className="card-title text-center">{book.title}</h5>
                <p className="card-text" style={{ fontWeight: 'normal' }}>{abbreviaDescrizione(book.description, 150)}</p> {/* Imposta la lunghezza massima della descrizione a 150 caratteri */}
                <div className="d-flex justify-content-between">
                    <p className="card-text"><small className="text-muted">Autore: {book.author}</small></p>
                    <p className="card-text"><small className="text-muted">Pubblicato nel {book.yearPublished}</small></p>
                </div>
            </div>
            <div className="card-footer text-muted d-flex justify-content-between">
                {isUser ? (
                    <>
                        <p className="m-0">Caricato il {book.uploadDate} </p>
                    </>
                ) : (
                    <>
                        <p className="m-0">Utente: {book.publisher}, Provincia: {book.provincia}</p>
                        {showContact && (
                            <button
                                className={`btn ${contatta ? 'btn-success' : 'btn-danger'}`}
                                onClick={handleContattaClick}
                                disabled={contatta}
                            >
                                {contatta ? 'Utente Contattato' : 'Contatta'}
                            </button>
                        )}
                    </>
                )}
                {isUser && (
                    <button
                        className="btn btn-danger"
                        onClick={handleDeleteClick}
                    >
                        Elimina
                    </button>
                )}
            </div>
        </Link>
    );
}

export default BookCard;
