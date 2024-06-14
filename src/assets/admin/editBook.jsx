import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../user/Menu";
import { useNavigate } from "react-router-dom";
import { useUserName } from '../user/UserNameContext';
import BookCard from "../components/BookCard"; // Importa la tua componente BookCard

function EditBook() {
    const { userName } = useUserName();
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        category: "",
        yearPublished: "",
        cover: "",
        shortDescription: ""
    });

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const response = await fetch(`http://localhost:5199/api/Book/GetBookById/${id}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error("Failed to fetch book");
            }
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5199/api/Book/Admin/UpdateBook/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (!response.ok) {
                throw new Error("Failed to update book");
            }
            alert("Libro aggiornato con successo!");
            navigate(-1);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <>
            <Menu userName={userName} isUser={true} />
            <div className="container mt-4">
                <h2>Modifica Libro</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <br />
                            <BookCard book={book} />
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Titolo:</label>
                                <input type="text" className="form-control" name="title" value={book.title} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Autore:</label>
                                <input type="text" className="form-control" name="author" value={book.author} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Categoria:</label>
                                <select className="form-control" name="category" value={book.category} onChange={handleChange} required>
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
                            </div><br />

                            <div className="form-group">
                                <label>Numero pagine</label>
                                <input type="number" className="form-control" name="pages" value={book.pages} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Anno Pubblicazione:</label>
                                <input type="number" className="form-control" name="yearPublished" value={book.yearPublished} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Copertina:</label>
                                <input type="text" className="form-control" name="cover" value={book.cover} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Descrizione breve del libro:</label>
                                <textarea className="form-control" name="shortDescription" value={book.shortDescription} onChange={handleChange} required />
                            </div><br />
                            <div className="form-group">
                                <label>Descrizione completa del libro:</label>
                                <textarea className="form-control" name="fullDescription" value={book.fullDescription} onChange={handleChange} required />
                            </div><br />
                            <button type="submit" className="btn btn-primary">Salva Modifiche</button>
                            <br /><br /><br />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditBook;


