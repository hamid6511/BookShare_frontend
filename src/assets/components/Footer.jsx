import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white text-center py-4 fixed-bottom">
            <div className="container">
                <p className="mb-0">© {currentYear} BookShare. Tutti i diritti riservati. <br /> Hamid Karchane </p>
            </div>
        </footer>
    );
}

export default Footer;

