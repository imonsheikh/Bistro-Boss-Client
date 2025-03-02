import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const SSLPayment = () => {
  const [cart, refetch] = useCart();
  const { user, setLoading } = useAuth(); 
  const axiosSecure = useAxiosSecure()  

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCreatePayment = async () => {
    // now save the payment in the database
    const payment = {
      email: user?.email,
      price: totalPrice,
      transactionId: "",
      date: new Date(), // utc date convert. use moment js to
      cartIds: cart.map((item) => item._id),
      menuItemIds: cart.map((item) => item.menuId),
      status: "pending",
    };
    
    setLoading(true)
    const response = await axiosSecure.post("/create-ssl-payment",
      payment
    );
    setLoading(false) 
    console.log('response', response)

    if (response.data?.gatewayUrl) {
      window.location.replace(response.data.gatewayUrl);
    }

    console.log("response", response.data);
  };

  return (
    <div>
      <div className="">
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                value={user?.email}
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreatePayment}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
          <button
            className="your-button-className"
            // id="sslczPayBtn"
            // token="if you have any token validation"
            // postdata={{
            //   email: user.email,
            //   price: totalPrice,
            //   transactionId: "",
            //   date: new Date(), // utc date convert. use moment js to
            //   cartIds: cart.map((item) => item._id),
            //   menuItemIds: cart.map((item) => item.menuId),
            //   status: "pending",
            // }}
            order={JSON.stringify({
              email: user.email,
              price: totalPrice,
              transactionId: "",
              date: new Date(), // utc date convert. use moment js to
              cartIds: cart.map((item) => item._id),
              menuItemIds: cart.map((item) => item.menuId),
              status: "pending",
            })}
            // endpoint="http://localhost:5001/create-ssl-payment" 
          >
            {" "}
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SSLPayment;