import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditAccount = ({
  open,
  handleClose,
  editData,
  handleInputChange,
  handleSubmit,
  handleOldPasswordChange,
  oldPassword,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh Sửa Tài Khoản</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Tên"
          type="text"
          fullWidth
          variant="standard"
          value={editData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="Email"
          fullWidth
          variant="standard"
          value={editData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="oldPassword"
          label="Mật khẩu cũ"
          type="password"
          fullWidth
          variant="standard"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Mật khẩu mới"
          type="password"
          fullWidth
          variant="standard"
          value={editData.password1}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
