import React from 'react';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';

export default function Signup() {

  const router = useRouter()
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log(auth);

  const createUser = async event => {
    event.preventDefault()

    axios.post('http://localhost:3001/api/auth/signup', {
      email: event.target.email.value,
      password: event.target.password.value
    })
      .then(res => {
        dispatch({ type: 'LOG_IN' })
        router.push('/login')
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Link href={'/'}>Homepage</Link>
      <h1>Sign up</h1>
      <form onSubmit={createUser}>
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Créer</button>
      </form>
    </>
  )
}
