import React, { useState, useEffect } from "react";
import Menu from "../user/Menu";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Users/GetAll");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo utente?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5199/api/Users/Delete/${userId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error("Failed to delete user");
                }
                // Aggiorna la lista degli utenti dopo l'eliminazione
                fetchUsers();
                alert("Utente eliminato con successo!");
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <h2>Gestione Utenti</h2>
                <hr />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ruolo</th>
                                <th>Elimina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Elimina</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminUsers;
