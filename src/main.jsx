import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LogIn from './logIn.jsx'
import Background from './Background.jsx'



const router = createBrowserRouter([
  {path: "/", element:<LogIn />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Background />
    <RouterProvider router={router} />
  </StrictMode>,
)
