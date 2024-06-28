import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import imgLogo from "../../assets/img/logo.png";

function Navbar({ className }) {
  const navbarClassName = className ? "home-navbar" : "other";
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const handleLogin = () => {
    navigate("/login-register");
  };

  const handleMyAccount = () => {
    navigate("/user/profile");
    handleMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Log out",
        text: "Do you want to log out?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        await logout();
        handleMenuClose();
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire("Error", "Error logging out.", "error");
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  const handleBookingClick = () => {
    localStorage.removeItem("searchkey");
    window.location.reload();
  };

  return (
    <div className={`navbar-wrapper new-navbar-wrapper ${navbarClassName}`}>
      <div className="ht_tablet_hide">
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="logo-wrapper">
              <button className="btn_navbar-lef" onClick={handleBookingClick}>
                <Link to="/" className="navbar-link">
                  <img src={imgLogo} alt="" width={120} height={70} />
                </Link>
              </button>
            </div>
          </div>
          <div className="navbar-center"></div>
          <div className="navbar-right">
            {isLoggedIn ? (
              <div className="btn-icon">
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  style={{ color: "#fff" }}
                >
                  <AccountCircle />
                </IconButton>
                {renderMenu}
              </div>
            ) : (
              <button
                className="right-panel-open-btn booking-btn ht_mirror ht_tablet_hide"
                onClick={handleLogin}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
