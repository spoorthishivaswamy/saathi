import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./Modal.scss";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  // height: "30em",
  borderRadius: "8px",
  overflow: "hidden",
};

const buttonStyle = {
  borderRadius: 20,
  textTransform: "none",
  fontSize: "15px",
  padding: "9px 12px",
  fontWeight: "600",
};

export default function ModalWithImg({ children, onButtonClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        className="create-button"
        onClick={handleOpen}
        style={buttonStyle}
        startIcon={<AddOutlinedIcon />}
      >
        Goal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box sx={boxStyle}>
          {children}
          <Button
            onClick={() => {
              onButtonClick();
              handleClose();
            }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}
