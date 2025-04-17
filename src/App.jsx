import { BrowserRouter as Router, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Error404 from "./pages/Error404"
import NavbarC from "./components/navbar/NavbarC"
import Footer from "./components/footer/Footer"
import ProductDetailPage from "./pages/ProductDetailPage"
import RegisterPage from "./pages/RegisterPage"
import AdminProductsPage from "./pages/AdminProductsPage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminCreateEditProducts from "./pages/AdminCreateEditProducts"
import UserPage from "./pages/UserPage"
import PrivateRoute from "./components/privateroute/PrivateRoute"
//use =  Hook = Funcion 

const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/admin/products/createEdit" element={
            <PrivateRoute rolRuta={"admin"}>
              <AdminCreateEditProducts />
            </PrivateRoute>
          } />
          <Route path="/admin/products" element={
            <PrivateRoute rolRuta={"admin"}>
              <AdminProductsPage />
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute rolRuta="admin">
              <AdminUsersPage />
            </PrivateRoute>
          } />
          <Route path="/user" element={
            <PrivateRoute rolRuta={"usuario"}>
              <UserPage />
            </PrivateRoute>
          } />

          <Route path="/productDetail/:id" element={<ProductDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}


export default App