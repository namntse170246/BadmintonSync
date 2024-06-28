import "./mailList.css";

function MailList() {
  return (
    <div className="mailContainer">
      <div className="mail">
        <h1 className="mailTitle">Save your time and money!</h1>
        <span className="mailDesc">
          Book court and we'll send you the best deals
        </span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Địa chỉ e-mail của bạn" />
          <button>Sign up</button>
        </div>
      </div>
      <div className="mailDangky">
        <div className="mailDangkyText">Cooperate with us ?</div>
      </div>
      <div className="mailOptions">
        <ul className="ulOptions">
          <li className="liOption">Mobile version</li>
          <li className="liOption">Your account</li>
          <li className="liOption">Customer service</li>
          <li className="liOption">Become a distributor partner</li>
          <li className="liOption">Booking for business</li>
        </ul>
      </div>
    </div>
  );
}

export default MailList;
