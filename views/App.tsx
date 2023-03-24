import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Panel } from './pages/Panel'

const routes = [
  {
    path: '/',
    element: <Panel />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
] as RouteObject[]

function App() {
  const router = createBrowserRouter(routes)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
