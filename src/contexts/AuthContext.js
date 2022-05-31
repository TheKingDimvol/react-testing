import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    const signup = async (username, email, password) => {
        const response = await fetch("/auth/signup", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const data = await response.json()

        if (!response.ok) {
            return { error: data.detail }
        }
    }

    const login = async (username, password) => {
        const response = await fetch("/auth/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()
        if (!response.ok) {
            return { error: data.detail }
        }

        setCurrentUser(data)
        localStorage.setItem('currentUser', JSON.stringify(data));
    }

    useEffect(() => {
        const currentUserInStorage = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUserInStorage) {
            setCurrentUser(currentUserInStorage)
        }
        setLoading(false)
    }, [])

    const logout = () => {
        setCurrentUser({})
        localStorage.removeItem('currentUser');
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const value = {
        currentUser,
        signup,
        login, 
        logout,
        isEmpty
    }

    return (
        <AuthContext.Provider value={ value }>
            {!loading && children}
        </AuthContext.Provider>
    )
}
