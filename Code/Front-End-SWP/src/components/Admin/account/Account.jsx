import { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import { Button } from "@mui/material";
import EditAccount from "./EditAccount";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Account = () => {
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          "https://6535e093c620ba9358ecba91.mockapi.io/Account"
        );

        setAccount(response.data);
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleClickOpen = () => {
    if (account && account.length > 0) {
      setEditData({ ...account[0], id: account[0].id });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentPassword = account.find(
      (acc) => acc.id === editData.id
    ).password;
    if (oldPassword !== currentPassword) {
      toast.error("Sai mật khẩu cũ");
      return;
    }
    try {
      const response = await axios.put(
        `https://6535e093c620ba9358ecba91.mockapi.io/Account/${editData.id}`,
        editData
      );
      setAccount(
        account.map((acc) => (acc.id === editData.id ? response.data : acc))
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
      }
      handleClose();
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.error("Failed to update account details:", error);
    }
  };

  return (
    <div>
      {account ? (
        <div className="info-account">
          <div className="title-account">Tài Khoản</div>
          {account.map((item, index) => (
            <div key={index}>
              <p className="title">Tên người dùng: {item.userName}</p>
              <p className="title">Tên: {item.name}</p>
              <p className="title">Địa chỉ email: {item.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Chỉnh sửa
      </Button>
      <EditAccount
        open={open}
        handleClose={handleClose}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        oldPassword={oldPassword}
        handleOldPasswordChange={handleOldPasswordChange}
      />
    </div>
  );
};

export default Account;
