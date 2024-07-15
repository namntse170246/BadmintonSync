import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Court from "./pages/court/Court";
import Form from "./pages/form/Form";
import OTPVerification from "./pages/form/OTPVerification";
import UserPage from "./pages/user/userPage";
import Trade from "./pages/admin/Trade";
import Admin from "./pages/admin/Admin";
import About from "./pages/admin/About";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import Wallet from "./pages/admin/Wallet";
import Feedback from "./pages/admin/Feedback";
import Booking from "./pages/admin/Booking";
import Voucher from "./pages/admin/Voucher";
import DetailsBooking from "./pages/admin/DetailsBooking";
import Realestates from "./pages/admin/Realestates";
import SubCourts from "./pages/admin/SubCourts";
import OwnerTrade from "./pages/owner/Trade";
import OwnerAdmin from "./pages/owner/Admin";
import OwnerAbout from "./pages/owner/About";
// import OwnerUser from "./pages/owner/User";
import OwnerAccount from "./pages/owner/Account";
import OwnerWallet from "./pages/owner/Wallet";
import OwnerFeedback from "./pages/owner/Feedback";
import OwnerBooking from "./pages/owner/Booking";
import OwnerVoucher from "./pages/owner/Voucher";
import OwnerDetailsBooking from "./pages/owner/DetailsBooking";
import OwnerCourts from "./pages/owner/Realestates";
import OwnerSubCourts from "./pages/owner/SubCourts";
import OwnerCheckIn from "./pages/owner/CheckIn";
import ErrorPage from "./pages/ErrorPage";
import Posting from "./pages/posting/Posting";
import CheckOut from "./pages/user/CheckOut";
import PaymentResults from "./pages/user/PaymentResult";
import TradeTimeShare from "./pages/trade/TradeTimeShare";
import ConfirmTrade from "./pages/trade/ConfirmTrade";
import DetailsTrade from "./pages/trade/DetailsTrade";
import Premium from "./pages/user/Premium";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { useEffect } from "react";

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
    <Routes>
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/login-register" element={<Form />} />
      <Route path="/otp-verification/:email" component={<OTPVerification />} />
      <Route path="/courts" element={<List />} />
      <Route path="/court/:id" element={<Court />} />
      {/* <Route path="/timeshare/:id" element={<Timeshare />} /> */}
      <Route path="/booking/:id" element={<Posting />} />
      <Route path="/success" element={<PaymentResults />} />
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
      {/* Trade */}
      <Route
        path="/trade/:id"
        element={
          <UserWrapper>
            <TradeTimeShare />
          </UserWrapper>
        }
      />
      <Route
        path="/trade/confirm/:id"
        element={
          <UserWrapper>
            <ConfirmTrade />
          </UserWrapper>
        }
      />
      <Route
        path="/trade/detail/:id"
        element={
          <UserWrapper>
            <DetailsTrade />
          </UserWrapper>
        }
      />
      <Route
        path="/premium"
        element={
          <UserWrapper>
            <Premium />
          </UserWrapper>
        }
      />
      {/* ProtectRouterAdmin */}
      <Route
        path="/admin/trade"
        element={
          <AdminWrapper>
            <Trade />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminWrapper>
            <Admin />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/about"
        element={
          <AdminWrapper>
            <About />
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
        path="/admin/wallet"
        element={
          <AdminWrapper>
            <Wallet />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/feedback"
        element={
          <AdminWrapper>
            <Feedback />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/booking"
        element={
          <AdminWrapper>
            <Booking />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/booking/details/:id"
        element={
          <AdminWrapper>
            <DetailsBooking />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/voucher"
        element={
          <AdminWrapper>
            <Voucher />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/courts"
        element={
          <AdminWrapper>
            <Realestates />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/subCourts"
        element={
          <AdminWrapper>
            <SubCourts />
          </AdminWrapper>
        }
      />
      {/* Owner */}
      <Route
        path="/owner/trade"
        element={
          <OwnerWrapper>
            <OwnerTrade />
          </OwnerWrapper>
        }
      />
      <Route
        path="/owner"
        element={
          <OwnerWrapper>
            <OwnerAdmin />
          </OwnerWrapper>
        }
      />
      <Route
        path="/owner/about"
        element={
          <OwnerWrapper>
            <OwnerAbout />
          </OwnerWrapper>
        }
      />
      {/* <Route
        path="/owner/user"
        element={
          <OwnerWrapper>
            <OwnerUser />
          </OwnerWrapper>
        }
      /> */}
      <Route
        path="/owner/account"
        element={
          <OwnerWrapper>
            <OwnerAccount />
          </OwnerWrapper>
        }
      />
      <Route
        path="/owner/wallet"
        element={
          <OwnerWrapper>
            <OwnerWallet />
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
        path="/owner/booking/details/:id"
        element={
          <OwnerWrapper>
            <OwnerDetailsBooking />
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
    </Routes>
  );
}

export default App;
