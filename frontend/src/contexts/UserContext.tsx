import React, { ReactNode, createContext, useState } from 'react'
import { User } from '../interfaces/User'

interface Props {
    title?: string,
    children: ReactNode,
};

interface UserContextState {
    user: User
    setUser(user: User): void
}

export const UserContext = createContext({} as UserContextState)

export const UserContextProvider: React.FC<Props> = (props) => {
    const [user, setUser] = useState({ isLoggedIn: false } as User)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
