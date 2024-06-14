import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../user/UserAuth';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import LoginForm from '../components/Login';

function BookCard({ book, showContact, onDelete, isUser }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [contatta, setContatta] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Controlla se l'utente ha messo mi piace a questo libro in precedenza
        const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
        setIsLiked(likedBooks.includes(book.id));
    }, [book.id]);

    const handleLikeClick = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        } else {
            const token = localStorage.getItem('token');
            try {
                let response;
                if (isLiked) {
                    // Se il libro è già stato contrassegnato come preferito, invia una richiesta API per rimuovere il like
                    response = await fetch(`http://localhost:5199/api/Book/unlike/${book.id.toUpperCase()}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            bookId: book.id.toUpperCase(),
                        })
                    });
                    // Rimuovi il libro dai like salvati nel localStorage
                    const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
                    const updatedLikedBooks = likedBooks.filter(id => id !== book.id);
                    localStorage.setItem('likedBooks', JSON.stringify(updatedLikedBooks));
                } else {
                    // Altrimenti, invia una richiesta API per aggiungere il like
                    response = await fetch(`http://localhost:5199/api/Book/like/${book.id.toUpperCase()}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            bookId: book.id.toUpperCase(),
                        })
                    });
                    // Aggiungi il libro ai like salvati nel localStorage
                    const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
                    localStorage.setItem('likedBooks', JSON.stringify([...likedBooks, book.id]));
                }

                // Verifica se la richiesta ha avuto successo
                if (response.ok) {
                    // Aggiorna lo stato del like nel componente
                    setIsLiked(prevIsLiked => !prevIsLiked);
                } else {
                    // Gestisci eventuali errori nella risposta API
                    console.error('Errore durante l\'aggiunta/rimozione del like');
                }
            } catch (error) {
                console.error('Errore durante l\'invio della richiesta API', error);
            }
        }
    };
    const handleContattaClick = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true); // Mostra la modal di login
        } else {
            navigate('/chat')
        }
    };


    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    const abbreviaDescrizione = (descrizione, lunghezzaMassima) => {
        if (descrizione.length > lunghezzaMassima) {
            return descrizione.substring(0, lunghezzaMassima) + '...';
        } else {
            return descrizione;
        }
    };

    return (
        <div className="card mb-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body text-center">
                <Link to={`/book/detail/${book.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <img src={book.cover} className="card-img-top rounded" alt={book.title} style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text" style={{ fontWeight: 'normal' }}>{abbreviaDescrizione(book.shortDescription, 90)}</p>
                </Link>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><small className="text-muted">Autore: {book.author}</small></p>
                    <p className="card-text"><small className="text-muted">Pubblicato nel {book.yearPublished}</small></p>
                </div>
            </div>
            <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                {isUser ? (
                    <>
                        <p className="m-0">Caricato il {new Date(book.dateAdded).toLocaleDateString()}</p>
                    </>
                ) : (
                    <>
                        <p className="m-0">Utente: <strong>{book.userName}</strong><br /> Provincia: <strong>{book.state}</strong></p>
                        {showContact && (
                            <button
                                className={`btn ${contatta ? 'btn-success' : 'btn-primary'}`}
                                onClick={handleContattaClick}
                                disabled={contatta}
                            >
                                {contatta ? 'Utente Contattato' : 'Contatta'}
                            </button>
                        )}
                    </>
                )}

                {isUser && (
                    <> <button
                        className="btn btn-danger"
                        onClick={handleDeleteClick}
                    >
                        Elimina
                    </button>
                        <Link to={`/books/edit/${book.id}`} className="btn btn-secondary">Modifica</Link>
                    </>
                )}
                <FontAwesomeIcon
                    icon={isLiked ? solidHeart : regularHeart}
                    onClick={handleLikeClick}
                    className={`heart-icon ${isLiked ? 'liked' : ''}`}
                    style={{ color: isLiked ? 'red' : 'inherit', fontSize: '24px' }}
                />
            </div>

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className="modal-xl">
                <Modal.Header closeButton>
                    <h3 >Effettua l'accesso</h3>
                </Modal.Header>
                <Modal.Body >
                    <LoginForm />
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default BookCard;
