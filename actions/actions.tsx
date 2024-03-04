export const getCollections = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  return await res.json();
}

export const getCollectionDetails = async (collectionId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
  return await res.json();
}

export const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await res.json();
}

export const getProductDetails = async (productId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
  return await res.json();
}

export const getRelatedProducts = async (productId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`);
  const data = await res.json();
  if (!Array.isArray(data)) {
    return [data]; // Encapsulate the single object in an array
  }
  else return data;
}

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}