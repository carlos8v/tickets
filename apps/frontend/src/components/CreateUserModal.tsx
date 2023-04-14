import React, { useState } from 'react'
import { X, Info } from 'react-feather'

import { trpc } from '../services/trpc'

const DEFAULT_PASS = 'senha-padrao'

export const CreateUserModal = (props: {
  handleClose: () => void
  onSubmit: () => void
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  function handleClose() {
    if (props.handleClose) props.handleClose()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsCreating(true)

    try {
      await trpc.registerUser.mutate({
        name,
        email,
        password: DEFAULT_PASS,
        confirmPassword: DEFAULT_PASS,
      })

      if (props.onSubmit) {
        props.onSubmit()
      }
    } catch (error: Error | any) {
      setError(error?.message)
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="fixed top-0 left-0 right-0 z-50 w-full h-[calc(100%-1rem)] max-h-full mx-auto p-4 overflow-x-hidden overflow-y-auto md:inset-0">
        <div className="relative w-full mx-auto max-w-2xl max-h-full">
          <form className="mx-auto bg-white shadow" onSubmit={handleSubmit}>
            <header className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium text-gray-900">
                Cadastrar usuário
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <X />
              </button>
            </header>
            <main className="px-6 pt-2 pb-6">
              {error ? (
                <div className="mt-1 mb-2 p-2 flex items-center bg-red-100 text-red-600 border border-red-200 rounded">
                  <Info className="mr-2" width={18} height={18} />
                  <span>{error}</span>
                </div>
              ) : null}
              <label htmlFor="name" className="text-sm text-gray-800">
                Nome:
              </label>
              <input
                type="text"
                disabled={isCreating}
                id="name"
                name="name"
                className={`w-full p-2 border border-gray-300 rounded mb-2 ${
                  isCreating ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="email" className="text-sm text-gray-800">
                E-mail:
              </label>
              <input
                type="email"
                disabled={isCreating}
                id="email"
                name="email"
                className={`w-full p-2 border border-gray-300 rounded mb-2 ${
                  isCreating ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="text-sm text-gray-800">
                Senha:
              </label>
              <input
                readOnly
                type="text"
                disabled={isCreating}
                id="password"
                name="password"
                value={DEFAULT_PASS}
                className="w-full p-2 mb-4 bg-gray-100 text-gray-400 border border-gray-300 rounded cursor-not-allowed"
              />
              <small className="block px-3 py-2 w-full bg-yellow-100 rounded text-sm text-gray-700 border border-yellow-300">
                <Info className="inline-block mr-1" size={16} /> Essa é a senha
                padrão do sistema. Peça para o cliente alterá-la quando puder!
              </small>
            </main>
            <footer className="flex items-center px-6 py-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isCreating}
                className={`px-5 py-2 mr-3 text-white ${
                  isCreating ? 'bg-blue-900 cursor-not-allowed' : 'bg-blue-700'
                } border border-blue-700 font-medium text-sm text-center hover:bg-blue-800`}
              >
                Cadastrar
              </button>
              <button
                type="button"
                disabled={isCreating}
                onClick={handleClose}
                className={`px-5 py-2 text-gray-500 ${
                  isCreating ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                } text-sm font-medium border border-gray-400 hover:bg-gray-100 hover:text-gray-900`}
              >
                Cancelar
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
