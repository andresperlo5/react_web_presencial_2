import { useNavigate } from "react-router"

const PrivateRoute = ({ children, rolRuta }) => {
  const navigate = useNavigate()
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null

  if (!usuarioLogueado) {
    setTimeout(() => {
      navigate("/")
    }, 100);
  } else {
    if (usuarioLogueado.rol === rolRuta) {
      return children
    } else {
      if (usuarioLogueado.rol === "usuario") {
        setTimeout(() => {
          navigate("/user")
        }, 100);
      } else {
        return children
      }
    }
  }
}

export default PrivateRoute