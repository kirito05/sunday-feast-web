import React from "react";

function Modal({ children, isOpen, isClose,className }) {

    const handleOverLay = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation()
      isClose();
     }
    }
  return (
    <>
      {isOpen ? (
        <div className="bg-black bg-opacity-50 fixed  top-0 left-0 w-full h-full flex justify-center items-center z-50" onClick={handleOverLay} >
          {" "}
          <div className={`rounded ${className}`}>{children}</div>
        </div>
      ) : null}
    </>
  );
}


export default Modal;
