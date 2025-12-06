/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isUserLoggedIn, logout } = useAuth();
  const Navigate = useNavigate();

  return (
    <nav>
      <Link to="/" style={{ cursor: "pointer" }}>
        <div className="nav-logo-container">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>
      <div className="navbar-links-container">
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="hero"
          smooth={true}
          duration={500}
          offset={-100}
        >
          Home
        </ScrollLink>

        <ScrollLink
          style={{ cursor: "pointer" }}
          to="what-we-offer"
          smooth={true}
          duration={500}
          offset={-100}
        >
          Dual Agent
        </ScrollLink>
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="why"
          smooth={true}
          duration={500}
          offset={-80}
        >
          Why Us
        </ScrollLink>

        {isUserLoggedIn && (
          <ScrollLink
            style={{ cursor: "pointer" }}
            to="hero"
            smooth={true}
            duration={500}
            offset={-100}
            onClick={() => Navigate("/create-agent")}
          >
            Create Agent
          </ScrollLink>
        )}

        {isUserLoggedIn ? (
          <ScrollLink style={{ cursor: "pointer" }} onClick={logout}>
            Logout
          </ScrollLink>
        ) : (
          <ScrollLink
            onClick={() => Navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </ScrollLink>
        )}
      </div>
      <div className="navbar-menu-container">
        {/* <HiOutlineBars3 onClick={() => setOpenMenu(true)} /> */}
      </div>
    </nav>
  );
};

export default Navbar;
