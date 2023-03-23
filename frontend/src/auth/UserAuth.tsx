import { useState } from "react";
import UserAuthTemplate from "./UserAuthTemplate";
import { setCookie } from "./utils/manageCookies";
import { Api } from "../api/Api";

type State = {
  email: string;
  password: string;
}

export const UserAuth = () => {
  const [state, setState] = useState({} as State)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const login = async () => {
    try {
      const { email, password } = state
      const response = await new Api().post('/auth/login', { email, password })
      if (response.status === 200) {
        setCookie('loggedIn', 'true')
      }
    }
    catch (err: any) {
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


/* //Tecla de atalho "Enter" para entrar
useEffect(() => {
 const signIn = e => {
   if (e.key === 'Enter')
     handleSubmit()
 }
 document.addEventListener('keypress', signIn)
 return () => document.removeEventListener('keypress', signIn)
}) */