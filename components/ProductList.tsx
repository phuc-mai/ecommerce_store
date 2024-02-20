import { getProducts } from "@/actions/actions";
import Product from "./Product";
import Loader from "./Loader";

const ProductList = async () => {
  const products = await getProducts();

  return products.length === 0 ? <Loader/> : (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      <div className="flex mx-auto gap-16">
        {products.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;