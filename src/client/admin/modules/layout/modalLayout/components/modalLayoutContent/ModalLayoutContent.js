import React from "react";
import PropTypes from "prop-types";
import "./ModalLayoutContent.css";

const ModalLayoutContent = ({ children }) => {
  return (
    <div className="col-lg-4">
      <div className="modal_content">{children}</div>
    </div>
  );
};

ModalLayoutContent.propTypes = {};

export default ModalLayoutContent;
