import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();
  
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post("/api/order/status", { orderId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOrders(); // Refresh the orders list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              {order.items && order.items.length > 0 && order.items[0].product && order.items[0].product.image && order.items[0].product.image[0] ? (
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/${order.items[0].product.image[0]}`}
                  alt="Product"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">No Image</span>
                </div>
              )}
              <>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex flex-col justify-center">
                      <p className="font-medium">
                        {item.product && item.product.name ? item.product.name : 'Unknown Product'}{' '}
                        <span
                          className={`text-indigo-500 ${
                            item.quantity < 2 && 'hidden'
                          }`}
                        >
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No items</div>
                )}
              </>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-1">
                {(order.address && order.address.firstName ? order.address.firstName : '')} {(order.address && order.address.lastName ? order.address.lastName : '')}
              </p>
              <p>
                {(order.address && order.address.street ? order.address.street : '')}, {(order.address && order.address.city ? order.address.city : '')},{" "}
                {(order.address && order.address.state ? order.address.state : '')},{(order.address && order.address.zipcode ? order.address.zipcode : '')},{" "}
                {(order.address && order.address.country ? order.address.country : '')}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              ₹{order.amount || 0}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType || 'N/A'}</p>
              <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              <p className="mt-2 font-medium">
                Status: <span className={`
                  ${order.status === 'confirmed' ? 'text-green-600' : ''}
                  ${order.status === 'cancelled' ? 'text-red-600' : ''}
                  ${order.status === 'pending' ? 'text-yellow-600' : ''}
                `}>
                  {order.status || 'pending'}
                </span>
              </p>
              {order.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => updateOrderStatus(order._id, 'confirmed')}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors duration-200 font-medium"
                  >
                    ✓ Approve
                  </button>
                  <button 
                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200 font-medium"
                  >
                    ✕ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders available at the moment.</p>
        </div>
      )}
    </div>
  );
};
export default Orders;
