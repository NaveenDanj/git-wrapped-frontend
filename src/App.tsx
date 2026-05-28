import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginCallback from './pages/LoginCallback'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/callback' element={<LoginCallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
