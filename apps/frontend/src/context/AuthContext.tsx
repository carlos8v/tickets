import { ReactNode, useEffect, useState, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { UserModel } from '@domain/user'
import { trpc } from '../services/trpc'

type SafeUser = Omit<UserModel, 'password'>

const UserContext = createContext<{
  user?: SafeUser,
  updateUser: (userData: SafeUser | undefined) => void
}>({
  user: undefined,
  updateUser: () => {}
})

const ignoreRoutes = ['/register', '/login']

export const AuthContext = ({ children }: { children: ReactNode }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true)
  const [user, setUser] = useState<SafeUser | undefined>(undefined)

  const location = useLocation()
  const navigate = useNavigate()

  function updateUser(userData: SafeUser | undefined) {
    setUser(userData)
  }

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
    <UserContext.Provider value={{ user, updateUser }}>
      {!isFetchingUser ? children : null}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
