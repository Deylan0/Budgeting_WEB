import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './LogIn';
import Background from './Background';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import Configuration from './Configuration';
import Overview  from './Overview';

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <LogIn />,
        errorElement: <NotFound />,
    },
    { 
        path: "/dashboard", 
        element: <Dashboard />,
        children: [
            { path: "configuration", element: <Configuration />},
            { index: true, element: <Overview />},
        ]
            
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