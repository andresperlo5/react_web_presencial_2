import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import CardC from "../components/card/CardC"
import CarouselC from "../components/carousel/CarouselC"


const HomePage = () => {
  const [productos, setProductos] = useState([])
  const [contador, setContador] = useState(0)

  const obtenerProductosApi = async () => {
    try {
      const productosApi = await fetch("http://localhost:3001/productos")
      const res = await productosApi.json()
      setProductos(res.productos)
    } catch (error) {
      console.log(error)
    }
  }


  const sumarContador = () => {
    setContador(contador + 1)
  }

  useEffect(() => {
    obtenerProductosApi()
  }, [])
  return (
    <>

      <CarouselC />
      <h2 className="text-center my-5">Nuestro Productos</h2>
      <Container className="my-5">
        <Row>
          {
            productos.map((producto) =>
              <Col key={producto._id} sm="12" md="6" lg="4" className="my-3">
                <CardC urlImagen={producto.imagen} textAlt={producto.descripcion} id={producto._id} titulo={producto.nombre} precio={producto.precio} descripcion={producto.descripcion} />
              </Col>
            )
          }
        </Row>
      </Container>

    </>
  )
}

export default HomePage