import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function HomePage() {
    return (
        <div className="container-fluid p-0">
            <header className="bg-dark text-white text-center py-5">
                <div className="container">
                    <h1 className="display-3 mb-4">Benvenuto su REadCycle</h1>
                    <p className="lead mb-4">L'applicazione che trasforma la tua lettura in una nuova avventura!</p>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <Link to="/login" className="btn btn-primary btn-lg btn-block mb-2">Login</Link>
                        </div>
                        <div className="col-md-4">
                            <a href="#" className="btn btn-secondary btn-lg btn-block mb-2">Sign Up</a>
                        </div>
                    </div>
                </div>
            </header>


            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <img src="/logo.png" alt="share_your_books" className="img-fluid img-thumbnail rounded-circle mb-4" />
                        </div>
                        <div className="col-md-11 text-md-start ">
                            <p className="lead"><br />REadCycle è il tuo luogo digitale per condividere e scoprire nuovi mondi attraverso la lettura!<br /><br /><br /></p>
                        </div>
                        <div className="col-md-11 text-md-start ">
                            <p className="lead">Esplora una vasta gamma di libri e trova nuove avventure letterarie. Con REadCycle, la tua passione per la lettura diventa una nuova avventura condivisa.<br /><br /></p>
                        </div>

                        <div className="col-md-6 text-center">
                            <img src="/stories.jpg" alt="Books" className="img-fluid img-thumbnail rounded-circle mb-4" />
                            <h2>Scopri nuove storie</h2>
                            <p className="lead">Scopri un mondo di storie e lasciati trasportare in nuove avventure attraverso la lettura.<br /><br /><br /></p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="/share_your_books.jpg" alt="share_your_books" className="img-fluid img-thumbnail rounded-circle mb-4" />
                            <h2>Condividi i tuoi libri</h2>
                            <p className="lead">Condividi i tuoi libri preferiti con altri lettori e scopri nuove opere da leggere.<br /><br /><br /></p>
                        </div>

                        <div className="col-md-12 text-center mb-10">
                            <p className="lead ">Grazie alla nostra comunità di appassionati lettori, è facile trovare il prossimo libro da leggere o dare nuova vita ai libri che hai già apprezzato.</p>
                        </div>
                        <div className="col-md-4 text-center mx-auto mb-10">
                            <img src="/comunity.jpg" alt="Books" className="img-fluid img-thumbnail rounded-circle mb-4" />
                        </div>

                        <div className="col-md-12 text-center mb-10">
                            <p className="lead" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", padding: "10px", borderRadius: "5px" }}>Unisciti a noi oggi e lasciati ispirare dalla magia della lettura con REadCycle!</p>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HomePage;

