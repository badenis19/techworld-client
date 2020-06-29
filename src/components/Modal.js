import React from 'react';

const Modal = ({ hideModal, show, id, children }) => {

    let clickedProductId = id
    let desc = children

    console.log(">>", desc, clickedProductId);
        const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div>
          <div className="container">
            <div className="row">
              {desc}
            </div>
          </div>
                
            <p className="modal-back-link" onClick={hideModal}>back to products</p>
            </div>
        </section>

      </div>
    );
  };

  export default Modal; 