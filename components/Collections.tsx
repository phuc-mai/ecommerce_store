import { getCollections } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      <div className="flex items-center justify-center gap-8">
        {collections.map((collection: CollectionType) => (
          <Link href={`/collections/${collection._id}`} key={collection._id}>
            <Image
              key={collection._id}
              src={collection.image}
              width={350}
              height={180}
              alt="collection"
              className="rounded-lg cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
