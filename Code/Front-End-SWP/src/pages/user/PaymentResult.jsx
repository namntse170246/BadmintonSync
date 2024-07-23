// Trong file PaymentResult.js
import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment.jsx';

const PaymentResults = () => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get('vnp_Amount');
    console.log(amount);
    setAmount(amount);
  }, []);

  return (
    <div>
        <SuccessPayment amount={amount} />
    </div>
  );
};


export default PaymentResults;
