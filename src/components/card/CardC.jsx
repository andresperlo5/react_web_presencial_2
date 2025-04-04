import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardC = ({ urlImagen, textAlt, id }) => {

  return (
    <>
      <Card>
        <Card.Img variant="top" src={urlImagen} alt={textAlt} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Container className='text-center'>
            <a href={`/productDetail/${id}`} className='btn btn-primary'>Ver Mas</a>
          </Container>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC