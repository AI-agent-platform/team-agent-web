/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { User } from "lucide-react";
import { Button } from "@mui/material";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isUserLoggedIn, logout } = useAuth();
  const Navigate = useNavigate();

  return (
    <nav>
      <ScrollLink
        style={{ cursor: "pointer" }}
        to="hero"
        smooth={true}
        duration={500}
        offset={-100}
      >
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
      </ScrollLink>
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

        {isUserLoggedIn && <ScrollLink>Create Agent</ScrollLink>}

        {isUserLoggedIn ? (
          <ScrollLink onClick={logout}>Logout</ScrollLink>
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
