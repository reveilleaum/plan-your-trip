import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';


export default function Home({ voyages }) {
  console.log(voyages);

  const [variable, modify] = useState(0)

  const test = () => {
    modify(variable + 1)
  }

  return (
    <>
      <Head>
        <title>Titre de ma page</title>
      </Head>
      <h1>Page d'accueil</h1>
      <p onClick={test}>{variable}</p>
      <Link href="/login">Login</Link>
      <ul>
        {voyages.map((voyage, i) =>
          <li key={i}>
            <Link href={`/voyage/${voyage._id}`}>{voyage.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjljNjlmMmIyMDU3YzdiMjcyY2VmODMiLCJpYXQiOjE2MTcwNDE0MjEsImV4cCI6MTYxNzEyNzgyMX0.VysOEuhV8V3vadjNGim2nF_15aV7mBYxA_xiZ8It-54'
  const voyages = await fetch('http://localhost:3001/api/stuff', {
    headers: {
      authorization: `Bearer ${token}`
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    })
  return {
    props: {
      voyages
    }
  }
}
