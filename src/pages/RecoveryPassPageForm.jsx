import { useState } from "react";
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import clientAxios, { configHeaders } from "../helpers/clientAxios";

const RecoveryPassPageForm = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("")
  const [confirmarNuevaContasenia, setConfirmarNuevaContrasenia] = useState("")


  const handleClickFormChangePass = async (ev) => {
    ev.preventDefault()
    try {
      const tokenUrl = new URLSearchParams(location.search).get("token")

      if (nuevaContrasenia === confirmarNuevaContasenia) {
        console.log(nuevaContrasenia)
        const res = await clientAxios.post(`/usuarios/changeNewPassUser?token=${tokenUrl}`, {
          contrasenia: nuevaContrasenia
        }, configHeaders)
        console.log(res)
      } else {
        alert("las contraseñas no coinciden")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container className="d-flex justify-content-center py-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control type="password" onChange={(ev) => setNuevaContrasenia(ev.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="password" onChange={(ev) => setConfirmarNuevaContrasenia(ev.target.value)} />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" onClick={handleClickFormChangePass}>
            Enviar Datos
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default RecoveryPassPageForm