import React from 'react';

const Modal = ({ handleClose, show, id, children }) => {

    let clickedProductId = id
    let desc = children

    console.log(">>", desc, clickedProductId);
        const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
                <div>{desc}</div> 
            <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

  export default Modal;