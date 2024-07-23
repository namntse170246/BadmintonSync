import instance, { customAxios } from "../setUp/axios";

export const BASE_URL = "https://localhost:7155/";
//ACCOUNT
const SignInAccount = (userData) => {
  return customAxios.post(`api/User/Login`, userData);
};

const SignUpAccount = (userData) => {
  return customAxios.post(`api/User/registerwithotp`, userData);
};

const VerifyEmailOTP = (data) => {
  return customAxios.post(`api/User/verifyotp`, {
    email: data.email,
    otp: data.otp,
  });
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

const UpdateRole = (userName, newRole) => {
  return customAxios.put(`api/User/EditRole`, {
    userName: userName,
    roleType: newRole,
  });
};

const UpdateStatus = (userName, newStatus) => {
  return customAxios.put(`api/User/EditUserStatus`, {
    userName: userName,
    userStatus: newStatus,
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
  return customAxios.get(`api/Booking`);
};

const GetBookedSubCourts = (date, timeslotId) => {
  return customAxios.get(
    `api/Booking/byDateAndTimeSlot?date=${date}&timeSlotId=${timeslotId}`
  );
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
const GetTimeSlotByID = (id) => {
  return customAxios.get(`api/TimeSlot/${id}`);
};
const GetAllCourts = (searchValue) => {
  return customAxios.get(`api/Court`, {
    params: { search: searchValue },
  });
};
const GetAllSubCourts = (searchValue) => {
  return customAxios.get(`api/SubCourt`, {
    params: { search: searchValue },
  });
};

export const GetBookingCancellationPercentage = () => {
  return customAxios.get(`api/Booking/cancel-booking-percentage`);
};
export const GetTop5PeopleUseMostAmount = () => {
  return customAxios.get(`api/User/GetTop5PeopleUseMostAmount`);
};
export const GetMonthlyBookingTotals = () => {
  return customAxios.get(`api/Booking/GetMonthlyBookingTotals`);
};
export const GetTotalUserByRoleType3 = () => {
  return customAxios.get(`api/User/GetTotalUserByRoleType3`);
};
export const GetTotalUserInSystem = () => {
  return customAxios.get(`api/User/GetTotalUserInSystem`);
};
export const GetTotalCourtsInSystem = () => {
  return customAxios.get(`api/User/GetTotalCourtInSystem`);
};
export const DeleteCourt = (userID) => {
  return customAxios.delete(`api/Court/${userID}`);
};

export const DeleteSubCourt = (userID) => {
  return customAxios.delete(`api/SubCourt/CheckBookingExistAndDelete${userID}`);
};

const GetUserByID = (userID) => {
  return customAxios.get(`api/User/GetUserById/${userID}`);
};
//GET PAYMENT BY USER ID
export const GetPaymentByUserID = (userID) => {
  return customAxios.get(`api/Payment/GetbyMemberID?id=${userID}`);
};
export const GetAllCourtsByMemberID = (userID) => {
  return customAxios.get(`api/Realestates/GetbyMemberID?id=${userID}`);
};
export const GetAllBookingsByMemberID = (userID) => {
  return customAxios.get(`api/Booking/userId/${userID}`);
};

const CreateSubCourts = (subCourtData) => {
  return customAxios.post(`api/SubCourt/${subCourtData.courtId}`, {
    name: subCourtData.name,
    pricePerHour: subCourtData.pricePerHour,
  });
};
const CreateVouchers = (voucherData) => {
  return instance.post(`api/Promotion`, voucherData);
};
export const DeleteUser = (userID) => {
  return customAxios.delete(`api/User/DeleteUser/${userID}`);
};
export const DeleteVoucherByID = (voucherID) => {
  return customAxios.delete(`api/Promotion/${voucherID}`);
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

export const DeleteBookingById = (id) => {
  return customAxios.delete(`api/Booking/${id}`);
};

export const UpdateRealestateStatus = (realID, newStatus) => {
  return customAxios.put(`API/Realestates/UpdateRealestateSta?id=${realID}`, {
    status: newStatus,
  });
};
export const UpdateBookingStatus = async (bookingID, status) => {
  console.log(bookingID, status);
  return customAxios.put(`/api/Booking/${bookingID}/status`, {
    status: status,
  });
};

export const CancelBookingBeforePayment = async (bookingID) => {
  return customAxios.put(`/api/Booking/${bookingID}/cancelAfterPayment`);
};
export const CancelBookingAfterPayment = async (bookingID) => {
  return customAxios.put(
    `/api/Booking/${bookingID}/cancelChangeStatusandRefundMoney`
  );
};
export const ConfirmBooking = async (bookingID) => {
  return customAxios.put(`/api/Booking/${bookingID}/confirm`);
};
export const CheckinBooking = async (bookingID) => {
  return customAxios.put(`/api/Booking/${bookingID}/checkin`);
};
export const CreateCheckIn = async (data) => {
  return customAxios.post(`api/CheckIn`, data);
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
export const CheckIn = () => {
  return customAxios.get(`api/CheckIn`);
};
export const UpdateCheckIn = (data) => {
  return customAxios.put(`api/CheckIn/${data.id}`, {
    checkInStatus: data.checkInStatus,
    checkInTime: data.checkInTime,
  });
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
  VerifyEmailOTP,
  GetAllAccounts,
  GetCurrentUser,
  DeleteAccount,
  UpdateRole,
  UpdateStatus,
  GetAllBookings,
  GetBookedSubCourts,
  GetAllVoucher,
  GetVoucherByCode,
  GetAllFeedback,
  GetAllTimeSlot,
  GetTimeSlotByID,
  GetUserByID,
  GetAllCourts,
  GetAllSubCourts,
  CreateSubCourts,
  CreateVouchers,
  CreateBooking,
};
