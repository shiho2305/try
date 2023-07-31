import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavbarWeb from './components/NavbarWeb';
import Users from './components/Users';
import Photos from './components/Photos';
import UsersDetails from "./components/UsersDetails";


// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWeb/>,
    children: [
      {
        path: "/users", 
        element: <Users/>
      }, 
      {
        path: "/users/:id", 
        element: <UsersDetails/>
      }, 
      {
        path: "/photos", 
        element: <Photos/>
      }
    ] 
  },
]);


function App() {
  return (
    <div className="body">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
