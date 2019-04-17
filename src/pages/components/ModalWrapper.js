import React from 'react';
import PropTypes from 'prop-types';
import x from '../../assets/images/x-icon.png';
import '../../assets/modalWrapper.css';

const ModalWrapper = props => {
  var showModal = props.showModal;
  console.log('showModal', showModal, props.showModal);

  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.toggleState();
  };
if(showModal) {
    return (
      <div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content con">
                <img
                    className="icon roster"
                    src={x}
                    alt="x-icon"
                    onClick={() => props.toggleState()}
                />
                <div className="modal-top">
                  <h3>{props.title}</h3>
                </div>

                {props.children}
            </div>
          </div>
    );
  } else { return null }
};

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400
};

export default ModalWrapper;
