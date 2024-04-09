import React, { useState } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

function AddBook() {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        yearPublished: "",
        cover: "",
        category: "",
        description: "",
        userId: "11111111-1111-1111-1111-111111111111", // Assicurati che userId sia una stringa vuota o il valore corretto iniziale
    });


    const navigate = useNavigate();

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
            const response = await fetch("http://localhost:5199/api/Book/Add-book", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            alert("Libro aggiunto con successo!");
            navigate("/userBooks");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <>
            <Menu isUser={true} />
            <div className="container mt-4">
                <h2>Aggiungi un libro</h2>
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
                            </select>                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrizione</label>
                            <textarea className="form-control" id="description" name="description" value={bookData.description} onChange={handleChange} required style={{ height: "100px" }}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Aggiungi Libro</button>
                    </form>

                </div>

            </div>
        </>
    );
}

export default AddBook;
