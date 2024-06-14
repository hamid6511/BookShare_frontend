import React, { useState, useEffect } from "react";
import { useUserName } from './UserNameContext';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function AddBook({ onClose, onBookAdded }) {
    const [userId, setuserId] = useState('');
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        yearPublished: "",
        cover: "",
        shortDescription: "",
        category: "",
        fullDescription: "",
        pages: "",
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            if (userIdFromToken) {
                setuserId(userIdFromToken);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const bookDataWithUserId = {
                ...bookData,
                userId
            };

            const response = await fetch("http://localhost:5199/api/Book/AddBook", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookDataWithUserId)
            });
            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            alert("Libro aggiunto con successo!");
            onClose();
            onBookAdded();
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <h5>Compila tutti i campi per aggiungere un nuovo libro</h5>
                <hr />
                <div className="container mt-4" style={{ maxWidth: "800px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titolo</label>
                            <input type="text" className="form-control" id="title" name="title" value={bookData.title} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Autore</label>
                            <input type="text" className="form-control" id="author" name="author" value={bookData.author} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="yearPublished" className="form-label">Anno di pubblicazione</label>
                            <input type="number" className="form-control" id="yearPublished" name="yearPublished" value={bookData.yearPublished} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pages" className="form-label">Numero di pagine</label>
                            <input type="number" className="form-control" id="pages" name="pages" value={bookData.pages} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cover" className="form-label">Immagine copertina (aggiungi un link dell'immagine)</label>
                            <input type="text" className="form-control" id="cover" name="cover" value={bookData.cover} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select className="form-control" name="category" value={bookData.category} onChange={handleChange} required>
                                <option value="">Seleziona una categoria</option>
                                <option value="Romanzi">Romanzi</option>
                                <option value="Gialli/Thriller">Gialli/Thriller</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Fantascienza">Fantascienza</option>
                                <option value="Storici">Storici</option>
                                <option value="Biografie/Autobiografie">Biografie/Autobiografie</option>
                                <option value="Saggistica">Saggistica</option>
                                <option value="Poesia">Poesia</option>
                                <option value="Narrativa per ragazzi">Narrativa per ragazzi</option>
                                <option value="Fumetti">Fumetti</option>
                                <option value="Libri illustrati">Libri illustrati</option>
                                <option value="Manuali/Guide">Manuali/Guide</option>
                                <option value="Libri di cucina">Libri di cucina</option>
                                <option value="Viaggi/Avventure">Viaggi/Avventure</option>
                                <option value="Religione/Spiritualità">Religione/Spiritualità</option>
                                <option value="Educazione">Educazione</option>
                                <option value="Arte e Fotografia">Arte e Fotografia</option>
                                <option value="Salute e Benessere">Salute e Benessere</option>
                                <option value="Business e Finanza">Business e Finanza</option>
                                <option value="Informatica e Tecnologia">Informatica e Tecnologia</option>
                                <option value="Sport e Tempo libero">Sport e Tempo libero</option>
                                <option value="Musica">Musica</option>
                                <option value="Film e Spettacolo">Film e Spettacolo</option>
                                <option value="Casa e Giardino">Casa e Giardino</option>
                                <option value="Animali domestici">Animali domestici</option>
                                <option value="Scienza e Natura">Scienza e Natura</option>
                                <option value="Politica e Attualità">Politica e Attualità</option>
                                <option value="Lingue e Linguistica">Lingue e Linguistica</option>
                                <option value="Filosofia">Filosofia</option>
                                <option value="Psicologia">Psicologia</option>
                                <option value="Letteratura classica">Letteratura classica</option>
                                <option value="Teatro">Teatro</option>
                                <option value="Economia">Economia</option>
                                <option value="Geografia">Geografia</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortDescription" className="form-label">Descrizione breve</label>
                            <textarea className="form-control" id="shortDescription" name="shortDescription" value={bookData.shortDescription} onChange={handleChange} required style={{ height: "50px" }}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullDescription" className="form-label">Descrizione completa</label>
                            <textarea className="form-control" id="fullDescription" name="fullDescription" value={bookData.fullDescription} onChange={handleChange} required style={{ height: "100px" }}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary ml-auto">Aggiungi Libro</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBook;
