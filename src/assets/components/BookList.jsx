import React, { useState, useEffect } from "react";
import Search from "./Search";
import Navbar from "./Navbar";
import BookCard from "./BookCard";

function BookList() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Book/Get-All-Books");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <Navbar />
            <Search />
            <h2 className="text-center mt-4 mb-3">Ecco i libri disponibili per lo scambio!</h2>
            <hr />
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <BookCard book={book} showContact />
                    </div>
                ))}
            </div>
        </>
    );
}

export default BookList;
