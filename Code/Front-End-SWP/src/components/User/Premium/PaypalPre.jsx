import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { FUNDING } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { CreatePayment, UpdateStatusPremium } from "../../API/APIConfigure";
// This value is from the props in the UI
const style = { layout: "vertical" };
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, action) =>
          action.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, action) =>
          action.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              Swal.fire({
                title: "Thanh toán thành công",
                text: "Bạn đã mua gói thành công",
                icon: "success",
              }).then(() => {
                UpdateStatusPremium(userInfo.id, true).then((res) => {
                  // window.location.reload();
                  const paymentData = {
                    memberId: userInfo.id,
                    money: 120000,
                    bookingId: null,
                    status: "2",
                    title: "Nâng cấp thành viên",
                    type: "Premium",
                  };
                  CreatePayment(paymentData);
                  navigate("/user/profile");
                });
              });
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AcKdF_dbUAtvyM_4GmsVWZt2SQpcH2HoRiQHszUL0IFoGcAcSsjC77LUdebronMEvzr6D03gZ2v7_RaD",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={"USD"} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
