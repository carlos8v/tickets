import { ReactNode, useEffect, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserModel } from 'backend'
import { trpc } from '../services/trpc'

const UserContext = createContext<{ user?: Omit<UserModel, 'password'> }>({})

export const AuthContext = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<Omit<UserModel, 'password'> | undefined>(undefined)

  const navigate = useNavigate()

  async function handleMe() {
    try {
      const userData = await trpc.me.query()
      if (!userData?.id) return

      setUser(userData)
    } catch (error) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading === true && !user?.id) {
      handleMe()
    }
  }, [loading, user])

  return (
    <UserContext.Provider value={{ user }}>
      {!loading ? children : null}
    </UserContext.Provider>
  )
}
