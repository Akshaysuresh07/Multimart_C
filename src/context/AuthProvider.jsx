import React, { useState,useEffect } from 'react';
import { AuthContext } from './Authcontext';

export const AuthProvider = ({ children }) => {
    const [isAuthorised, setIsAuthorised] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsAuthorised(true)
        } else {
            setIsAuthorised(false)
        }
    }, [isAuthorised])
  return (
    <AuthContext.Provider value={{ isAuthorised, setIsAuthorised }}>
      {children}
    </AuthContext.Provider>
  );
};