import React from "react";
import Topheader from "./Topheader";

const Contact = () => {
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
              <h2>Contact Form</h2>
              <br />
              <div className="row cont-row">
                <div className="col-sm-3">
                  <label>Enter Name </label>
                  <span>:</span>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    className="form-control input-sm"
                  />
                </div>
              </div>
              <div className="row cont-row">
                <div className="col-sm-3">
                  <label>Email Address </label>
                  <span>:</span>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Email Address"
                    className="form-control input-sm"
                  />
                </div>
              </div>
              <div className="row cont-row">
                <div className="col-sm-3">
                  <label>Mobile Number</label>
                  <span>:</span>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Mobile Number"
                    className="form-control input-sm"
                  />
                </div>
              </div>
              <div className="row cont-row">
                <div className="col-sm-3">
                  <label>Enter Message</label>
                  <span>:</span>
                </div>
                <div className="col-sm-8">
                  <textarea
                    rows={5}
                    placeholder="Enter Your Message"
                    className="form-control input-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div style={{ marginTop: "10px" }} className="row">
                <div style={{ paddingTop: "10px" }} className="col-sm-3">
                  <label />
                </div>
                <div className="col-sm-8">
                  <button className="btn btn-danger btn-sm">
                    Send Message
                  </button>
                </div>
              </div>
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
