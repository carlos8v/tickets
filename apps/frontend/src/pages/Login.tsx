import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info } from 'react-feather'

import { trpc } from '../services/trpc'

export const Login = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await trpc.loginUser.mutate({
        email,
        password,
      })

      navigate('/')
    } catch (error: Error | any) {
      setError(error?.message || 'Erro inesperado ocorreu')
    }
  }

  return (
    <div className="px-4 bg-gray-100 h-screen grid place-items-center text-center sm:px-0">
      <form
        className="w-full max-w-sm mx-auto flex flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-8 font-medium">Login</h1>
        <input
          type="email"
          id="email"
          name="email"
          className="p-2 border border-gray-300 rounded mb-2"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          className="p-2 border border-gray-300 rounded mb-2"
          placeholder="Senha"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? (
          <div className="my-1 p-2 flex items-center justify-center bg-red-100 text-red-600 border border-red-200 rounded">
            <Info className="mr-2" width={18} height={18} />
            <span>{error}</span>
          </div>
        ) : null}
        <button
          className="mt-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition"
          type="submit"
        >
          Entrar
        </button>
        <a
          className="mt-12 text-gray-400 hover:text-gray-500 hover:underline transition"
          href="/register"
        >
          Criar conta
        </a>
      </form>
    </div>
  )
}
