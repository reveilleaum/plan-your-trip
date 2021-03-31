import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';


export default function Home() {

  const [variable, modify] = useState(0)

  const test = () => {
    modify(variable + 1)
  }

  return (
    <>
      <Head>
        <title>Titre de ma page</title>
      </Head>

      <h1>Homepage</h1>

      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signin">Sign in</Link></li>
      </ul>

      <p onClick={test}>{variable}</p>
    </>
  )
}
