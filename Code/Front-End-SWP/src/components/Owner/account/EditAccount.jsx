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
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
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
          label="Old Password"
          type="password"
          fullWidth
          variant="standard"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="New Password"
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
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
