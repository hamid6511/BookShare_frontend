import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import Menu from "./Menu";

function ChatPage() {
    const [conversationList, setConversationList] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Effettua la richiesta fetch al backend per ottenere le conversazioni
        fetchConversations();
    }, []);

    // Funzione per effettuare la richiesta fetch al backend per ottenere le conversazioni
    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/conversations');
            if (response.ok) {
                const data = await response.json();
                setConversationList(data);
            } else {
                console.error('Failed to fetch conversations');
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    // Seleziona una conversazione dalla lista
    const selectConversation = (conversation) => {
        setSelectedConversation(conversation);
        setNewMessage(''); // Resetta il campo del nuovo messaggio quando una conversazione viene selezionata
    };

    // Invia un nuovo messaggio
    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            // Effettua la richiesta fetch al backend per inviare il nuovo messaggio
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversationId: selectedConversation.id,
                    text: newMessage,
                }),
            });
            if (response.ok) {
                // Aggiorna la lista dei messaggi della conversazione selezionata
                const updatedConversation = { ...selectedConversation };
                updatedConversation.messages.push({
                    id: Date.now(), // Utilizza un ID univoco per il messaggio (puoi utilizzare una libreria come uuid)
                    text: newMessage,
                    user: 'CurrentUser', // Sostituisci 'CurrentUser' con il nome dell'utente attuale
                    date: new Date().toISOString(),
                });
                setSelectedConversation(updatedConversation);
                setNewMessage(''); // Resetta il campo del nuovo messaggio dopo l'invio
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Scrolla fino alla fine del container dei messaggi quando viene aggiunto un nuovo messaggio
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedConversation]);

    return (
        <>
            <Menu isUser={true} />
            <Container>
                <Row className="mt-5">
                    {/* Colonna delle conversazioni */}
                    <Col md={4}>
                        <Container className="p-4 rounded border">
                            <h2>Chat</h2>
                            <ListGroup>
                                {conversationList.map(conversation => (
                                    <ListGroup.Item
                                        key={conversation.id}
                                        active={selectedConversation && selectedConversation.id === conversation.id}
                                        onClick={() => selectConversation(conversation)}
                                        action
                                    >
                                        {conversation.title}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Container>
                    </Col>

                    {/* Colonna della conversazione selezionata */}
                    <Col md={8}>
                        <Container className="p-4 rounded border" style={{ minHeight: '770px', position: 'relative' }}>
                            {selectedConversation && (
                                <>
                                    {/* Titolo della conversazione */}
                                    <h2>{selectedConversation.title}</h2>

                                    {/* Utente */}
                                    <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>{selectedConversation.user}</div>

                                    {/* Messaggi */}
                                    <div style={{ background: '#e6e6e6', padding: '10px', maxHeight: '550px', overflowY: 'auto', marginBottom: '20px' }}>
                                        {selectedConversation.messages.map((message, index) => (
                                            <div key={index}>
                                                <strong>{message.user}</strong>: {message.text} ({new Date(message.date).toLocaleString()})
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef}></div>
                                    </div>

                                    {/* Form per inviare un nuovo messaggio */}
                                    <Form style={{ background: '#d9d9d9', padding: '10px', position: 'absolute', bottom: '10px', width: '90%' }}>
                                        <Form.Group controlId="message" style={{ marginBottom: '0' }}>
                                            <Row className="align-items-center">
                                                <Col xs={11}>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Write your message..."
                                                        value={newMessage}
                                                        onChange={e => setNewMessage(e.target.value)}
                                                    />
                                                </Col>
                                                <Col xs={1}>
                                                    <Button variant="primary" size="sm" className="mt-2" onClick={handleSendMessage}>Send</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                </>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ChatPage;



