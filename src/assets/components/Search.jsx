import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = debounce(async (term) => {
        if (term.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5199/api/Book/SearchBook/${term}`);
            if (response.status === 404) {
                setError("Nessun risultato trovato.");
                setSearchResults([]);
            } else {
                setSearchResults(response.data);
                setError(null);
            }
        } catch (error) {

            if (error.response && error.response.status === 404) {
                setError("Nessun risultato trovato.");
                setSearchResults([]);
            } else {
                console.error("Error searching for books:", error);
                setError("Si è verificato un errore durante la ricerca dei libri.");
                setSearchResults([]);
            }
        }
    }, 500);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length >= 2) {
            handleSearch(term);
        } else {
            setSearchResults([]);
            setError(null);
        }
    };

    return (
        <>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control -sm mr-sm-2"
                    type="search"
                    placeholder="Cerca un libro"
                    aria-label="Search"
                    style={{ width: "25%", marginTop: "10px", marginBottom: "10px" }}
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Cerca
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {searchResults.length > 0 && (
                <ul className="list-group mt-3">
                    {searchResults.map((book, index) => (
                        <Link to={`/book/detail/${book.id}`} key={index} className="list-group-item" style={{ textDecoration: 'none', color: 'inherit', maxWidth: '30%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flex: '1' }}>
                                    <strong>{book.title}</strong> <span style={{ fontSize: "smaller", color: '#888' }}>di</span> <span style={{ fontSize: "smaller", fontWeight: 'bold' }}>{book.author}</span>
                                </div>
                            </div>
                        </Link>


                    ))}
                </ul>
            )}
            {searchResults.length === 3 && !error && searchTerm && (
                <div className="alert alert-info mt-3">Nessun risultato trovato.</div>
            )}
        </>
    );
}

export default Search;
