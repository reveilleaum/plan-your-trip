import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/calendar'),
  { ssr: false }
)

export default function Trip({ trip, users }) {
  return (
    <>
      <Link href={'/dashboard'}>Dashboard</Link>
      <h1>{trip.title}</h1>

      <DynamicComponentWithNoSSR data={{trip, users}} />
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    const [trip, users] = await Promise.all([
      fetch(`http://localhost:3001/api/trip/${params.id}`, {
        headers: {
          authorization: `Bearer ${req.cookies.token}`
        }
      }),
      fetch(`http://localhost:3001/api/user`, {
        headers: {
          authorization: `Bearer ${req.cookies.token}`
        }
      })
    ]).then(response => {
      return Promise.all(response.map(res => res.json()))
    })

    return {
      props: {
        trip,
        users
      }
    }
  } else {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
  }
}
