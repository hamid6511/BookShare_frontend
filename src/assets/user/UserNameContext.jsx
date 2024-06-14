import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserNameContext = createContext();

export const useUserName = () => {
    return useContext(UserNameContext);
};

export const UserNameProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');


        if (token) {
            const decodedToken = jwtDecode(token);
            const userNameFromToken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            if (userNameFromToken) {
                setUserName(userNameFromToken);
                localStorage.setItem('userName', userNameFromToken.split(' ')[0]);
            }

        }
    }, []);

    return (
        <UserNameContext.Provider value={{ userName }}>
            {children}
        </UserNameContext.Provider>
    );
};
