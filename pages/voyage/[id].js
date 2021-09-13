import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/calendar'),
  { ssr: false }
)

export default function Trip({ trip, activity, users }) {

  const trip_users = users.filter(user => user.trips.includes(trip._id))

  const activities = []
  for (let i = 0; i < activity.length; i++) {
    activities.push(activity[i])
    activity[i].id = activity[i]._id
  }

  return (
    <>
      <Link href={'/dashboard'}>Dashboard</Link>
      <h1>{trip.title}</h1>
      <ul>
        {
          trip_users.map((user, i) => (
            <option key={i} value={user.name}>{user.name}</option>
          ))
        }
      </ul>

      <DynamicComponentWithNoSSR data={{trip, activities, users}} />
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    const [trip, activity, users] = await Promise.all([
      fetch(`http://localhost:3001/api/trip/${params.id}`, {
        headers: {
          authorization: `Bearer ${req.cookies.token}`
        }
      }),
      fetch(`http://localhost:3001/api/activity`, {
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
        activity,
        users,
      }
    }
  } else {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
  }
}
