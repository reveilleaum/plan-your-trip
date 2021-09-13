import Link from 'next/link'

export default function Dashboard({ trips }) {

  return (
    <>
      <Link href={'/'}>Homepage</Link>
      <h1>Dashboard</h1>

      <ul>
        <li><Link href="/">Créer un Voyage</Link></li>
        <li><Link href="/">Ajouter des personnes</Link></li>
        <li><Link href="/">Voir les dépenses</Link></li>
        <li><Link href="/">Conversations</Link></li>
      </ul>

      <ul>
        {trips.map((trip, i) =>
          <li key={i}>
            <Link href={`/voyage/${trip._id}`}>{trip.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  if (req.cookies.token) {
    const trips = await fetch('http://localhost:3001/api/trip', {
      headers: {
        authorization: `Bearer ${req.cookies.token}`
      },
    }).then(res => res.json())

    return {
      props: {
        trips
      }
    }
  } else {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
  }
}
