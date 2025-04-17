import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const TableC = ({ idPage, array, obtenerTodosLosProductos, usuarioLogueado }) => {
  const handleClickDeleteProduct = (idProducto) => {
    if (usuarioLogueado) {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar a este producto?",
        text: "Si lo borras no lo podras recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, estoy seguro!",
        cancelButtonText: "No!"
      }).then((result) => {
        if (result.isConfirmed) {
          const productoLs = JSON.parse(localStorage.getItem("productos")) || []
          const productoIndex = productoLs.findIndex((prod) => prod.id === Number(idProducto))

          productoLs.splice(productoIndex, 1)
          localStorage.setItem("productos", JSON.stringify(productoLs))

          Swal.fire({
            title: "Producto eliminado con exito!",
            icon: "success"
          });

          obtenerTodosLosProductos()
        }
      });
    }

  }


  const handleClickEnabledDisabledProduct = (idProducto) => {
    if (usuarioLogueado) {
      const productoLs = JSON.parse(localStorage.getItem("productos")) || []
      const producto = productoLs.find((prod) => prod.id === Number(idProducto))
      Swal.fire({
        title: `Estas seguro de que quieres ${producto.status === "enabled" ? "deshabilitar" : "habilitar"} a este producto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {


          if (producto.status === "enabled") {
            producto.status = "disabled"
          } else {
            producto.status = "enabled"
          }

          localStorage.setItem("productos", JSON.stringify(productoLs))

          Swal.fire({
            title: `Producto ${producto.status === "enabled" ? "habilitado" : "deshabilitado"} con exito`,
            icon: "success"
          });

          obtenerTodosLosProductos()
        }
      });
    }


  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          {
            idPage === "usuarios"
              ?
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
              :
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Detalle</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
          }
        </thead>
        <tbody>
          {
            array.map((element, i) =>
              idPage === "usuarios"
                ?
                <tr key={element.id}>
                  <td>{i + 1}</td>
                  <td>{element.nombreUsuario}</td>
                  <td>{element.rol}</td>
                  <td className='w-50'>
                    <Button variant='warning'>Editar</Button>
                    <Button variant='danger' className='mx-3'>Eliminar</Button>
                    <Button variant='info'>Deshabilitar</Button>
                  </td>
                </tr>
                :
                element.status === "enabled" &&
                <tr key={element.id}>
                  <td>{i + 1}</td>
                  <td className='w-25'>{element.title}</td>
                  <td>${element.price}</td>
                  <td className='w-25'>{element.description}</td>
                  <td>
                    <img src={element.image} alt="" width={50} />
                  </td>
                  <td className='w-50'>
                    <Link className='btn btn-warning' to={usuarioLogueado ? `/admin/products/createEdit?id=${element.id}` : "#"} variant='warning'>Editar</Link>
                    <Button variant='danger' className='mx-3' onClick={() => handleClickDeleteProduct(element.id)}>Eliminar</Button>
                    <Button variant={element.status === "enabled" ? "info" : "success"} onClick={() => handleClickEnabledDisabledProduct(element.id)}>{
                      element.status === "enabled" ? "Deshabilitar" : "Habilitar"
                    }</Button>
                  </td>
                </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

export default TableC