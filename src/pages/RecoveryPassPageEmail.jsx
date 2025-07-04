import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import clientAxios, { configHeaders } from "../helpers/clientAxios"


const RecoveryPassPageEmail = () => {
  const [emailUsuario, setEmailUsuario] = useState("")

  const handleClickFormRecoveryPass = async (ev) => {
    ev.preventDefault()
    try {
      const res = await clientAxios.post("/usuarios/recoveryPassEmail", { emailUsuario }, configHeaders)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="idEmail">
          <Form.Label>Email de Recuperacion</Form.Label>
          <Form.Control type="email" onChange={(ev) => setEmailUsuario(ev.target.value)} />

        </Form.Group>

        <Button onClick={handleClickFormRecoveryPass}>Enviar Correo</Button>
      </Form>
    </Container>
  )
}

export default RecoveryPassPageEmail