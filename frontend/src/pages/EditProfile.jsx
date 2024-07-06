import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuth } from '../hooks/useAuth'
import { getProfile, updateprofile } from '../api'

export default function Page() {
  const navigate = useNavigate()

  const { user, setLogin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()

    updateprofile(
      { real_name: name, username, password, email, phone },
      user.token
    )
      .then((res) => {
        console.log(res)
        setLogin({
          ...res.user,
          token: user.token,
        })
        toast.success(res.message)
        navigate('/')
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  useEffect(() => {
    getProfile(user.token)
      .then((res) => {
        setUsername(res.username)
        setName(res.real_name)
        setEmail(res.email)
        setPhone(res.phone)
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }, [])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card bg-base-200 w-96 shadow-xl p-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold mb-2">Edit Profile</div>

          <div className="grid grid-rows-1 gap-4">
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
          </div>

          <div className="flex flex-row justify-between mt-5">
            <div className="btn btn-primary" onClick={handleUpdate}>
              Save
            </div>
            <Link to="/" className="btn btn-secondary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
