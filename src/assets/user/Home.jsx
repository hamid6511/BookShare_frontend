import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import Search from "../components/Search";
import Footer from "../components/Footer";
import Menu from './Menu';
import BookCard from "../components/BookCard";

function Home() {
  const [latestBooks, setLatestBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // Funzione per caricare gli ultimi libri dal backend
  const fetchLatestBooks = async () => {
    try {
      const response = await fetch("http://localhost:5199/api/Book/Get-All-Books"); // Modificare l'URL dell'API dopo
      if (!response.ok) {
        throw new Error('Errore durante il recupero degli ultimi libri');
      }
      const data = await response.json();
      setLatestBooks(data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  // Funzione per caricare i libri in evidenza dal backend
  const fetchFeaturedBooks = async () => {
    try {
      const response = await fetch("http://localhost:5199/api/Book/Get-All-Books"); // Modificare l'URL dell'API dopo
      if (!response.ok) {
        throw new Error('Errore durante il recupero dei libri in evidenza');
      }
      const data = await response.json();
      setFeaturedBooks(data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  useEffect(() => {
    fetchLatestBooks();
    fetchFeaturedBooks();
  }, []);

  return (
    <div>
      <Menu isUser={true} />
      <div className="container-fluid bg-transparent py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-5">
              <h1 className="display-4">Benvenuto su REadCycle</h1>
              <p className="lead mb-4">Scambia i tuoi libri con altri utenti e scopri nuovi titoli!</p>
            </Col>
            <Col md={6} className="text-center">
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100 rounded-circle" src="/comunity.jpg" alt="Esplora Nuovi Mondi" />
                  <Carousel.Caption>
                    <h3>Esplora Nuovi Mondi</h3>
                    <p>Scopri libri che ti porteranno in viaggi emozionanti e avventure indimenticabili.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 rounded-circle" src="/stories.jpg" alt="Entra nei Racconti" />
                  <Carousel.Caption>
                    <h3>Entra nei Racconti</h3>
                    <p>Immergiti in storie coinvolgenti e lasciati trasportare dall'immaginazione.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 rounded-circle" src="/share_your_books.jpg" alt="Condividi le Tue Passioni" />
                  <Carousel.Caption>
                    <h3>Condividi le Tue Passioni</h3>
                    <p>Trova persone con interessi simili e condividi le tue passioni letterarie con il mondo.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
          <hr className="my-5" />
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Ultime Aggiunte</h2>
              <p className="text-muted mb-4">Scopri gli ultimi libri aggiunti alla nostra piattaforma.</p>
              <Row xs={1} md={2} lg={3} className="g-4">
                {latestBooks.map(book => (
                  <Col key={book.id}>
                    <BookCard book={book} showContact={true} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Libri in Evidenza</h2>
              <p className="text-muted mb-4">Scopri i libri più popolari e consigliati dalla nostra comunità.</p>
              <Row xs={1} md={2} lg={3} className="g-4">
                {featuredBooks.map(book => (
                  <Col key={book.id}>
                    <BookCard book={book} showContact={true} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Cerca nella tua zona</h2>
              <Search />
            </Col>
          </Row>
        </Container>
      </div>
      <br /><br /><br /><br />
      <Footer />
    </div>
  );
}

export default Home;
