import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Admin from "./pages/admin/Admin";
import About from "./pages/admin/About";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import Wallet from "./pages/admin/Wallet";
import Feedback from "./pages/admin/Feedback";
import Trade from "./pages/admin/Trade";
import Form from "./pages/form/Form";
import UserPage from "./pages/user/userPage";
import Booking from "./pages/admin/Booking";
import Voucher from "./pages/admin/Voucher";
import Realestates from "./pages/admin/Realestates";
import ErrorPage from "./pages/ErrorPage";
import Timeshare from "./pages/timeshare/Timeshare";
import Posting from "./pages/posting/Posting";
import CheckOut from "./pages/user/CheckOut";
import TradeTimeShare from "./pages/trade/TradeTimeShare";
import ConfirmTrade from "./pages/trade/ConfirmTrade";
import DetailsTrade from "./pages/trade/DetailsTrade";
import DetailsBooking from "./pages/admin/DetailsBooking";
import Premium from "./pages/user/Premium";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { useEffect } from "react";

const AdminWrapper = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isAdmin = userInfo?.isAdmin;
    return isAdmin ? children : <ErrorPage />;
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
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/timeshare/:id" element={<Timeshare />} />
            <Route path="/posting/:id" element={<Posting />} />
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
                path="/admin/realetates"
                element={
                    <AdminWrapper>
                        <Realestates />
                    </AdminWrapper>
                }
            />
        </Routes>
    );
}

export default App;
