import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Menu from "../user/Menu";
import Search from "../components/Search";
import { useUserName } from '../user/UserNameContext';

function AdminBooks() {
    const { userName } = useUserName();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Book/GetAllBooks");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

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
                fetchBooks();
                alert("Libro eliminato con successo!");
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };


    return (
        <>
            <Menu userName={userName} isUser={false} />
            <Search />
            <div className="container mt-4">
                <h2 className="mb-3">Gestione Libri</h2>
                <hr />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Copertina</th>
                                <th>Titolo</th>
                                <th>Autore</th>
                                <th>Categoria</th>
                                <th>Anno Pubblicazione</th>
                                <th>Modifica</th>
                                <th>Elimina</th>
                                <th>Dettagli</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td><img src={book.cover} alt={book.title} style={{ width: '50px' }} /></td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.yearPublished}</td>
                                    <td>
                                        <Link to={`/books/edit/${book.id}`} className="btn btn-primary">Modifica</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger">Elimina</button>
                                    </td>
                                    <td>
                                        <Link to={`/book/detail/${book.id}`} className="btn btn-info">Dettagli</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminBooks;
