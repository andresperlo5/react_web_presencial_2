import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router';

const NavbarC = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem("token"))
  const usuariosLogRol = JSON.parse(sessionStorage.getItem("rol"))

  const cerrarSesion = (ev) => {
    ev.preventDefault()
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("rol")

    setTimeout(() => {
      navigate("/")
    }, 500);

  }


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className={"nav-link"} to={token && usuariosLogRol === "usuario" ? "/user" : token && usuariosLogRol === "admin" ? "/admin" : "/"}>Logo</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              token && usuariosLogRol === "usuario"
                ?
                <Nav className="ms-auto">
                  <NavLink className={"nav-link"} to="/user">Inicio</NavLink>
                  <NavLink className={"nav-link"} to="/aboutUs">Carrito</NavLink>
                  <NavLink className={"nav-link"} to="/contact">Galeria</NavLink>
                  <NavLink className={"nav-link"} to="/contact">Favoritos</NavLink>
                </Nav>
                :
                token && usuariosLogRol === "admin"
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
              token
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