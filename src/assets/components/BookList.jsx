import React, { useState, useEffect } from "react";
import Search from "./Search";
import Navbar from "./Navbar";
import Footer from './Footer';
import BookCard from "./BookCard";

function BookList() {
    const [books, setBooks] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchBooks = async () => {
        try {

            const response = await fetch(`http://localhost:5199/api/Book/books/${pageNumber}`);
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(prevBooks => {
                const newBooks = data.filter(newBook => !prevBooks.some(prevBook => prevBook.id === newBook.id));
                return [...prevBooks, ...newBooks];
            });
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };


    const loadMoreBooks = () => {
        setPageNumber(prevPage => prevPage + 1);
    };

    useEffect(() => {
        fetchBooks();
    }, [pageNumber]);

    return (
        <div className="d-flex flex-column vh-100">
            <Navbar />
            <Search />
            <div className="container flex-grow-1">
                <h2 className="text-center mt-4 mb-3">Ecco i libri disponibili per lo scambio!</h2>
                <hr />
                <div className="row">
                    {books.map((book, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <BookCard book={book} showContact />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={loadMoreBooks}>Carica altri libri</button><br /><br /><br />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookList;
