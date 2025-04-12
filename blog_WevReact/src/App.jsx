import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Auth/Login'
import Header from './components/HeaderFooter/Header'
import Footer from './components/HeaderFooter/Footer'
import Register from './components/Auth/register'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
