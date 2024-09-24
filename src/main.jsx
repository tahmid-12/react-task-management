import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import the store
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
// import Tasks from './pages/tasks.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Details from './pages/Details.jsx';
import Edit from './pages/Edit.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

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
        element: <PrivateRoute />,
        children:[
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "settings",
            element: <Settings />
          },
          {
            path: "task/:id",
            element: <Details />
          },
          {
            path: "task/edit/:id",
            element: <Edit />
          },
        ]
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
