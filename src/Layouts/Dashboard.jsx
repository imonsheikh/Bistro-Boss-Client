import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";
import { MdEmail, MdProductionQuantityLimits } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom"; 
import './dashboard.css'
import useCart from "../hooks/useCart";

const Dashboard = () => { 

  const [cart] = useCart()
  //TODO: Get isAdmin value from the database 
  const isAdmin = true 

  return (
    <div className="flex">
      {/* dashboard sidebar start */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink 
            // className='active' 
            to="/dashboard/reservation">
              <FaCalendar></FaCalendar>
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart>
              My Cart ({cart.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <FaAd></FaAd>
              Add a Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <FaList></FaList>
              My Bookings
            </NavLink>
          </li>

          {/* Shared Nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdProductionQuantityLimits ></MdProductionQuantityLimits>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <MdEmail></MdEmail>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard sidebar ends */}

      {/* Dashboard Content start */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
      {/* Dashboard Content ends */}
    </div>
  );
};

export default Dashboard;
