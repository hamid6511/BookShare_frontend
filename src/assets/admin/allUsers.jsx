import React, { useState, useEffect } from "react";
import Menu from "../user/Menu";

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5199/api/Users/Get-All-Users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeactivateUser = async (userId) => {
        console.log("Disattiva utente con ID:", userId);
        try {
            const response = await fetch(`http://localhost:5199/api/Users/Deactivate-user-by-Id/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Failed to deactivate user");
            }
            console.log("Utente disattivato con successo!");
            // Aggiorna la lista degli utenti dopo aver disattivato uno
            fetchUsers();
        } catch (error) {
            console.error("Error deactivating user:", error);
        }
    };

    const handleActivateUser = async (userId) => {
        console.log("Attiva utente con ID:", userId);
        try {
            const response = await fetch(`http://localhost:5199/api/Users/Activate-user-by-Id/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Failed to activate user");
            }
            console.log("Utente attivato con successo!");
            fetchUsers();
        } catch (error) {
            console.error("Error activating user:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        console.log("Elimina utente con ID:", userId);
        try {
            const response = await fetch(`http://localhost:5199/api/Users/Delete-user-by-Id/${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            console.log("Utente eliminato con successo!");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <h2>Gestione degli Utenti</h2>
                <hr />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Comune</th>
                                <th>Provincia</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.comune}</td>
                                    <td>{user.provincia}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleDeactivateUser(user.id)}>Disattiva</button>
                                        <button className="btn btn-success me-2" onClick={() => handleActivateUser(user.id)}>Attiva</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Elimina</button>
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

export default AllUsers;
