import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Chatbot from './pages/Chatbot'
import Login from './pages/Login'
import Layout from './components/Layout'

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' replace/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/chatbot' element={<Layout />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
