import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import "./css/ProductoDetailPage.css"
import Swal from "sweetalert2"


const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState({})

  const obtenerProducto = async () => {
    try {
      const producto = await fetch(`http://localhost:3001/productos/${id}`)
      const data = await producto.json()
      console.log(data)
      setProducto(data.producto)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickCart = (ev) => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Debes iniciar sesion para poder comprar",
      });

      setTimeout(() => {
        navigate("/login")
      }, 500);
    }
  }

  const handleClickPay = (ev) => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Debes iniciar sesion para poder comprar",
      });

      setTimeout(() => {
        navigate("/login")
      }, 500);
    }
  }

  useEffect(() => {
    obtenerProducto()
  }, [])

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm="12" md="6" className="producto-imagen text-center">
            <img src={producto.imagen} alt={producto.title} />
          </Col>
          <Col sm="12" md="6">
            <h2>{producto.nombre}</h2>
            <p>${producto.precio}</p>
            <p>{producto.descripcion}</p>
            <Button variant="warning" className="me-2" onClick={handleClickCart}>Añadir Carrito</Button>
            <Button variant="success" onClick={handleClickPay}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ProductDetailPage