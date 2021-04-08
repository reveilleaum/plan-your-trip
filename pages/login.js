import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'


export default function Login() {

  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const router = useRouter()

  const createUser = async event => {
    event.preventDefault()

    axios.post('http://localhost:3001/api/auth/login', {
      email: event.target.email.value,
      password: event.target.password.value
    })
      .then(res => {
        setCookie('token', res.data.token, {
          path: '/',
          maxAge: 3600, // secondes (1hr)
          sameSite: true,
          // httpOnly: true,
          secure: true
        })
        router.push('/dashboard')
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Link href={'/'}>Homepage</Link>
      <h1>Login</h1>
      <form onSubmit={createUser}>
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Connexion</button>
      </form>
    </>
  )
}
