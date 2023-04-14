import { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

import { AuthContext } from './context/AuthContext'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { TicketsPanel } from './pages/TicketsPanel'
import { UsersPanel } from './pages/UsersPanel'

export const routes = [
  {
    path: '/',
    element: <ContextWrapper element={<TicketsPanel />} />,
  },
  {
    path: '/users',
    element: <ContextWrapper element={<UsersPanel />} />,
  },
  {
    path: '/login',
    element: <ContextWrapper element={<Login />} />,
  },
  {
    path: '/register',
    element: <ContextWrapper element={<Register />} />,
  },
] as RouteObject[]

function ContextWrapper({ element }: { element: ReactNode }) {
  return <AuthContext>{element}</AuthContext>
}
