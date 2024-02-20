import Image from "next/image";

import { getCollectionDetails } from "@/actions/actions";
import Product from "@/components/Product";

const CollectionPage = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collection = await getCollectionDetails(params.collectionId);

  return (
    <div className="px-10 py-5 text-grey-2 flex flex-col items-center gap-8">
      <Image src={collection.image} width={2000} height={1000} alt="collection" className="w-full h-[400px] object-cover rounded-xl" />
      <p className="text-heading3-bold">{collection.title}</p>
      <p className="text-body-normal text-center max-w-[900px]">{collection.description}</p>
      <div className="flex mx-auto gap-16">
        {collection.products.map((product: ProductType) => 
          <Product key={product._id} product={product} />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
