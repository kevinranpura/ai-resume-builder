import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import Index from './auth/sign-in/Index'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import EditResume from './pages/edit/[id]/EditResume'
import { ResumeProvider } from './context/ResumeContext'
import { UserProvider } from './context/UserContext.jsx'


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/edit/:id",
        element: <EditResume />,
      }
    ]
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "auth/sign-in/",
    element: <Index />,
  },
]);

ReactDOM.createRoot(root).render(
  <StrictMode>
    <UserProvider>
      <ResumeProvider>
        <RouterProvider router={router} />
      </ResumeProvider>
    </UserProvider>
  </StrictMode>,


)
