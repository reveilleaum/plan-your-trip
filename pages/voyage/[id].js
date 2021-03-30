import Head from 'next/head'
import Link from 'next/link'

export default function voyage({ voyage }) {
  return (
    <>
      <Head>
        <title>Titre de mon article</title>
      </Head>
      <Link href={'/'}>Retour</Link>
      <h1>{voyage.description}</h1>
      <h1>{voyage.price}</h1>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjljNjlmMmIyMDU3YzdiMjcyY2VmODMiLCJpYXQiOjE2MTcwNDE0MjEsImV4cCI6MTYxNzEyNzgyMX0.VysOEuhV8V3vadjNGim2nF_15aV7mBYxA_xiZ8It-54'

  const voyage = await fetch(`http://localhost:3001/api/stuff/${params.id}`, {
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
      voyage
    }
  }
}
