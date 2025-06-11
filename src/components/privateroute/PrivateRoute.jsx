import { useNavigate } from "react-router"

const PrivateRoute = ({ children, rolRuta }) => {
  console.log(rolRuta)
  const navigate = useNavigate()
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null
  const usuarioLogueadoRol = JSON.parse(sessionStorage.getItem("rol")) || null
  console.log(usuarioLogueadoRol)

  if (!usuarioLogueado) {
    setTimeout(() => {
      navigate("/")
    }, 100);
  } else {
    if (usuarioLogueadoRol === rolRuta) {
      return children
    } else {
      if (usuarioLogueadoRol === "usuario") {
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