import React from 'react';

import { Modal } from '@material-ui/core';


const DeckModal = ({ handleClose, show, children }) => {

  return (
    <Modal open={show}>
      {children}
      <button onClick={handleClose}>close</button>
    </Modal>
  );
};

export default DeckModal
