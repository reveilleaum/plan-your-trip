import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'


export default function Login() {

  const [cookie, setCookie] = useCookies(['token'])
  const router = useRouter()

  const connect = () => {
    axios.post('http://localhost:3001/api/auth/login', {
      email: 'reveilleaum@gmail.com',
      password: 'iceman55'
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
      <button onClick={connect}>Connection</button>
    </>
  )
}
