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
  const navbarClassname = className ? "home-navbar" : "other";
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
        title: "Đăng xuất",
        text: "Bạn có muốn đăng xuất?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, đăng xuất!",
        cancelButtonText: "Không",
      });

      if (result.isConfirmed) {
        await logout();
        handleMenuClose();
        Swal.fire("Đăng xuất!", "Bạn đã đăng xuất.", "success");
        navigate("/");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire("Lỗi", "Lỗi khi đăng xuất.", "error");
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
      <MenuItem onClick={handleMyAccount}>Tài Khoản Của Tôi</MenuItem>
      <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
    </Menu>
  );
  const handleBookingClick = () => {
    localStorage.removeItem("searchkey");
    window.location.reload();
  };
  return (
    <div className={`navbar-wrapper new-navbar-wrapper ${navbarClassname}`}>
      <div className="ht_tablet_hide">
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="logo-wrapper">
              <button className="btn_navbar-lef" onClick={handleBookingClick}>
                <Link to="/" className="navbar-link">
                  {/* <div className="navbar-logo"> */}
                  <img src={imgLogo} alt="" width={120} height={70} />
                  {/* </div> */}
                  <span className="nav-logo_signature"> </span>
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
              // <div className="btn-div">
              <button
                className="right-panel-open-btn booking-btn ht_mirror ht_tablet_hide"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
              // </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
