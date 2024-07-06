import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { register } from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function LoginPage(props) {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)

  const { user } = useAuth()

  const handleRegiter = async (e) => {
    e.preventDefault()
    register({ username, password, email, name, phone })
      .then((res) => {
        console.log(res)
        toast.success(res.message)
        navigate('/login')
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
        <form onSubmit={handleRegiter}>
          <div className="grid grid-rows-1 gap-4">
            <div className="font-bold text-2xl">Register</div>
            {error && <div className="alert alert-info">{error}</div>}
            <div>
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                id="name"
                type="text"
                value={name}
                className="input input-bordered w-full"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                id="email"
                type="email"
                value={email}
                className="input input-bordered w-full"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Phone</span>
              </div>
              <input
                id="phone"
                type="text"
                value={phone}
                className="input input-bordered w-full"
                placeholder="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
                Register
              </button>
              <div className="w-full text-right">
                <Link to={'/login'} className="underline">
                  login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
