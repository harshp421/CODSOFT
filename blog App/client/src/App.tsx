import { useRoutes } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import { Button } from "./components/ui/button"
import routes from "./routes/routes"

const App = () => {
  const allroutes=useRoutes(routes);

  return (
    <div>
   {allroutes }
    </div>
  )
}

export default App