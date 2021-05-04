import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/calendar'),
  { ssr: false }
)

export default function Trip({ trip, activities }) {
  return (
    <>
      <Link href={'/dashboard'}>Dashboard</Link>
      <h1>{trip.title}</h1>

      <DynamicComponentWithNoSSR data={{trip, activities}} />
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    const [trip, activities] = await Promise.all([
      fetch(`http://localhost:3001/api/trip/${params.id}`, {
        headers: {
          authorization: `Bearer ${req.cookies.token}`
        }
      }),
      fetch(`http://localhost:3001/api/activity`, {
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
        activities
      }
    }
  } else {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
  }
}
