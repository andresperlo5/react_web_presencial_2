import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router';

const NavbarC = () => {
  const navigate = useNavigate()
  const usuariosLog = JSON.parse(sessionStorage.getItem("usuario"))

  const cerrarSesion = (ev) => {
    ev.preventDefault()
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios"))
    const usuario = usuariosLs.find((user) => user.id === usuariosLog.id)
    usuario.login = false

    localStorage.setItem("usuarios", JSON.stringify(usuariosLs))

    sessionStorage.removeItem("usuario")

    setTimeout(() => {
      navigate("/")
    }, 500);

  }


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className={"nav-link"} to={usuariosLog && usuariosLog.rol === "usuario" ? "/user" : usuariosLog && usuariosLog.rol === "admin" ? "/admin" : "/"}>Logo</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              usuariosLog && usuariosLog.rol === "usuario"
                ?
                <Nav className="ms-auto">
                  <NavLink className={"nav-link"} to="/user">Inicio</NavLink>
                  <NavLink className={"nav-link"} to="/aboutUs">Carrito</NavLink>
                  <NavLink className={"nav-link"} to="/contact">Galeria</NavLink>
                  <NavLink className={"nav-link"} to="/contact">Favoritos</NavLink>
                </Nav>
                :
                usuariosLog && usuariosLog.rol === "admin"
                  ?
                  <Nav className="ms-auto">
                    <NavLink className={"nav-link"} to="/admin">Inicio</NavLink>
                    <NavLink className={"nav-link"} to="/admin/users">Panel de Usuarios</NavLink>
                    <NavLink className={"nav-link"} to="/admin/products">Panel de Productos</NavLink>
                  </Nav>
                  :
                  <Nav className="ms-auto">
                    <NavLink className={"nav-link"} to="/">Inicio</NavLink>
                    <NavLink className={"nav-link"} to="/aboutUs">Sobre Nosotros</NavLink>
                    <NavLink className={"nav-link"} to="/contact">Contacto</NavLink>
                  </Nav>
            }
            {
              usuariosLog
                ?
                <Nav className="ms-auto">
                  <NavLink className={"nav-link"} to="#" onClick={cerrarSesion}>Cerrar Sesion</NavLink>
                </Nav>
                :
                <Nav className="ms-auto">
                  <NavLink className={"nav-link"} to="/login">Iniciar Sesion</NavLink>
                  <NavLink className={"nav-link"} to="/register">Registrarse</NavLink>
                </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC