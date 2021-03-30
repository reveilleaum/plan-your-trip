import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';


export default function Login() {

  const connect = () => {
    axios.post('http://localhost:3001/api/auth/login', {
      email: 'reveilleaum@gmail.com',
      password: 'iceman55'
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={connect}>Connection</button>
    </>
  )
}
