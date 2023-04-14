import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Tag, Users, Settings } from 'react-feather'

import { useUserContext } from '../context/AuthContext'
import { trpc } from '../services/trpc'

import { LogoutUserDropdown } from './LogoutUserDropdown'

export const Sidebar = () => {
  const [isUserDropdownActive, setIsUserDropdownActive] = useState(false)
  const { user, updateUser } = useUserContext()

  const location = useLocation()
  const navigate = useNavigate()

  const activeClass =
    'w-full py-3 flex flex-col text-white items-center cursor-pointer bg-zinc-800'
  const inactiveClass =
    'w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800'

  function getUserImage() {
    const name = (user?.name || '').split(' ').join('+')
    return `https://ui-avatars.com/api?background=475F9C&color=fff&rounded=true&format=svg&size=32&name=${name}`
  }

  if (!user?.id) {
    return null
  }

  function handleLogout() {
    trpc.logoutUser.mutate()
      .catch(() => {})
      .finally(() => {
        updateUser(undefined)
        navigate('/login')
      })
  }

  const logoutUserDropdownOptions = [
    {
      key: 'logout',
      text: 'Sair',
      onClick: handleLogout
    }
  ]

  return (
    <aside className="h-full sticky hidden sm:block bg-zinc-900 text-sm font-thin text-center text-zinc-400 select-none">
      <div className="flex-1 h-full flex flex-col justify-between">
        <div className="w-16 flex-1 flex flex-col items-center">
          <div className="block w-full h-16"></div>
          <Link
            to="/"
            className={location.pathname == '/' ? activeClass : inactiveClass}
          >
            <Tag width={22} height={22} />
            <span>Painel</span>
          </Link>
          <Link
            to="/users"
            className={
              location.pathname == '/users' ? activeClass : inactiveClass
            }
          >
            <Users width={22} height={22} />
            <span>Usuários</span>
          </Link>
        </div>
        <div className="w-16 flex flex-col justify-end items-center">
          <div className="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <Settings width={22} height={22} />
            <span>Ajustes</span>
          </div>
          <div className="w-full py-3 flex flex-col items-center text-center mb-4 relative">
            <img
              src={getUserImage()}
              width="36"
              height="36"
              className="cursor-pointer"
              alt={`${user.name} profile`}
              onClick={() => setIsUserDropdownActive((prev) => !prev)}
            />
            {isUserDropdownActive ? <LogoutUserDropdown options={logoutUserDropdownOptions} /> : null}
          </div>
        </div>
      </div>
    </aside>
  )
}
