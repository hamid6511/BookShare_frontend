import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Search from "../components/Search";
import Footer from "../components/Footer";
import Menu from './Menu';
import { useUserName } from './UserNameContext';
import { Link } from 'react-router-dom';
import BookCard from "../components/BookCard";
import './Home.css'; // Importa il file CSS

function Home() {
  const { userName } = useUserName();
  const [latestBooks, setLatestBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (userName) {
      const firstNameFromUserName = userName.split(' ')[0];
      setFirstName(firstNameFromUserName);
    }
  }, [userName]);

  const fetchLatestBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5199/api/Book/RecentBooksUploaded`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Errore durante il recupero degli ultimi libri');
      }
      const data = await response.json();
      setLatestBooks(data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  const fetchFeaturedBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5199/api/Book/Top10MostLikedBooks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
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
      <Menu userName={userName} isUser={true} />
      <div className="container-fluid py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md={6} className="text-center text-md-start">
              <h1 className="display-4">Bentornato {firstName.toUpperCase()}!</h1>
              <p className="display-6">Continua la tua avventura</p>
              <p className="lead mb-4">scambiando i tuoi libri con altri utenti e scopri nuovi titoli!</p>
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
          <Row className="mb-5">
            <Col md={6}>
              <div className="card-container">
                <h2 className="mb-4">Ultime Aggiunte</h2>
                <p className="text-muted mb-4">Scopri gli ultimi libri aggiunti alla nostra piattaforma.</p>
                <Carousel indicators={true} className="carousel-container">
                  {latestBooks.map(book => (
                    <Carousel.Item key={book.id}>
                      <div className="d-flex justify-content-center">
                        <BookCard book={book} userName={userName} showContact={true} className="book-card" />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
            <Col md={6}>
              <div className="card-container">
                <h2 className="mb-4">Libri in Evidenza</h2>
                <p className="text-muted mb-4">Scopri i libri più popolari e consigliati dalla nostra comunità.</p>
                <Carousel indicators={true} className="carousel-container">
                  {featuredBooks.map(book => (
                    <Carousel.Item key={book.id}>
                      <div className="d-flex justify-content-center">
                        <BookCard book={book} userName={userName} showContact={true} className="book-card" />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h3 className="text-muted mb-4">Vuoi vedere ulteriori libri?</h3>
              <Link to="/BookList" className="btn btn-dark btn-lg btn-block">Esplora</Link>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
