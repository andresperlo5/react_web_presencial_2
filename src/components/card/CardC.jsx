import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import "./CardC.css"
import { Link } from 'react-router';

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
            <Link to={`/productDetail/${id}`} className='btn btn-primary'>Ver Mas</Link>
          </Container>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC