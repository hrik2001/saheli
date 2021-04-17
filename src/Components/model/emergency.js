import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')



export default function EmergencyModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal(){
      setIsOpen(false);
    }
    const [emergency,emergencyHandler] = React.useState(false);

 
 
    return (
      <div>
          <span className="nav-link"> 
              <Button onClick={openModal}  variant="contained" color="secondary">
                Emergency
              </Button>
          </span>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">

               
            <h4  ref={_subtitle => (subtitle = _subtitle)}><b>Are you sure that you are in emergency!?</b></h4>
            <p style={{fontSize:"14px"}}>* Confirming this will alert your fellow saheli users about your emergency.</p>
            <Button style={{marginRight:"15px"}} onClick={()=>{alert("request sent to server")}} variant="contained" color="primary">Yes</Button>
            <Button onClick={closeModal} variant="contained" color="secondary">No</Button>
                
            </Modal>
      </div>
    );
}

