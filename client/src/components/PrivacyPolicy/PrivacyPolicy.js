import React from "react";
import "./privacypolicy.scss";

const privacypolicy = props => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <div className="description">
        <h2>Information collection</h2>
        <p>
          We may collect your personally identifiable information. If authorized
          by you, we may also access your Google Drive profile.
        </p>
        <h2>Information security</h2>
        <p>
          We do not share your personal data (login or email) with any third
          parties. Analytics companies may collect statistical data which can be
          traced to you. No personal data is shared. We take reasonable steps to
          secure your personally identifiable information against unauthorized
          access or disclosure.
        </p>
        <h2>Changes in our policy</h2>
        <p>
          This privacy policy was last updated on April 03, 2019. Our privacy
          policy may change. If we make any material changes, we will place a
          prominent notice on our website or application. If the change affects
          registered users materially, we will send you a notice by email, push
          notification or text. If you have any questions or concerns about our
          privacy policies, please contact us:{" "}
          <a href="">
            <ins>kickup@gmal.com</ins>
          </a>
        </p>
      </div>
    </div>
  );
};

export default privacypolicy;
