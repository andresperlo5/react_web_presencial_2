import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import CardC from "../components/card/CardC"
import CarouselC from "../components/carousel/CarouselC"


const HomePage = () => {
  const [productos, setProductos] = useState([])
  const [contador, setContador] = useState(0)

  const obtenerProductosApi = async () => {
    try {
      const productoLs = JSON.parse(localStorage.getItem("productos")) || []
      if (productoLs.length) {
        setProductos(productoLs)
      } else {
        const productos = await fetch("https://fakestoreapi.com/products")
        const productosConEstado = []
        const data = await productos.json()
        data.forEach(element => {
          productosConEstado.push({ ...element, status: "enabled" })
        });
        localStorage.setItem("productos", JSON.stringify(productosConEstado))
        setProductos(productosConEstado)
      }

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
              <Col key={producto.id} sm="12" md="6" lg="4" className="my-3">
                <CardC urlImagen={producto.image} textAlt={producto.description} id={producto.id} titulo={producto.title} precio={producto.price} descripcion={producto.description} />
              </Col>
            )
          }
        </Row>
      </Container>

    </>
  )
}

export default HomePage