import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Court from "./pages/court/Court";
import Form from "./pages/form/Form";
import OTPVerification from "./pages/form/OTPVerification";
import UserPage from "./pages/user/userPage";
import Admin from "./pages/admin/Admin";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import Courts from "./pages/admin/Courts";
import OwnerAdmin from "./pages/owner/Admin";
// import OwnerUser from "./pages/owner/User";
import OwnerAccount from "./pages/owner/Account";
import OwnerFeedback from "./pages/owner/Feedback";
import OwnerBooking from "./pages/owner/Booking";
import OwnerVoucher from "./pages/owner/Voucher";
import OwnerCourts from "./pages/owner/Courts";
import OwnerSubCourts from "./pages/owner/SubCourts";
import OwnerCheckIn from "./pages/owner/CheckIn";
import ErrorPage from "./pages/ErrorPage";
import Posting from "./pages/posting/Posting";
import CheckOut from "./pages/user/CheckOut";
import PaymentResults from "./pages/user/PaymentResult";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import HorizontalNonLinearStepper from "./components/step/HorizontalNonLinearStepper";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ForgotPassword from "./pages/form/ForgotPassword";
import ResetPassword from "./pages/form/ResetPassword"; 

const AdminWrapper = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "Administrator";
  return isAdmin ? children : <ErrorPage />;
};

const OwnerWrapper = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isOwner = userInfo?.role === "Owner";
  return isOwner ? children : <ErrorPage />;
};

const UserWrapper = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? children : <ErrorPage />;
};

function App() {
  useEffect(() => {
    const handlePopstate = () => {
      if (window.location.pathname === "/") {
        window.location.reload();
        localStorage.removeItem("searchkey");
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login-register" element={<Form />} />
        <Route path="/otp-verification/:email" element={<OTPVerification />} />
        <Route path="/courts" element={<List />} />
        <Route path="/court/:id" element={<Court />} />
        <Route path="/booking/:id" element={<Posting />} />
        <Route path="/success" element={<PaymentResults />} />
        <Route path="/step" element={<HorizontalNonLinearStepper />} />
        {/* User */}
        <Route
          path="/user/*"
          element={
            <UserWrapper>
              <UserPage />
            </UserWrapper>
          }
        />
        <Route
          path="/user/loading"
          element={
            <UserWrapper>
              <LoadingPage />
            </UserWrapper>
          }
        />
        <Route
          path="/user/booking/:id"
          element={
            <UserWrapper>
              <ErrorPage />
            </UserWrapper>
          }
        />
        <Route
          path="/user/checkout/:id"
          element={
            <UserWrapper>
              <CheckOut />
            </UserWrapper>
          }
        />
        {/* <Route
          path="/user/order"
          element={
            <UserWrapper>
              <Order />
            </UserWrapper>
          }
        /> */}
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminWrapper>
              <Admin />
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/user"
          element={
            <AdminWrapper>
              <User />
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/account"
          element={
            <AdminWrapper>
              <Account />
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/courts"
          element={
            <AdminWrapper>
              <Courts />
            </AdminWrapper>
          }
        />
        {/* Owner */}
        <Route
          path="/owner"
          element={
            <OwnerWrapper>
              <OwnerAdmin />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/account"
          element={
            <OwnerWrapper>
              <OwnerAccount />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/feedback"
          element={
            <OwnerWrapper>
              <OwnerFeedback />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/booking"
          element={
            <OwnerWrapper>
              <OwnerBooking />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/voucher"
          element={
            <OwnerWrapper>
              <OwnerVoucher />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/courts"
          element={
            <OwnerWrapper>
              <OwnerCourts />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/subCourts"
          element={
            <OwnerWrapper>
              <OwnerSubCourts />
            </OwnerWrapper>
          }
        />
        <Route
          path="/owner/checkin"
          element={
            <OwnerWrapper>
              <OwnerCheckIn />
            </OwnerWrapper>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
