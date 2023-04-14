import { useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Tag, Users, Settings } from 'react-feather'

import { UserContext } from '../context/AuthContext'

export const Sidebar = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  const activeClass = 'w-full py-3 flex flex-col text-white items-center cursor-pointer bg-zinc-800'
  const inactiveClass = 'w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800'

  function getUserImage() {
    const name = (user?.name || '').split(' ').join('+')
    return `https://ui-avatars.com/api?background=475F9C&color=fff&rounded=true&format=svg&size=32&name=${name}`
  }

  if (!user?.id) {
    return null
  }

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
            className={location.pathname == '/users' ? activeClass : inactiveClass}
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
          <div className="w-full py-3 flex flex-col items-center text-center mb-4">
            <img
              src={getUserImage()}
              width="36"
              height="36"
              alt={`${user.name} profile`}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
