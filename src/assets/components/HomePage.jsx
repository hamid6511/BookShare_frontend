import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';  // Importa il file CSS dedicato

function HomePage() {
    return (
        <div className="home-container">
            <Navbar />
            <div
                className="bg-image text-center shadow-1-strong rounded mb-5 text-white d-flex flex-column justify-content-center align-items-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1541807360746-039080941306?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center -800px', // Adjusted to show the desired part of the image
                    height: '90vh',
                    position: 'relative'
                }}
            >
                <div className="overlay"></div>
                <div className="container content-wrapper">
                    <h2 className="display-4 mb-4 title-position custom-text-white">Comincia il tuo viaggio con REadCycle</h2>
                    <div className="row w-100 align-items-center custom-text-white">
                        <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                            <p>
                                Sei stanco di pianificare i tuoi viaggi da solo? Dì addio alla coordinazione dei viaggi senza stress con il nostro servizio di REadCycle! Che si tratti di un viaggio in auto, un volo o un viaggio in treno, siamo qui per te.
                            </p>
                            <p>
                                Unisciti alla nostra comunità di viaggiatori e scopri la gioia delle esperienze condivise. Collegati con persone che la pensano come te, dividi i costi e crea ricordi che dureranno per sempre.
                            </p>
                            <p>
                                Registrarsi è veloce, semplice e, soprattutto, gratuito! Inizia il tuo viaggio oggi e sblocca un mondo di possibilità con REadCycle.
                            </p>
                            <p>Buon viaggio!</p>
                            <Link to="/BookList" className="btn btn-light btn-lg btn-block">Esplora</Link>
                        </div>
                        <div className="col-md-6">
                            <img src="/img_home.png" alt="Description book" className="img-fluid book-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
