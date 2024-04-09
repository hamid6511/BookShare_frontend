import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userAuth from '../../hooks/userAuth';

function BookDetail() {
    const { id } = useParams(); // Ottieni l'ID del libro dalla URL
    const [book, setBook] = useState(null); // Stato per memorizzare i dati del libro
    const { isAuthenticated } = userAuth();

    useEffect(() => {
        // Funzione per caricare i dettagli del libro dal server
        const fetchBookDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5199/api/Book/Get-book-byId/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetail(); // Chiamata API per ottenere i dettagli del libro quando il componente si monta
    }, [id]);

    return (
        <div className="container mt-4">
            {book ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">{book.title}</h5>
                        <p className="card-text">{book.description}</p>
                        <p className="card-text"><small className="text-muted">Autore: {book.author}</small></p>
                        <p className="card-text"><small className="text-muted">Pubblicato nel {book.yearPublished}</small></p>
                        {isAuthenticated && (
                            <button className="btn btn-primary">Contatta l'utente</button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Caricamento...</p>
            )}
        </div>
    );
}

export default BookDetail;
