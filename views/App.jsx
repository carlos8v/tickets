import { Routes, Route } from '@solidjs/router'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Panel } from './pages/Panel'

function App() {
  return (
    <Routes>
      <Route path="/" component={Panel} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  );
}

export default App;
