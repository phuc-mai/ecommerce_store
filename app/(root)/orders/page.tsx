import { getOrders } from "@/actions/actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string); // Add type assertion

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">No orders found</p>
        ))}

      <div className="flex gap-10">
        {orders?.map((order: any) => (
          <div className="flex flex-col gap-8 p-4 hover:bg-grey-1">
            <div key={order._id} className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">
                Order ID: <span className="text-base-medium">{order._id}</span>
              </p>
              <p className="text-base-bold">
                Total:{" "}
                <span className="text-base-medium">${order.totalAmount}</span>
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: orderItemType) => (
                <div className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={200}
                    height={200}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-bold">
                      Title:{" "}
                      <span className="text-small-medium">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-bold">
                        Color:{" "}
                        <span className="text-small-medium">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-bold">
                        Size:{" "}
                        <span className="text-small-medium">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-small-bold">
                      Unit price:{" "}
                      <span className="text-small-medium">
                        ${orderItem.product.price}
                      </span>
                    </p>
                    <p className="text-small-bold">
                      Quantity:{" "}
                      <span className="text-small-medium">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
