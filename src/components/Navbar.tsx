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

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="home"
          smooth={true}
          duration={500}
          offset={-100}
        >
          Home
        </ScrollLink>
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="about"
          smooth={true}
          duration={500}
          offset={-100}
        >
          About
        </ScrollLink>
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="contact"
          smooth={true}
          duration={500}
          offset={-80}
        >
          Contact
        </ScrollLink>

        {isUserLoggedIn && (
          <ScrollLink className="primary-button">Create Agent</ScrollLink>
        )}

        {isUserLoggedIn ? (
          <ScrollLink onClick={logout} >
            Logout
          </ScrollLink>
        ) : (
          <ScrollLink onClick={() => Navigate("/login")}style={{ cursor: "pointer" }} >
            Login
          </ScrollLink>
        )}
      </div>
      <div className="navbar-menu-container">
        {/* <HiOutlineBars3 onClick={() => setOpenMenu(true)} /> */}
      </div>
      {/* <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer> */}
    </nav>
  );
};

export default Navbar;
