import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from './layouts/Root'
import './App.css'
import EventTablePage from "./pages/dashboard/EventTablePage";
import LoginPage from "./pages/login/LoginPage";
import { AuthContext, AuthContextProps } from "./contexts/AuthContexts";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { useContext, useEffect, useState } from "react";




enum Access {
  R = 'r',
  RW = 'rw',
  SU = 'su',
}

const protectRoute = (
  authContext: AuthContextProps | null | undefined,
  jsxElement: JSX.Element,
  access?: Access
) => {
  if (!authContext) return <Navigate to={'/login'} />
  if (!authContext.auth) return <Navigate to={'/login'} />
  if (!authContext.auth.isLogin) return <Navigate to={'/login'} />
  if (access) {
    if (!(authContext.auth.role === access)) return <Navigate to={'/'} />
  }
  return jsxElement
}


function App() {
  const [loading, setLoading] = useState(true)
  const authContext = useContext(AuthContext)
  

  

  useEffect(() => {
    
    fetch('/api/user/ping')
      .then(response => {
        if (response.ok) return response.json()
        else throw new Error('not authorized')
      })
      .then(data => {
        const auth = {
          id: data.obj._id,
          name: data.obj.name,
          role: data.obj.role,
          isLogin: true
        }
        authContext?.setAuth(auth)
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading)
    return <div>loading...</div>

  return (
    <RouterProvider router={
      createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Root/>}>
            <Route index element={protectRoute(authContext, <EventTablePage />)} />
            <Route path="login" element={authContext?.auth?.isLogin ? <Navigate to={'/'} /> : <LoginPage />} />
            <Route path="admin-dashboard" element={protectRoute(authContext, <AdminDashboardPage />, Access.SU)} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Route>
        )
      )
    }
    />
  )
}

export default App
