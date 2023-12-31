import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";
import Avatar from "../Avatar";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
    alert("See You Again 😃");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
            My Store
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
            
              { !auth.user? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === "Manager" ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length}showZero>
                  <NavLink to="/cart" className="nav-link">
                  <Avatar shape="square" size="large" />
                </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
