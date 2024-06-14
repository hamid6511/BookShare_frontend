import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../user/UserAuth';
import Menu from "../user/Menu";
import BookCard from "./BookCard";
import { useUserName } from '../user/UserNameContext';

function BookDetail() {
    const { userName } = useUserName();
    const { id } = useParams();
    const [book, setBook] = useState(null); // Stato per memorizzare i dati del libro
    const { isAuthenticated } = useAuth();



    useEffect(() => {
        // Funzione per caricare i dettagli del libro dal server
        //console.log(id.toUpperCase());
        const fetchBookDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5199/api/Book/GetBookById/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBook(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetail(); // Chiamata API per ottenere i dettagli del libro quando il componente si monta
    }, [id]);






    return (
        <>
            <Menu userName={userName} isUser={true} />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Dettagli del libro</h2><hr />
                {book ? (
                    <div className="row">
                        <div className="col-md-4">
                            <BookCard book={book} showContact={false} onDelete={() => { }} isUser={false} />
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center"><strong>{book.title}</strong></h5>
                                    <p className="card-text">{book.fullDescription}</p>
                                    <p className="card-text"><small className="text-muted">Autore: <strong>{book.author}</strong></small></p>
                                    <p className="card-text"><small className="text-muted">Pubblicato nel <strong>{book.yearPublished}</strong></small></p>
                                    <p className="card-text"><small className="text-muted">Categoria: <strong>{book.category}</strong></small></p>
                                    <p className="card-text"><small className="text-muted">Copertina:<strong>{book.cover}</strong> </small></p>
                                    <p className="card-text"><small className="text-muted">Pubblicato da: <strong>{book.userName}</strong></small></p>
                                    <p className="card-text"><small className="text-muted">Provincia: <strong>{book.state}</strong></small></p>
                                    {isAuthenticated && (book.userName != userName) && (
                                        <button className="btn btn-primary">Contatta l'utente</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Caricamento...</p>
                )}
            </div>
        </>
    );
}

export default BookDetail;
