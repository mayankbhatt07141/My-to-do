


import './App.css';
import SubmitForm from "./Components/Form.js"
import Header from './Components/Header';
import Error from './Components/Error.js'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Prifile from './Components/Profile'
import { createBrowserRouter, Outlet, RouterProvider,Route } from 'react-router-dom';
import About from './Components/About';
import PrivateRoutes from './utils/PrivateRoute'
import { useNavigate } from 'react-router-dom';


const Layout =()=> {
  const navigate = useNavigate();
  let token=localStorage.getItem('token')
return(
  <><Header/>
    <Outlet />
  </>)}

const appRouter = createBrowserRouter(
  [
    {element:  <Layout />,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <PrivateRoutes><SubmitForm/></PrivateRoutes>
        
      },
      {
        path: "/about",
        element: <PrivateRoutes><About/></PrivateRoutes>,
        children: [
          {
            path: 'profile',
            element: 
            <PrivateRoutes><Prifile/></PrivateRoutes>
          }
        ]
      },
      {
        path: "/login",
        element: <Login/>
      },{
        path: "/signup",
        element: <Signup/>
      }
    ]} 
  ]
)

export function App() {
  
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
};

