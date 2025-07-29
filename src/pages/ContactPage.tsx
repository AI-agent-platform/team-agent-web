import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper" id="contact">
      <h1 className="primary-heading">Let’s Build Something Together</h1>
      <p className="primary-text" style={{ textAlign: "center", maxWidth: "600px" }}>
        Whether you have a question, need a demo, or want to start building your AI agent—we’re here to help.
      </p>
      <div className="contact-form-container">
        <input type="text" placeholder="Enter your email" />
        <button className="secondary-button">Get Started</button>
      </div>
    </div>
  );
};

export default Contact;
