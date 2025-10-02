import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Comparar from '@pages/Comparar'
import Recursos from '@pages/Recursos'
import NotFound from '@pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

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
);