import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import "./css/ProductoDetailPage.css"
import Swal from "sweetalert2"
import clientAxios, { configHeaders } from "../helpers/clientAxios"


const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState({})

  const obtenerProducto = async () => {
    try {
      const producto = await clientAxios.get(`productos/${id}`, configHeaders)
      setProducto(producto.data.producto)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickCart = async (ev, idProducto) => {
    ev.preventDefault()
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null
    console.log(usuarioLogueado)

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Debes iniciar sesion para poder comprar",
      });
      s
      setTimeout(() => {
        navigate("/login")
      }, 500);
    }

    const res = await clientAxios.put(`/carritos/agregarProducto/${idProducto}`, {}, configHeaders)
    console.log(res)


  }

  const handleClickPay = (ev) => {
    ev.preventDefault()
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null

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
            <Button variant="warning" className="me-2" onClick={(ev) => handleClickCart(ev, producto._id)}>Añadir Carrito</Button>
            <Button variant="success" onClick={handleClickPay}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ProductDetailPage