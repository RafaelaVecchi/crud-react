import { Link, useLocation } from "react-router-dom"

export function Menu() {
  const location = useLocation()

  const linkClass = (path: string) =>
    `px-5 py-2 rounded-full font-semibold transition-all text-sm ${
      location.pathname === path
        ? "bg-white text-purple-600 shadow-md"
        : "text-purple-400 hover:text-purple-600 hover:bg-white/70"
    }`

  return (
    <nav className="flex justify-center gap-4 mt-6 mb-10 p-2 bg-rose-100/60 rounded-full shadow-md w-fit mx-auto">
      <Link to="/" className={linkClass("/")}>Usuários</Link>
      <Link to="/cadastro" className={linkClass("/cadastro")}>Cadastro</Link>
      <Link to="/detalhes" className={linkClass("/detalhes")}>Detalhes</Link>
      <span className="px-4 py-2 rounded-full font-semibold text-black cursor-default">
        Rafaela Vecchi Pelentier 💫
      </span>
    </nav>
  )
}
