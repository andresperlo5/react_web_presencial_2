import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const FormC = ({ idPage }) => {
  const navigate = useNavigate()
  const [errores, setErrores] = useState({})
  const [formRegister, setFormRegister] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    contrasenia: "",
    repContrasenia: "",
    terminosCondiciones: false
  })

  const [formLogin, setFormLogin] = useState({
    nombreUsuario: "",
    contrasenia: ""
  })

  const handleChangeFormRegister = (ev) => {
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value
    setFormRegister({ ...formRegister, [ev.target.name]: value })
  }

  const handleClickFormRegister = (ev) => {
    ev.preventDefault()
    const erroresReg = {}
    const { nombreUsuario, emailUsuario, contrasenia, repContrasenia, terminosCondiciones } = formRegister

    if (!nombreUsuario) {
      erroresReg.nombreUsuario = "Error Campo USUARIO esta vacio"
    }

    if (!emailUsuario) {
      erroresReg.emailUsuario = "Error Campo EMAIL esta vacio"
    }

    if (!contrasenia) {
      erroresReg.contrasenia = "Error Campo CONTRASEÑA esta vacio"
    }

    if (!repContrasenia) {
      erroresReg.repContrasenia = "Error Campo REPETIR CONTRASEÑA esta vacio"
    }

    if (!terminosCondiciones) {
      erroresReg.terminosCondiciones = "Error TERMINOS y CONDICIONES no lo aceptaste todavia"
    }

    setErrores(erroresReg)
    console.log(terminosCondiciones)

    if (nombreUsuario && emailUsuario && contrasenia && repContrasenia && terminosCondiciones) {
      if (contrasenia === repContrasenia) {
        const usuarioLs = JSON.parse(localStorage.getItem("usuarios")) || []

        const nuevoUsuario = {
          id: usuarioLs[usuarioLs.length - 1]?.id + 1 || 1,
          nombreUsuario,
          emailUsuario,
          contrasenia,
          terminosCondiciones,
          rol: "admin",
          login: false,
          carrito: []
        }

        Swal.fire({
          title: "Registro Exitoso!",
          text: "En breve recibiras un email de confirmacion!",
          icon: "success"
        });

        usuarioLs.push(nuevoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarioLs))

        setFormRegister({
          nombreUsuario: "",
          emailUsuario: "",
          contrasenia: "",
          repContrasenia: "",
          terminosCondiciones: false
        })

        setTimeout(() => {
          navigate("/login")
        }, 1500);

      } else {
        Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
        });
      }
    }
  }

  const handleChangeFormLogin = (ev) => {
    setFormLogin({ ...formLogin, [ev.target.name]: ev.target.value })
  }

  const handleClickFormLogin = (ev) => {
    ev.preventDefault()
    const erroresLog = {}

    const { nombreUsuario, contrasenia } = formLogin

    if (!nombreUsuario) {
      erroresLog.nombreUsuario = "El campo USUARIO esta vacio"
    }

    if (!contrasenia) {
      erroresLog.contrasenia = "El campo CONTRASEÑA esta vacio"
    }

    if (nombreUsuario && contrasenia) {
      const usuariosLs = JSON.parse(localStorage.getItem("usuarios"))
      const usuarioExiste = usuariosLs.find((user) => user.nombreUsuario === nombreUsuario)

      if (!usuarioExiste) {
        Swal.fire({
          icon: "error",
          title: "El usuario y/o contraseña no son correctos",
        });
      } else {
        if (usuarioExiste.contrasenia === contrasenia) {
          usuarioExiste.login = true
          localStorage.setItem("usuarios", JSON.stringify(usuariosLs))
          sessionStorage.setItem("usuario", JSON.stringify(usuarioExiste))
          if (usuarioExiste.rol === "admin") {
            setTimeout(() => {
              navigate("/admin")
            }, 1500);
          } else {
            setTimeout(() => {
              navigate("/user")
            }, 1500);
          }
        }
      }
    }

  }


  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="idUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" className={errores.nombreUsuario ? "form-control is-invalid" : "form-control"} value={idPage === "register" ? formRegister.nombreUsuario : formLogin.nombreUsuario} name='nombreUsuario' onChange={idPage === "register" ? handleChangeFormRegister : handleChangeFormLogin} />
          {
            errores.nombreUsuario &&
            <p className='text-danger'>{errores.nombreUsuario}</p>
          }
        </Form.Group>
        {
          idPage === "register" &&
          <Form.Group className="mb-3" controlId="idEmail">
            <Form.Label>Email Usuario</Form.Label>
            <Form.Control type="email" className={errores.emailUsuario ? "form-control is-invalid" : "form-control"} value={formRegister.emailUsuario} name='emailUsuario' onChange={handleChangeFormRegister} />
            {
              errores.emailUsuario &&
              <p className='text-danger'>{errores.emailUsuario}</p>
            }
          </Form.Group>
        }

        <Form.Group className="mb-3" controlId="idContrasenia">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" className={errores.contrasenia ? "form-control is-invalid" : "form-control"} value={idPage === "register" ? formRegister.contrasenia : formLogin.contrasenia} name='contrasenia' onChange={idPage === "register" ? handleChangeFormRegister : handleChangeFormLogin} />
          {
            errores.contrasenia &&
            <p className='text-danger'>{errores.contrasenia}</p>
          }
        </Form.Group>

        {
          idPage === "register" &&
          <Form.Group className="mb-3" controlId="idRepContrasenia">
            <Form.Label>Repetir Contraseña</Form.Label>
            <Form.Control type="password" className={errores.repContrasenia ? "form-control is-invalid" : "form-control"} value={formRegister.repContrasenia} name='repContrasenia' onChange={handleChangeFormRegister} />
            {
              errores.repContrasenia &&
              <p className='text-danger'>{errores.repContrasenia}</p>
            }
          </Form.Group>
        }
        {
          idPage === "register" &&
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Aceptar Terminos y Condiciones" value={formRegister.checkTerminosCondiciones} name='terminosCondiciones' onChange={handleChangeFormRegister} />
            {
              errores.terminosCondiciones &&
              <p className='text-danger'>{errores.terminosCondiciones}</p>
            }
          </Form.Group>
        }
        <Container className='text-center'>
          <Button variant="primary" type="submit" onClick={idPage === "register" ? handleClickFormRegister : handleClickFormLogin}>
            {idPage === "register" ? " Enviar Datos" : "Ingresar"}
          </Button>
        </Container>
      </Form>
    </>
  )
}

export default FormC