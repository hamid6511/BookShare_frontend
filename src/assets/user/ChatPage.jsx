import React, { useState } from 'react';

function ChatPage() {
    // Stato per memorizzare il testo del messaggio
    const [messageText, setMessageText] = useState('');

    // Funzione per gestire l'invio del messaggio al backend
    const sendMessage = () => {
        // Esegui la logica per inviare il messaggio al backend
        console.log('Invio del messaggio:', messageText);
        // Aggiungi qui la logica per inviare il messaggio al backend tramite una chiamata API
    };

    // Funzione per gestire l'azione di ricerca
    const search = () => {
        // Esegui la logica per la ricerca nel backend
        console.log('Ricerca:', messageText);
        // Aggiungi qui la logica per la ricerca nel backend tramite una chiamata API
    };

    // Funzione per gestire l'azione di chiamata
    const makeCall = () => {
        // Esegui la logica per effettuare una chiamata
        console.log('Chiamata in corso...');
        // Aggiungi qui la logica per effettuare una chiamata tramite il backend
    };

    // Funzione per gestire l'azione di avvio video
    const startVideo = () => {
        // Esegui la logica per avviare la videochiamata
        console.log('Avvio video...');
        // Aggiungi qui la logica per avviare una videochiamata tramite il backend
    };

    return (
        <main className="content">
            <div className="container p-0">
                <h1 className="h3 mb-3">Messages</h1>
                <div className="card">
                    <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right">
                            <div className="px-4 d-none d-md-block">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <input type="text" className="form-control my-3" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="list-group-item list-group-item-action border-0">
                                <div className="badge bg-success float-right">5</div>
                                <div className="d-flex align-items-start">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                                    <div className="flex-grow-1 ml-3">
                                        <strong>Vanessa Tucker</strong>
                                        <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                    </div>
                                </div>
                            </a>
                            {/* Altri utenti... */}
                        </div>
                        <div className="col-12 col-lg-7 col-xl-9">
                            <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                <div className="d-flex align-items-center py-1">
                                    <div className="position-relative">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                    </div>
                                    <div className="flex-grow-1 pl-3">
                                        <strong>Sharon Lessman</strong>
                                        <div className="text-muted small"><em>Typing...</em></div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary btn-lg mr-1 px-3" onClick={makeCall}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </button>
                                        <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block" onClick={startVideo}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                        </button>
                                        <button className="btn btn-light border btn-lg px-3" onClick={search}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search feather-lg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative">
                                <div className="chat-messages p-4">
                                    {/* Messaggi della chat */}
                                </div>
                            </div>
                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Type your message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ChatPage;
