import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FormC = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su usuario" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Usuario</Form.Label>
          <Form.Control type="email" placeholder="Ingrese su email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Aceptar Terminos y Condiciones" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar Datos
        </Button>
      </Form>
    </>
  )
}

export default FormC