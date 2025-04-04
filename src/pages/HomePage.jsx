import { Col, Container, Row } from "react-bootstrap"
import CardC from "../components/card/CardC"
import CarouselC from "../components/carousel/CarouselC"


const HomePage = () => {
  return (
    <>

      <CarouselC />
      <Container className="my-5">
        <Row>
          <Col sm="12" md="6" lg="4">
            <CardC urlImagen='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPGNXuBF6tvzIYjtC-u2DOwaUpLeya-Af_fA&s' textAlt="imagen1" id={1} />
          </Col>
          <Col sm="12" md="6" lg="4">
            <CardC urlImagen="https://www.muyinteresante.com/wp-content/uploads/sites/5/2023/12/28/658d3cc8a1698.jpeg" textAlt="imagen2" id={2} />
          </Col>
          <Col sm="12" md="6" lg="4">
            <CardC urlImagen="https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_1280.jpg" textAlt="imagen3" id={3} />
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default HomePage