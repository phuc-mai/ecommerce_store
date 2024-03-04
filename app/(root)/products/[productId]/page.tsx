import { getProductDetails, getRelatedProducts } from "@/actions/actions";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import ProductInfo from "@/components/ProductInfo";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productImages={productDetails.media} />
        <ProductInfo productDetails={productDetails} />
      </div>

      <div className="flex flex-col items-center py-10 px-5">
        <p className="text-heading2-bold">Related Products</p>
        <div className="flex flex-row flex-wrap m-auto mt-8 container gap-12">
          {relatedProducts?.map((product: ProductType) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
export const dynamic = 'force-dynamic';

export default ProductPage;

