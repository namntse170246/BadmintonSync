import instance, { customAxios } from "../setUp/axios";

export const BASE_URL = "https://localhost:7155/";
//ACCOUNT
const SignInAccount = (userData) => {
  return customAxios.post(`api/User/Login`, userData);
};

const SignUpAccount = (userData) => {
  return customAxios.post(`api/User/Register`, userData);
};
const GetAllAccounts = () => {
  return customAxios.get(`api/User/GetAllUsers`);
};

const GetCurrentUser = () => {
  return customAxios.get(`api/User/GetCurrentUser`);
};

const DeleteAccount = (userID) => {
  return customAxios.delete(`api/Accounts/DeleteAccount?id=${userID}`);
};

const UpdateStatus = (userID, newStatus) => {
  return customAxios.put(`api/Accounts/UpdateAccountStatus?id=${userID}`, {
    status: newStatus,
  });
};
export const UpdateAccount = (newUserData) => {
  return customAxios.put(`api/User/EditSelf`, {
    ...newUserData,
  });
};
export const UpdatePasswordByID = (userID, newPassword) => {
  return customAxios.put(`api/Accounts/UpdateAccount?id=${userID}`, {
    password: newPassword,
  });
};
//COURT, BOOKING, VOUCHER, TIMESLOT
const GetAllBookings = () => {
  return customAxios.get(`api/Bookings`);
};
const GetAllVoucher = () => {
  return instance.get(`api/Promotion`);
};
const GetVoucherByCode = (voucher) => {
  return customAxios.get(`api/Promotion/${voucher}/alpha`);
};
const GetAllFeedback = () => {
  return customAxios.get(`api/Evaluate`);
};
const GetAllTimeSlot = () => {
  return customAxios.get(`api/TimeSlot`);
};
const GetAllCourts = (searchValue) => {
  return customAxios.get(`api/Court`, {
    params: { search: searchValue },
  });
};
const GetUserByID = (userID) => {
  return customAxios.get(`api/User/GetUserById(Admin)/${userID}`);
};
//GET PAYMENT BY USER ID
export const GetPaymentByUserID = (userID) => {
  return customAxios.get(`api/Payment/GetbyMemberID?id=${userID}`);
};
export const GetAllCourtsByMemberID = (userID) => {
  return customAxios.get(`api/Realestates/GetbyMemberID?id=${userID}`);
};
export const GetAllBookingsByMemberID = (userID) => {
  return customAxios.get(`api/Bookings/${userID}`);
};
const CreateVouchers = (voucherData) => {
  return instance.post(`api/Vouchers/Createvoucher`, voucherData);
};
export const UpdateStatusVoucherByID = (voucherID, newStatus) => {
  return customAxios.put(`api/Vouchers/Updatevoucherstatus?id=${voucherID}`, {
    status: newStatus,
  });
};
export const GetbyCourtID = (courtID) => {
  return customAxios.get(`api/Court/${courtID}`);
};

export const GetbySubCourtID = (subCourtID) => {
  return customAxios.get(`api/SubCourt/${subCourtID}`);
};

export const GetFeebackbyRealestate = (realetatesID) => {
  return instance.get(`api/Evaluate/${realetatesID}`);
};
const CreateBooking = (data) => {
  return customAxios.post(`api/Booking`, data);
};
export const UpdateRealestateStatus = (realID, newStatus) => {
  return customAxios.put(`API/Realestates/UpdateRealestateSta?id=${realID}`, {
    status: newStatus,
  });
};
export const UpdateBookingStatus = (bookingID, newStatus) => {
  return customAxios.put(`api/Bookings/UpdateStatus?id=${bookingID}`, {
    status: newStatus,
  });
};
export const GetAllBookingsByID = (bookingID) => {
  return customAxios.get(`api/Booking/${bookingID}`);
};
export const GetTimeShareById = (timeshareID) => {
  return customAxios.get(`api/Timeshares/GetbyID?id=${timeshareID}`);
};
export const UpdateTimeShareStatus = (timeshareID, newStatus) => {
  return customAxios.put(
    `api/Timeshares/UpdateTimeshareSta?id=${timeshareID}`,
    {
      status: newStatus,
    }
  );
};
//Trade
export const GetAllTrade = () => {
  return customAxios.get(`api/Exchange/GetAll`);
};
export const GetTradeByID = (tradeID) => {
  return customAxios.get(`api/Exchange/GetExchangebyID?id=${tradeID}`);
};
export const GetTradeByMemberID = (memberID) => {
  return customAxios.get(
    `api/Exchange/GetExchangebymemberID?memberid=${memberID}`
  );
};
export const GetPaymentbyBookingID = (BookingID) => {
  return customAxios.get(`api/Payment/GetbyBookingID?id=${BookingID}`);
};
export const UpdateTradeStatus = (tradeID, newStatus) => {
  return customAxios.put(`api/Exchange/Updatestatus?id=${tradeID}`, {
    status: newStatus,
  });
};

export const CreateTrade = (tradeData) => {
  return customAxios.post(`api/Exchange/CreateExchange`, tradeData);
};
export const CreatePayment = (PaymentData) => {
  return customAxios.post(`api/Payment/CreatePayment`, PaymentData);
};
export const UpdatePaymentStatus = (PaymentID, newStatus) => {
  return customAxios.put(`API/Payment/UpdatePaymentSta?id=${PaymentID}`, {
    status: newStatus,
  });
};

export const GetAllPayment = () => {
  return customAxios.get(`api/Payment/GetAll`);
};

export const UpdateStatusPremium = (userID, newStatus) => {
  return customAxios.put(`api/Accounts/UpdateAccountPremium?id=${userID}`, {
    isPremium: newStatus,
  });
};

export const CreateFeedback = (data) => {
  return customAxios.post(`api/Feedbacks/Createfeedback`, data);
};

export {
  SignInAccount,
  SignUpAccount,
  GetAllAccounts,
  GetCurrentUser,
  DeleteAccount,
  UpdateStatus,
  GetAllBookings,
  GetAllVoucher,
  GetVoucherByCode,
  GetAllFeedback,
  GetAllTimeSlot,
  GetUserByID,
  GetAllCourts,
  CreateVouchers,
  CreateBooking,
};
