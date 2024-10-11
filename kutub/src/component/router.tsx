import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../home'
import Reader from '../reader'
import Mapper from '../mapper'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/mapper" element={<Mapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
