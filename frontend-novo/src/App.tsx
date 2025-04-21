import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Menu } from "./Menu"
import { Toaster } from "sonner";
import UserList from "./UserList"
import UserCadastro from "./UserCadastro"
import UserDetalhes from "./UserDetalhes"

function App() {
  return (
    <Router>
      <Menu />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/cadastro" element={<UserCadastro />} />
          <Route path="/detalhes" element={<UserDetalhes />} />
        </Routes>
      </div>
      <Toaster richColors position="top-center" />
    </Router>
  )
}

export default App
