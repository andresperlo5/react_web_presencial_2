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

  const handleClickFormRegister = async (ev) => {
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
        const usuario = await fetch("http://localhost:3001/usuarios", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            nombreUsuario,
            emailUsuario,
            contrasenia
          })
        })

        const data = await usuario.json()
        console.log(data)

        Swal.fire({
          title: `${data.msg}`,
          text: "En breve recibiras un email de confirmacion!",
          icon: "success"
        });

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

  const handleClickFormLogin = async (ev) => {
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
      const usuarioLogueado = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario,
          contrasenia
        })
      })

      const data = await usuarioLogueado.json()
      sessionStorage.setItem("token", JSON.stringify(data.token))
      sessionStorage.setItem("rol", JSON.stringify(data.rol))

      Swal.fire({
        icon: "success",
        title: `${data.msg}`,
      });


      if (data.rol === "usuario") {
        setTimeout(() => {
          navigate("/user")
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/admin")
        }, 1000);
      }

      console.log(data)
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