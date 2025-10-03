import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Comparar from '@pages/Comparar'
import Recursos from '@pages/Recursos'
import Informe from '@pages/Informe'
import NotFound from '@pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Admin from '@pages/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path:'/comparar',
        element: <Comparar/>
      },
      {
        path: '/recursos',
        element: <Recursos/>
      },
      {
        path: '/informe',
        element: <Informe/>
      },
      {
        path: '/admin',
        element: <Admin />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)