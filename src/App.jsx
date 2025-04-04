import { BrowserRouter as Router, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Error404 from "./pages/Error404"
import NavbarC from "./components/navbar/NavbarC"
import Footer from "./components/footer/Footer"
import ProductDetailPage from "./pages/ProductDetailPage"

const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/productDetail/:id" element={<ProductDetailPage />} />
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