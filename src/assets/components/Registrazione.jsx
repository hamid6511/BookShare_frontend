import React, { useState } from 'react';
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

      
//     );
// }

export default Registrazione;