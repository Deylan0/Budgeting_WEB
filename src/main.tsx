import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LogIn from './LogIn'
import Background from './Background'

const router = createBrowserRouter([
  { path: "/", element: <LogIn /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Background />
    <RouterProvider router={router} />
  </StrictMode>,
)