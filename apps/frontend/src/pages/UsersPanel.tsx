import { useState, useEffect } from 'react'
import { Search } from 'react-feather'

import type { UserModel } from '@domain/user'

import { trpc } from '../services/trpc'

import { Sidebar } from '../components/Sidebar'
import { CreateUserModal } from '../components/CreateUserModal'

import { usersClass, usersLabel } from '../utils'

export const UsersPanel = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [users, setUsers] = useState<UserModel[]>([])

  const [isModalActive, setIsModalActive] = useState(false)

  function fetchUsers() {
    trpc.findAllUsers.query({ name, email }).then((res) => setUsers(res))
  }

  useEffect(() => {
    fetchUsers()
  }, [name, email])

  function toggleModal() {
    setIsModalActive((prev) => !prev)
  }

  function handleUserCreation() {
    setIsModalActive(false)
    fetchUsers()
  }

  return (
    <div className="w-full h-screen w-full flex">
      <Sidebar />
      <main className="h-full w-full flex flex-col sm:flex-row overflow-auto">
        <section className="w-full sm:max-w-[18rem] sm:h-full bg-gray-100 border-b sm:border-r border-zinc-300">
          <div className="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 className="text-lg">Usuários</h5>
          </div>
          <div className="p-4">
            <label
              htmlFor="search-users"
              className="w-full p-2 bg-white flex border border-gray-300 items-center"
            >
              <Search className="mr-2 text-gray-400" width={22} height={22} />
              <input
                id="search-users"
                type="text"
                className="w-full outline-0"
                placeholder="Procurar por nome"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </label>
          </div>
        </section>
        <section className="flex-1 overflow-auto">
          <div className="h-16 border-b border-zinc-300 flex items-center justify-between px-4">
            <h5 className="text-lg">Todos os usuários</h5>
            <button
              className="px-4 py-1 border border-zinc-300"
              onClick={toggleModal}
            >
              Cadastrar
            </button>
          </div>
          <div className="overflow-auto">
            <div className="min-w-[1024px] w-full">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pl-4 text-left">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="p-4 text-left font-medium">Nome</th>
                    <th className="p-4 text-left font-medium">Email</th>
                    <th className="p-4 text-left font-medium">Tipo</th>
                    <th className="p-4 text-left font-medium">
                      Última atualização
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!users?.length ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center pt-8 pb-4 text-zinc-400 font-bold"
                      >
                        Nenhum usuário disponível
                      </td>
                    </tr>
                  ) : null}
                  {users.map((user) => (
                    <tr
                      className="odd:bg-gray-100 hover:bg-gray-200"
                      key={user.id}
                    >
                      <td className="pl-4">
                        <input
                          id={user.id}
                          type="checkbox"
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span
                          className={usersClass[user.admin ? 'ADMIN' : 'USER']}
                        >
                          {usersLabel[user.admin ? 'ADMIN' : 'USER']}
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isModalActive ? (
            <CreateUserModal
              handleClose={toggleModal}
              onSubmit={handleUserCreation}
            />
          ) : null}
        </section>
      </main>
    </div>
  )
}
