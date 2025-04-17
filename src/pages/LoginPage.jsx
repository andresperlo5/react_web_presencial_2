import { Container } from 'react-bootstrap'
import FormC from '../components/form/FormC'

const LoginPage = () => {
  return (
    <Container className='d-flex justify-content-center my-5'>
      <FormC idPage="login" />
    </Container>
  )
}

export default LoginPage