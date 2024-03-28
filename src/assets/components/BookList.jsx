// Import necessary modules
import React, { useState, useEffect } from "react";
import Search from "./Search";
import Navbar from "./Navbar";

function BookList() {
    // State to store the list of books
    const [books, setBooks] = useState([]);

    // Function to fetch books from the API
    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Book/Get-All-Books");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(data); // Update state with fetched books
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    // Fetch books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <>
            <Navbar />
            <Search />
            <h2 className="mt-4">Book List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year Published</th>
                        <th>Cover</th>
                        <th>Description</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.yearPublished}</td>
                            <td>
                                <img src={book.cover} alt={book.title} style={{ width: "100px" }} className="img-thumbnail" />
                            </td>
                            <td>{book.description}</td>
                            <td>{book.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BookList;
