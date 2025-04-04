import { useParams } from "react-router"


const ProductDetailPage = () => {
  const { id } = useParams()

  return (
    <div>ProductDetailPage</div>
  )
}

export default ProductDetailPage