import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Tasks from './pages/tasks.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <LogIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/tasks",
        element: <Tasks />,
        children:[
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "settings",
            element: <Settings />
          },
        ]
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
