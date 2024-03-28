import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


function Registrazione() {
    const currentYear = new Date().getFullYear();
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const[email,setEmail]=useState('');
    const [message,setMessage] = useState('');
=======
import { useNavigate } from 'react-router-dom';

function Registrazione() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectToLogin] = useState(false);
    const navigate = useNavigate();

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Le password non corrispondono");
            return;
        }

        // Implementa la logica di registrazione qui
        console.log('Registrazione avviata...');
    };

    const handleRegister = async () => {
        // Esegui la validazione dei dati qui
        if (!validateEmail(email)) {
            setErrorMessage('Indirizzo email non valido');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage("La password deve contenere almeno 8 caratteri, di cui almeno un carattere minuscolo, uno maiuscolo, un numero e un carattere speciale.");
            return;
        }
        // Invia i dati al backend per la registrazione
        try {
            const response = await fetch('URL_DEL_TUO_BACKEND/registrazione', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (response.ok) {
                console.log('Registrazione riuscita');
                navigate('/login'); // Reindirizza alla pagina di login dopo la registrazione
            } else {
                // Registrazione non riuscita, mostra un messaggio di errore
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            setErrorMessage('Errore durante la registrazione. Si prega di riprovare.');
        }
    };
>>>>>>> 8c45a1e4156331de69b4b1c33120ee76e6adf3a2

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('myendpointApi',{
                username : username,
                password : password,
                email:email
            });
            setMessage(response.data.message);
        }catch(error){
            setMessage('Registrazione falito. Prego riprova di nuovo');
        }
    };
  
    return (
<<<<<<< HEAD
        <>
        <Navbar/>
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                    <div className="card text-center">
                        <div className="card-header bg-success text-white">Registrati</div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-success btn-lg w-100">Register</button>
                            </form>
                            {message && <p className="mt-3">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer />
        </>
=======
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 position-relative" style={{ backgroundImage: `url('registratiIMG.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="text-center text-white ">
                            <h1>Inizia la tua avventura con REadCycle!</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ background: 'linear-gradient(to top right, rgb(250, 252, 253), rgb(192, 197, 196), rgb(150, 210, 193))' }}>
                    <div className="container">
                        <br /><br /><h1 className="text-center">Registrati su REadCycle</h1><br />

                        <div className="text-center mb-3">
                            <span>Hai già un account? </span>
                            <button className="btn btn-link" onClick={handleLogin}>Accedi</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Cognome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                            </div>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg" onClick={handleRegister}>Registrati</button><br /><br /><br /><br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {redirectToLogin && <Redirect to="/login" />}
        </div>
>>>>>>> 8c45a1e4156331de69b4b1c33120ee76e6adf3a2
    );
    
     
}
    
//         <>
//           di
//            <footer className="bg-dark text-white text-center py-4">
//             <div className="container">
//                 <p className="mb-0">© {currentYear} REadCycle. Tutti i diritti riservati.</p>
//             </div>
//         </footer>
//         </>

<<<<<<< HEAD
      
//     );
// }

export default Registrazione;
=======
export default Registrazione;
>>>>>>> 8c45a1e4156331de69b4b1c33120ee76e6adf3a2
