import Collections from "@/components/Collections"
import ProductList from "@/components/ProductList"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Image src="/banner.png" width={2000} height={1000} alt="banner" className="w-screen" />
      <Collections />
      <ProductList />
    </div>
  )
}
export const dynamic = 'force-dynamic';

export default Home
