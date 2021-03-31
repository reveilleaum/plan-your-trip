import Head from 'next/head'
import Link from 'next/link'

export default function Voyage({ voyage }) {
  return (
    <>
      <Link href={'/dashboard'}>Dashboard</Link>
      <h1>{voyage.description}</h1>
      <h2>{voyage.price}</h2>
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  const voyage = await fetch(`http://localhost:3001/api/stuff/${params.id}`, {
    headers: {
      authorization: `Bearer ${req.cookies.token}`
    },
  })
    .then(res => res.json())

  return {
    props: {
      voyage
    }
  }
}
