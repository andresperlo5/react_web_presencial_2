import { Button, Container } from 'react-bootstrap'
import TableC from '../components/table/TableC'
import { useEffect, useState } from 'react'

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([])

  const obtenerTodosLosUsuarios = () => {
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || []
    setUsuarios(usuariosLs)
  }


  useEffect(() => {
    obtenerTodosLosUsuarios()
  }, [])
  return (
    <>
      <Container className='text-end my-5'>
        <Button>+ Añadir Nuevo Usuario</Button>
      </Container>
      <Container className='my-5'>
        <TableC idPage="usuarios" array={usuarios} />
      </Container>
    </>
  )
}

export default AdminUsersPage