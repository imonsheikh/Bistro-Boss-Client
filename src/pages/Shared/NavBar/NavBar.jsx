import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin()
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const nabOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {/* <li>
        <Link to="/secret">Secret</Link>
      </li> */} 
      {/*
        //syntax: user ? 'true' : 'false'
        //user ? condition ? 'double true' : 'one true' : "False"
      */} 
      {
        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
      }
      <li>
        <Link to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart></FaShoppingCart>
            <div className="badge badge-sm badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          {/* <span>{user?.displayName}</span>  */}
          <button onClick={handleLogout} className="btn btn-ghost">
            LogOut
          </button>
          <p>{user?.displayName}</p>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar shadow-sm fixed z-10  text-white max-w-7xl bg-black/50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-black/50"
            >
              {nabOptions}
            </ul>
          </div>
          <a className="text-xl font-bold">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nabOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
