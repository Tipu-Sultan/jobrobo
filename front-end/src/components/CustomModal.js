// Modal.js
import React from 'react';
import Modal from 'react-modal';

const DeleteMpdal = ({ isOpen, closeModal, onDelete ,itemViewDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Delete"
      className="custom-modal"
    >
      <div className=''>
        <div className='card-header'>
          <h4 className='text-danger'>Delete Alert</h4>
        </div>
        <div>
          <h2>Are you sure you want to delete? {itemViewDelete.email}</h2>
          <button onClick={onDelete} className='btn btn-primary btn-sm mx-3'>Delete</button>
          <button onClick={closeModal} className='btn btn-warning btn-sm'>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

const ViewDataModal = ({ isView, closeModal ,itemViewDelete }) => {
  return (
    <Modal
      isOpen={isView}
      onRequestClose={closeModal}
      contentLabel="Confirm Delete"
      className="custom-modal-2"
    >
<section className="vh-100  " >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100 w-100">
      <div className="col col-md-9 col-lg-7 col-xl-5">
        <div className="card" style={{borderRadius: "15px"}}>
          <div className="card-body p-4">
            <div className=" text-black">
            <div className="flex-shrink-0">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="USer" className="img-fluid"
                  style={{width: "180px", borderRadius: "10px"}}/>
            </div>
              <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{itemViewDelete.firstName} {itemViewDelete.lastName}</h5>
                <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{itemViewDelete.email}</p>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{backgroundColor: "#efefef"}}>
                  <div>
                    <p className="small text-muted mb-1">Gender</p>
                    <p className="mb-0">{itemViewDelete.gender}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Language</p>
                    <p className="mb-0">{itemViewDelete.options}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">DOB</p>
                    <p className="mb-0">{itemViewDelete.dob}</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Number</p>
                    <p className="mb-0">{itemViewDelete.number}</p>
                  </div>
                </div>
                <div className="d-flex pt-1">
                  <button type="button" onClick={closeModal} className="btn btn-outline-primary me-1 flex-grow-1">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </Modal>
  );
};

export  {ViewDataModal,DeleteMpdal};
