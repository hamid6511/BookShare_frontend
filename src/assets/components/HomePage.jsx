import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import Navbar from './Navbar';

function HomePage() {
    return (
        <div className="home-container">
            {/* Include Navbar component */}
            <Navbar />
            <div
                className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
                style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp')" }}
            >
                <div className="container">
                    <h2 className="display-4 mb-4">Comincia il tuo viaggio con REadCycle</h2>
                    <p className="lead mb-4">Esplora un mondo di storie e condividi i tuoi libri preferiti con gli altri!</p>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <Link to="/BookList" className="btn btn-light btn-lg btn-block">Esplora</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center" style={{ marginTop: "150px", marginLeft: "20px", marginRight: "20px" }}>
                    <p>
                        Sei stanco di pianificare i tuoi viaggi da solo? Dì addio alla coordinazione dei viaggi senza stress con il nostro servizio di Prenotazione Condivisa! Che si tratti di un viaggio in auto, un volo o un viaggio in treno, siamo qui per te.
                    </p>
                    <p>
                        Unisciti alla nostra comunità di viaggiatori e scopri la gioia delle esperienze condivise. Collegati con persone che la pensano come te, dividi i costi e crea ricordi che dureranno per sempre.
                    </p>
                    <p>
                        Registrarsi è veloce, semplice e, soprattutto, gratuito! Inizia il tuo viaggio oggi e sblocca un mondo di possibilità con la Prenotazione Condivisa.
                    </p>
                    <p style={{ marginBottom: "0" }}>Buon viaggio!</p>
                </div>
                <div>
                    <img src="https://i.pinimg.com/564x/08/56/62/08566298fe8fb0c3e96efdf038e14b77.jpg" alt="Description book" style={{ paddingBottom: "130px" }} />
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default HomePage;
