import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { login } from '../api'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage(props) {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { setLogin, user } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    login({ username, password })
      .then((res) => {
        console.log({ token: res.access_token, ...res.user })
        setLogin({ token: res.access_token, ...res.user })
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  useEffect(() => {
    if (user !== null) {
      navigate('/', { replace: true })
    }
  }, [user, props])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card bg-base-200 w-96 shadow-xl p-4">
        <form onSubmit={handleLogin}>
          <div className="grid grid-rows-1 gap-4">
            <div className="font-bold text-2xl">Login</div>
            {error && <div className="alert alert-info">{error}</div>}
            <div>
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                id="username"
                type="text"
                value={username}
                className="input input-bordered w-full"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Password</span>
              </div>{' '}
              <input
                id="password"
                type="password"
                value={password}
                placeholder="password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-row justify-between items-end">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <div className="w-full text-right">
                <Link to={'/register'} className="underline">
                  register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
