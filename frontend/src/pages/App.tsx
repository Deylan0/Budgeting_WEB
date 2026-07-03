import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './LogIn';
import Background from './Background';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <LogIn />,
        errorElement: <NotFound />,
    },
    { 
        path: "/dashboard/:user_id", 
        element: <Dashboard />,
    },
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