import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios, { configHeaders, configHeadersImagen } from '../helpers/clientAxios';

const AdminCreateEditProducts = () => {
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get("id")

  const [formCreateProduct, setFormCreateProduct] = useState({
    title: "",
    price: 0,
    description: "",
  })

  const [image, setImage] = useState(null)

  const obtenerProductoPorId = async () => {
    /*  const productosLs = JSON.parse(localStorage.getItem("productos")) || []
     const producto = productosLs.find((prod) => prod.id === Number(id))
     console.log(producto) */
    const res = await clientAxios.get(`/productos/${id}`)
    console.log(res.data)
    setFormCreateProduct({
      title: res.data.producto.nombre,
      price: res.data.producto.precio,
      description: res.data.producto.descripcion
    })
    setImage(res.data.producto.imagen)
  }

  const handleChangeFormCreateProduct = (ev) => {
    if (ev.target.type === "file") {
      setFormCreateProduct({ ...formCreateProduct, [ev.target.name]: ev.target.files[0] })
    } else {
      setFormCreateProduct({ ...formCreateProduct, [ev.target.name]: ev.target.value })
    }
  }

  const handleClickFormCreateProduct = async (ev) => {
    ev.preventDefault()
    console.log("1")
    // const productosLs = JSON.parse(localStorage.getItem("productos")) || []

    //hacer validaciones

    console.log(formCreateProduct)
    if (formCreateProduct.title && formCreateProduct.price && image && formCreateProduct.description) {
      /*   const nuevoProducto = {
          id: productosLs[productosLs.length - 1]?.id + 1 || 1,
          ...formCreateProduct
        }
  
        console.log(nuevoProducto)
  
        productosLs.push(nuevoProducto)
        localStorage.setItem("productos", JSON.stringify(productosLs)) */



      const res = await clientAxios.post("/productos", {
        nombre: formCreateProduct.title,
        precio: formCreateProduct.price,
        descripcion: formCreateProduct.description
      }, configHeaders)

      if (res.status === 201) {

        const formData = new FormData()
        formData.append("imagen", image)
        if (image) {

          const formData = new FormData()
          formData.append("imagen", image)

          const resBack = await clientAxios.put(`/productos/addEditImage/${res.data.idProducto}`, formData, configHeadersImagen)

          console.log(resBack)
        }
      }

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
            <Form.Control type="file" name='image' onChange={(ev) => setImage(ev.target.files[0])} />
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