import React, { useContext, useState } from "react";
import UserAuthTemplate from "./UserAuthTemplate";
import { Api } from "../api/Api";
import { UserContext } from "../contexts/UserContext";

type State = {
  email: string;
  password: string;
}

export const UserAuth = () => {
  const [state, setState] = useState({} as State)
  const { user, setUser } = useContext(UserContext)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const login = async () => {
    try {
      const { email, password } = state
      const response = await new Api().post('/api/login', { email, password })
      if (response.status === 200) {
        const loginExpires = new Date().getTime() + 60 * 60 * 1000
        setUser({
          ...user,
          loginExpires,
          isLoggedIn: true,
        })
      }
    } catch (err: any) {
      console.error(err?.response?.data, 'error')
    }
  }

  return (
    <>
      <UserAuthTemplate
        data={state}
        handleInput={handleInput}
        handleSubmit={login}
      />
    </>
  )
}
