import React from 'react';
import Link from 'next/link'


export default function Dashboard({ voyages }) {

  return (
    <>
      <Link href={'/'}>Homepage</Link>
      <h1>Dashboard</h1>

      <ul>
        <li><Link href="/login">Voir mes dépenses</Link></li>
        <li><Link href="/dashboard">Créer un voyage</Link></li>
        <li><Link href="/signin">Ajouter des personnes</Link></li>
        <li><Link href="/signin">Notifications</Link></li>
        <li><Link href="/conversations">Conversations</Link></li>
      </ul>

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

export async function getServerSideProps({ req, res }) {
  if (req.cookies.token) {
    const voyages = await fetch('http://localhost:3001/api/stuff', {
      headers: {
        authorization: `Bearer ${req.cookies.token}`
      },
    })
      .then(res => res.json())

    return {
      props: {
        voyages
      }
    }
  } else {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
  }
}
