import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Search from "../components/Search";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

function UserBooks() {
    const [userBooks, setUserBooks] = useState([]);

    const fetchUserBooks = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Book/Get-All-Books");
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
                const response = await fetch(`http://localhost:5199/api/Book/Delete-book/${bookId}`, {
                    method: 'DELETE'
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

    return (
        <>
            <Menu isUser={true} />
            <Search />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center">Ecco i libri che hai caricato!</h2>
                    <Link to="/addBook" className="btn btn-primary">Aggiungi Libro</Link>
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
        </>
    );
}

export default UserBooks;
