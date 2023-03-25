import { ReactNode, useEffect, useState, createContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { UserModel } from '@domain/user'
import { trpc } from '../services/trpc'

const UserContext = createContext<{ user?: Omit<UserModel, 'password'> }>({})

const ignoreRoutes = ['/register', '/login']

export const AuthContext = ({ children }: { children: ReactNode }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true)
  const [user, setUser] = useState<Omit<UserModel, 'password'> | undefined>(undefined)

  const location = useLocation()
  const navigate = useNavigate()

  async function refreshUserSession() {
    try {
      const userData = await trpc.me.query()
      if (!userData?.id) return

      setUser(userData)
    } catch (error) {
      navigate('/login')
    } finally {
      setIsFetchingUser(false)
    }
  }

  useEffect(() => {
    if (!user?.id && !ignoreRoutes.includes(location.pathname)) {
      refreshUserSession()
      return
    }

    setIsFetchingUser(false)
  }, [user])

  return (
    <UserContext.Provider value={{ user }}>
      {!isFetchingUser ? children : null}
    </UserContext.Provider>
  )
}
