import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AdminCreateEditProducts = () => {
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get("id")

  const [formCreateProduct, setFormCreateProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: ""
  })

  const obtenerProductoPorId = () => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || []
    const producto = productosLs.find((prod) => prod.id === Number(id))
    console.log(producto)
    setFormCreateProduct(producto)
  }

  const handleChangeFormCreateProduct = (ev) => {
    setFormCreateProduct({ ...formCreateProduct, [ev.target.name]: ev.target.value })
  }

  const handleClickFormCreateProduct = (ev) => {
    ev.preventDefault()
    const productosLs = JSON.parse(localStorage.getItem("productos")) || []

    //hacer validaciones

    if (formCreateProduct.title && formCreateProduct.price && formCreateProduct.image && formCreateProduct.description) {
      const nuevoProducto = {
        id: productosLs[productosLs.length - 1]?.id + 1 || 1,
        ...formCreateProduct
      }

      console.log(nuevoProducto)

      productosLs.push(nuevoProducto)
      localStorage.setItem("productos", JSON.stringify(productosLs))

      Swal.fire({
        title: "Producto creado con exito!",
        text: "En breve seras redirigido a la pagina de productos!",
        icon: "success"
      });

      setFormCreateProduct({
        nombre: "",
        precio: 0,
        descripcion: "",
        imagen: ""
      })

      setTimeout(() => {
        navigate("/admin/products")
      }, 500);
    }
  }

  const handleClickFormEditProduct = (ev) => {
    ev.preventDefault()
    const productosLs = JSON.parse(localStorage.getItem("productos")) || []
    const productoIndex = productosLs.findIndex((prod) => prod.id === Number(id))

    //hacer validaciones

    if (formCreateProduct.title && formCreateProduct.price && formCreateProduct.image && formCreateProduct.description) {


      productosLs[productoIndex] = formCreateProduct
      localStorage.setItem("productos", JSON.stringify(productosLs))

      Swal.fire({
        title: "Producto editado con exito!",
        text: "En breve seras redirigido a la pagina de productos!",
        icon: "success"
      });

      setFormCreateProduct({
        nombre: "",
        precio: 0,
        descripcion: "",
        imagen: ""
      })

      setTimeout(() => {
        navigate("/admin/products")
      }, 500);
    }
  }

  useEffect(() => {
    if (id) {
      obtenerProductoPorId()
    }
  }, [])

  return (
    <>
      <h2 className='my-3'>
        {
          id ?
            "Editar Producto"
            :
            "Crear Nuevo Producto"
        }
      </h2>
      <hr />
      <Container className='d-flex justify-content-center my-5'>
        <Form className='w-25'>
          <Form.Group className="mb-3" controlId="formBasicEmail1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name='title' value={formCreateProduct.title} onChange={handleChangeFormCreateProduct} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail2">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name='price' value={formCreateProduct.price} onChange={handleChangeFormCreateProduct} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control type="text" name='description' value={formCreateProduct.description} onChange={handleChangeFormCreateProduct} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="text" name='image' value={formCreateProduct.image} onChange={handleChangeFormCreateProduct} />
          </Form.Group>

          <div className='text-center'>
            <Button variant="primary" type="submit" onClick={
              id ?
                handleClickFormEditProduct
                :
                handleClickFormCreateProduct
            }>
              {
                id ?
                  "Guardar Datos"
                  :
                  "Agregar Nuevo Producto"
              }
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AdminCreateEditProducts