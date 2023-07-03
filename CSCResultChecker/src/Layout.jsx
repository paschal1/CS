import { Navigate, Outlet} from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useStateContext } from "./contexts/ContextProvider";

export default function Layout() {

  const { user, token } = useStateContext()


if (!token) {
    return <Navigate to="/login" />
  }


  return (
    <div>
        <Navbar/>
        <div>
          <Outlet/>
        </div>
    </div>

  )
}
