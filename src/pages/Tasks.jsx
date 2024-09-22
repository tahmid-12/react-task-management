import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Tasks = () => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Tasks