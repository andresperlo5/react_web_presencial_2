import FormC from '../components/form/FormC'
import { Container } from 'react-bootstrap'

const RegisterPage = () => {
  return (
    <>
      <Container className='d-flex justify-content-center my-5'>
        <FormC idPage="register" />
      </Container>
    </>
  )
}

export default RegisterPage