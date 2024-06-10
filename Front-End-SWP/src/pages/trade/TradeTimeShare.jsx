import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import TableTrade from "../../components/User/Trade/TableTrade";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
export default function TradeTimeShare() {
    return (
        <div>
            <Navbar />
            <TableTrade idUser={userInfo.id} />
            <MailList />
            <div className="homeContainer" style={{ marginTop: "50px" }}>
                <Footer />
            </div>
        </div>
    );
}
