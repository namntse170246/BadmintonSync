import ChartPaymentUser from './ChartPaymentUser';
import PaymentUserTable from './userComponents/PaymentUserTable';

function PaymentUser() {
  return (
    <div>
      <h2 className="profile-title">Thanh toán cá nhân</h2>
      <div style={{ marginTop: '50px' }}>
        <ChartPaymentUser />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <PaymentUserTable />
      </div>
    </div>
  );
}

export default PaymentUser;
