import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Page() {
  const { logout, user } = useAuth()
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card bg-base-200 w-96 shadow-xl p-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold mb-2">Profile</div>
          <table className="table my-10">
            <tbody>
              <tr>
                <td>ID</td>
                <td>:</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{user.real_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>:</td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>:</td>
                <td>{user.username}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-row justify-between">
            <Link to="/edit-profile" className="btn btn-primary">
              Edit Profile
            </Link>
            <div className="btn btn-secondary" onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
