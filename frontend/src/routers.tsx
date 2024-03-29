import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Chat />} />
      <Route path='/set-avatar' element={<SetAvatar />} />
    </Routes>
  </BrowserRouter>
)

export default Router
