import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GetPaymentbyBookingID,
  UpdateBookingStatus,
  UpdatePaymentStatus,
  UpdateTimeShareStatus,
} from "../../API/APIConfigure";
// This value is from the props in the UI
const style = { layout: "vertical" };
import { useState } from "react";
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, timeshareId }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const id = useParams();
  const [dataPay, setDataPay] = useState("");
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await GetPaymentbyBookingID(id.id);
        if (response.length > 0) {
          setDataPay(response[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentDetails();
  }, []);
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
        fundingSource={undefined}
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
                text: "Chúc bạn có kỳ nghỉ vui vẻ",
                icon: "success",
              }).then(() => {
                UpdateBookingStatus(id.id, "2").then((res) => {
                  if (dataPay && dataPay.payId) {
                    UpdatePaymentStatus(dataPay.payId, "2").then((res) => {});
                  }
                  UpdateTimeShareStatus(timeshareId, "2").then((res) => {
                    window.location.reload();
                  });
                });
              });
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount, timeshareId }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "100px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AcKdF_dbUAtvyM_4GmsVWZt2SQpcH2HoRiQHszUL0IFoGcAcSsjC77LUdebronMEvzr6D03gZ2v7_RaD",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          timeshareId={timeshareId}
        />
      </PayPalScriptProvider>
    </div>
  );
}
