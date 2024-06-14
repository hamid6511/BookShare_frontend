import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Search from "../components/Search";
import BookCard from "../components/BookCard";
import { useUserName } from './UserNameContext';
import AddBook from "./addBook";

function UserBooks() {
    const { userName } = useUserName();
    const [userBooks, setUserBooks] = useState([]);
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const fetchUserBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5199/api/Book/UserBooks", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user books");
            }
            const data = await response.json();
            setUserBooks(data);
        } catch (error) {
            console.error("Error fetching user books:", error);
        }
    };

    useEffect(() => {
        fetchUserBooks();
    }, []);

    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo libro?");
        if (confirmDelete) {
            try {
                console.log(bookId);
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5199/api/Book/UserDeleteBook/${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to delete book");
                }
                fetchUserBooks(); // Aggiorna la lista dei libri dopo l'eliminazione
                alert("Libro eliminato con successo!");
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    const handleOpenAddBookModal = () => {
        setShowAddBookModal(true); // Apri la modal
    };

    const handleCloseAddBookModal = () => {
        setShowAddBookModal(false); // Chiudi la modal
    };

    return (
        <>
            <Menu userName={userName} isUser={true} />
            <Search />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center">Ecco i libri che hai caricato!</h2>
                    <button onClick={handleOpenAddBookModal} className="btn btn-primary">Aggiungi Libro</button>
                </div>
                <hr />
                <div className="row">
                    {userBooks.map((book, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <BookCard book={book} showContact={false} onDelete={handleDeleteBook} isUser={true} />
                        </div>
                    ))}
                </div>
            </div>
            {showAddBookModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-lg" role="document"> {/* Allarga la modal */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Aggiungi un libro</h4>
                                <button type="button" className="close" onClick={handleCloseAddBookModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddBook onClose={handleCloseAddBookModal} onBookAdded={fetchUserBooks} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseAddBookModal}>Chiudi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}

export default UserBooks;
