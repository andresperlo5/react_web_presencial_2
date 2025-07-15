import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios from '../../helpers/clientAxios';

const TableC = ({ idPage, array, obtenerTodosLosProductos, usuarioLogueado }) => {
  console.log(array)
  const handleClickDeleteProduct = (idProducto) => {
    console.log(idProducto)
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clientAxios.delete(`/productos/${idProducto}`)
          console.log(res)
          if (res.status === 200) {
            Swal.fire({
              title: "Producto eliminado con exito!",
              icon: "success"
            });

            obtenerTodosLosProductos()
          }
        }
      });
    }

  }


  const handleClickEnabledDisabledProduct = (idProducto, estado) => {
    if (usuarioLogueado) {
      /*   const productoLs = JSON.parse(localStorage.getItem("productos")) || []
        const producto = productoLs.find((prod) => prod.id === Number(idProducto)) */
      Swal.fire({
        title: `Estas seguro de ${estado === true ? "deshabilitar" : "habilitar"
          } el producto ? `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await clientAxios.put(`/productos/changeState/${idProducto}`)
          if (res.status === 200) {
            Swal.fire({
              title: `${res.data.msg}`,
              icon: "success"
            });

            obtenerTodosLosProductos()
          }
          /*    if (producto.status === "enabled") {
               producto.status = "disabled"
             } else {
               producto.status = "enabled"
             }
   
             localStorage.setItem("productos", JSON.stringify(productoLs))
   
            
   
             obtenerTodosLosProductos() */
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
                <tr key={element._id}>
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
                <tr key={element._id}>
                  <td>{i + 1}</td>
                  <td className='w-25'>{element.nombre}</td>
                  <td>${element.precio}</td>
                  <td className='w-25'>{element.descripcion}</td>
                  <td>
                    <img src={element.imagen} alt="" width={50} />
                  </td>
                  <td className='w-50'>
                    <Link className='btn btn-warning' to={usuarioLogueado ? `/ admin / products / createEdit ? id = ${element._id}` : "#"} variant='warning'>Editar</Link>
                    <Button variant='danger' className='mx-3' onClick={() => handleClickDeleteProduct(element._id)}>Eliminar</Button>
                    <Button variant={element.habilitado === true ? "info" : "success"} onClick={() => handleClickEnabledDisabledProduct(element._id, element.habilitado)}>{
                      element.habilitado === true ? "Deshabilitar" : "Habilitar"
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