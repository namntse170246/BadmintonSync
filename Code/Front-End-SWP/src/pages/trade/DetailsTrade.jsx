import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import ShowTradeDetails from "../../components/User/Trade/ShowTradeDetails";
export default function TradeTimeShare() {
  return (
    <div>
      <Navbar />
      <ShowTradeDetails />
      <MailList />
      <Footer />
    </div>
  );
}
