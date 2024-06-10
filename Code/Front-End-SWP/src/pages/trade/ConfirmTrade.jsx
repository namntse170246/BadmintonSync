import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import TableTradeConfirm from "../../components/User/Trade/TableTradeConfirm";
export default function TradeTimeShare() {
    return (
        <div>
            <Navbar />
            <TableTradeConfirm />
            <MailList />
            <Footer />
        </div>
    );
}
