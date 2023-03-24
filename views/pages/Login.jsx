// import { Show } from 'solid-js'

export const Login = () => {
  return (
    <div class="px-4 bg-gray-100 h-screen grid place-items-center text-center sm:px-0">
      <form
        class="w-full max-w-sm mx-auto flex flex-col"
        method="post"
        action="/login"
      >
        <h1 class="text-2xl mb-8 font-medium">Login</h1>
        <input
          type="email"
          id="email"
          name="email"
          class="p-2 border border-gray-300 rounded mb-2"
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          class="p-2 border border-gray-300 rounded mb-2"
          placeholder="Senha"
          minlength="6"
          required
        />
        {/* <Show when={error}>
          <div class="my-1 p-2 flex items-center justify-center bg-red-100 text-red-600 border border-red-200 rounded">
            <i class="mr-2" data-feather="info" width="18" height="18"></i>
            <span>{error}</span>
          </div>
        </Show> */}
        <button
          class="mt-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition"
          type="submit"
        >
          Entrar
        </button>
        <a
          class="mt-12 text-gray-400 hover:text-gray-500 hover:underline transition"
          href="/register"
        >
          Criar conta
        </a>
      </form>
    </div>
  )
}
