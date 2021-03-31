import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useCookies } from "react-cookie"


export default function Login() {

  const [cookie, setCookie] = useCookies(['token'])

  const connect = () => {
    axios.post('http://localhost:3001/api/auth/login', {
      email: 'reveilleaum@gmail.com',
      password: 'iceman55'
    })
      .then(res => {
        console.log(res);
        setCookie('token', res.data.token, {
          path: '/',
          maxAge: 3600, // secondes (1hr)
          sameSite: true,
          // httpOnly: true,
          secure: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Link href={'/dashboard'}>Dashboard</Link>
      <h1>Login</h1>
      <button onClick={connect}>Connection</button>
    </>
  )
}
