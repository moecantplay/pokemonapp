import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastWrapper.scss";

const ToastWrapper = () => (
  <ToastContainer
    position="top-center"
    transition={Slide}
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    pauseOnHover={false}
    closeButton={false}
    rtl={false}
    pauseOnVisibilityChange
    closeOnClick
    draggable
    className="toast__container"
    toastClassName="toast__white"
    progressClassName="toast__progress"
  />
);

export default ToastWrapper;
