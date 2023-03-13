import React, { useState } from "react";
import Topheader from "./Topheader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MdSend } from "react-icons/md";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Contact = () => {
  // const [value, setValue] = useState < Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Topheader title="Contact US" subtitle="Contact US" />
      <div style={{ marginTop: "0px" }} className="row no-margin">
        <iframe
          style={{ width: "100%" }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249759.19784092825!2d79.10145254589841!3d12.009924873581818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1448883859107"
          height={450}
          allowFullScreen
        />
      </div>
      <div className="row contact-rooo no-margin">
        <div className="container">
          <div className="row">
            <div style={{ padding: "20px" }} className="col-sm-7">
              <h2>Book an Appointment</h2>
              <br />
              <div className="mb-4">
                <TextField className="w-100" label="Your Name" />
              </div>
              <div className="mb-4">
                <TextField className="w-100" label="Email Address" />
              </div>
              <div className="mb-4">
                <TextField className="w-100" label="Mobile Number" />
              </div>
              <div className="mb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker", "DateTimePicker"]}
                  >
                    <DateTimePicker
                      label="Select Date & Time"
                      // onChange={(newValue) => setValue(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="mb-4">
                <TextField className="w-100" label="Enter Message" />
              </div>
              <div className="mb-4">
                <Button
                  className="w-100 sendbtn button"
                  endIcon={<MdSend />}
                  onClick={(e) => {
                    handleOpen();
                    e.preventDefault();
                  }}
                >
                  Send Message
                </Button>
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box component="form" noValidate autoComplete="off" sx={style}>
                  <div className="">
                    <h5 className="text-center">Verify Your Identity</h5>
                    <p className="mb-4">An otp has been send to your email address</p>
                    <div className="mb-4">
                      <TextField
                        // error
                        className="w-100"
                        label="Enter the OTP"
                        // helperText="Incorrect entry."
                      />
                    </div>
                  </div>
                  <Button
                    className="w-100 sendbtn button"
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>
            </div>
            <div className="col-sm-5">
              <div style={{ margin: "50px" }} className="serv">
                <h2 style={{ marginTop: "10px" }}>Address</h2>
                हस्तरेखा एवं वास्तुशास्त्र विशेषज्ञ, <br />
                नई दिल्ली
                <br />
                +91 8587924072
                <br />
                +91 9268319743
                <br />
                +91 9582248029
                <br />
                +91 8130948703
                <br />
                Email:shriindrakshidhaam@gmail.com
                <br />
                Website:https://profdharmendersharma.com/
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
