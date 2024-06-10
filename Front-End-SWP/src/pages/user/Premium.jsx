import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import ShowPlan from '../../components/User/Premium/ShowPLan';
export default function Premium() {
  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <ShowPlan />
      </div>
      <MailList />
      <Footer />
    </div>
  );
}
