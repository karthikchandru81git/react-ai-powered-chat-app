//import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Login from './pages/Login'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import { useApp } from './contextapi/AppContext'

type ProtectedRouteType = {
  children: any
}
let ProtectedRoute = ({ children }: ProtectedRouteType) => {
  let { username } = useApp();
  if (username) {
    <Navigate to='/login' />
  }
  return children;

}
function App() {

  return (
    <>
      <div
        style={{
          color: 'red',
          fontSize: '40px',
          padding: '20px',
        }}
      >
        IOS REACT TEST
      </div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chatbot' element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>

          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}

    </>
  )
}

export default App
