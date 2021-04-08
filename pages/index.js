import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'



export default function Home() {

  /////

  const [variable, modify] = useState(0)
  const auth = useSelector(state => state.auth);

  const test = () => {
    modify(variable + 1)
    dispatch({ type: 'LOG_IN' })
  }

  /////

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const router = useRouter()

  const logInOut = () => {
    if (cookies.token) {
      removeCookie('token')
    } else {
      router.push('/login')
    }
  }

  return (
    <>
      <Head>
        <title>Titre de ma page</title>
      </Head>

      <h1>Homepage</h1>

      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><a onClick={logInOut}>{cookies.token ? 'Logout' : 'Login'}</a></li>
        <li><Link href="/signup">Sign up</Link></li>
      </ul>

      <p>{variable}</p>
      <p>{`${auth}`}</p>
      <button onClick={test}>test</button>
    </>
  )
}
