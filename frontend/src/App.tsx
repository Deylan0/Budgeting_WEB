import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './LogIn'
import Background from './Background'

const router = createBrowserRouter([
  { path: "/", element: <LogIn /> }
])

function App(){
    return(
        <>
            <Background />
            <RouterProvider router={router} />
        </>
    )
}

export default App 