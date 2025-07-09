import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import clientAxios, { configHeaders } from '../helpers/clientAxios';
import Swal from 'sweetalert2';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



const CartPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([])
  const [idPreferencia, setIdPrefenrecia] = useState("")

  const obtenerProductos = async () => {
    try {
      const res = await clientAxios.get("/carritos", configHeaders)
      setProductosCarrito(res.data.productos)
    } catch (error) {
      console.log(error)
    }

  }

  const handleClickDeleteProdCart = async (ev, idProducto) => {
    try {
      Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clientAxios.put(`/carritos/eliminarProducto/${idProducto}`, {}, configHeaders)

          if (res.status === 200) {
            obtenerProductos()
            Swal.fire({
              title: "Producto Eliminado con exito!",
              icon: "success"
            });
          }

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: "Cancelado",
            icon: "error"
          });
        }
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickPay = async (ev) => {
    ev.preventDefault()
    initMercadoPago(`${import.meta.env.VITE_PUBLIC_KEY_MP}`);

    const res = await clientAxios.post("/carritos/pagarCarritoMp", {}, configHeaders)
    //location.href = `${res.data.msg}`
    setIdPrefenrecia(res.data.msg)
  }

  useEffect(() => {
    obtenerProductos()
  }, [])
  return (
    <>
      <Container className='d-flex justify-content-center my-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              productosCarrito.map((producto, i) =>
                <tr key={producto._id}>
                  <td>{i + 1}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <input type="number" value={1} />
                  </td>
                  <td>
                    <p>Total</p>
                  </td>
                  <td className='text-center'>
                    <Button variant='danger' onClick={(ev) => handleClickDeleteProdCart(ev, producto._id)}>Eliminar</Button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

      </Container>
      <div className='text-center my-5'>
        <Button onClick={handleClickPay}>Pagar</Button>

      </div>
      <div className='d-flex justify-content-center text-center'>
        <Wallet initialization={{ preferenceId: idPreferencia, redirectMode: "modal" }} />
      </div>
    </>
  )
}

export default CartPage