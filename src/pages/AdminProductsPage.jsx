import { Button, Container } from 'react-bootstrap'
import TableC from '../components/table/TableC'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null

  const obtenerTodosLosProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || []
    setProductos(productosLs)
  }

  useEffect(() => {
    obtenerTodosLosProductos()
  }, [])
  return (
    <>
      {
        usuarioLogueado &&
        <>
          <Container className='text-end my-5'>
            <Link className='btn btn-primary' to={usuarioLogueado ? `/admin/products/createEdit` : "#"}>+ Añadir Nuevo Producto</Link>
          </Container>
          <Container className='my-5'>
            <TableC idPage="productos" array={productos} obtenerTodosLosProductos={obtenerTodosLosProductos} usuarioLogueado={usuarioLogueado} />
          </Container>
        </>
      }
    </>
  )
}

export default AdminProductsPage