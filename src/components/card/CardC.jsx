import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./CardC.css"

const CardC = ({ urlImagen, textAlt, id, titulo, descripcion, precio }) => {

  return (
    <>
      <Card>
        <Card.Img variant="top" src={urlImagen} alt={textAlt} />
        <Card.Body>
          <Card.Title className='text-truncate'>{titulo}</Card.Title>
          <Card.Text>
            ${precio}
          </Card.Text>
          <Card.Text className='text-truncate'>
            {descripcion}
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